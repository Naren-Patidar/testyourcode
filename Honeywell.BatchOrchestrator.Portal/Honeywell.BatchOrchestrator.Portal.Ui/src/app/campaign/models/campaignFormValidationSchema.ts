/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-nested-ternary */
/* eslint-disable func-names */
import { PARAM_TYPES } from 'utils/constants/enums';
import { object, string, number, boolean, date, mixed, ref, array } from 'yup';
import { create } from 'yup/lib/Reference';
import { isInteger } from 'lodash';
import isDecimal from 'validator/es/lib/isDecimal';
import { AppConstants } from 'utils';
import { useCampaignFacade } from '+store/campaign';
import { CampaignService } from '../services/campaign-service';
import { CampaignCreationStep } from './campaign-step';
import { CampaignType } from './campaign-type';
import { campaignFormModel } from './campaignFormModel';

const {
  campaignTypeFormField: {
    isRecipeBased,
    formulaSetId,
    currentBatchSize,
    minimumBatchSize,
    batchSizeEngUnit,
    campaignType,
    formulaId,
    isLastBatchScaled,
    productionQty,
    referenceBatch,
    campaignRefId,
    rawMaterial,
    rawMaterialParameterId,
    rawMaterialQty,
    noOfBatches,
    recipeName,
    yieldParameter,
    state,
  },
  campaignDetailsFormField: {
    batchIdPattern,
    batchStartMethod,
    simultaneousBatches,
    isScheduledCampaign,
    startTime,
  },
} = campaignFormModel;

export const campaignValidationSchema = () => {
  const {
    yieldParameterValid,
    maxSimulataneousBatch,
    campaignRefIdExist,
    minNoOfBatches,
    minProdQty,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useCampaignFacade();
  return [
    object().shape({
      [isRecipeBased.name]: boolean(),
      [recipeName.name]: mixed().when(isRecipeBased.name, {
        is: true,
        then: string().required(`${recipeName.requiredErrorMsg}`),
        otherwise: string().nullable(),
      }),
      [formulaSetId.name]: mixed().when(isRecipeBased.name, {
        is: false,
        then: string().required(`${formulaSetId.requiredErrorMsg}`).nullable(),
        otherwise: string().nullable(),
      }),
      [formulaId.name]: mixed().when(isRecipeBased.name, {
        is: false,
        then: string().required(`${formulaId.requiredErrorMsg}`).nullable(),
        otherwise: string().nullable(),
      }),
      [campaignType.name]: number()
        .required(`${campaignType.requiredErrorMsg}`)
        .test({
          name: 'not_allowed',
          exclusive: false,
          params: {},
          message: `Batch size EU as % not supported, either change EU or select campaign type as "No. of batches" or "Continuous campaign"`,
          // eslint-disable-next-line object-shorthand
          test: function (value) {
            return value !== undefined && value !== null
              ? value !== CampaignType.NoOfBatches &&
                value !== CampaignType.ContinuousCampaign &&
                this.parent[batchSizeEngUnit.name] &&
                this.parent[batchSizeEngUnit.name] === '%'
                ? false
                : true
              : true;
          },
        })
        .nullable(),

      [productionQty.name]: mixed().when(campaignType.name, {
        is: (campaignTypeVal) =>
          campaignTypeVal === CampaignType.ProductionQuantity,
        then: number()
          .required(`${productionQty.requiredErrorMsg}`)
          .test({
            name: 'min',
            exclusive: false,
            params: {},
            message: `Quantity cannot be less than ${minProdQty || '1'}`,
            // eslint-disable-next-line object-shorthand
            test: function (value) {
              // eslint-disable-next-line no-nested-ternary
              return value !== undefined
                ? minProdQty
                  ? value >= minProdQty
                  : value >= 1
                : true;
            },
          })
          .test({
            name: 'decimal',
            exclusive: false,
            params: {},
            message: `Please enter only decimal upto ${AppConstants.MAX_DECIMAL_DIGITS_ALLOWED} digits`,
            // eslint-disable-next-line object-shorthand
            test: function (value) {
              // eslint-disable-next-line no-nested-ternary
              return value !== undefined && value !== null
                ? isDecimal(value.toString(), {
                    decimal_digits: `0,${AppConstants.MAX_DECIMAL_DIGITS_ALLOWED}`,
                  })
                : true;
            },
          })
          // .min(minProdQty, `Quantity cannot be less than ${minProdQty}`)
          .typeError('Please enter only numbers'),
        otherwise: number().typeError('Please enter only numbers').nullable(),
      }),
      [noOfBatches.name]: mixed().when(campaignType.name, {
        is: CampaignType.NoOfBatches,
        then: number()
          .required(`${noOfBatches.requiredErrorMsg}`)
          .test({
            name: 'min',
            exclusive: false,
            params: {},
            message: `No. of batches cannot be less than ${
              minNoOfBatches || '1'
            }`,
            // eslint-disable-next-line object-shorthand
            test: function (value) {
              // eslint-disable-next-line no-nested-ternary
              return value !== undefined
                ? minNoOfBatches
                  ? value >= minNoOfBatches
                  : value >= 1
                : true;
            },
          })
          .test({
            name: 'integer',
            exclusive: false,
            params: {},
            message: `Please enter only integers`,
            // eslint-disable-next-line object-shorthand
            test: function (value) {
              // eslint-disable-next-line no-nested-ternary
              return value !== undefined ? isInteger(value) : true;
            },
          })
          // .min(1, `No. of batches cannot be less than 1`)
          .max(400, `No. of batches cannot be more than 400`)
          .typeError('Please enter only numbers'),
        otherwise: number().typeError('Please enter only numbers').nullable(),
      }),
      [rawMaterial.name]: mixed().when(campaignType.name, {
        is: CampaignType.RawMaterialConsumption,
        then: string().required(`${rawMaterial.requiredErrorMsg}`).nullable(),
        otherwise: string().nullable(),
      }),
      [rawMaterialQty.name]: mixed().when(campaignType.name, {
        is: (campaignTypeVal) =>
          campaignTypeVal === CampaignType.RawMaterialConsumption,
        then: number()
          .required(`${rawMaterialQty.requiredErrorMsg}`)
          .test({
            name: 'decimal',
            exclusive: false,
            params: {},
            message: `Please enter only decimal upto ${AppConstants.MAX_DECIMAL_DIGITS_ALLOWED} digits`,
            // eslint-disable-next-line object-shorthand
            test: function (value) {
              // eslint-disable-next-line no-nested-ternary
              return value !== undefined && value !== null
                ? isDecimal(value.toString(), {
                    decimal_digits: `0,${AppConstants.MAX_DECIMAL_DIGITS_ALLOWED}`,
                  })
                : true;
            },
          })
          .min(minProdQty, `Quantity cannot be less than ${minProdQty}`)
          .typeError('Please enter only numbers'),
        otherwise: number().typeError('Please enter only numbers').nullable(),
      }),
      [campaignRefId.name]: string()
        .required(`${campaignRefId.requiredErrorMsg}`)
        .matches(/^\S*$/, 'Campaign ID should not contains spaces')
        .max(32, 'Campaign ID must be atmost 32 characters')
        .test({
          name: 'duplicate',
          exclusive: false,
          params: {},
          message: campaignRefId.duplicateErrorMsg,
          // eslint-disable-next-line object-shorthand
          test: function (value) {
            return !campaignRefIdExist;
          },
        }),
      [currentBatchSize.name]: number()
        .required(`${currentBatchSize.requiredErrorMsg}`)
        .test({
          name: 'decimal',
          exclusive: false,
          params: {},
          message: `Please enter only decimal upto ${AppConstants.MAX_DECIMAL_DIGITS_ALLOWED} digits`,
          // eslint-disable-next-line object-shorthand
          test: function (value) {
            // eslint-disable-next-line no-nested-ternary
            return value !== undefined && value !== null
              ? isDecimal(value.toString(), {
                  decimal_digits: `0,${AppConstants.MAX_DECIMAL_DIGITS_ALLOWED}`,
                })
              : true;
          },
        })
        .min(1, 'Batch size cannot be negative')
        .typeError('Please enter only numbers')
        .nullable(),
      [isLastBatchScaled.name]: boolean(),
      [minimumBatchSize.name]: mixed().when(isLastBatchScaled.name, {
        is: true,
        then: number()
          .required(`${minimumBatchSize.requiredErrorMsg}`)
          .min(0, 'Minimum batch size cannot be negative')
          // .max(
          //   Number(ref(defaultBatchSize.name)),
          //   'Minimum batch size cannot be more than Batch size'
          // )
          .test({
            name: 'max',
            exclusive: false,
            params: {},
            message: 'Minimum batch size cannot be more than Batch size',
            // eslint-disable-next-line object-shorthand
            test: function (value) {
              // You can access the price field with `this.parent`.
              return value !== undefined
                ? value <= this.parent[currentBatchSize.name]
                : true;
            },
          })
          .test({
            name: 'decimal',
            exclusive: false,
            params: {},
            message: `Please enter only decimal upto ${AppConstants.MAX_DECIMAL_DIGITS_ALLOWED} digits`,
            // eslint-disable-next-line object-shorthand
            test: function (value) {
              // eslint-disable-next-line no-nested-ternary
              return value !== undefined && value !== null
                ? isDecimal(value.toString(), {
                    decimal_digits: `0,${AppConstants.MAX_DECIMAL_DIGITS_ALLOWED}`,
                  })
                : true;
            },
          })
          .typeError('Please enter only numbers'),
        otherwise: number().typeError('Please enter only numbers').nullable(),
      }),
      [referenceBatch.name]: string(),
      [yieldParameter.name]: string().test({
        name: 'valid',
        exclusive: false,
        params: {},
        message: yieldParameter.requiredErrorMsg,
        // eslint-disable-next-line object-shorthand
        test: function (value) {
          // if (value) {
          //   const result = await CampaignService.isYieldParameterValid(value);
          //   return result.data;
          // }
          // return true;
          return yieldParameterValid;
        },
      }),
      [batchIdPattern.name]: string().required(
        `${batchIdPattern.requiredErrorMsg}`
      ),
      [batchStartMethod.name]: number().required(
        `${batchStartMethod.requiredErrorMsg}`
      ),

      [simultaneousBatches.name]: number()
        .required(`${simultaneousBatches.requiredErrorMsg}`)
        .test({
          name: 'integer',
          exclusive: false,
          params: {},
          message: `Please enter only integers`,
          // eslint-disable-next-line object-shorthand
          test: function (value) {
            // eslint-disable-next-line no-nested-ternary
            return value !== undefined ? isInteger(value) : true;
          },
        })
        .min(1, 'Simultaneous batches cannot be less than 1')
        .max(
          maxSimulataneousBatch ?? 10,
          `Simultaneous batches cannot be more than ${maxSimulataneousBatch}`
        )
        .typeError('Please enter only numbers'),
      [isScheduledCampaign.name]: boolean(),
      [startTime.name]: mixed().when(isScheduledCampaign.name, {
        is: true,
        then: date()
          .test({
            name: 'min',
            exclusive: false,
            params: {},
            message: 'Please enter time greater than current time',
            // eslint-disable-next-line object-shorthand
            test: function (value) {
              // eslint-disable-next-line no-nested-ternary
              return value !== undefined
                ? this.parent[state.name] === null
                  ? value > new Date()
                  : true
                : true;
            },
          })
          // .min(new Date(), 'Please enter time greater than current time')
          .required(startTime.requiredErrorMsg)
          .typeError('Please enter valid date and time'),
        otherwise: date()
          .typeError('Please enter valid date and time')
          .nullable(),
      }),
    }),
    // object().shape({
    //   [campaignFormulaSetParameter.name]: array()
    //     .of(
    //       object()
    //         .shape({
    //           [paramType.name]: string().nullable(),
    //           [minValue.name]: string().nullable(),
    //           [maxValue.name]: string().nullable(),
    //           [defaultValue.name]: mixed()
    //             .when(paramType.name, {
    //               is: PARAM_TYPES.STRING,
    //               then: string().required(` `).max(8, ' '),
    //             })
    //             .when(paramType.name, {
    //               is: PARAM_TYPES.INTEGER || PARAM_TYPES.DOUBLE,
    //               then: mixed().when([minValue.name, maxValue.name], {
    //                 is: (min: string, max: string) =>
    //                   min.toLowerCase() !== 'nan' &&
    //                   max.toLowerCase() === 'nan',
    //                 then: string()
    //                   .required(` `)
    //                   .test({
    //                     name: 'min',
    //                     exclusive: false,
    //                     params: {},
    //                     message: ' ',
    //                     // eslint-disable-next-line object-shorthand
    //                     test: function (value) {
    //                       // You can access the price field with `this.parent`.
    //                       return value
    //                         ? value >= this.parent[minValue.name]
    //                         : true;
    //                     },
    //                   }),
    //                 otherwise: string(),
    //               }),
    //               otherwise: string(),
    //             }),
    //         })
    //         .nullable()
    //     )
    //     .nullable(),
    // }),

    // Second Step object
    // So on
  ];
};

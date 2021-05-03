/* eslint-disable import/named */
import { useEffect, useState } from 'react';
import { Grid, Card, InputLabel, Tooltip, Icon } from '@scuf/common';
import {
  CampaignUnitSelection,
  UnitSelectionType,
  unitSelectionTypeVals,
} from 'app/campaign/models/campaign-unit-selection';
import { SelectionUnitsFormModelType } from 'app/campaign/models/campaignFormModel';
import { SelectField } from 'shared/form-fields';
import { FieldArray } from 'formik';
import styled from 'styled-components/macro';
import { IOption } from '@scuf/common/dist/components/Select/ISelectProps';
import { BatchStartMethod } from 'app/campaign/models/campaign-start-method';

const ScrollableGrid = styled(Grid)`
  /* height: auto;
  min-height: 150px;
  overflow-y: auto; */
`;
const { Row, Column } = Grid;
type SelectUnitsFormProps = {
  formModel: SelectionUnitsFormModelType;
  unitSelectionDeferred: boolean;
  batchStartMethod: BatchStartMethod;
  selectionUnits: CampaignUnitSelection[];
  simultaneousBatches: number;
  fieldDisabled: boolean;
  onUnitSelectionChange?: (val: any) => void;
};
export const SelectUnitsForm: React.FC<SelectUnitsFormProps> = (props) => {
  const {
    formModel: { isUnitSelectionDeferred, campaignUnitSelection },
    selectionUnits,
    unitSelectionDeferred,
    fieldDisabled,
    batchStartMethod,
  } = props;
  const [infoDisable, setInfoDisable] = useState('');

  /**
   * set disable tooltip on diff scenario
   */
  useEffect(() => {
    if (batchStartMethod === BatchStartMethod.AutomaticStart) {
      setInfoDisable('Restricted: Batch start method is automatic');
    } else if (props.simultaneousBatches > 1) {
      setInfoDisable('Restricted: Simulataneous batches are more than 1');
    } else {
      setInfoDisable('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchStartMethod]);
  return (
    <Card className="m-0 mr-4 p-2 shadow-none">
      <Card.Content className="border">
        <ScrollableGrid className="my-4 p-0">
          <Row>
            <Column width={12} xsWidth={12}>
              <div className="d-flex">
                <SelectField
                  name={isUnitSelectionDeferred.name}
                  options={unitSelectionTypeVals.map((item) =>
                    !item.value
                      ? {
                          ...item,
                          disabled:
                            props.simultaneousBatches > 1 || fieldDisabled,
                          icon:
                            props.simultaneousBatches > 1 ? (
                              <Tooltip
                                content={infoDisable}
                                element={
                                  <Icon
                                    name="badge-info"
                                    root="common"
                                    className="mr-2"
                                    size="small"
                                  />
                                }
                                // position="top left"
                                event="hover"
                                hoverable
                              />
                            ) : undefined,
                        }
                      : {
                          ...item,
                          disabled:
                            batchStartMethod ===
                            BatchStartMethod.AutomaticStart,
                          icon:
                            batchStartMethod ===
                            BatchStartMethod.AutomaticStart ? (
                              <Tooltip
                                content={infoDisable}
                                element={
                                  <Icon
                                    name="badge-info"
                                    root="common"
                                    className="mr-2"
                                    size="small"
                                  />
                                }
                                // position="top left"
                                event="hover"
                                hoverable
                              />
                            ) : undefined,
                        }
                  )}
                  fluid
                />
                {/* {infoDisable && (
                  <Tooltip
                    content={infoDisable}
                    element={
                      <Icon
                        name="badge-info"
                        root="common"
                        className="mt-2 mr-2 ml-2"
                        size="small"
                      />
                    }
                    // position="top left"
                    event="hover"
                    hoverable
                  />
                )} */}
              </div>
            </Column>
          </Row>
          <FieldArray name={campaignUnitSelection.name}>
            {() => (
              <>
                {!unitSelectionDeferred &&
                  (selectionUnits.length > 0 ? (
                    selectionUnits.map((unit, index) => (
                      <Row key={`${unit.unitName}`} className="pt-2">
                        <Column width={6} xsWidth={6}>
                          <InputLabel label={unit.unitName || ''} />
                        </Column>
                        <Column width={6} xsWidth={6}>
                          <SelectField
                            name={`${campaignUnitSelection.name}.${index}.primaryUnit`}
                            defaultValue={unit.primaryUnit}
                            options={
                              unit.unitSelectionList?.length > 0
                                ? unit.unitSelectionList?.map((item) => ({
                                    text: item,
                                    value: item,
                                  }))
                                : ([
                                    {
                                      text: unit.primaryUnit,
                                      value: unit.primaryUnit,
                                    },
                                  ] as IOption[])
                            }
                            fluid
                            disabled={fieldDisabled}
                            onChange={props.onUnitSelectionChange}
                          />
                        </Column>
                      </Row>
                    ))
                  ) : (
                    <Row className="pt-2 px-2">
                      <Column width={6} xsWidth={6}>
                        <span className="pt-2 px-2">No Units found</span>
                      </Column>
                    </Row>
                  ))}
              </>
            )}
          </FieldArray>
        </ScrollableGrid>
      </Card.Content>
    </Card>
  );
};

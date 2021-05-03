import { AppConstants } from 'utils';
// import advancedBatchImagePath from 'assets/images/advancedBatchLicene.png';
import advancedBatchImagePath from '../../../../assets/images/advancedBatchLicense.png';
import './AdvancedBatchLicenseDetails.scss';

export const AdvancedBatchLiceseDetails: React.FC = () => {
  return (
    <div>
      {/* <h5>{AppConstants.LICENSE_REQUIRED_MESSAGE}</h5> */}
      <img
        src={advancedBatchImagePath}
        alt="AdvancedBatchLicense"
        className="licenseImage"
      />
      <h2 className="licenseText">
        Advanced Batch Production License is required to <br />
        acesss the modules
        <div className="mt-10">
          <h6>- Campaigns improve production and efficiency</h6>
          <h6>
            - Electronic work instructions helps digitize manual
            <br />
            <span className="ml-3">operations and improve compliance</span>
          </h6>
        </div>
      </h2>
    </div>
  );
};

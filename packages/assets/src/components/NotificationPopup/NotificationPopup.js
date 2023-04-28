import React from 'react';
import './NotificationPopup.scss';
import moment from 'moment';
import {truncateString} from '../../helpers/utils';
import ImageDefault from '../../images/Puffer Jacket With Hidden Hood.png';

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Puffer Jacket With Hidden Hood',
  productImage = ImageDefault,
  dataSetting
}) => {
  const {hideTimeAgo, truncateProductName} = dataSetting;
  return (
    <div className="Avava-SP__Wrapper fadeInUp animated">
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href={`${productImage}`} className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            ></div>
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName} in {city}, {country}
              </div>
              <div className={'Avada-SP__Subtitle'}>
                {truncateProductName
                  ? truncateString(productName, 16)
                  : productName}
              </div>
              <div className={'Avada-SP__Footer'}>
                {hideTimeAgo
                  ? ''
                  : `${moment(dataSetting.timestamp).fromNow()}`}
                <span className="uni-blue">
                  <i className="fa fa-check" aria-hidden="true" />
                  by Avada
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;

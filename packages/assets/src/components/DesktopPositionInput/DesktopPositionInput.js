import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './DesktopPositionInput.scss';
import {Labelled, LegacyStack, Text} from '@shopify/polaris';

const DesktopPositionInput = ({label, helpText, data, handleChangeData}) => {
  const [position, setPosition] = useState([]);

  useEffect(() => {
    setPosition(data.position);
  }, [data.position]);

  const defaultOptions = [
    'bottom-right',
    'bottom-left',
    'top-left',
    'top-right'
  ];

  const handlePositionChange = value => {
    setPosition(value);
    handleChangeData('position', value);
  };

  return (
    <Labelled label={label}>
      <LegacyStack>
        {defaultOptions.map((option, key) => (
          <div
            key={key}
            className={`Avada-DesktopPosition ${
              position === option ? 'Avada-DesktopPosition--selected' : ''
            }`}
            onClick={() => handlePositionChange(option)}
          >
            <div
              className={`Avada-DesktopPosition__Input Avada-DesktopPosition__Input--${option}`}
            ></div>
          </div>
        ))}
      </LegacyStack>
      <Text variation="subdued">{helpText}</Text>
    </Labelled>
  );
};

DesktopPositionInput.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  helpText: PropTypes.string
};

export default DesktopPositionInput;

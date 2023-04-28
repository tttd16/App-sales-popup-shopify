import React from 'react';
import {FormLayout} from '@shopify/polaris';
import DesktopPositionInput from '../DesktopPositionInput';
import RangeSliderCustom from '../RangeSliderCustom';
import CheckboxHideTruncate from '../CheckboxHideTruncate';

const DisplayContent = ({data, handleChangeData}) => {
  return (
    <FormLayout>
      <DesktopPositionInput
        label="Desktop Position"
        data={data}
        handleChangeData={handleChangeData}
        helpText="The display position of the pop on your website."
      />
      <CheckboxHideTruncate data={data} handleChangeData={handleChangeData} />
      <RangeSliderCustom data={data} handleChangeData={handleChangeData} />
    </FormLayout>
  );
};

export default DisplayContent;

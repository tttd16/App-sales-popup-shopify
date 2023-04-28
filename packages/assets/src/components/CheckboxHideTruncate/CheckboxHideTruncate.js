import React from 'react';
import {Checkbox, FormLayout} from '@shopify/polaris';
const CheckboxHideTruncate = ({data, handleChangeData}) => {
  return (
    <FormLayout>
      <Checkbox
        label="Hide time ago"
        checked={data.hideTimeAgo}
        onChange={val => handleChangeData('hideTimeAgo', val)}
      />
      <Checkbox
        label="Truncate content text"
        checked={data.truncateProductName}
        helpText={`If your product name is long for one line, it will be truncated to 'Product na...'.`}
        onChange={val => handleChangeData('truncateProductName', val)}
      />
    </FormLayout>
  );
};

export default CheckboxHideTruncate;

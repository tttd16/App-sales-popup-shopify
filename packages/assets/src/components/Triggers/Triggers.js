import {AlphaStack, Select, TextField} from '@shopify/polaris';
import React, {useState} from 'react';

const Triggers = ({data, handleChangeData}) => {
  const [selectedTrigger, setSelectedTrigger] = useState(data.allowShow);

  const handleSelectChange = value => {
    setSelectedTrigger(value);
    handleChangeData('allowShow', value);
  };

  const options = [
    {label: 'All Pages', value: 'all'},
    {label: 'Specific Pages', value: 'specific'}
  ];

  return (
    <AlphaStack gap={'5'}>
      <Select
        options={options}
        onChange={val => handleSelectChange(val)}
        value={selectedTrigger}
      />
      <TextField
        label="Included pages"
        value={data.includedUrls}
        onChange={val => handleChangeData('includedUrls', val)}
        multiline={4}
        autoComplete="off"
        helpText={'Pages URLs NOT to show the pop-up (seperated by news lines)'}
      />
      {selectedTrigger === 'specific' && (
        <TextField
          label="Excluded pages"
          value={data.excludedUrls}
          onChange={val => handleChangeData('excludedUrls', val)}
          multiline={4}
          autoComplete="off"
          helpText={
            'Pages URLs NOT to show the pop-up (seperated by news lines)'
          }
        />
      )}
    </AlphaStack>
  );
};
export default Triggers;

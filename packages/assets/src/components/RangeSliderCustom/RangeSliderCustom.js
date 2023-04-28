import React from 'react';
import {FormLayout, RangeSlider, TextField} from '@shopify/polaris';

function RangeSliderCustom({data, handleChangeData}) {
  return (
    <React.Fragment>
      <FormLayout>
        <FormLayout.Group title={'TIMING'}>
          <RangeSlider
            output
            label={'Display duration'}
            min={0}
            max={100}
            helpText={'How long each pop will display on your page'}
            value={data.displayDuration}
            onChange={val => handleChangeData('displayDuration', val)}
            suffix={
              <p
                style={{
                  minWidth: '24px',
                  maxWidth: '100px',
                  textAlign: 'right'
                }}
              >
                <TextField
                  type={'number'}
                  value={data.displayDuration}
                  onChange={val => handleChangeData('displayDuration', val)}
                />
              </p>
            }
          />
          <RangeSlider
            label={'Time before the first pop'}
            output
            min={0}
            max={100}
            helpText={'The delay time before the first notification'}
            value={data.firstDelay}
            onChange={val => handleChangeData('firstDelay', val)}
            suffix={
              <p
                style={{
                  minWidth: '24px',
                  maxWidth: '100px',
                  textAlign: 'right'
                }}
              >
                <TextField
                  type={'number'}
                  value={data.firstDelay}
                  onChange={val => handleChangeData('firstDelay', val)}
                />
              </p>
            }
          />
        </FormLayout.Group>
      </FormLayout>
      <FormLayout>
        <FormLayout.Group>
          <RangeSlider
            output
            label={'Gap time between two pops'}
            min={0}
            max={100}
            helpText={'The time interval between two popup notifications'}
            value={data.popsInterval}
            onChange={val => handleChangeData('popsInterval', val)}
            suffix={
              <p
                style={{
                  minWidth: '24px',
                  maxWidth: '100px',
                  textAlign: 'right'
                }}
              >
                <TextField
                  type={'number'}
                  onChange={val => handleChangeData('popsInterval', val)}
                  value={data.popsInterval}
                />
              </p>
            }
          />
          <RangeSlider
            label={'Maximum of popups'}
            output
            min={0}
            max={80}
            helpText={
              'The maximum number of popups are allowed to show after page loading. Maximum number is 80'
            }
            value={data.maxPopsDisplay}
            onChange={val => handleChangeData('maxPopsDisplay', val)}
            suffix={
              <p
                style={{
                  minWidth: '24px',
                  maxWidth: '100px',
                  textAlign: 'right'
                }}
              >
                <TextField
                  type={'number'}
                  value={data.maxPopsDisplay}
                  onChange={val => handleChangeData('maxPopsDisplay', val)}
                />
              </p>
            }
          />
        </FormLayout.Group>
      </FormLayout>
    </React.Fragment>
  );
}

export default RangeSliderCustom;

import React, {useEffect, useState} from 'react';
import {
  LegacyCard,
  LegacyStack,
  Page,
  Pagination,
  ResourceItem,
  ResourceList,
  Text
} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup';
import {api} from '../../helpers';
import moment from 'moment';

export default function Notifications() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
  const [loading, setLoading] = useState(false);
  const [dataSetting, setDataSetting] = useState([]);
  const callApi = async () => {
    setLoading(true);
    const response = await api('/notifications');
    setDataSetting(response);
    setLoading(false);
  };

  useEffect(() => {
    callApi();
  }, []);

  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };

  const promotedBulkActions = [
    {
      content: 'Edit customers',
      onAction: () => console.log('Todo: implement bulk edit')
    }
  ];

  const bulkActions = [
    {
      content: 'Add tags',
      onAction: () => console.log('Todo: implement bulk add tags')
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags')
    },
    {
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete')
    }
  ];

  function renderItem(dataSetting) {
    const {
      id,
      firstName,
      city,
      country,
      productImage,
      productName,
      timestamp
    } = dataSetting;

    return (
      <ResourceItem id={id}>
        <LegacyStack>
          <LegacyStack.Item fill>
            <NotificationPopup
              firstName={firstName}
              country={country}
              city={city}
              productName={productName}
              productImage={productImage}
              dataSetting={dataSetting}
            />
          </LegacyStack.Item>
          <LegacyStack.Item>
            <Text variant="bodyMd" fontWeight="semibold" as="p">
              From {moment(timestamp).format('MMM DD')},
            </Text>
            <Text alignment="end" variant="bodyMd" fontWeight="semibold" as="p">
              {moment(timestamp).year()}
            </Text>
          </LegacyStack.Item>
        </LegacyStack>
      </ResourceItem>
    );
  }

  return (
    <Page
      title="Notifications"
      subtitle="List of sales notifcation from Shopify"
      fullWidth
    >
      <LegacyCard>
        <ResourceList
          loading={loading}
          resourceName={resourceName}
          items={dataSetting}
          renderItem={renderItem}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          promotedBulkActions={promotedBulkActions}
          bulkActions={bulkActions}
          sortOptions={[
            {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
            {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'}
          ]}
          onSortChange={selected => {
            setSortValue(selected);
            console.log(`Sort option changed to ${selected}.`);
          }}
        />
      </LegacyCard>
      {dataSetting.length > 1 ? (
        <div style={{marginLeft: '40%', marginTop: 30, marginBottom: 30}}>
          <Pagination
            hasPrevious
            onPrevious={() => {
              console.log('previous');
            }}
            hasNext
            onNext={() => {
              console.log('next');
            }}
          />
        </div>
      ) : (
        ''
      )}
    </Page>
  );
}

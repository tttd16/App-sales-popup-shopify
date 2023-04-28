import React, {useState, useCallback, useEffect} from 'react';
import {Page, Layout, LegacyCard, Tabs} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup';
import Triggers from '../../components/Triggers';
import DisplayContent from '../../components/DisplayContent';
import useFetchApi from '../../hooks/api/useFetchApi';
import defaultSettings from '../../../../functions/src/const/settings/defaultSettings';
import SkeletonPageSettingLoading from '../../components/SkeletonPageSettingLoading';

export default function Settings() {
  const [selected, setSelected] = useState(0);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  const {
    loading,
    setLoading,
    data,
    setData,
    handleChangeData,
    updateData
  } = useFetchApi('/settings', defaultSettings);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      setData(data);
      setLoading(false);
    }
    setTimeout(() => setLoadingSkeleton(false), 1000);
  }, [loading]);

  const handleTabChange = useCallback(
    selectedTabIndex => setSelected(selectedTabIndex),
    []
  );

  const handleSubmit = () => {
    updateData(data);
  };

  const tabs = [
    {
      id: 'display-tab',
      content: 'Display',
      title: 'APPEARANCE',
      design: <DisplayContent data={data} handleChangeData={handleChangeData} />
    },
    {
      id: 'trigger-tab',
      content: 'Triggers',
      title: 'PAGES RESTRICTION',
      design: <Triggers data={data} handleChangeData={handleChangeData} />
    }
  ];

  return (
    <React.Fragment>
      {loadingSkeleton ? (
        <SkeletonPageSettingLoading />
      ) : (
        <Page
          fullWidth
          title="Settings"
          subtitle="Decide how your notifications will display"
          primaryAction={{
            content: 'Save',
            onAction: handleSubmit,
            loading
          }}
        >
          <Layout>
            <Layout.Section secondary>
              <NotificationPopup dataSetting={data} />
            </Layout.Section>
            <Layout.Section>
              <LegacyCard>
                <Tabs
                  tabs={tabs}
                  selected={selected}
                  onSelect={handleTabChange}
                >
                  <LegacyCard.Section title={tabs[selected].title}>
                    {tabs[selected].design}
                  </LegacyCard.Section>
                </Tabs>
              </LegacyCard>
            </Layout.Section>
          </Layout>
        </Page>
      )}
    </React.Fragment>
  );
}

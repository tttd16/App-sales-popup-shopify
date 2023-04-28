import React, {useEffect, useState} from 'react';
import {
  LegacyCard,
  Button,
  LegacyStack,
  Page,
  Text,
  ResourceList,
  ResourceItem
} from '@shopify/polaris';
import SekeletonPageHomeLoading from '../../components/SekeletonPageHomeLoading';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
  const [loadingSekeleton, setLoadingSekeleton] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadingSekeleton(false);
    }, 1000);
  }, []);
  return (
    <React.Fragment>
      {loadingSekeleton ? (
        <SekeletonPageHomeLoading />
      ) : (
        <Page title="Home" fullWidth>
          <LegacyCard>
            <ResourceList
              items={[
                {
                  id: '1',
                  url: '#',
                  title: 'App status is',
                  status: 'disabled'
                }
              ]}
              renderItem={item => {
                const {id, title, status} = item;
                return (
                  <ResourceItem id={id}>
                    <LegacyStack>
                      <LegacyStack.Item fill>
                        <Text variant="bodyMd" fontWeight="light" as="h3">
                          {title} <strong> {status}</strong>
                        </Text>
                      </LegacyStack.Item>
                      <LegacyStack.Item>
                        <LegacyStack>
                          <LegacyStack.Item fill />
                          <LegacyStack.Item>
                            <Button primary>Enable</Button>
                          </LegacyStack.Item>
                        </LegacyStack>
                      </LegacyStack.Item>
                    </LegacyStack>
                  </ResourceItem>
                );
              }}
            />
          </LegacyCard>
        </Page>
      )}
    </React.Fragment>
  );
}

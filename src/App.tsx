import React, {useEffect} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import messaging from '@react-native-firebase/messaging';
import {
  checkNotifications,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';
import Clipboard from '@react-native-clipboard/clipboard';
import ThemeContent from './theme';
import RootNavigation from './navigation/rootNavigation';
import {ConstantProvider} from './hooks/use-constant';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './utility/store';

// Create a client
const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    checkNotifications().then(async ({status}) => {
      switch (status) {
        case RESULTS.UNAVAILABLE:
          return console.log(
            'This feature is not available (on this device / in this context)',
          );
        case RESULTS.DENIED:
          requestPermission();
          return console.log(
            'The permission has not been requested / is denied but requestable',
          );
        case RESULTS.BLOCKED:
          requestPermission();
          return console.log('The permission is denied and not requestable');
        case RESULTS.GRANTED:
          const token = await messaging().getToken();
          Clipboard.setString(token);
          return console.log('The permission is granted', token);
        case RESULTS.LIMITED:
          return console.log('The permission is granted but with limitations');
      }
    });
  }, []);

  const requestPermission = async () => {
    requestNotifications(['alert', 'sound']).then(async ({status}) => {
      switch (status) {
        case RESULTS.GRANTED:
          await messaging().registerDeviceForRemoteMessages();
          const token = await messaging().getToken();
          Clipboard.setString(token);
          return console.log('The permission is granted', token);
      }
    });
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ConstantProvider>
            <ThemeContent>
              <RootNavigation />
            </ThemeContent>
          </ConstantProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

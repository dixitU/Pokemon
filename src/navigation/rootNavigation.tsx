import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import App from './bottomTabNavigator';
import {AppNavigatorRouteParamList} from './navigator';
import Login from '../screens/login';
import Detail from '../screens/detail';
import {useTheme} from '../theme';
import {ThemeType} from '../theme/type';
import {useAppSelector} from '../utility/store';
import {Linking} from 'react-native';

const AppStackNavigator = createStackNavigator<AppNavigatorRouteParamList>();

const NAVIGATION_IDS = ['home', 'team', 'settings', 'detail'];

function RootNavigation() {
  const theme: ThemeType = useTheme();
  const {idToken} = useAppSelector(state => ({
    idToken: state.auth.idToken,
  }));

  function buildDeepLinkFromNotificationData(data: {
    navigationId: any;
    detailId: any;
  }): string | null {
    const navigationId = data?.navigationId;
    const detailId = data?.detailId;
    if (!NAVIGATION_IDS.includes(navigationId)) {
      console.warn('Unverified navigationId', navigationId);
      return null;
    }
    if (navigationId === 'home' && idToken.trim() !== '') {
      return 'pokemon://app/home';
    }
    if (navigationId === 'team' && idToken.trim() !== '') {
      return 'pokemon://app/team';
    }
    if (navigationId === 'settings' && idToken.trim() !== '') {
      return 'pokemon://app/settings';
    }
    if (navigationId === 'detail' && idToken.trim() !== '') {
      return `pokemon://detail/${detailId}`;
    }
    console.warn('Missing detailId');
    return null;
  }

  const linking: any = {
    prefixes: ['pokemon://'],
    config: {
      initialRouteName: idToken.trim() !== '' ? 'App' : 'Login',
      screens: {
        Login: 'login',
        Detail: 'detail/:id',
        App: {
          path: 'app', // The path for the main app screen
          screens: {
            Home: 'home', // Maps to the Home tab
            Teams: 'team', // Maps to the Search tab
            SettingsBar: 'settings', // Maps to the Profile tab
          },
        },
      },
    },
    async getInitialURL() {
      const url = await Linking.getInitialURL();
      if (typeof url === 'string') {
        return url;
      }
      //getInitialNotification: When the application is opened from a quit state.
      const message: any = await messaging().getInitialNotification();
      const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
      if (typeof deeplinkURL === 'string') {
        return deeplinkURL;
      }
    },
    subscribe(listener: (url: string) => void) {
      const onReceiveURL = ({url}: {url: string}) => listener(url);

      // Listen to incoming links from deep linking
      const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

      //onNotificationOpenedApp: When the application is running, but in the background.
      const unsubscribe = messaging().onNotificationOpenedApp(
        (remoteMessage: any) => {
          const url = buildDeepLinkFromNotificationData(remoteMessage.data);
          if (typeof url === 'string') {
            listener(url);
          }
        },
      );

      return () => {
        linkingSubscription.remove();
        unsubscribe();
      };
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <AppStackNavigator.Navigator
        initialRouteName={idToken.trim() !== '' ? 'App' : 'Login'}
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTintColor: theme.bgReverse,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <AppStackNavigator.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <AppStackNavigator.Screen
          name="App"
          component={App}
          options={{headerShown: false}}
        />
        <AppStackNavigator.Screen
          name="Detail"
          component={Detail}
          options={{headerShown: false}}
        />
      </AppStackNavigator.Navigator>
    </NavigationContainer>
  );
}
export default RootNavigation;

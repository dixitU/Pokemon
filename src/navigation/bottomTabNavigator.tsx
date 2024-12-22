import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Size} from '../utility/sizes';
import {Assets} from '../images';
import {Routes} from './routes';
import Home from '../screens/home';
import Teams from '../screens/teams';
import Settings from '../screens/settings';
import {useTheme} from '../theme';
import { ThemeType } from '../theme/type';

const HomeStack = createStackNavigator();
const TeamsStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const FinalStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name={Routes.Home} component={Home} />
    </HomeStack.Navigator>
  );
}

function TeamsStackScreen() {
  return (
    <TeamsStack.Navigator screenOptions={{headerShown: false}}>
      <TeamsStack.Screen name={Routes.Teams} component={Teams} />
    </TeamsStack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator screenOptions={{headerShown: false}}>
      <SettingsStack.Screen name={Routes.Settings} component={Settings} />
    </SettingsStack.Navigator>
  );
}

function MyTabBar({state, descriptors, navigation}: any) {
  const theme: ThemeType = useTheme();
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View
      style={{
        backgroundColor: theme.backgroundColor,
      }}>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: Size.FindSize(75),
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopWidth: 1,
          borderColor: theme.inactiveButtonColor,
          paddingTop: Size.FindSize(5),
        }}>
        {state.routes.map((route: any, index: any) => {
          const {options} = descriptors[route.key];

          const isFocused = state.index === index;
          const tintColor = isFocused ? theme.activeButtonColor : theme.inactiveButtonColor;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={String(index)}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{flex: 1, alignItems: 'center'}}>
              {options.tabBarIcon({
                focused: isFocused,
                color: tintColor,
                navigation: navigation,
              })}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const TabBarIcon = ({title, icon, focused, color}: any) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{alignItems: 'center'}}>
      <Image
          resizeMode="contain"
          style={{
            tintColor: color,
            height: Size.FindSize(24),
            width: Size.FindSize(24),
            marginBottom: Size._10,
          }}
          source={icon}
        />
      <Text style={{fontSize: 12, color: color}}>{title}</Text>
    </View>
  );
};

export default function App() {
  return (
    <Tab.Navigator
      initialRouteName="HomeBar"
      screenOptions={{headerShown: false}}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="HomeBar"
        component={HomeStackScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon
              focused={focused}
              color={color}
              title={Routes.Home}
              icon={Assets.home}
            />
          ),
        }}
      />

      <Tab.Screen
        name="TeamsBar"
        component={TeamsStackScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon
              focused={focused}
              color={color}
              title={Routes.Teams}
              icon={Assets.team}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsBar"
        component={SettingsStackScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon
              focused={focused}
              color={color}
              title={Routes.Settings}
              icon={Assets.setting}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// export default function FinalStackScreen() {
//   return (
//     <FinalStack.Navigator screenOptions={{headerShown: false}}>
//       <FinalStack.Screen name="Root" component={App} />
//     </FinalStack.Navigator>
//   );
// }

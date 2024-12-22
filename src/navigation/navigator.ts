import {NavigationProp, ParamListBase} from '@react-navigation/core';
import {StackScreenProps} from '@react-navigation/stack';

export type SubNavigator<T extends ParamListBase> = {
  [K in keyof T]: {screen: K; params?: T[K]};
}[keyof T];

export type AppNavigatorRouteParamList = {
  Login: undefined;
  App: undefined;
  Detail: {
    id: string;
  }
};

export type AppNavigatorProps = NavigationProp<AppNavigatorRouteParamList>;

// export type LoginNavigatorProps = NavigationProp<LoginNavigatorRouteParamList>;

// export type LoginNavigatorScreenRoute<
//   ScreenName extends keyof LoginNavigatorRouteParamList,
// > = StackScreenProps<LoginNavigatorRouteParamList, ScreenName>['route'];

export type AppNavigatorScreenRoute<
  ScreenName extends keyof AppNavigatorRouteParamList,
> = StackScreenProps<AppNavigatorRouteParamList, ScreenName>['route'];

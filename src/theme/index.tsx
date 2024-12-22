import React, {createContext} from 'react';
import {
  ImageStyle,
  StatusBar,
  TextStyle,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import {ThemeType} from './type';
import {useAppSelector} from '../utility/store';
export type Theme = {[key: string]: ViewStyle | TextStyle | ImageStyle};

const ThemeContext = createContext<any>({});

const mainLightColor = 'rgba(154, 154, 154, 1)';
const subLightColor = 'rgba(154, 154, 154, 0.5)';

const mainDarkColor = 'rgba(255, 255, 255, 1)';
const subDarkColor = 'rgba(255, 255, 255, 0.5)';

const lightTheme: ThemeType = {
  backgroundColor: '#fff',
  bgReverse: '#000',
  buttonBG: '#4600FF',
  activeButtonColor: mainLightColor,
  inactiveButtonColor: subLightColor,
  largeRegularText: {
    fontSize: 30,
    color: mainLightColor,
  },
  largeBoldText: {
    fontSize: 30,
    color: mainLightColor,
    fontWeight: 'bold',
  },
  largeMediumText: {
    fontSize: 30,
    color: mainLightColor,
    fontWeight: '600',
  },
  titleRegularText: {
    fontSize: 18,
    color: mainLightColor,
  },
  titleBoldText: {
    fontSize: 18,
    color: mainLightColor,
    fontWeight: 'bold',
  },
  titleMediumText: {
    fontSize: 18,
    color: mainLightColor,
    fontWeight: '600',
  },
  normalRegularText: {
    fontSize: 14,
    color: mainLightColor,
  },
  normalRegularLightText: {
    fontSize: 14,
    color: subLightColor,
  },
  normalBoldText: {
    fontSize: 14,
    color: mainLightColor,
    fontWeight: 'bold',
  },
  normalMediumText: {
    fontSize: 14,
    color: mainLightColor,
    fontWeight: '600',
  },
  smallButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  largeButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
};

const darkTheme: ThemeType = {
  backgroundColor: '#000',
  bgReverse: '#fff',
  buttonBG: '#4600FF',
  activeButtonColor: mainDarkColor,
  inactiveButtonColor: subDarkColor,
  largeRegularText: {
    fontSize: 30,
    color: mainDarkColor,
  },
  largeBoldText: {
    fontSize: 30,
    color: mainDarkColor,
    fontWeight: 'bold',
  },
  largeMediumText: {
    fontSize: 30,
    color: mainDarkColor,
    fontWeight: '600',
  },
  titleRegularText: {
    fontSize: 18,
    color: mainDarkColor,
  },
  titleBoldText: {
    fontSize: 18,
    color: mainDarkColor,
    fontWeight: 'bold',
  },
  titleMediumText: {
    fontSize: 18,
    color: mainDarkColor,
    fontWeight: '600',
  },
  normalRegularText: {
    fontSize: 14,
    color: mainDarkColor,
  },
  normalRegularLightText: {
    fontSize: 14,
    color: subDarkColor,
  },
  normalBoldText: {
    fontSize: 14,
    color: mainDarkColor,
    fontWeight: 'bold',
  },
  normalMediumText: {
    fontSize: 14,
    color: mainDarkColor,
    fontWeight: '600',
  },
  smallButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  largeButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
};
export default function ThemeContent({children}: {children: any}) {
  const colorScheme = useColorScheme();
  const {theme} = useAppSelector(state => ({
    theme: state.setting.theme,
  }));
  return (
    <ThemeContext.Provider
      value={
        theme === 'dark'
          ? darkTheme
          : theme === 'light'
          ? lightTheme
          : colorScheme === 'dark'
          ? darkTheme
          : lightTheme
      }>
      <StatusBar
        barStyle={
          theme === 'dark'
            ? 'light-content'
            : theme === 'light'
            ? 'dark-content'
            : colorScheme === 'dark'
            ? 'light-content'
            : 'dark-content'
        }
        backgroundColor={
          theme === 'dark'
            ? darkTheme.backgroundColor
            : theme === 'light'
            ? lightTheme.backgroundColor
            : colorScheme === 'dark'
            ? darkTheme.backgroundColor
            : lightTheme.backgroundColor
        }
      />
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => React.useContext(ThemeContext);

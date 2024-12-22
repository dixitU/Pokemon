import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '../../theme';
import {ThemeType} from '../../theme/type';
import {useAppDispatch, useAppSelector} from '../../utility/store';
import {Size} from '../../utility/sizes';
import {Assets} from '../../images';
import {setTheme} from '../../reducers/settingSlice';
import Button from '../../components/button';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {clearAuth} from '../../reducers/authSlice';
import {CommonActions, useNavigation} from '@react-navigation/native';

const WIDTH = Dimensions.get('window').width;

const themeOption = [
  {
    label: 'System Default',
    value: 'default',
  },
  {
    label: 'Light',
    value: 'light',
  },
  {
    label: 'Dark',
    value: 'dark',
  },
];

function Settings() {
  const navigation = useNavigation();
  const theme: ThemeType = useTheme();
  const style = styles(theme);
  const dispatch = useAppDispatch();
  const {user, theme: themeSetting} = useAppSelector(state => ({
    user: state.auth.user,
    theme: state.setting.theme,
  }));
  const [themeOpen, setThemeOpen] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '912396129265-90eq61l4bq1hbt2lpp0ka5vsbp8atoga.apps.googleusercontent.com',
      iosClientId:
        '912396129265-alealfun1okkp4g8rcegk6amv1dpg59i.apps.googleusercontent.com',
      offlineAccess: true,
      scopes: ['profile', 'email'],
    });
  }, []);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      dispatch(clearAuth());
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const Card = ({item, index}: any) => {
    return (
      <TouchableOpacity
        style={style.rowContainer}
        onPress={() => dispatch(setTheme(item.value))}
        key={(index + 1).toString()}>
        <Text style={theme.normalRegularText}>{item.label}</Text>
        <View style={style.circleContainer}>
          {themeSetting === item.value ? (
            <View style={style.circle} />
          ) : (
            <View />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item, index}: any) => {
    return <Card index={index} item={item} />;
  };
  return (
    <SafeAreaView style={style.mainContainer}>
      <ScrollView contentContainerStyle={style.container}>
        <Text style={theme.titleBoldText}>Settings</Text>
        <Image source={{uri: user.photo}} style={[style.avatar]} />
        <View style={style.rowContainer}>
          <Text style={theme.normalMediumText}>Name</Text>
          <Text style={theme.normalRegularLightText}>{user.name}</Text>
        </View>
        <View style={style.rowContainer}>
          <Text style={theme.normalMediumText}>Email</Text>
          <Text style={theme.normalRegularLightText}>{user.email}</Text>
        </View>
        <TouchableOpacity
          style={style.rowContainer}
          onPress={() => setThemeOpen(!themeOpen)}>
          <Text style={theme.normalMediumText}>Theme</Text>
          <Image
            source={Assets.back}
            style={[
              style.dropdown,
              {transform: [{rotate: themeOpen ? '90deg' : '270deg'}]},
            ]}
          />
        </TouchableOpacity>
        {themeOpen && (
          <FlatList
            data={themeOption}
            renderItem={renderItem}
            scrollEnabled={false}
            keyExtractor={(item: any) => item.value.toString()}
            contentContainerStyle={style.flatlistContainer}
          />
        )}
      </ScrollView>
      <Button
        title="Logout"
        onPress={signOut}
        buttonContainerStyle={style.buttonContainerStyle}
      />
    </SafeAreaView>
  );
}

const styles = (theme: ThemeType) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    container: {
      flex: 1,
      // justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: Size._15,
      paddingBottom: Size._40,
      paddingTop: Size._20,
    },
    avatar: {
      width: Size.FindSize(100),
      height: Size.FindSize(100),
      resizeMode: 'cover',
      borderRadius: Size.FindSize(50),
      marginVertical: Size._30,
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: Size._30,
    },
    dropdown: {
      width: Size._15,
      height: Size._15,
      resizeMode: 'contain',
      tintColor: theme.inactiveButtonColor,
    },
    flatlistContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: Size._15,
    },
    circle: {
      width: Size._14,
      height: Size._14,
      resizeMode: 'contain',
      backgroundColor: theme.bgReverse,
      borderRadius: Size.FindSize(7),
    },
    circleContainer: {
      width: Size._20,
      height: Size._20,
      resizeMode: 'contain',
      borderWidth: 1,
      borderColor: theme.bgReverse,
      borderRadius: Size._10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainerStyle: {
      position: 'absolute',
      bottom: Size._10,
      marginHorizontal: Size._15,
      width: WIDTH - Size._15 * 2,
    },
  });

export default Settings;

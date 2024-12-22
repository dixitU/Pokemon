import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useTheme} from '../../theme';
import {ThemeType} from '../../theme/type';
import {CommonActions, useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {Size} from '../../utility/sizes';
import {useAppDispatch, useAppSelector} from '../../utility/store';
import {setAuth} from '../../reducers/authSlice';

function Login() {
  const navigation = useNavigation();
  const theme: ThemeType = useTheme();
  const style = styles(theme);
  const dispatch = useAppDispatch();

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

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo: any = await GoogleSignin.signIn();
      // await GoogleSignin.revokeAccess();
      console.log(userInfo);
      dispatch(setAuth(userInfo.data));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'App'}],
        }),
      );
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={style.mainContainer}>
      <View style={style.container}>
        <LottieView
          source={require('../../animations/login.json')}
          style={style.lottie}
          autoPlay
          loop
        />
        <GoogleSigninButton
          style={{width: '100%', height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        />
      </View>
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
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: Size._15,
    },
    lottie: {
      width: Size.FindSize(300),
      height: Size.FindSize(300),
      resizeMode: 'center',
      marginBottom: Size._50,
    },
  });

export default Login;

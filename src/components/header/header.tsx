import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../../theme';
import {ThemeType} from '../../theme/type';
import {Size} from '../../utility/sizes';
import {Assets} from '../../images';
import {useConstantContext} from '../../hooks/use-constant';
import {useAppSelector} from '../../utility/store';

type Header = {};

function Header({}: Header) {
  const theme: ThemeType = useTheme();
  const style = styles(theme);
  const {setSearchText} = useConstantContext();
  const {user} = useAppSelector(state => ({
    user: state.auth.user,
  }));
  return (
    <View style={style.container}>
      <View style={[style.buttonContainer]}>
        <Image
          source={{uri: user.photo}}
          style={[style.backImage]}
        />
      </View>
      <TextInput
        placeholder="Search"
        placeholderTextColor={theme.inactiveButtonColor}
        style={style.input}
        onChangeText={setSearchText}
      />
    </View>
  );
}

const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: Size._50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: Size._15,
      marginVertical: Size._10,
    },
    buttonContainer: {
      width: Size._40,
      height: Size._40,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.bgReverse,
      borderRadius: Size._20,
    },
    input: {
      flexGrow: 1,
      borderWidth: 1,
      borderColor: theme.inactiveButtonColor,
      marginLeft: Size._15,
      paddingHorizontal: Size._15,
      paddingVertical: Platform.OS === 'ios' ? Size._15 : 0,
      borderRadius: Size._10,
    },
    backImage: {
      width: Size._40,
      height: Size._40,
      resizeMode: 'contain',
      borderRadius: Size._20,
    },
  });

export default Header;

import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../../theme';
import {ThemeType} from '../../theme/type';
import {Size} from '../../utility/sizes';

type Button = {
  title: string;
  buttonContainerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  onPress: () => void;
  disable?: boolean;
  loading?: boolean;
};

function Button({
  title,
  buttonContainerStyle,
  titleStyle,
  onPress,
  disable,
  loading = false,
}: Button) {
  const theme: ThemeType = useTheme();
  const style = styles(theme);
  return (
    <TouchableOpacity
      style={[
        style.buttonContainer,
        buttonContainerStyle,
        {opacity: disable ? 0.5 : 1},
      ]}
      disabled={disable || loading}
      onPress={onPress}>
      {!loading ? (
        <Text style={[theme.smallButtonText, style.titleText, titleStyle]}>
          {title}
        </Text>
      ) : (
        <ActivityIndicator size={Size._20} color={theme.bgReverse} />
      )}
    </TouchableOpacity>
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
    },
    buttonContainer: {
      width: '100%',
      backgroundColor: theme.buttonBG,
      padding: Size._10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: Size.FindSize(5),
    },
    titleText: {
      textAlign: 'center',
    },
  });

export default Button;

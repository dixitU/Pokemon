import React from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useTheme} from '../../theme';
import {ThemeType} from '../../theme/type';
import Button from '../../components/button';
import {Routes} from '../../navigation/routes';
import {useNavigation} from '@react-navigation/native';
import {AppNavigatorProps} from '../../navigation/navigator';
import {Size} from '../../utility/sizes';
import {useAppDispatch, useAppSelector} from '../../utility/store';
import {removeFromTeam} from '../../reducers/teamSlice';
import Header from '../../components/header';

function Teams() {
  const navigation = useNavigation<AppNavigatorProps>();
  const theme: ThemeType = useTheme();
  const style = styles(theme);
  const dispatch = useAppDispatch();
  const {pokemons, urls} = useAppSelector(state => ({
    pokemons: state.team.pokemons,
    urls: state.team.urls,
  }));

  // eslint-disable-next-line react/no-unstable-nested-components
  const Card = ({item, index}: any) => {
    const split = item.url.split('/');
    console.log('split', split);
    return (
      <Pressable
        style={style.cardContainer}
        key={index}
        onPress={() =>
          navigation.navigate(Routes.Detail, {id: `${split[split.length - 2]}`})
        }>
        <Text style={[theme.titleBoldText, {color: '#fff', maxWidth: '50%'}]}>
          {item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}
        </Text>
        <Button
          title="Remove"
          buttonContainerStyle={style.buttonStyle}
          onPress={() => dispatch(removeFromTeam(item))}
        />
      </Pressable>
    );
  };

  const renderItem = ({item, index}: any) => {
    return <Card index={index} item={item} />;
  };

  const renderEmpty = () => {
    return (
      <SafeAreaView style={style.mainContainer}>
        <View style={style.container}>
          <Text style={[theme.titleBoldText]}>No Data Found</Text>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={style.mainContainer}>
      <Header />
      <View style={style.container}>
        <FlatList
          data={pokemons}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.url.toString()}
          contentContainerStyle={style.flatlistContainer}
          ListEmptyComponent={renderEmpty}
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
    },
    flatlistContainer: {
      flexGrow: 1,
      paddingHorizontal: Size._15,
      paddingBottom: Size._40,
    },
    cardContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.inactiveButtonColor,
      padding: Size._15,
      borderRadius: Size._10,
      marginTop: Size._10,
    },
    buttonStyle: {
      width: 150,
    },
  });

export default Teams;

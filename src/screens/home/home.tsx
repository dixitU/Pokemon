import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '../../theme';
import {ThemeType} from '../../theme/type';
import {useMutation} from '@tanstack/react-query';
import {getList} from '../../apis/pokemon';
import Button from '../../components/button';
import {Size} from '../../utility/sizes';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../navigation/routes';
import {AppNavigatorProps} from '../../navigation/navigator';
import Header from '../../components/header';
import {useConstantContext} from '../../hooks/use-constant';
import {useAppDispatch, useAppSelector} from '../../utility/store';
import {addToTeam} from '../../reducers/teamSlice';

const limit = 20;

function Home() {
  const navigation = useNavigation<AppNavigatorProps>();
  const theme: ThemeType = useTheme();
  const style = styles(theme);
  const dispatch = useAppDispatch();
  const {pokemons, urls} = useAppSelector(state => ({
    pokemons: state.team.pokemons,
    urls: state.team.urls,
  }));
  const {searchText} = useConstantContext();
  const [offset, setOffSet] = useState(0);
  const [list, setList] = useState<any>([]);
  const {mutate, isError, isPending} = useMutation({
    mutationFn: getList,
    onSuccess: (data: any) => {
      setList([...list, ...data?.results]);
    },
  });

  useEffect(() => {
    mutate({
      limit,
      offset: offset,
    });
  }, []);

  // eslint-disable-next-line react/no-unstable-nested-components
  const Card = ({item, index}: any) => {
    const [loading, setLoading] = useState(false);
    return (
      <Pressable
        style={style.cardContainer}
        key={index}
        onPress={() =>
          navigation.navigate(Routes.Detail, {id: `${index + 1}`})
        }>
        <Text style={[theme.titleBoldText, {color: '#fff', maxWidth: '50%'}]}>
          {item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}
        </Text>
        <Button
          title="Catch Pokemon"
          loading={loading}
          disable={urls.includes(item.url)}
          buttonContainerStyle={style.buttonStyle}
          onPress={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 2000);
            dispatch(addToTeam(item));
          }}
        />
      </Pressable>
    );
  };

  const renderItem = ({item, index}: any) => {
    return <Card index={index} item={item} />;
  };

  const renderFooter = () => {
    if (!isPending) return null;
    return (
      list.length > 0 && (
        <View style={style.loader}>
          <ActivityIndicator color={theme.buttonBG} size={Size._40} />
        </View>
      )
    );
  };

  const renderEmpty = () => {
    return isPending ? (
      <SafeAreaView style={style.mainContainer}>
        <View style={style.container}>
          <ActivityIndicator color={theme.buttonBG} size={Size._40} />
        </View>
      </SafeAreaView>
    ) : (
      <SafeAreaView style={style.mainContainer}>
        <View style={style.container}>
          <Text style={[theme.titleBoldText]}>No Data Found</Text>
        </View>
      </SafeAreaView>
    );
  };

  if (isError) {
    return (
      <SafeAreaView style={style.mainContainer}>
        <View style={style.container}>
          <Text style={[theme.titleBoldText]}>Server Down!!</Text>
          <Text style={[theme.normalRegularText]}>
            Kindly request to try again later
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={style.mainContainer}>
      <Header />
      <View style={style.container}>
        {list.length > 0 ? (
          <FlatList
            data={list.filter((e: any) =>
              e.name.toLowerCase().includes(searchText.toLowerCase()),
            )}
            renderItem={renderItem}
            keyExtractor={(item: any, index: any) => item.url.toString()}
            contentContainerStyle={style.flatlistContainer}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              mutate({
                limit,
                offset: offset + limit,
              });
              setOffSet(offset + limit);
            }}
            ListFooterComponent={renderFooter}
          />
        ) : (
          renderEmpty()
        )}
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
    loader: {
      width: '100%',
      height: Size._50,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Home;

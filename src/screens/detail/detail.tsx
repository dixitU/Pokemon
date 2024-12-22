import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useTheme} from '../../theme';
import {ThemeType} from '../../theme/type';
import {useMutation} from '@tanstack/react-query';
import {getDetail} from '../../apis/pokemon';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  AppNavigatorProps,
  AppNavigatorScreenRoute,
} from '../../navigation/navigator';
import {Size} from '../../utility/sizes';

const WIDTH = Dimensions.get('window').width;

function Detail({route}: any) {
  const {id} = route.params;
  const navigation = useNavigation<AppNavigatorProps>();
  const theme: ThemeType = useTheme();
  const style = styles(theme);
  const [list, setList] = useState<any>([]);
  const {mutate, isError, isPending} = useMutation({
    mutationFn: getDetail,
    onSuccess: (data: any) => {
      setList(data);
    },
  });

  useEffect(() => {
    console.log('refetch', id);
    mutate(id);
  }, [id]);

  useEffect(() => {
    if (list?.name) {
      navigation.setOptions({
        title: list?.name.slice(0, 1).toUpperCase() + list?.name.slice(1),
        headerShown: true,
      });
    }
  }, [list]);

  // eslint-disable-next-line react/no-unstable-nested-components
  const LabelValue = ({label, value}: any) => {
    return (
      <View style={[style.imageContainer, {marginVertical: Size._10}]}>
        <Text style={theme.normalRegularLightText}>{label}</Text>
        <Text style={theme.normalRegularText}>{value}</Text>
      </View>
    );
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const Card = ({item, index}: any) => {
    return (
      <View
        style={[
          style.borderContainer,
          {marginLeft: index === 0 ? 0 : Size._10},
        ]}
        key={index.toString()}>
        <Text style={theme.normalRegularLightText}>{item}</Text>
      </View>
    );
  };

  const renderItem = ({item, index}: any) => {
    return <Card index={index + 1} item={item?.stat?.name} />;
  };

  const renderItem1 = ({item, index}: any) => {
    return <Card index={index + 1} item={item?.type?.name} />;
  };

  const renderItem2 = ({item, index}: any) => {
    return <Card index={index + 1} item={item?.ability?.name} />;
  };

  const renderItem3 = ({item, index}: any) => {
    return <Card index={index + 1} item={item?.move?.name} />;
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

  if (isPending) {
    return (
      <SafeAreaView style={style.mainContainer}>
        <View style={style.container}>
          <ActivityIndicator color={theme.buttonBG} size={Size._40} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={style.mainContainer}>
      <ScrollView contentContainerStyle={style.contentContainer}>
        {(list?.sprites?.front_default || list?.sprites?.back_default) && (
          <View>
            <Text style={theme.titleMediumText}>Image</Text>
            <View style={style.imageContainer}>
              <Image
                source={{uri: list?.sprites?.front_default}}
                style={style.image}
                onLoad={() => console.log('loaded')}
              />
              <Image
                source={{uri: list?.sprites?.back_default}}
                style={style.image}
              />
            </View>
          </View>
        )}
        <Text style={[theme.titleMediumText, style.mt10]}>Detail</Text>
        <View style={style.borderContainer}>
          <LabelValue label="Base Experience" value={list?.base_experience} />
          <LabelValue label="Weight" value={list?.weight} />
          <LabelValue label="Height" value={list?.height} />
        </View>
        {list?.stats && (
          <View style={style.mt10}>
            <Text style={theme.titleMediumText}>Stats</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={list?.stats}
              renderItem={renderItem}
              keyExtractor={(item: any, index: any) => (index + 1).toString()}
              contentContainerStyle={style.flatlistContainer}
            />
          </View>
        )}
        {list?.types && (
          <View style={style.mt10}>
            <Text style={theme.titleMediumText}>Types</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={list?.types}
              renderItem={renderItem1}
              keyExtractor={(item: any, index: any) => (index + 1).toString()}
              contentContainerStyle={style.flatlistContainer}
            />
          </View>
        )}
        {list?.abilities && (
          <View style={style.mt10}>
            <Text style={theme.titleMediumText}>Abilities</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={list?.abilities}
              renderItem={renderItem2}
              keyExtractor={(item: any, index: any) => (index + 1).toString()}
              contentContainerStyle={style.flatlistContainer}
            />
          </View>
        )}
        {list?.moves && (
          <View style={style.mt10}>
            <Text style={theme.titleMediumText}>Moves</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={list?.moves}
              renderItem={renderItem3}
              keyExtractor={(item: any, index: any) => (index + 1).toString()}
              contentContainerStyle={style.flatlistContainer}
            />
          </View>
        )}
      </ScrollView>
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
    contentContainer: {
      // flex: 1,
      paddingHorizontal: Size._20,
      paddingBottom: Size._20,
    },
    image: {
      width: (WIDTH - Size._24 * 2) / 2,
      height: (WIDTH - Size._24 * 2) / 2,
      resizeMode: 'contain',
      borderWidth: 1,
      borderColor: theme.inactiveButtonColor,
      borderRadius: Size._10,
      marginBottom: Size._10,
    },
    borderContainer: {
      borderWidth: 1,
      borderColor: theme.inactiveButtonColor,
      padding: Size._10,
      marginVertical: Size._10,
      borderRadius: Size._10,
    },
    imageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: Size._10,
    },
    flatlistContainer: {
      // alignSelf: 'flex-start',
      // flexGrow: 1,
    },
    mt10: {
      marginTop: Size._10,
    },
  });

export default Detail;

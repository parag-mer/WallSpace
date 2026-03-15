import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../../store';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { bottomTabParamList } from '../../navigation/BottomTabNav';
import { EmptyFavourites } from '../../components/EmptyFavourites';
import { SafeAreaView } from 'react-native-safe-area-context';

const IMAGE_WIDTH = Dimensions.get('window').width / 2 - 30;

type FavouritesScreenProps = BottomTabScreenProps<
  bottomTabParamList,
  'Favourites'
>;

const FavouritesScreen = ({ navigation }: FavouritesScreenProps) => {
  const { wallpaperList } = useSelector(
    (state: IStore) => state.FavWallpaperReducer,
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
          }}
        >
          Favourites
        </Text>
      </View>
      <FlatList
        data={wallpaperList}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation
                .getParent()
                ?.navigate('ViewerScreen', { imgData: item })
            }
          >
            <Image source={{ uri: item.src.portrait }} style={styles.image} />
          </Pressable>
        )}
        ListEmptyComponent={<EmptyFavourites />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: IMAGE_WIDTH,
    aspectRatio: 9 / 16,
    borderRadius: 14,
    marginBottom: 20,
  },
});

export default FavouritesScreen;

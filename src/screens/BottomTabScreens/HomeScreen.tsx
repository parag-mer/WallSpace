import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { fetchTrendingWallpapers } from '../../api';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { bottomTabParamList } from '../../navigation/BottomTabNav';

const IMAGE_WIDTH = Dimensions.get('window').width / 2 - 30;

type HomeScreenProps = BottomTabScreenProps<bottomTabParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['trendingWallpapers'],
    queryFn: fetchTrendingWallpapers,
  });

  return (
    <View style={styles.container}>
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
          WallSpace
        </Text>
      </View>

      {/* Section Title */}
      <Text style={styles.sectionTitle}>Trending</Text>

      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : error ? (
        <Text>Unable to fetch wallpapers : {error.message}</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id}
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
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  image: {
    width: IMAGE_WIDTH,
    aspectRatio: 9 / 16,
    borderRadius: 14,
    marginBottom: 20,
  },
});

export default HomeScreen;

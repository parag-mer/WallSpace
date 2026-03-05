import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useQuery } from '@tanstack/react-query';
import { fetchCategoryWallpapers } from '../api';

type CategoryViewerScreenProps = StackScreenProps<
  RootStackParamList,
  'CategoryViewerScreen'
>;

const IMAGE_WIDTH = Dimensions.get('window').width / 2 - 30;

const CategoryViewerScreen = ({
  navigation,
  route,
}: CategoryViewerScreenProps) => {
  const { categoryName } = route.params;
  const { data, error, isLoading } = useQuery({
    queryKey: ['categoryWallpapers', categoryName],
    queryFn: () => fetchCategoryWallpapers(categoryName),
    staleTime: 1000 * 60 * 30,
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 30, color: 'white' }}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>{categoryName}</Text>
      </View>
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
                navigation.navigate('ViewerScreen', { imgData: item })
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    flex: 1,
    paddingRight: 24,
  },
  image: {
    width: IMAGE_WIDTH,
    aspectRatio: 9 / 16,
    borderRadius: 14,
    marginBottom: 20,
  },
});

export default CategoryViewerScreen;

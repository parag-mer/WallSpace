import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import CategoryItem from '../../components/CategoryItem';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { bottomTabParamList } from '../../navigation/BottomTabNav';

const categoriesList = [
  {
    label: 'Nature',
    imgUrl:
      'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
  },
  {
    label: 'Animals',
    imgUrl:
      'https://images.pexels.com/photos/45170/kittens-cat-cat-puppy-rush-45170.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
  },
  {
    label: 'Cars',
    imgUrl:
      'https://images.pexels.com/photos/207268/pexels-photo-207268.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
  },
  {
    label: 'Abstract',
    imgUrl:
      'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
  },
  {
    label: 'Flowers',
    imgUrl:
      'https://images.pexels.com/photos/1414042/pexels-photo-1414042.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
  },
];

type CategoriesScreenProps = BottomTabScreenProps<
  bottomTabParamList,
  'Categories'
>;

const CategoriesScreen = ({ navigation }: CategoriesScreenProps) => {
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
          Categories
        </Text>
        <FlatList
          data={categoriesList}
          renderItem={({ item }) => (
            <CategoryItem
              label={item.label}
              imgUrl={item.imgUrl}
              onPress={() =>
                navigation.getParent()?.navigate('CategoryViewerScreen', {
                  categoryName: item.label,
                })
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 20 }}
        />
      </View>
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
});

export default CategoriesScreen;

import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import CategoryItem from '../../components/CategoryItem';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { bottomTabParamList } from '../../navigation/BottomTabNav';
import { SafeAreaView } from 'react-native-safe-area-context';

const categoriesList = [
  {
    label: 'Nature',
    imgUrl:
      'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  },
  {
    label: 'Animals',
    imgUrl:
      'https://images.pexels.com/photos/45170/kittens-cat-cat-puppy-rush-45170.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  },
  {
    label: 'Cars',
    imgUrl:
      'https://images.pexels.com/photos/207268/pexels-photo-207268.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  },
  {
    label: 'Abstract',
    imgUrl:
      'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  },
  {
    label: 'Flowers',
    imgUrl:
      'https://images.pexels.com/photos/1414042/pexels-photo-1414042.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  },
  {
    label: 'Space',
    imgUrl:
      'https://images.pexels.com/photos/2694037/pexels-photo-2694037.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  },
  {
    label: 'Minimal',
    imgUrl:
      'https://images.pexels.com/photos/162616/coffee-work-desk-mug-keyboard-162616.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  },
  {
    label: 'AMOLED',
    imgUrl:
      'https://images.pexels.com/photos/29059125/pexels-photo-29059125.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  },
  {
    label: 'City',
    imgUrl:
      'https://images.pexels.com/photos/302820/pexels-photo-302820.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  },
  {
    label: 'Aesthetic',
    imgUrl:
      'https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  },
];

type CategoriesScreenProps = BottomTabScreenProps<
  bottomTabParamList,
  'Categories'
>;

const CategoriesScreen = ({ navigation }: CategoriesScreenProps) => {
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
});

export default CategoriesScreen;

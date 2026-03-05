import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/BottomTabScreens/HomeScreen';
import FavouritesScreen from '../screens/BottomTabScreens/FavouritesScreen';
import CategoriesScreen from '../screens/BottomTabScreens/CategoriesScreen';
import ProfileScreen from '../screens/BottomTabScreens/ProfileScreen';
import { TabIcon } from '../components/TabIcon';

export type bottomTabParamList = {
  Home: undefined;
  Categories: undefined;
  Favourites: undefined;
  Profile: undefined;
};

export const BottomTabNav = () => {
  const BottomTab = createBottomTabNavigator<bottomTabParamList>();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        animation: 'fade',
        tabBarStyle: {
          backgroundColor: '#121212',
          paddingBottom: 30,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Home" icon={'home'} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Categories" icon={'apps'} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Favourites" icon={'heart'} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Profile" icon={'person'} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

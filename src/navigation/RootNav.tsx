import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { BottomTabNav } from './BottomTabNav';
import { ViewerScreen } from '../screens/ViewerScreen';
import CategoryViewerScreen from '../screens/CategoryViewerScreen';
import { AboutScreen } from '../screens/AboutScreen';

export type RootStackParamList = {
  BottomTabNav: undefined;
  ViewerScreen: {
    imgData: any;
  };
  CategoryViewerScreen: {
    categoryName: string;
  };
  AboutScreen: undefined;
};

const RootNav = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName="BottomTabNav"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="BottomTabNav" component={BottomTabNav} />
      <Stack.Screen name="ViewerScreen" component={ViewerScreen} />
      <Stack.Screen
        name="CategoryViewerScreen"
        component={CategoryViewerScreen}
      />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
    </Stack.Navigator>
  );
};

export default RootNav;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { ViewerScreen } from './src/screens/ViewerScreen';
import { BottomTabNav } from './src/navigation/BottomTabNav';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export type RootStackParamList = {
  BottomTabNav: undefined;
  ViewerScreen: {
    imgData: any;
  };
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <SafeAreaProvider>
          <StatusBar barStyle={'light-content'} />
          <Stack.Navigator
            initialRouteName="BottomTabNav"
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="BottomTabNav" component={BottomTabNav} />
            <Stack.Screen name="ViewerScreen" component={ViewerScreen} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;

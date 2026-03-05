import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ViewerScreen } from './src/screens/ViewerScreen';
import { BottomTabNav } from './src/navigation/BottomTabNav';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CategoryViewerScreen from './src/screens/CategoryViewerScreen';

const queryClient = new QueryClient();

export type RootStackParamList = {
  BottomTabNav: undefined;
  ViewerScreen: {
    imgData: any;
  };
  CategoryViewerScreen: {
    categoryName: string;
  };
};

function App() {
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
            <Stack.Screen
              name="CategoryViewerScreen"
              component={CategoryViewerScreen}
            />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;

import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import CameraScreen from './screens/CameraScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
  });

  if (!loaded) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} style={{ fontFamily: 'Poppins'}}/>
        <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
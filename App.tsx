import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/router/RootNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { SplashScreen } from './src/pages/SplashScreen';
// comentario teste   vamos la
export default function App() {
  const [isShowSplash, setIsShowSplash] = React.useState<boolean>(true);
  
  React.useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false)
    }, 2300)
  }, []);
  return (
    <AuthProvider>
      <SafeAreaProvider>
      {
        isShowSplash ? <SplashScreen /> : 
         <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
      }
    </SafeAreaProvider>
    </AuthProvider>
  );
}
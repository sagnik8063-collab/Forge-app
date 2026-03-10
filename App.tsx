import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import LoginScreen from './src/screens/LoginScreen'
import BottomTab from './src/navigation/BottomTab'

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import '@/global.css'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <GluestackUIProvider mode="dark">

      <NavigationContainer>

        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Login"
        >

          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
          />

          <Stack.Screen 
            name="BottomTabs" 
            component={BottomTab} 
          />

        </Stack.Navigator>

      </NavigationContainer>

    </GluestackUIProvider>
  )
}

export default App

const styles = StyleSheet.create({})
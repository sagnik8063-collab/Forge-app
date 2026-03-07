import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ApiTester from '../screens/ApiTester'
import Environments from '../screens/Environments'
import Profile from '../screens/Profile'
import Notifications from '../screens/Notifications'
import { NavigationContainer } from '@react-navigation/native'

const Tab = createBottomTabNavigator();
const BottomTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="ApiTester" component={ApiTester} />
            <Tab.Screen name="Environments" component={Environments} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="Notifications" component={Notifications} />
        </Tab.Navigator>
    )
}

export default BottomTab

const styles = StyleSheet.create({})
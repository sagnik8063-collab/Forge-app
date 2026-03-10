import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ApiTester from "../screens/ApiTester";
import Environments from "../screens/Environments";
import Profile from "../screens/Profile";
import Notifications from "../screens/Notifications";

import {
  Send,
  Key,
  User,
  Bell
} from "lucide-react-native";

const Tab = createBottomTabNavigator();

const BottomTab = () => {

  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({

        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#0f1424",
          borderTopColor: "#1e2538",
          height: 65
        },

        tabBarActiveTintColor: "#6366f1",
        tabBarInactiveTintColor: "#8b93a7",

        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5
        },

        tabBarIcon: ({ color }) => {

          if (route.name === "ApiTester") {
            return <Send size={20} color={color} />;
          }

          if (route.name === "Environments") {
            return <Key size={20} color={color} />;
          }

          if (route.name === "Profile") {
            return <User size={20} color={color} />;
          }

          if (route.name === "Notifications") {
            return <Bell size={20} color={color} />;
          }

        }

      })}
    >

      <Tab.Screen
        name="ApiTester"
        component={ApiTester}
      />

      <Tab.Screen
        name="Environments"
        component={Environments}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
      />

      <Tab.Screen
        name="Notifications"
        component={Notifications}
      />

    </Tab.Navigator>

  );

};

export default BottomTab;
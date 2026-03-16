import { View, StyleSheet } from "react-native";
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
        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          position: "absolute",
          bottom: 30,
          left: 30,
          right: 30,
          backgroundColor: "rgba(30, 41, 59, 0.9)",
          height: 64,
          borderRadius: 32,
          borderWidth: 0.5,
          borderColor: "rgba(255, 255, 255, 0.15)",
          elevation: 0,
          shadowColor: "transparent",
          paddingBottom: 8,
          paddingTop: 8,
        },

        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.5)",

        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: 0.5,
        },

        tabBarIcon: ({ color, focused }) => {
          let IconComp;

          if (route.name === "ApiTester") IconComp = Send;
          else if (route.name === "Environments") IconComp = Key;
          else if (route.name === "Profile") IconComp = User;
          else if (route.name === "Notifications") IconComp = Bell;

          return (
            <View style={focused ? styles.activeIconWrap : null}>
              {IconComp && <IconComp size={focused ? 22 : 20} color={color} strokeWidth={focused ? 2.5 : 2} />}
            </View>
          );
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

const styles = StyleSheet.create({
  activeIconWrap: {
    backgroundColor: "rgba(99, 102, 241, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 4,
  },
});
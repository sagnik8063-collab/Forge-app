import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Animated,
  TouchableOpacity,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { Rocket, Globe, Mail, Lock } from "lucide-react-native";
import GlassCard from "../components/GlassCard";
import InputField from "../components/InputField";

interface LoginScreenProps {
  navigation: any;
}

import bg from "../assets/bg.png";

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 25000,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const handleLogin = () => {
    navigation.replace("BottomTabs");
  };

  return (
    <View style={styles.container}>
      {/* Rotating Background */}
      <Animated.View style={[styles.bgWrapper, { transform: [{ rotate }] }]}>
        <ImageBackground
          source={bg}
          style={styles.bg}
          imageStyle={{ opacity: 0.2 }}
        />
      </Animated.View>

      <View style={styles.content}>
        {/* Heading */}
        <Text style={styles.title}>Welcome back</Text>

        <Text style={styles.subtitle}>
          Enter your credentials to access the ultimate developer toolkit.
        </Text>

        {/* Feature Cards */}
        <View style={{ marginTop: 40, marginBottom: 10 }}>
          <GlassCard
            icon={Rocket}
            title="High Performance"
            description="Optimized for speed with built-in latency tracking."
          />
          <GlassCard
            icon={Globe}
            title="Global Sync"
            description="Access your dev tools from anywhere on any device."
          />
        </View>

        {/* Email */}
        <Text style={styles.label}>Email Address</Text>
        <InputField
          icon={Mail}
          placeholder="alex@forgedev.io"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password */}
        <View style={styles.passwordHeader}>
          <Text style={styles.label}>Password</Text>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <InputField
          icon={Lock}
          placeholder="••••••••"
          secureTextEntry
        />

        {/* Login Button */}
        <TouchableOpacity style={{ marginTop: 30 }} onPress={handleLogin}>
          <LinearGradient
            colors={["#6366f1", "#9333ea"]}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign In to Forge</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#020617"
  },

  bgWrapper: {
    position: "absolute",
    width: "150%",
    height: "150%",
    alignSelf: "center"
  },

  bg: {
    flex: 1
  },

  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 110
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#e2e8f0",
    textAlign: "center"
  },

  subtitle: {
    color: "#94a3b8",
    marginTop: 12,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20
  },

  label: {
    color: "#cbd5f5",
    marginTop: 22,
    marginBottom: 6
  },

  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20
  },

  forgot: {
    color: "#818cf8",
    fontSize: 12
  },

  button: {
    padding: 16,
    borderRadius: 16,
    alignItems: "center"
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  }
});
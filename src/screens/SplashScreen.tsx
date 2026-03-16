import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Animated,
    StatusBar,
    Dimensions
} from "react-native";
import { Send } from "lucide-react-native";
import splashBg from "../assets/splash_bg.png";

const { width } = Dimensions.get("window");

const SplashScreen = ({ navigation }: any) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Entrance animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
            }),
        ]).start();

        // Background rotation loop
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 20000,
                useNativeDriver: true,
            })
        ).start();

        // Navigate to Login after 2.5 seconds
        const timer = setTimeout(() => {
            navigation.replace("Login");
        }, 2500);

        return () => clearTimeout(timer);
    }, [fadeAnim, scaleAnim, navigation]);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <View style={styles.container}>
            <StatusBar hidden />

            {/* 3D Background with low opacity */}
            <Animated.View style={[styles.background, { transform: [{ rotate }, { scale: 1.5 }] }]}>
                <ImageBackground
                    source={splashBg}
                    style={{ flex: 1 }}
                    imageStyle={{ opacity: 0.3 }}
                />
            </Animated.View>

            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }]
                    }
                ]}
            >
                {/* Logo Container with Glow */}
                <View style={styles.logoWrapper}>
                    <View style={styles.glow} />
                    <Send size={60} color="#6366f1" strokeWidth={2.5} />
                </View>

                {/* App Name */}
                <Text style={styles.appName}>FORGE</Text>
                <Text style={styles.tagline}>The Ultimate Developer Toolkit</Text>
            </Animated.View>

            {/* Footer Decoration */}
            {/* <View style={styles.footer}>
                <View style={styles.line} />
                <Text style={styles.version}>v0.0.1</Text>
                <View style={styles.line} />
            </View> */}
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#020617",
        alignItems: "center",
        justifyContent: "center",
    },
    background: {
        ...StyleSheet.absoluteFillObject,
    },
    content: {
        alignItems: "center",
    },
    logoWrapper: {
        width: 120,
        height: 120,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    glow: {
        position: "absolute",
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#6366f1",
        opacity: 0.2,
        transform: [{ scale: 1.8 }],
    },
    appName: {
        fontSize: 56,
        fontWeight: "900",
        color: "#fff",
        letterSpacing: 12,
        textAlign: "center",
        textShadowColor: "rgba(99, 102, 241, 0.5)",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
    tagline: {
        color: "#64748b",
        fontSize: 14,
        marginTop: 10,
        letterSpacing: 2,
        textTransform: "uppercase",
    },
    footer: {
        position: "absolute",
        bottom: 50,
        flexDirection: "row",
        alignItems: "center",
        width: "60%",
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#1e293b",
    },
    version: {
        color: "#475569",
        fontSize: 12,
        marginHorizontal: 15,
        fontWeight: "600",
    },
});

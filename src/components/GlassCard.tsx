import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../theme/colors";
import { LucideIcon } from "lucide-react-native";

interface GlassCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function GlassCard({ title, description, icon: Icon }: GlassCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Icon size={20} color="#6366f1" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "rgba(99, 102, 241, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "#f8fafc",
    fontWeight: "600",
    fontSize: 15,
  },
  desc: {
    color: "#94a3b8",
    marginTop: 4,
    fontSize: 13,
    lineHeight: 18,
  },
});
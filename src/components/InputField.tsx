import React from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { LucideIcon } from "lucide-react-native";

interface InputFieldProps extends TextInputProps {
  icon: LucideIcon;
}

export default function InputField({ icon: Icon, ...props }: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Icon size={18} color="#94a3b8" />
      <TextInput
        placeholderTextColor="#64748b"
        style={styles.input}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 14,
    paddingHorizontal: 15,
    marginTop: 8,
  },
  input: {
    flex: 1,
    padding: 14,
    color: "#f8fafc",
    fontSize: 15,
  },
});
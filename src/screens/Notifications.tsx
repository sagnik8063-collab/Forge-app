import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity
} from "react-native";

import { AlertCircle, X } from "lucide-react-native";
import { notificationList } from "../store/notificationStore";

const Notifications = () => {

  const [data, setData] = useState([...notificationList]);

  /* AUTO UPDATE LIST */

  useEffect(() => {

    const interval = setInterval(() => {
      setData([...notificationList]);
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  /* CLEAR ALL */

  const clearAll = () => {
    notificationList.length = 0;
    setData([]);
  };

  /* DELETE SINGLE */

  const deleteNotification = (id: string) => {

    const index = notificationList.findIndex(n => n.id === id);

    if (index !== -1) {
      notificationList.splice(index, 1);
      setData([...notificationList]);
    }

  };

  /* TIME FORMATTER */

  const getRelativeTime = (time: number) => {

    const seconds = Math.floor((Date.now() - time) / 1000);

    if (seconds < 60) return "just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;

  };

  const renderItem = ({ item }) => (

    <View style={styles.card}>

      <AlertCircle size={20} color="#ef4444" />

      <View style={styles.textContainer}>

        <Text style={styles.title}>
          API Request Failed
        </Text>

        <Text style={styles.url}>
          {item.url}
        </Text>

        <Text style={styles.time}>
          {getRelativeTime(item.timestamp)}
        </Text>

      </View>

      <TouchableOpacity
        onPress={() => deleteNotification(item.id)}
        style={styles.closeButton}
      >
        <X size={16} color="#9aa4b2" />
      </TouchableOpacity>

    </View>

  );

  return (

    <SafeAreaView style={styles.safeArea}>

      <StatusBar barStyle="light-content" />

      {/* HEADER */}

      <View style={styles.header}>

        <Text style={styles.headerTitle}>
          Notifications
        </Text>

        {data.length > 0 && (

          <TouchableOpacity onPress={clearAll}>

            <Text style={styles.clearText}>
              Clear All
            </Text>

          </TouchableOpacity>

        )}

      </View>


      {/* LIST */}

      {data.length === 0 ? (

        <View style={styles.emptyContainer}>

          <Text style={styles.emptyText}>
            No notifications yet
          </Text>

        </View>

      ) : (

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />

      )}

    </SafeAreaView>

  );

};

export default Notifications;



const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#0b0f19",
    paddingTop: StatusBar.currentHeight
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12
  },

  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600"
  },

  clearText: {
    color: "#6366f1",
    fontSize: 14
  },

  listContainer: {
    paddingHorizontal: 16
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111827",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1e2538"
  },

  textContainer: {
    flex: 1,
    marginLeft: 10
  },

  title: {
    color: "#ffffff",
    fontWeight: "600"
  },

  url: {
    color: "#9aa4b2",
    fontSize: 12
  },

  time: {
    color: "#6b7280",
    fontSize: 11,
    marginTop: 2
  },

  closeButton: {
    padding: 4
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  emptyText: {
    color: "#6b7280"
  }

});
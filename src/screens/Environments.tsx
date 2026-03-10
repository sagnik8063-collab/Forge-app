import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView
} from "react-native";

import {
  Search,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Shield
} from "lucide-react-native";

const Environments = () => {

  const [activeEnv, setActiveEnv] = useState("Development");

  const [environments, setEnvironments] = useState([
    { name: "Development", color: "#22c55e" },
    { name: "QA", color: "#f59e0b" },
    { name: "Production", color: "#ef4444" }
  ]);

  const [envVariables, setEnvVariables] = useState({

    Development: [
      {
        id: 1,
        key: "baseUrl",
        value: "http://localhost:3000",
        sensitive: false,
        show: true
      },
      {
        id: 2,
        key: "apiKey",
        value: "dev-key-12345",
        sensitive: true,
        show: false
      }
    ],

    QA: [
      {
        id: 3,
        key: "baseUrl",
        value: "https://qa.api.example.com",
        sensitive: false,
        show: true
      },
      {
        id: 4,
        key: "apiKey",
        value: "qa-key-67890",
        sensitive: true,
        show: false
      }
    ],

    Production: [
      {
        id: 5,
        key: "baseUrl",
        value: "https://api.example.com",
        sensitive: false,
        show: true
      },
      {
        id: 6,
        key: "apiKey",
        value: "prod-key-secret",
        sensitive: true,
        show: false
      }
    ]

  });

  const variables = envVariables[activeEnv];

  const updateVariable = (id: number, field: string, value: any) => {
    setEnvVariables(prev => ({
      ...prev,
      [activeEnv]: prev[activeEnv].map(v =>
        v.id === id ? { ...v, [field]: value } : v
      )
    }));
  };

  const addVariable = () => {
    setEnvVariables(prev => ({
      ...prev,
      [activeEnv]: [
        ...prev[activeEnv],
        {
          id: Date.now(),
          key: "",
          value: "",
          sensitive: false,
          show: true
        }
      ]
    }));
  };

  const deleteVariable = (id: number) => {
    setEnvVariables(prev => ({
      ...prev,
      [activeEnv]: prev[activeEnv].filter(v => v.id !== id)
    }));
  };

  /* ADD NEW ENVIRONMENT */

  const addEnvironment = () => {

    const newEnvName = `Environment-${environments.length + 1}`;

    setEnvironments(prev => [
      ...prev,
      { name: newEnvName, color: "#6366f1" }
    ]);

    setEnvVariables(prev => ({
      ...prev,
      [newEnvName]: []
    }));

  };

  return (

    <SafeAreaView style={styles.safeArea}>

      <StatusBar barStyle="light-content" />

      <View style={styles.container}>

        {/* ENVIRONMENT SELECTOR */}

        <View style={styles.envSection}>

          <View style={styles.headerRow}>

            <Text style={styles.header}>
              Environment Manager
            </Text>

            <TouchableOpacity onPress={addEnvironment}>
              <Plus size={18} color="#9aa4b2" />
            </TouchableOpacity>

          </View>

          <View style={styles.envList}>

            {environments.map(env => (

              <TouchableOpacity
                key={env.name}
                style={[
                  styles.envItem,
                  activeEnv === env.name && styles.envActive
                ]}
                onPress={() => setActiveEnv(env.name)}
              >

                <View
                  style={[
                    styles.envDot,
                    { backgroundColor: env.color }
                  ]}
                />

                <Text style={styles.envText}>
                  {env.name}
                </Text>

                <Text style={styles.envCount}>
                  {envVariables[env.name]?.length || 0}
                </Text>

              </TouchableOpacity>

            ))}

          </View>

        </View>


        {/* VARIABLES SECTION */}

        <View style={styles.mainSection}>

          <View style={styles.titleRow}>

            <View style={styles.greenDot} />

            <Text style={styles.title}>
              {activeEnv}
            </Text>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {variables.length} variables
              </Text>
            </View>

          </View>


          {/* SEARCH */}

          <View style={styles.searchBox}>

            <Search size={16} color="#8b93a7" />

            <TextInput
              placeholder="Search variables..."
              placeholderTextColor="#8b93a7"
              style={styles.searchInput}
            />

          </View>


          {/* TABLE HEADER */}

          <View style={styles.tableHeader}>

            <Text style={[styles.tableHeaderText, { flex: 2 }]}>KEY</Text>
            <Text style={[styles.tableHeaderText, { flex: 3 }]}>VALUE</Text>
            <Text style={styles.tableHeaderText}>SENSITIVE</Text>
            <Text style={styles.tableHeaderText}>SHOW</Text>
            <Text style={styles.tableHeaderText}>ACTIONS</Text>

          </View>


          <ScrollView>

            {variables.map(v => (

              <View key={v.id} style={styles.row}>

                <TextInput
                  style={styles.keyInput}
                  value={v.key}
                  selection={{ start: 0 }}
                  onChangeText={(t) => updateVariable(v.id, "key", t)}
                />

                <TextInput
                  style={styles.valueInput}
                  value={v.value}
                  selection={{ start: 0 }}
                  secureTextEntry={!v.show}
                  onChangeText={(t) => updateVariable(v.id, "value", t)}
                />

                <TouchableOpacity
                  onPress={() =>
                    updateVariable(v.id, "sensitive", !v.sensitive)
                  }
                >
                  <Shield
                    size={18}
                    color={v.sensitive ? "#f59e0b" : "#9aa4b2"}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    updateVariable(v.id, "show", !v.show)
                  }
                >
                  {v.show
                    ? <Eye size={18} color="#9aa4b2" />
                    : <EyeOff size={18} color="#9aa4b2" />
                  }
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => deleteVariable(v.id)}
                >
                  <Trash2 size={18} color="#ef4444" />
                </TouchableOpacity>

              </View>

            ))}

            <TouchableOpacity
              style={styles.addButton}
              onPress={addVariable}
            >

              <Plus size={16} color="#cbd5e1" />

              <Text style={styles.addText}>
                Add Variable
              </Text>

            </TouchableOpacity>

          </ScrollView>

        </View>

      </View>

    </SafeAreaView>

  );
};

export default Environments;



const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#0b0f19",
    paddingTop: StatusBar.currentHeight
  },

  container: {
    flex: 1
  },

  envSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#1e2538"
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12
  },

  header: {
    color: "#cbd5e1",
    fontSize: 16
  },

  envList: {
    flexDirection: "row",
    justifyContent: "space-around"
  },

  envItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 6
  },

  envActive: {
    backgroundColor: "#12182a"
  },

  envDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6
  },

  envText: {
    color: "#cbd5e1",
    marginRight: 6
  },

  envCount: {
    color: "#6b7280"
  },

  mainSection: {
    flex: 1,
    padding: 16
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },

  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#22c55e",
    marginRight: 8
  },

  title: {
    color: "#fff",
    fontSize: 18,
    marginRight: 10
  },

  badge: {
    backgroundColor: "#1e2538",
    paddingHorizontal: 8,
    borderRadius: 10
  },

  badgeText: {
    color: "#9aa4b2",
    fontSize: 12
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#12182a",
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 12
  },

  searchInput: {
    color: "#fff",
    marginLeft: 6,
    flex: 1
  },

  tableHeader: {
    flexDirection: "row",
    marginBottom: 8
  },

  tableHeaderText: {
    color: "#6b7280",
    fontSize: 12,
    flex: 1
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },

  keyInput: {
    flex: 2,
    backgroundColor: "#12182a",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    color: "#fff",
    marginRight: 8
  },

  valueInput: {
    flex: 3,
    backgroundColor: "#12182a",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    color: "#fff",
    marginRight: 8
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },

  addText: {
    color: "#cbd5e1",
    marginLeft: 6
  }

});
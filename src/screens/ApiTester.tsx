import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar
} from "react-native";

import { Send, ChevronDown, Trash2 } from "lucide-react-native";

const ApiTester = () => {

  const [activeTab, setActiveTab] = useState("Params");
  const [bodyType, setBodyType] = useState("JSON");

  const [method, setMethod] = useState("GET");
  const [showDropdown, setShowDropdown] = useState(false);

  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");

  const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];

  const [headers, setHeaders] = useState([
    { id: 1, key: "Content-Type", value: "application/json", enabled: true }
  ]);

  const [params, setParams] = useState([]);

  /* ================= API REQUEST ================= */

  const handleSend = async () => {

    try {

      let requestHeaders: any = {};

      headers.forEach(h => {
        if (h.enabled && h.key) {
          requestHeaders[h.key] = h.value;
        }
      });

      let query = params
        .filter(p => p.enabled && p.key)
        .map(p => `${p.key}=${p.value}`)
        .join("&");

      let finalUrl = query ? `${url}?${query}` : url;

      const options: any = {
        method,
        headers: requestHeaders
      };

      if (method !== "GET" && body) {
        options.body = body;
      }

      const res = await fetch(finalUrl, options);

      console.log("Status:", res.status);

    } catch (err) {

      console.log("Request failed:", err);

    }
  };

  /* ================= METHOD ================= */

  const selectMethod = (m: string) => {
    setMethod(m);
    setShowDropdown(false);
  };

  /* ================= HEADER FUNCTIONS ================= */

  const updateHeader = (id: number, field: string, value: string) => {
    setHeaders(prev =>
      prev.map(h => (h.id === id ? { ...h, [field]: value } : h))
    );
  };

  const toggleHeader = (id: number) => {
    setHeaders(prev =>
      prev.map(h =>
        h.id === id ? { ...h, enabled: !h.enabled } : h
      )
    );
  };

  const addHeader = () => {
    setHeaders(prev => [
      ...prev,
      { id: Date.now(), key: "", value: "", enabled: true }
    ]);
  };

  const deleteHeader = (id: number) => {
    setHeaders(prev => prev.filter(h => h.id !== id));
  };

  /* ================= PARAM FUNCTIONS ================= */

  const addParam = () => {
    setParams(prev => [
      ...prev,
      { id: Date.now(), key: "", value: "", enabled: true }
    ]);
  };

  const updateParam = (id: number, field: string, value: string) => {
    setParams(prev =>
      prev.map(p => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const toggleParam = (id: number) => {
    setParams(prev =>
      prev.map(p =>
        p.id === id ? { ...p, enabled: !p.enabled } : p
      )
    );
  };

  const deleteParam = (id: number) => {
    setParams(prev => prev.filter(p => p.id !== id));
  };

  return (

    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <View style={styles.container}>

        {/* REQUEST BAR */}

        <View style={styles.requestBar}>

          <View style={styles.dropdownContainer}>

            <TouchableOpacity
              style={styles.method}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text style={styles.methodText}>{method}</Text>
              <ChevronDown size={14} color="#9aa4b2" />
            </TouchableOpacity>

            {showDropdown && (
              <View style={styles.dropdown}>
                {methods.map(m => (
                  <TouchableOpacity
                    key={m}
                    style={styles.dropdownItem}
                    onPress={() => selectMethod(m)}
                  >
                    <Text style={styles.dropdownText}>{m}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

          </View>

          <TextInput
            value={url}
            onChangeText={setUrl}
            placeholder="https://api.example.com/endpoint"
            placeholderTextColor="#6b7280"
            style={styles.urlInput}
          />

          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSend}
          >
            <Send size={16} color="white" />
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>

        </View>


        {/* TABS */}

        <View style={styles.tabs}>

          <TouchableOpacity onPress={() => setActiveTab("Params")}>
            <Text style={[styles.tabText, activeTab === "Params" && styles.activeTab]}>
              Params
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab("Headers")}>
            <Text style={[styles.tabText, activeTab === "Headers" && styles.activeTab]}>
              Headers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab("Body")}>
            <Text style={[styles.tabText, activeTab === "Body" && styles.activeTab]}>
              Body
            </Text>
          </TouchableOpacity>

        </View>


        {/* REQUEST SECTION */}

        <View style={styles.requestSection}>

          {/* PARAMS */}

          {activeTab === "Params" && (

            <ScrollView style={styles.headersContainer}>

              {params.map(param => (
                <View key={param.id} style={styles.headerRow}>

                  <TouchableOpacity
                    style={[styles.checkbox, param.enabled && styles.checkboxActive]}
                    onPress={() => toggleParam(param.id)}
                  />

                  <TextInput
                    value={param.key}
                    style={styles.headerInput}
                    placeholder="Parameter"
                    placeholderTextColor="#6b7280"
                    onChangeText={(text) => updateParam(param.id, "key", text)}
                  />

                  <TextInput
                    value={param.value}
                    style={styles.headerInput}
                    placeholder="Value"
                    placeholderTextColor="#6b7280"
                    onChangeText={(text) => updateParam(param.id, "value", text)}
                  />

                  <TouchableOpacity onPress={() => deleteParam(param.id)}>
                    <Trash2 size={18} color="#9aa4b2" />
                  </TouchableOpacity>

                </View>
              ))}

              <TouchableOpacity onPress={addParam}>
                <Text style={styles.addText}>+ Add</Text>
              </TouchableOpacity>

            </ScrollView>

          )}


          {/* HEADERS */}

          {activeTab === "Headers" && (

            <ScrollView style={styles.headersContainer}>

              {headers.map(header => (
                <View key={header.id} style={styles.headerRow}>

                  <TouchableOpacity
                    style={[styles.checkbox, header.enabled && styles.checkboxActive]}
                    onPress={() => toggleHeader(header.id)}
                  />

                  <TextInput
                    value={header.key}
                    style={styles.headerInput}
                    placeholder="Header"
                    placeholderTextColor="#6b7280"
                    onChangeText={(text) => updateHeader(header.id, "key", text)}
                  />

                  <TextInput
                    value={header.value}
                    style={styles.headerInput}
                    placeholder="Value"
                    placeholderTextColor="#6b7280"
                    onChangeText={(text) => updateHeader(header.id, "value", text)}
                  />

                  <TouchableOpacity onPress={() => deleteHeader(header.id)}>
                    <Trash2 size={18} color="#9aa4b2" />
                  </TouchableOpacity>

                </View>
              ))}

              <TouchableOpacity onPress={addHeader}>
                <Text style={styles.addText}>+ Add</Text>
              </TouchableOpacity>

            </ScrollView>

          )}


          {/* BODY */}

          {activeTab === "Body" && (

            <View style={styles.bodyContainer}>

              <View style={styles.bodyTabs}>

                {["JSON", "FORM-DATA", "RAW"].map(type => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setBodyType(type)}
                    style={[
                      styles.bodyTabButton,
                      bodyType === type && styles.bodyTabActive
                    ]}
                  >
                    <Text style={styles.bodyTabText}>{type}</Text>
                  </TouchableOpacity>
                ))}

              </View>

              <TextInput
                multiline
                value={body}
                onChangeText={setBody}
                style={styles.bodyEditor}
                placeholder={
                  bodyType === "JSON"
                    ? `{
  "key": "value"
}`
                    : "Request body..."
                }
                placeholderTextColor="#6b7280"
              />

            </View>

          )}

        </View>

      </View>

    </SafeAreaView>
  );
};

export default ApiTester;

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#0b0f19",
    paddingTop: StatusBar.currentHeight
  },

  container: {
    flex: 1
  },

  requestBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#1e2538"
  },

  dropdownContainer: {
    marginRight: 10
  },

  method: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f2e1d",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6
  },

  methodText: {
    color: "#22c55e",
    marginRight: 5
  },

  dropdown: {
    position: "absolute",
    top: 40,
    width: 110,
    backgroundColor: "#12182a",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1e2538"
  },

  dropdownItem: {
    padding: 10
  },

  dropdownText: {
    color: "#e5e7eb"
  },

  urlInput: {
    flex: 1,
    backgroundColor: "#12182a",
    color: "#fff",
    padding: 10,
    borderRadius: 6
  },

  sendButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    backgroundColor: "#6366f1",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6
  },

  sendText: {
    color: "#fff",
    marginLeft: 6
  },

  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#1e2538"
  },

  tabText: {
    padding: 14,
    color: "#9aa4b2"
  },

  activeTab: {
    color: "white"
  },

  requestSection: {
    flex: 1
  },

  headersContainer: {
    padding: 12
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },

  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 4,
    marginRight: 10
  },

  checkboxActive: {
    backgroundColor: "#6366f1"
  },

  headerInput: {
    flex: 1,
    backgroundColor: "#12182a",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "#fff",
    marginRight: 10
  },

  addText: {
    color: "#9aa4b2",
    marginTop: 6
  },

  bodyContainer: {
    padding: 12
  },

  bodyTabs: {
    flexDirection: "row",
    marginBottom: 10
  },

  bodyTabButton: {
    backgroundColor: "#12182a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8
  },

  bodyTabActive: {
    backgroundColor: "#6366f1"
  },

  bodyTabText: {
    color: "white",
    fontSize: 12
  },

  bodyEditor: {
    backgroundColor: "#0f1424",
    borderWidth: 1,
    borderColor: "#1e2538",
    borderRadius: 6,
    padding: 12,
    color: "#fff",
    height: 160,
    textAlignVertical: "top"
  }

});
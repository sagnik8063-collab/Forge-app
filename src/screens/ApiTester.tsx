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

import { Send, ChevronDown, Trash2, Copy, Check } from "lucide-react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import { ToastAndroid } from "react-native";
import { addNotification } from "../store/notificationStore";
import { showApiFailureNotification } from "../utils/notificationService";

const ApiTester = () => {

  const [activeTab, setActiveTab] = useState("Params");
  const [bodyType, setBodyType] = useState("JSON");

  const [method, setMethod] = useState("GET");
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bodyCopied, setBodyCopied] = useState(false);

  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");

  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [responseStats, setResponseStats] = useState({
    status: 0,
    time: 0,
    size: 0,
  });

  const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];

  const [headers, setHeaders] = useState([
    { id: 1, key: "Content-Type", value: "application/json", enabled: true },
    { id: 2, key: "Accept", value: "application/json", enabled: true }
  ]);

  const [params, setParams] = useState([]);

  const handleSend = async () => {
    if (!url) return;
    setLoading(true);
    const startTime = Date.now();

    try {
      let requestHeaders: any = {};

      headers.forEach(h => {
        if (h.enabled && h.key) {
          requestHeaders[h.key] = h.value;
        }
      });

      let query = params
        .filter(p => p.enabled && p.key)
        .map(p => `${p.key}=${encodeURIComponent(p.value)}`)
        .join("&");

      let finalUrl = query ? (url.includes("?") ? `${url}&${query}` : `${url}?${query}`) : url;

      const options: any = {
        method,
        headers: requestHeaders,
      };

      if (method !== "GET" && body) {
        options.body = body;
      }

      const res = await fetch(finalUrl, options);
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      const dataText = await res.text();
      let data;
      try {
        data = JSON.parse(dataText);
      } catch {
        data = dataText;
      }

      setResponse(data);
      setResponseStats({
        status: res.status,
        time: responseTime,
        size: dataText.length,
      });

      if (res.status >= 400) {
        addNotification(finalUrl);
        showApiFailureNotification(finalUrl);
        ToastAndroid.show(`Status ${res.status}: Request failed`, ToastAndroid.SHORT);
      }

      console.log("Status:", res.status);
    } catch (err: any) {
      console.log("Request failed:", err);
      setResponse({ error: err.message || "Request failed" });
      setResponseStats({
        status: 0,
        time: Date.now() - startTime,
        size: 0,
      });
      addNotification(url);
      showApiFailureNotification(url);
      ToastAndroid.show("Network Error", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (response) {
      Clipboard.setString(JSON.stringify(response, null, 2));
      setCopied(true);
      ToastAndroid.show("Copied to clipboard", ToastAndroid.SHORT);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyBodyToClipboard = () => {
    if (body) {
      Clipboard.setString(body);
      setBodyCopied(true);
      ToastAndroid.show("Payload copied", ToastAndroid.SHORT);
      setTimeout(() => setBodyCopied(false), 2000);
    }
  };

  const clearBody = () => {
    setBody("");
    ToastAndroid.show("Payload cleared", ToastAndroid.SHORT);
  };

  const selectMethod = (m: string) => {
    setMethod(m);
    setShowDropdown(false);
  };

  const addParam = () => {
    setParams(prev => [
      ...prev,
      { id: Date.now(), key: "", value: "", enabled: true }
    ]);
  };

  const updateParam = (id: number, field: string, value: string) => {
    setParams(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const toggleParam = (id: number) => {
    setParams(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  const deleteParam = (id: number) => {
    setParams(prev => prev.filter(p => p.id !== id));
  };

  const addHeader = () => {
    setHeaders(prev => [
      ...prev,
      { id: Date.now(), key: "", value: "", enabled: true }
    ]);
  };

  const updateHeader = (id: number, field: string, value: string) => {
    setHeaders(prev => prev.map(h => h.id === id ? { ...h, [field]: value } : h));
  };

  const toggleHeader = (id: number) => {
    setHeaders(prev => prev.map(h => h.id === id ? { ...h, enabled: !h.enabled } : h));
  };

  const deleteHeader = (id: number) => {
    setHeaders(prev => prev.filter(h => h.id !== id));
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

            <View style={styles.tabContainer}>

              <Text style={[
                styles.tabText,
                activeTab === "Params" && styles.activeTab
              ]}>
                Params
              </Text>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>{params.length}</Text>
              </View>

            </View>

          </TouchableOpacity>


          <TouchableOpacity onPress={() => setActiveTab("Headers")}>

            <View style={styles.tabContainer}>

              <Text style={[
                styles.tabText,
                activeTab === "Headers" && styles.activeTab
              ]}>
                Headers
              </Text>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>{headers.length}</Text>
              </View>

            </View>

          </TouchableOpacity>


          <TouchableOpacity onPress={() => setActiveTab("Body")}>

            <Text style={[
              styles.tabText,
              activeTab === "Body" && styles.activeTab
            ]}>
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
                    style={[
                      styles.checkbox,
                      param.enabled && styles.checkboxActive
                    ]}
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
                    style={[
                      styles.checkbox,
                      header.enabled && styles.checkboxActive
                    ]}
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

                <View style={{ flexDirection: "row", flex: 1 }}>
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

                <View style={styles.bodyActions}>
                  <TouchableOpacity
                    style={styles.bodyActionButton}
                    onPress={copyBodyToClipboard}
                  >
                    {bodyCopied ? (
                      <Check size={14} color="#22c55e" />
                    ) : (
                      <Copy size={14} color="#9aa4b2" />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.bodyActionButton}
                    onPress={clearBody}
                  >
                    <Trash2 size={14} color="#ef4444" />
                  </TouchableOpacity>
                </View>

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


        {/* RESPONSE PANEL */}

        <View style={styles.responsePanel}>
          {!response && !loading ? (
            <View style={styles.emptyResponse}>
              <Send size={40} color="#3a4358" />
              <Text style={styles.responseTitle}>Send a request</Text>
              <Text style={styles.responseSubtitle}>
                Enter a URL and click Send to see the response
              </Text>
            </View>
          ) : (
            <View style={styles.resultContainer}>
              <View style={styles.resultHeader}>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: responseStats.status >= 200 && responseStats.status < 300 ? "#0f2e1d" : "#2d1b1b" }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: responseStats.status >= 200 && responseStats.status < 300 ? "#22c55e" : "#ef4444" }
                  ]}>
                    {responseStats.status || "ERR"}
                  </Text>
                </View>

                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Time</Text>
                  <Text style={styles.statValue}>{responseStats.time} ms</Text>
                </View>

                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Size</Text>
                  <Text style={styles.statValue}>
                    {responseStats.size > 1024
                      ? (responseStats.size / 1024).toFixed(2) + " KB"
                      : responseStats.size + " B"}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={copyToClipboard}
                >
                  {copied ? (
                    <Check size={16} color="#22c55e" />
                  ) : (
                    <Copy size={16} color="#9aa4b2" />
                  )}
                  <Text style={[styles.copyText, copied && { color: "#22c55e" }]}>
                    {copied ? "Copied" : "Copy"}
                  </Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.resultBody} contentContainerStyle={{ paddingBottom: 40 }}>
                <Text style={styles.jsonText}>
                  {loading ? "Loading..." : JSON.stringify(response, null, 2)}
                </Text>
              </ScrollView>
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
    flex: 1,
    paddingBottom: 100
  },

  requestBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#1e2538"
  },

  dropdownContainer: {
    marginRight: 10,
    zIndex: 1000
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
    borderColor: "#1e2538",
    zIndex: 1000,
    elevation: 10
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

  tabContainer: {
    flexDirection: "row",
    alignItems: "center"
  },

  tabText: {
    padding: 14,
    color: "#9aa4b2"
  },

  activeTab: {
    color: "white"
  },

  badge: {
    backgroundColor: "#6366f1",
    borderRadius: 10,
    paddingHorizontal: 6,
    marginLeft: 4
  },

  badgeText: {
    color: "white",
    fontSize: 12
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
    marginBottom: 10,
    alignItems: "center"
  },

  bodyActions: {
    flexDirection: "row",
    gap: 8
  },

  bodyActionButton: {
    backgroundColor: "#1e2538",
    padding: 6,
    borderRadius: 4
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
  },

  responsePanel: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: "#1e2538",
    backgroundColor: "#080b14"
  },

  emptyResponse: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    minHeight: 250
  },

  resultContainer: {
    flex: 1,
    minHeight: 350
  },

  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#1e2538",
    backgroundColor: "#0f1424"
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 16
  },

  statusText: {
    fontWeight: "bold",
    fontSize: 12
  },

  statItem: {
    marginRight: 20
  },

  statLabel: {
    color: "#6b7280",
    fontSize: 10,
    textTransform: "uppercase"
  },

  statValue: {
    color: "#22c55e",
    fontSize: 12,
    fontWeight: "600"
  },

  resultBody: {
    padding: 12
  },

  jsonText: {
    color: "#cbd5e1",
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 18
  },

  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    backgroundColor: "#1e2538",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4
  },

  copyText: {
    color: "#9aa4b2",
    fontSize: 12,
    marginLeft: 6
  },

  responseTitle: {
    color: "#cbd5e1",
    marginTop: 10,
    fontSize: 16
  },

  responseSubtitle: {
    color: "#7c8599",
    marginTop: 6,
    textAlign: "center"
  }
});
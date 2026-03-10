import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch
} from "react-native";

import { Save } from "lucide-react-native";

const Profile = () => {

  const [darkMode, setDarkMode] = useState(true);
  const [saved, setSaved] = useState(false);

  const [diffViewer, setDiffViewer] = useState(true);
  const [logAnalytics, setLogAnalytics] = useState(true);
  const [responseComparison, setResponseComparison] = useState(true);

  const [name, setName] = useState("Alex Developer");
  const [email, setEmail] = useState("alex@forgedev.io");

  const theme = darkMode ? darkTheme : lightTheme;

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (

    <SafeAreaView style={[styles.safeArea,{backgroundColor:theme.background}]}>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />

      <ScrollView style={styles.container}>

        {/* PROFILE CARD */}

        <View style={[styles.card,{backgroundColor:theme.card,borderColor:theme.border}]}>

          <View style={styles.profileHeader}>

            <View style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </View>

            <View>
              <Text style={[styles.username,{color:theme.text}]}>Alex Developer</Text>
              <Text style={[styles.role,{color:theme.subText}]}>admin</Text>
            </View>

          </View>

          <View style={styles.inputRow}>

            <View style={styles.inputGroup}>
              <Text style={[styles.label,{color:theme.subText}]}>Full Name</Text>

              <TextInput
                value={name}
                onChangeText={setName}
                style={[styles.input,{backgroundColor:theme.input,borderColor:theme.border,color:theme.text}]}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label,{color:theme.subText}]}>Email</Text>

              <TextInput
                value={email}
                onChangeText={setEmail}
                style={[styles.input,{backgroundColor:theme.input,borderColor:theme.border,color:theme.text}]}
              />
            </View>

          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >

            <Save size={16} color="#fff"/>

            <Text style={styles.saveText}>
              {saved ? "Saved" : "Save Changes"}
            </Text>

          </TouchableOpacity>

        </View>


        {/* WORKSPACE */}

        <View style={[styles.card,{backgroundColor:theme.card,borderColor:theme.border}]}>

          <Text style={[styles.sectionTitle,{color:theme.subText}]}>
            Workspace
          </Text>

          <Text style={[styles.workspaceName,{color:theme.text}]}>
            My Workspace
          </Text>

          <View style={styles.planBadge}>
            <Text style={styles.planText}>Pro</Text>
          </View>

        </View>


        {/* APPEARANCE */}

        <View style={[styles.card,{backgroundColor:theme.card,borderColor:theme.border}]}>

          <Text style={[styles.sectionTitle,{color:theme.subText}]}>
            Appearance
          </Text>

          <View style={styles.toggleRow}>

            <View>
              <Text style={[styles.toggleTitle,{color:theme.text}]}>
                Dark Mode
              </Text>

              <Text style={[styles.toggleSubtitle,{color:theme.subText}]}>
                Toggle between dark and light themes
              </Text>
            </View>

            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#cbd5e1", true: "#6366f1" }}
            />

          </View>

        </View>


        {/* FEATURE FLAGS */}

        <View style={[styles.card,{backgroundColor:theme.card,borderColor:theme.border}]}>

          <Text style={[styles.sectionTitle,{color:theme.subText}]}>
            Feature Flags
          </Text>

          <View style={styles.toggleRow}>
            <Text style={[styles.toggleTitle,{color:theme.text}]}>Diff Viewer</Text>
            <Switch value={diffViewer} onValueChange={setDiffViewer}/>
          </View>

          <View style={styles.toggleRow}>
            <Text style={[styles.toggleTitle,{color:theme.text}]}>Log Analytics</Text>
            <Switch value={logAnalytics} onValueChange={setLogAnalytics}/>
          </View>

          <View style={styles.toggleRow}>
            <Text style={[styles.toggleTitle,{color:theme.text}]}>Response Comparison</Text>
            <Switch value={responseComparison} onValueChange={setResponseComparison}/>
          </View>

        </View>


        {/* KEYBOARD SHORTCUTS */}

        <View style={[styles.card,{backgroundColor:theme.card,borderColor:theme.border}]}>

          <Text style={[styles.sectionTitle,{color:theme.subText}]}>
            Keyboard Shortcuts
          </Text>

          <Shortcut label="Command Palette" keyText="Ctrl K"/>
          <Shortcut label="Navigate to tools" keyText="Ctrl 1-9"/>
          <Shortcut label="Toggle sidebar" keyText="Ctrl \\"/>
          <Shortcut label="Send API request (in URL bar)" keyText="Enter"/>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
};

const Shortcut = ({label,keyText}) => (

<View style={styles.shortcutRow}>
  <Text style={styles.shortcutLabel}>{label}</Text>
  <Text style={styles.shortcutKey}>{keyText}</Text>
</View>

);

export default Profile;


const darkTheme = {
background:"#0b0f19",
card:"#111827",
border:"#1e2538",
text:"#ffffff",
subText:"#9aa4b2",
input:"#0b0f19"
};

const lightTheme = {
background:"#f5f7fb",
card:"#ffffff",
border:"#e5e7eb",
text:"#111827",
subText:"#6b7280",
input:"#ffffff"
};


const styles = StyleSheet.create({

safeArea:{
flex:1
},

container:{
padding:16
},

card:{
borderRadius:10,
padding:16,
borderWidth:1,
marginBottom:16
},

profileHeader:{
flexDirection:"row",
alignItems:"center",
marginBottom:16
},

avatar:{
width:50,
height:50,
borderRadius:25,
backgroundColor:"#6366f1",
alignItems:"center",
justifyContent:"center",
marginRight:12
},

avatarText:{
color:"#fff",
fontSize:20,
fontWeight:"600"
},

username:{
fontSize:16,
fontWeight:"600"
},

role:{
fontSize:12
},

inputRow:{
flexDirection:"row",
gap:12,
marginBottom:16
},

inputGroup:{
flex:1
},

label:{
fontSize:12,
marginBottom:4
},

input:{
borderRadius:6,
borderWidth:1,
paddingHorizontal:12,
paddingVertical:10
},

saveButton:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#6366f1",
paddingVertical:10,
paddingHorizontal:14,
borderRadius:6,
alignSelf:"flex-start"
},

saveText:{
color:"#fff",
marginLeft:6
},

sectionTitle:{
fontSize:13,
marginBottom:12
},

workspaceName:{
fontSize:15,
marginBottom:6
},

planBadge:{
backgroundColor:"#1e2538",
alignSelf:"flex-start",
paddingHorizontal:10,
paddingVertical:4,
borderRadius:12
},

planText:{
color:"#6366f1",
fontSize:12
},

toggleRow:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginBottom:12
},

toggleTitle:{
fontSize:14
},

toggleSubtitle:{
fontSize:12
},

shortcutRow:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:12
},

shortcutLabel:{
color:"#cbd5e1"
},

shortcutKey:{
color:"#9aa4b2"
}

});
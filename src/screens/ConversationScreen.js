import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ConversationScreen({ route }) {
  const { chatbotName } = route.params;

  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hi! 👋",
      sender: "bot",
    },
    {
      id: "2",
      text: "Hello!",
      sender: "me",
    },
  ]);

  const [input, setInput] = useState("");

  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "me",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Placeholder for AI response
    // call chatbot here
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "me" ? styles.myContainer : styles.botContainer,
      ]}
    >
      <View
        style={[
          styles.message,
          item.sender === "me" ? styles.myMessage : styles.botMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <Ionicons name="chevron-back" size={28} />

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{chatbotName[0]}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{chatbotName}</Text>
          <Text style={styles.status}>Online</Text>
        </View>

        <Ionicons name="ellipsis-horizontal" size={24} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.chat}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        {/* Bottom Bar */}

        <View style={styles.bottomBar}>
          <Ionicons name="camera-outline" size={28} />

          <Ionicons name="image-outline" size={24} />

          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Send a Chat"
            style={styles.input}
          />

          <TouchableOpacity onPress={sendMessage}>
            <Ionicons name="send" size={24} color="#0A84FF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFC00",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 12,
  },

  avatarText: {
    fontWeight: "700",
    fontSize: 18,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
  },

  status: {
    color: "#888",
  },

  chat: {
    padding: 15,
  },

  messageContainer: {
    width: "100%",
    marginVertical: 6,
  },

  myContainer: {
    alignItems: "flex-end",
  },

  botContainer: {
    alignItems: "flex-start",
  },

  message: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    maxWidth: "80%",
  },

  myMessage: {
    backgroundColor: "#0A84FF",
  },

  botMessage: {
    backgroundColor: "#F1F1F1",
  },

  messageText: {
    fontSize: 17,
  },

  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#EEE",
  },

  input: {
    flex: 1,
    height: 42,
    backgroundColor: "#F3F3F3",
    borderRadius: 22,
    paddingHorizontal: 16,
    marginHorizontal: 10,
  },
});

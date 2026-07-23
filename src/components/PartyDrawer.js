import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

export default function PartyDrawer ({
  visible,
  
  onStartParty,
}) {
  return (

    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      onRequestClose={onStartParty}
    >
      
      <View style={styles.modalContainer}>
        {/* Dark background behind the drawer */}
        <Pressable
          style={styles.backdrop}
          onPress={onStartParty}
        />

        {/* Drawer */}
        <View style={styles.drawer}>
          <View style={styles.drawerHandle} />

          <Text style={styles.title}>
            Party Planner
          </Text>

          <Text style={styles.description}>
            Configure your party settings before starting party mode.
          </Text>

          <View style={styles.optionBox}>
            <Text style={styles.optionTitle}>
              Party Theme
            </Text>

            <Text style={styles.optionDescription}>
              Your hero image and notification color will change when party
              mode begins.
            </Text>
          </View>

          <Pressable
            style={styles.partyButton}
            onPress={onStartParty}
          >
            <Text style={styles.partyButtonText}>
              Let's Party
            </Text>
          </Pressable>

          <Pressable
            style={styles.cancelButton}
            onPress={onStartParty}
          >
            <Text style={styles.cancelButtonText}>
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}



const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },

  drawer: {
    width: "100%",
    minHeight: 350,
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 35,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },

  drawerHandle: {
    width: 45,
    height: 5,
    backgroundColor: "#CCCCCC",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    color: "#666666",
    lineHeight: 21,
    marginBottom: 20,
  },

  optionBox: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 14,
    marginBottom: 24,
  },

  optionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5,
  },

  optionDescription: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },

  partyButton: {
    backgroundColor: "#8A2BE2",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
  },

  partyButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },

  cancelButton: {
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },

  cancelButtonText: {
    fontSize: 16,
    color: "#555555",
  },
});
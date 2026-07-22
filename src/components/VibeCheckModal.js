import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Image } from 'react-native';

import vibeCheck from '../../assets/slide-two-image/vibecheck_bitmoji.jpg';

export default function VibeCheckModal({ visible, sendThanks }) {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={sendThanks}
      statusBarTranslucent={true}
    >
      <View style={styles.overlayPage}>
        <Image 
          source={vibeCheck} 
          style={styles.overlayImage} 
          resizeMode="cover" 
        />

        <View style={styles.overlayContent}>
          <Text style={styles.overlayTitle}>Vibe Check 🌀</Text>
          <Text style={styles.overlaySubtitle}>
            Your co-pilot is checking in.
          </Text>
          <Text style={styles.overlayDescription}>
            Your co-pilot is checking in. They might have noticed a Snap you
            just sent or posted and wanted to give you a gentle heads-up.
          </Text>

          <Pressable style={styles.primaryBtn} onPress={sendThanks}>
            <Text style={styles.primaryBtnText}>Send a Thanks</Text>
          </Pressable>

          <Pressable style={styles.secondaryBtn} onPress={sendThanks}>
            <Text style={styles.secondaryBtnText}>Keep Snapping</Text>
          </Pressable>

          <Pressable style={styles.secondaryBtn} onPress={sendThanks}>
            <Text style={styles.secondaryBtnText}>See Flagged Snaps</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlayPage: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  overlayImage: {
    width: "100%",
    height: "55%",
  },
  overlayContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 24,
  },
  overlayTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  overlaySubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
    textAlign: "center",
  },
  overlayDescription: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    lineHeight: 18,
    marginVertical: 12,
  },
  primaryBtn: {
    width: "100%",
    backgroundColor: "#A020F0",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryBtn: {
    width: "100%",
    backgroundColor: "#EFEFEF",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 8,
  },
  secondaryBtnText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  FlatList,
  Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { fontHeader } from "../../assets/themes/font";
import { colors } from "../../assets/themes/colors";
import StoriesBitmoji from "../components/StoriesBitmoji";
import DiscoverFeed from "../components/DiscoverFeed";
import Header from "../components/Header";

// 1. Import your story photos
import story1 from "../../assets/story-photos/story1.png";
import story2 from "../../assets/story-photos/story2.png";
import story3 from "../../assets/story-photos/story3.png";

// 2. Add the imported images to the DATA items
const DATA = [
  { id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba", title: "✌️✌️", image: story1 },
  { id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63", title: "Clipped Sabrina", image: story2 },
  { id: "58694a0f-3da1-471f-bd96-145571e29d72", title: "locked in rn 🤫", image: story3 },
];

export default function StoriesScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  const [showOverlay, setShowOverlay] = useState(false);
  const [showDeleteNight, setShowDeleteNight] = useState(false);

  const overlayTimerRef = useRef(null);
  const deleteNightTimerRef = useRef(null);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowOverlay(true);
    }, 3000);

    return () => {
      if (overlayTimerRef.current) {
        clearTimeout(overlayTimerRef.current);
      }
      if (deleteNightTimerRef.current) {
        clearTimeout(deleteNightTimerRef.current);
      }
    };
  }, []);

  function readyToGoHome() {
    if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current);
    overlayTimerRef.current = setTimeout(() => {
      setShowOverlay(true);
    }, 3000);
  }

  function nextNight() {
    if (deleteNightTimerRef.current) clearTimeout(deleteNightTimerRef.current);
    deleteNightTimerRef.current = setTimeout(() => {
      setShowDeleteNight(true);
    }, 3000);
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          marginBottom: tabBarHeight,
        },
      ]}
    >
      <Header title="Stories" />
      <View style={styles.contentContainer}>
        <View style={styles.storyBar}>
          <Text style={styles.sectionHeader}>Friends</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <StoriesBitmoji onPress={() => readyToGoHome()} />
          </ScrollView>
        </View>
        <Text style={styles.sectionHeader}>Discover</Text>
        <FlatList
          contentContainerStyle={{ paddingBottom: 250 }}
          data={DATA}
          horizontal={false}
          numColumns={2}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderItem={({ item }) => <DiscoverFeed title={item.title} />}
          keyExtractor={(item) => item.id}
        />
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={
          <View style={styles.headerSection}>
            {/* Friends Section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.snapSectionHeader}>FRIENDS</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.friendsScrollContainer}
              >
                <StoriesBitmoji onPress={() => setShowOverlay(true)} />
              </ScrollView>
            </View>

            {/* Discover Section Title */}
            <View style={styles.sectionContainer}>
              <Text style={styles.snapSectionHeader}>DISCOVER</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.discoverItemWrapper}>
            {/* Pass the item's title AND image prop */}
            <DiscoverFeed title={item.title} image={item.image} />
          </View>
        )}
      />

      {/* --- UNTOUCHED: Ready To Go Home Modal --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showOverlay}
        onRequestClose={() => setShowOverlay(false)}
      >
        <View style={[styles.modalBackdrop, { paddingBottom: tabBarHeight }]}>
          <View style={styles.overlayPage}>
            <Image
              source={require("../../assets/slide-three-image/sleeping.png")}
              style={styles.overlayImage}
              resizeMode="cover"
            />

            <ScrollView
              contentContainerStyle={styles.overlayContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.overlayTitle}>Ready to go home?</Text>
              <Text style={styles.overlaySubtitle}>One more song?</Text>

              <Text style={styles.overlayDescription}>
                Not ready to call it yet? Add a few more hours to your timer so
                your co-pilot can keep looking out while you keep the vibe
                going.
              </Text>

              <Pressable
                style={styles.primaryBtn}
                onPress={() => {
                  readyToGoHome();
                  setShowOverlay(false);
                }}
              >
                <Text style={styles.primaryBtnText}>Keep it Going</Text>
              </Pressable>

              <Pressable
                style={styles.secondaryBtn}
                onPress={() => {
                  setShowOverlay(false);
                  nextNight();
                }}
              >
                <Text style={styles.secondaryBtnText}>Heading home</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* --- UNTOUCHED: Delete The Night Modal --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDeleteNight}
        onRequestClose={() => setShowDeleteNight(false)}
      >
        <Pressable
          style={[styles.closeButton, { top: insets.top + 10 }]}
          onPress={() => setShowDeleteNight(false)}
          hitSlop={12}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </Pressable>
        <View style={[styles.modalBackdrop, { paddingBottom: tabBarHeight }]}>
          <View style={styles.overlayPage}>
            <Image
              source={require("../../assets/slide-three-image/deleteNight.png")}
              style={styles.overlayImage}
              resizeMode="cover"
            />

            <ScrollView
              contentContainerStyle={styles.debriefContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.overlayTitle}>So, What Happened? 👀</Text>
              <Text style={styles.debriefDescription}>
                You made it! Here is the official debrief from last night. Check
                out what went down, and piece the plot back together.
              </Text>

              <Pressable
                onPress={() =>
                  console.log("All snaps in once place was pressed")
                }
              >
                <View style={styles.rowItem}>
                  <View>
                    <Text style={styles.rowTitle}>
                      All your snaps in one place
                    </Text>
                    <Text style={styles.rowSubtitle}>
                      Flip through the highlights
                    </Text>
                  </View>
                  <Text style={{ fontSize: 18, color: "#888" }}>›</Text>
                </View>
              </Pressable>

              <View style={styles.bitmojiRow}>
                <Image
                  source={require("../../assets/slide-three-image/bitmoji.png")}
                  style={styles.bitmojiPic}
                  resizeMode="contain"
                />
              </View>

              <Pressable
                onPress={() => console.log("See who you snapped was pressed")}
              >
                <View style={styles.rowItem}>
                  <Text style={styles.rowTitle}>See who you snapped</Text>
                  <Text style={{ fontSize: 18, color: "#888" }}>›</Text>
                </View>
              </Pressable>

              <Pressable
                style={styles.primaryBtn}
                onPress={() => {
                  console.log("Delete the night pressed");
                  setShowDeleteNight(false);
                }}
              >
                <Text style={styles.primaryBtnText}>Delete the Night!</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  listContentContainer: {
    paddingHorizontal: 12,
    paddingBottom: 100,
  },
  headerSection: {
    marginBottom: 8,
  },
  sectionContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  snapSectionHeader: {
    fontSize: 13,
    fontWeight: "800",
    color: "#8E8E93",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
    paddingLeft: 4,
  },
  friendsScrollContainer: {
    paddingVertical: 8,
    gap: 12,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  discoverItemWrapper: {
    flex: 0.48,
  },

  /* --- Untouched Modal Styles --- */
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlayPage: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  overlayImage: {
    width: "100%",
    height: "45%",
  },
  overlayContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    alignItems: "center",
    gap: 10,
  },
  debriefContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 12,
  },
  debriefDescription: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    lineHeight: 16,
    paddingHorizontal: 10,
  },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  rowSubtitle: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  bitmojiRow: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  bitmojiPic: {
    width: "100%",
    height: 90,
  },
  overlayTitle: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  overlaySubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  overlayDescription: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    lineHeight: 18,
  },
  primaryBtn: {
    width: "100%",
    backgroundColor: "#A020F0",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 6,
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
  closeButton: {
    position: "absolute",
    left: 16,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

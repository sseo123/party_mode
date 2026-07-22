// I added useState, and I touched storiesscreen.js, storiesbitmoji.js, and added assets/slide-three-image/sleeping.png
import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, Pressable, Image, ScrollView, FlatList, } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { fontHeader } from "../../assets/themes/font";
import { colors } from "../../assets/themes/colors";
import StoriesBitmoji from "../components/StoriesBitmoji";
import DiscoverFeed from "../components/DiscoverFeed";
import { useNavigation } from "@react-navigation/native";

import Header from "../components/Header";

/* Discover FlatList will render a component in the list
 * for each object in the array DATA. This is just an example I took
 * from the FlatList documentation, so feel free to change the contents.
 */

const DATA = [
  { id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba", title: "First Item", },
  { id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63", title: "Second Item", },
  { id: "58694a0f-3da1-471f-bd96-145571e29d72", title: "Third Item", },
];

export default function StoriesScreen({ route, navigation }) {
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowOverlay(true);
    }, 3000);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          // Paddings to handle safe area
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
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            

            //contentContainerStyle={styles.stories} commented this out because it prevented story scrolling felt unintuitive
          >
            <StoriesBitmoji onPress={ () => setShowOverlay(true) } />
            {/* <StoriesBitmoji />
            <StoriesBitmoji />
            <StoriesBitmoji />
            <StoriesBitmoji />
            <StoriesBitmoji />
            <StoriesBitmoji />
            <StoriesBitmoji />
            <StoriesBitmoji />
            <StoriesBitmoji />
            <StoriesBitmoji /> */}
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

      {showOverlay && (
        <View style={styles.overlayPage}>
          <Image source={require("../../assets/slide-three-image/sleeping.png")} style={styles.overlayImage} resizeMode="cover"/>

          <View style={styles.overlayContent}> 
            <Text style={styles.overlayTitle}>
              Ready to go home?
            </Text>
            <Text style={styles.overlaySubtitle}>
              blah blah blah text
            </Text>

            <Text style={styles.overlayDescription}>
              blah blah blah text
            </Text>

            <Pressable style={styles.primaryBtn} onPress={() => console.log("keep it going was pressed")}>
              <Text style={styles.primaryBtnText}> Keep it Going</Text>
            </Pressable>

            <Pressable style={styles.secondaryBtn} onPress={() => setShowOverlay(false)}>
              <Text style={styles.secondaryBtnText}>Heading home</Text>
            </Pressable>
            </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  contentContainer: {
    // padding: 12,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  storyBar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
  },
  stories: {
    display: "flex",
    gap: 20,
    width: "100%",
    // justifyContent:"center",
  },
  sectionHeader: {
    textAlign: "left",
    paddingVertical: 4,
    color: colors.primary,
    fontSize: fontHeader.fontSize,
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
  },
  overlayPage: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: "#fff",
  zIndex: 10,
  flexDirection: "column",
},
overlayImage: {
  width: "100%",
  height: "45%",
},
overlayContent: {
  flex: 1,
  paddingHorizontal: 24,
  paddingTop: 16,
  alignItems: "center",
  justifyContent: "space-between",
  paddingBottom: 16,
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

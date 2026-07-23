import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { Text as SvgText } from "react-native-svg";

export default function DiscoverFeed({ title, image }) {
  const navigation = useNavigation();

  return (
    <View style={styles.FeedContainer}>
      <View style={styles.Square}>
        <Pressable
          onPress={() => {
            navigation.navigate("DiscoverCard");
          }}
        >
          <ImageBackground
            style={styles.FeedImage}
            imageStyle={{ borderRadius: 20 }}
            source={image}
          >
            <Svg height="100%" width="100%" style={styles.svgText}>
              <SvgText
                stroke="black"
                strokeWidth={0.4}
                fill="white"
                fontSize="16"
                fontWeight="bold"
                x="90%"
                y="95%"
                textAnchor="end"
              >
                {title}
              </SvgText>
            </Svg>
          </ImageBackground>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  FeedContainer: {
    width: "100%",
    display: "flex",
    flex: 2,
    gap: 10,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  Square: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 20,
    width: "100%",
    alignItems: "center",
    borderRadius: 20,
    flexWrap: "wrap",
  },
  FeedImage: {
    width: 165,
    height: 320,
    display: "flex",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#222",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  svgText: {
    position: "absolute",
    bottom: 8,
    right: 3,
  },
});
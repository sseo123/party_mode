import { Image, Text, View, Button, StyleSheet, Pressable } from "react-native";
import { supabase } from "../../utils/hooks/supabase";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { findAstrologySign } from "../../utils/hooks/supabase";
import { useAuthentication } from "../../utils/hooks/useAuthentication";

//This will be the other code that will help me pull my drawer


import PartyDrawer from "./PartyDrawer";




//import for a background
import { ImageBackground } from "react-native";


const handleSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      // Handle successful sign out (e.g., redirect to login screen)
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};














export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user } = useAuthentication();
  const [astrology, setAstrology] = useState("Pisces");

  // const userSign = findAstrologySign();

  // (useEffect(() => {
  //   setAstrology(userSign.sign);
  // }),
  //   []);

  return (

    // Here will be the container that will hold the image and the icons
    <View style={styles.heroContainer}>

    {/* Hero Image */}
    <Image
    source={{ uri: "https://i.imgur.com/FxsJ3xy.jpg" }}
    style={styles.heroImage}
  />

  {/* Settings button */}
  <View style={styles.settingsButton}>
    <Button
      title="Settings"
      onPress={() => navigation.navigate("Settings")}
    />
  </View>


  <View style={styles.overlay}>
    <Text style={styles.name}>John Doe</Text>
  </View>


<View>



{/* Header will act as a title for the component */}
<Text style={styles.title}>      Party Time</Text>
{/* This will be the componet that will hold the new feature that we are creating  */}
<Pressable style={styles.dashedBox}
// Here the navigation will redirect me to a diffrenct page, 
onPress={() => navigation.navigate("Settings")
  }>
  {/* Icon */}
  <Image
    source={{ uri: "https://cdn.creativefabrica.com/2021/06/21/Party-Popper-Line-Icon-Graphics-13653703-1.jpg" }}
    style={styles.icon}
  />

  {/* Text Container */}
  <View style={styles.textContainer}>
    <Text style={styles.title}>
      Party Planner
    </Text>

    <Text style={styles.description}>
      Going out tonight? Make a plan to Snap with your friends.
    </Text>
  </View>
</Pressable>
</View>



      {/* <Text
        style={{
          justifyContents: "center",
          textAlign: "center",
        }}
      >
        {user &&
          user.user_metadata &&
          user.user_metadata.email.slice(
            0,
            user.user_metadata.email.indexOf("@"), // gets part before @ of email address, should use profile username instead
          )}
      </Text> */}

{/*       
      <Button
        onPress={() => {
          // navigation.navigate("Astrology");
        }}
        // title={astrology}
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      /> */}

      <Button onPress={handleSignOut} title="Log Out" />
      <Pressable>
        <Button
          onPress={() => {
            navigation.navigate("Settings", {});
          }}
          title="Settings"

        />
      </Pressable>


    </View>




  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },

  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    alignItems: "center",
  },

  heroContainer: {
    width: "100%",
    height: 250,
  },

  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
dashedBox: {
  width: "90%",
  flexDirection: "row",
  alignItems: "center",

  padding: 16,
  borderWidth: 1,
  borderRadius: 12,
  borderColor: "#ccc",

  marginVertical: 10,
},

icon: {
  width: 60,
  height: 60,
  borderRadius: 30,
  marginRight: 15,
},

textContainer: {
  flex: 1,
},

title: {
  fontSize: 20,
  fontWeight: "bold",
},

description: {
  marginTop: 4,
  fontSize: 14,
  color: "gray",
},
});

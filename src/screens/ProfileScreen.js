import { Image, Text, View, Button, StyleSheet, Pressable } from "react-native";
import { supabase } from "../../utils/hooks/supabase";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { findAstrologySign } from "../../utils/hooks/supabase";
import { useAuthentication } from "../../utils/hooks/useAuthentication";



// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';


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
    <Text style={styles.subtitle}>Software Engineer</Text>
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
});

import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { client } from "../utils/KindeConfig";

const Headers = () => {
  const [user, setUser] = useState(null);

  const getUserDetails = async () => {
    const user = await client.getUserDetails();
    setUser(user);
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <View>
      <Image source={{ uri: user?.picture }} style={styles.image} />
    </View>
  );
};

export default Headers;

const styles = StyleSheet.create({});

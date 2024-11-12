import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../../utils/Colors";
import { client } from "../../utils/KindeConfig";
import services from "../../utils/services";
import { useRouter } from "expo-router";

const Home = () => {
  const handleSignIn = async () => {
    const token = await client.login();
    if (token) {
      // User was authenticated
      await services.storeData("login", "true");
      router.replace("/");
    }
  };
  const router = useRouter();
  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <Image source={require("../../assets/bg.png")} style={styles.Bg} />
      <View style={styles.content}>
        <Text style={styles.contentText}>Wasification</Text>
        <Text style={styles.subContentText}>Get To know your waste</Text>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}> Login/SignUp</Text>
        </TouchableOpacity>
        <Text style={styles.condition}>
          * By Login/SignUp you will agree to our terms and conditions *{" "}
        </Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  Bg: {
    width: 350,
    height: 430,
    marginTop: 30,
    borderWidth: 5,
    borderRadius: 20,
    alignItems: "center",
    borderColor: Colors.BLACK,
  },
  button: {
    backgroundColor: Colors.WHITE,
    padding: 12,
    paddingHorizontal: 5,
    borderRadius: 105,
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    color: Colors.PRIMARY,
    fontSize: 20,
  },
  condition: {
    fontSize: 13,
    color: Colors.WHITE,
    textAlign: "center",
  },
  content: {
    backgroundColor: Colors.PRIMARY,
    width: "100%",
    height: "100%",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  contentText: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.WHITE,
  },
  subContentText: {
    fontSize: 20,
    textAlign: "center",
    color: Colors.PINK,
    marginTop: 30,
  },
});

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.openCamera}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>OPEN CAMERA</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.openGallery}>
          <TouchableOpacity style={styles.btn}>
            <Text>OPEN GALLERY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  btn: {
    borderWidth: 2,
    padding: 15,
    margin: 10,
  },

  btnText: {
    color: "black",
  },

  container: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  header: {},
});

import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import Headers from "../../components/Headers";
import services from "../../utils/services";
import { useRouter } from "expo-router";
import { client } from "../../utils/KindeConfig";
import Constants from "expo-constants";
const Home = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(null);
  const handleLogout = async () => {
    const loggedOut = await client.logout();

    if (loggedOut) {
      await services.storeData("login", "false");
      router.replace("/login/Home");
    }
  };

  const getPermissions = async () => {
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === "granted");

    // const mediaLibraryStatus =
    //   await ImagePicker.requestMediaLibraryPermissionsAsync();
    // setHasMediaLibraryPermission(mediaLibraryStatus.status === "granted");
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //ImagePicker.MediaTypeOptions.Videos

      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const openCamera = async () => {
    try {
      if (!hasCameraPermission) {
        console.error("Camera permission is not granted");
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error opening camera: ", error);
    }
  };
  return (
    <View style={styles.container}>
      <Headers />
      <View style={styles.header}>
        <View style={styles.openCamera}>
          <TouchableOpacity style={styles.btn} onPress={() => openCamera()}>
            <Text style={styles.btnText}>OPEN CAMERA</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.openGallery}>
          <TouchableOpacity style={styles.btn} onPress={() => pickImage()}>
            <Text>OPEN GALLERY</Text>
          </TouchableOpacity>
          {image && (
            <Image
              source={{ uri: user?.picture }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
        <Button title="Log Out" onPress={handleLogout} />
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

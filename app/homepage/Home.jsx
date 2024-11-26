import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Headers from "../../components/Headers";
import services from "../../utils/services";
import { useRouter } from "expo-router";
import { client } from "../../utils/KindeConfig";

const Home = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(null);
  const [apiImageUrl, setApiImageUrl] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);
  const [user, setUser] = useState(null); // State to store user data

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

    const mediaLibraryStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHasMediaLibraryPermission(mediaLibraryStatus.status === "granted");
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const fetchApiImage = async () => {
    try {
      const response = await fetch(
        "https://testing-render-55i0.onrender.com/ans/"
      );
      if (response.ok) {
        const imageUrl = response.url + `?timestamp=${new Date().getTime()}`; // Add cache-busting query parameter
        console.log("Fetched image URL:", imageUrl);
        setApiImageUrl(imageUrl);
      } else {
        console.error("Error fetching image:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const classifyImage = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        name: "photo.jpg",
        type: "image/jpeg",
      });

      const response = await fetch(
        "https://testing-render-55i0.onrender.com/predict/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        fetchApiImage(); // Fetch the processed image after classification
      } else {
        console.error(
          "Error posting image for classification:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error classifying image:", error);
    }
  };

  const pickImage = async () => {
    try {
      if (!hasMediaLibraryPermission) {
        console.error("Media library permission is not granted");
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setImage(imageUri);
        classifyImage(imageUri); // Classify the selected image
      }
    } catch (error) {
      console.error("Error picking image:", error);
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
        const imageUri = result.assets[0].uri;
        setImage(imageUri);
        classifyImage(imageUri); // Classify the captured image
      }
    } catch (error) {
      console.error("Error opening camera:", error);
    }
  };
  if (apiImageUrl) {
    return (
      <TouchableOpacity onPress={() => setApiImageUrl(null)}>
        <Image
          source={{ uri: apiImageUrl }}
          style={{ height: "100%", width: "100%" }}
        />
      </TouchableOpacity>
    );
  }
  return (
    <ImageBackground source={require("../../assets/bg2.jpg")}>
      <View style={styles.container}>
        <Headers />
        <View style={styles.header}>
          <View style={styles.openCamera}>
            <TouchableOpacity style={styles.btn} onPress={openCamera}>
              <Text style={styles.btnText}>OPEN CAMERA</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.openGallery}>
            <TouchableOpacity style={styles.btn} onPress={pickImage}>
              <Text style={styles.btnText}>OPEN GALLERY</Text>
            </TouchableOpacity>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>
          {user && (
            <Image
              source={{ uri: user.picture }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <Button title="Log Out" onPress={handleLogout} />
          {apiImageUrl && (
            <Image
              source={{ uri: apiImageUrl }}
              style={{ height: 200, width: 200 }}
            />
          )}
          {classificationResult && (
            <View style={styles.classificationResultContainer}>
              <Text style={styles.classificationResultText}>
                Classification Result: {JSON.stringify(classificationResult)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
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
  classificationResultContainer: {
    marginTop: 20,
  },
  classificationResultText: {
    color: "black",
  },
});

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { BASE_URL } from "@/api/api";
import Toast from "react-native-simple-toast";

type User = {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
};

type RowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const data = await AsyncStorage.getItem("user");
      const savedImage = await AsyncStorage.getItem("profileImage");

      if (!data) return;

      const parsed: User = JSON.parse(data);

      setUser(parsed);
      setProfileImage(savedImage || parsed.profileImage || null);
    };

    loadUser();
  }, []);

  const userName = user?.name ?? "Guest User";

  const ProfileImage = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (!userData) return;

      const user = JSON.parse(userData);
      const res = await axios.get(`${BASE_URL}/profile-image/${user.id}`);

      const imageUrl = res.data.image;
      setProfile(imageUrl);
    } catch (error) {
      console.log("Error fetching profile image:", error);
    }
  };

  useEffect(() => {
    ProfileImage();
  }, []);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (result.canceled) return;

    const uri = result.assets[0].uri;

    setProfileImage(uri);
    uploadImage(uri);
  };

  const uploadImage = async (uri: string) => {
    try {
      setLoading(true);

      const userData = await AsyncStorage.getItem("user");
      if (!userData) return;

      const user = JSON.parse(userData);

      const formData = new FormData();

      formData.append("file", {
        uri,
        name: "profile.jpg",
        type: "image/jpeg",
      } as any);

      formData.append("upload_preset", "sample_image");

      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dyaazb0ok/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const imageUrl = cloudinaryRes.data.secure_url;

      const res = await axios.patch(`${BASE_URL}/profile-image/${user.id}`, {
        profileImage: imageUrl,
      });

      const updatedUser = res.data.user;

      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      await AsyncStorage.setItem("profileImage", updatedUser.image);

      setProfileImage(updatedUser.image);

      Toast.show("Profile image updated successfully", Toast.LONG);
      ProfileImage();
    } catch (err) {
      console.log(err);
      Toast.show("Upload failed", Toast.LONG);
    } finally {
      setLoading(false);
    }
  };

  const Row = ({ icon, label, onPress }: RowProps) => (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between py-4"
      android_ripple={{ color: "#eee" }}
    >
      <View className="flex-row items-center gap-4">
        <Ionicons name={icon} size={20} color="#111" />
        <Text className="text-sm font-ibm_medium text-black">{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#aaa" />
    </Pressable>
  );

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />

      <View className="bg-primary pt-20 pb-28 items-center rounded-b-[50px] px-6">
        <Text className="text-white text-xs opacity-70 font-ibm_bold">Welcome back</Text>

        <Text
          className="text-white text-3xl font-ibm_medium mt-2 text-center"
          numberOfLines={2}
          adjustsFontSizeToFit
        >
          {userName}
        </Text>
      </View>

      <View className="-mt-20 px-5 space-y-6">
        <View className="items-center">
          <Pressable
            onPress={pickImage}
            className="relative w-32 h-32 items-center justify-center"
          >
            {profile ? (
              <Image
                source={{ uri: profile }}
                className="w-32 h-32 rounded-full border-4 border-white"
              />
            ) : (
              <View className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 items-center justify-center">
                <Ionicons name="person" size={50} color="#6b7280" />
              </View>
            )}

            <Pressable
              className="absolute bottom-1 right-1 bg-indigo-600 p-2 rounded-full"
              onPress={pickImage}
            >
              <Ionicons name="camera" size={14} color="white" />
            </Pressable>

            {loading && (
              <View className="absolute inset-0 items-center justify-center bg-black/40 rounded-full">
                <ActivityIndicator color="#fff" />
              </View>
            )}
          </Pressable>

          <Text className="text-xs text-gray-500 mt-2 font-ibm_regular">
            Tap to change photo
          </Text>
        </View>

        <View className="bg-white rounded-xl px-5 py-3 mt-5 elevation-sm">
          <Row
            icon="receipt-outline"
            label="My Orders"
            onPress={() => router.push("../orders")}
          />
          <Row
            icon="document-text-outline"
            label="Reports"
            onPress={() => router.push("/report")}
          />
          <Row
            icon="location-outline"
            label="Address"
            onPress={() => router.push("/address")}
          />
          <Row
            icon="card-outline"
            label="Payments"
            onPress={() => Alert.alert("Coming soon")}
          />
        </View>

        <View className="bg-white rounded-xl px-5 py-3 mt-4 elevation-sm">
          <Row
            icon="settings-outline"
            label="Settings"
            onPress={() => router.push("/settings")}
          />
          <Row
            icon="help-circle-outline"
            label="Help & Support"
            onPress={() => router.push("/help")}
          />
        </View>
      </View>
    </View>
  );
}

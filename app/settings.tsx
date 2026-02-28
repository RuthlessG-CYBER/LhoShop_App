import { View, Text, Pressable, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { BASE_URL } from "@/api/api";
import axios from "axios";

interface User {
  name?: string;
  email?: string;
  user?: {
    name?: string;
    email?: string;
  };
}

interface RowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}

export default function Settings() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const data = await AsyncStorage.getItem("user");
      if (data) setUser(JSON.parse(data));
    };
    loadUser();
  }, []);

  const userName = user?.name || user?.user?.name || "Guest User";

  const userEmail = user?.email || user?.user?.email || "No email";

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.clear();
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("user");
          router.replace("/(auth)");
        },
      },
    ]);
  };

  const fetchProfileImage = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (!userData) return;

      const user = JSON.parse(userData);
      const res = await axios.get(`${BASE_URL}/profile-image/${user.id}`);

      const imageUrl = res.data.image;
      setProfileImage(imageUrl);
    } catch (error) {
      console.log("Error fetching profile image:", error);
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, []);

  const handleChangePassword = () => {
    Alert.alert("Change Password", "Not implemented yet!");
  };

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "Not implemented yet!");
  };

  const handlePayments = () => {
    Alert.alert("Payments", "Not implemented yet!");
  };

  const Row = ({ icon, label, onPress }: RowProps) => {
    return (
      <Pressable
        onPress={onPress}
        android_ripple={{ color: "#f1f1f1" }}
        className="flex-row items-center justify-between py-4"
      >
        <View className="flex-row items-center">
          <View className="bg-gray-100 p-2 rounded-xl">
            <Ionicons name={icon} size={18} color="#111" />
          </View>

          <Text className="ml-4 text-md font-ibm_medium text-black">
            {label}
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={18} color="#bbb" />
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      <StatusBar style="dark" />

      <View className="flex-row items-center justify-center py-4 relative">
        <Pressable onPress={() => router.back()} className="absolute left-0 bg-gray-50 p-2 rounded-xl px-3 elevation-sm">
          <Ionicons name="arrow-back" size={24} />
        </Pressable>

        <Text className="text-xl font-ibm_medium">Settings</Text>
      </View>

      <View
        className="bg-white rounded-xl mb-6 flex-row items-center p-5 mt-5 rounded-t-3xl elevation-sm"
      >
        <Image
          source={{ uri: profileImage || "https://i.pravatar.cc/300" }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 35,
          }}
        />

        <View className="px-5 flex-1">
          <Text className="text-lg font-ibm_bold text-black">{userName}</Text>

          <Text className="text-gray-400 text-sm mt-1 font-ibm_medium">
            {userEmail}
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={18} color="#bbb" />
      </View>

      <Text className="text-gray-400 text-xs mb-2 ml-1 font-ibm_bold">
        ACCOUNT
      </Text>

      <View className="bg-white rounded-xl px-5 mb-6 elevation-sm border border-gray-50">
        <Row
          icon="person-outline"
          label="Edit Profile"
          onPress={handleEditProfile}
        />

        <View className="h-[1px] bg-gray-100" />

        <Row
          icon="lock-closed-outline"
          label="Change Password"
          onPress={handleChangePassword}
        />

        <View className="h-[1px] bg-gray-100" />

        <Row icon="card-outline" label="Payments" onPress={handlePayments} />
      </View>

      <Text className="text-gray-400 text-xs mb-2 ml-1 font-ibm_bold">
        SUPPORT
      </Text>

      <View className="bg-white rounded-xl px-5 mb-6 elevation-sm border border-gray-50 rounded-b-3xl">
        <Row
          icon="help-circle-outline"
          label="Help & Support"
          onPress={() => alert("Coming soon")}
        />

        <View className="h-[1px] bg-gray-100" />

        <Row
          icon="information-circle-outline"
          label="About App"
          onPress={() => alert("Version 1.0.0")}
        />
      </View>

      <Pressable
        onPress={handleLogout}
        className="bg-black py-4 rounded-2xl items-center mt-auto mb-10"
      >
        <Text className="text-white font-ibm_medium text-base">Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
}

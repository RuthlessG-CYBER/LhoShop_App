import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/api/api";
import Toast from "react-native-simple-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      return Toast.show("Please fill in all fields", Toast.LONG);
    }

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/login`, {
        email: email.trim(),
        password,
      });

      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));

      router.replace("/(tabs)/home");
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "Something went wrong";

      Toast.show(message, Toast.LONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <StatusBar style="dark" backgroundColor="#F6F4F1" />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingBottom: 40,
            backgroundColor: "#F6F4F1",
            justifyContent: "center",
          }}
        >
          <View>
            <View className="mb-20 mt-20">
              <Text className="text-4xl font-ibm_bold text-[#2F2F2F]">
                LhoShop
              </Text>
              <Text className="text-base text-[#8E8E8E] mt-2 font-ibm_medium">
                Sign in to continue shopping
              </Text>
            </View>

            <View className="mb-5">
              <Text className="text-sm text-[#6F6F6F] mb-2 font-ibm_medium">Email Address</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="#A3A3A3"
                keyboardType="email-address"
                autoCapitalize="none"
                className="bg-white border border-[#E5E5E5] rounded-2xl px-4 py-4 text-[#2F2F2F] font-ibm_regular"
              />
            </View>

            <View className="mb-8">
              <Text className="text-sm text-[#6F6F6F] mb-2 font-ibm_medium">Password</Text>

              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#A3A3A3"
                  secureTextEntry={!showPassword}
                  className="bg-white border border-[#E5E5E5] rounded-2xl px-4 py-4 pr-12 text-[#2F2F2F] font-ibm_regular"
                />

                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#8E8E8E"
                  />
                </Pressable>
              </View>
            </View>

            <Pressable
              disabled={loading}
              onPress={handleLogin}
              className={`py-4 rounded-2xl items-center mb-6 ${
                loading ? "bg-[#2F2F2F]/70" : "bg-[#2F2F2F]"
              }`}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-base font-ibm_medium text-white">
                  Sign In
                </Text>
              )}
            </Pressable>

            <View className="flex-row justify-center">
              <Text className="text-sm text-[#8E8E8E] font-ibm_regular">New to LhoShop? </Text>
              <Pressable onPress={() => router.replace("/(auth)/signup")}>
                <Text className="text-sm font-ibm_medium text-[#2F2F2F]">
                  Create Account
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

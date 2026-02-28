import { View, Text, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";

export default function Index() {
  const router = useRouter();

  const scale = useRef(new Animated.Value(0.8)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const checkUser = async () => {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(async () => {
        const user = await AsyncStorage.getItem("user");

        if (user) {
          router.replace("/home");
        } else {
          router.replace("/(splash)");
        }
      }, 2000);
    };

    checkUser();
  }, []);

  return (
    <View className="flex-1 bg-[#F6F4F1] items-center justify-center">
      <Animated.View
        style={{
          alignItems: "center",
          transform: [{ scale }],
          opacity,
        }}
      >
        <Image
          source={require("../assets/images/logo3.png")}
          style={{
            width: 100,
            height: 100,
            borderRadius: 30,
          }}
        />

        <View className="mt-5 items-center">
          <Text className="text-[28px] font-bold text-[#2F2F2F]">LhoShop</Text>

          <Text className="mt-2 text-sm text-[#8E8E8E]">
            Modern Fashion Experience
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

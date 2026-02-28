import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function SplashThree() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#F6F4F1]">
      <Pressable
        onPress={() => router.replace("/(auth)")}
        className="absolute top-12 right-8 z-10 px-3 py-2"
      >
        <Text className="text-sm font-ibm_medium text-gray">Skip</Text>
      </Pressable>

      <View className="flex-1 justify-center items-center pt-20">
        <View className="relative w-72 h-72 items-center justify-center mb-4">
          <View className="absolute w-72 h-72 rounded-full bg-[#2F2F2F] opacity-5" />
          <View className="absolute w-60 h-60 rounded-full bg-[#2F2F2F] opacity-10" />
          <View className="absolute w-48 h-48 rounded-full bg-[#2F2F2F] opacity-15" />

          <View className="w-64 h-64 rounded-full bg-white shadow-lg items-center justify-center relative overflow-hidden">
            <View className="items-center">
              <View className="w-24 h-24 bg-[#2F2F2F] rounded-full items-center justify-center mb-4">
                <Text className="text-5xl">✓</Text>
              </View>

              <View className="flex-row gap-3 mb-3">
                <View className="w-12 h-12 bg-[#F6F4F1] rounded-xl items-center justify-center">
                  <Text className="text-xl">🛒</Text>
                </View>
                <View className="w-12 h-12 bg-[#F6F4F1] rounded-xl items-center justify-center">
                  <Text className="text-xl">💳</Text>
                </View>
                <View className="w-12 h-12 bg-[#F6F4F1] rounded-xl items-center justify-center">
                  <Text className="text-xl">📦</Text>
                </View>
              </View>

              <View className="flex-row gap-2">
                <View className="bg-[#2F2F2F] px-2.5 py-1 rounded-full">
                  <Text className="text-[10px] font-semibold text-white">
                    Fast
                  </Text>
                </View>
                <View className="bg-[#2F2F2F] px-2.5 py-1 rounded-full">
                  <Text className="text-[10px] font-semibold text-white">
                    Secure
                  </Text>
                </View>
                <View className="bg-[#2F2F2F] px-2.5 py-1 rounded-full">
                  <Text className="text-[10px] font-semibold text-white">
                    Easy
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="absolute top-8 left-4">
            <Text className="text-2xl">✨</Text>
          </View>
          <View className="absolute bottom-12 right-8">
            <Text className="text-xl">⭐</Text>
          </View>
          <View className="absolute top-16 right-2">
            <Text className="text-lg">💫</Text>
          </View>
        </View>

        <View className="mt-8 items-center px-8">
          <Text className="text-[32px] font-bold text-[#2F2F2F] mb-3 text-center">
            Shop Smarter
          </Text>
          <Text className="text-base text-[#8E8E8E] text-center leading-[24px] mb-2">
            Seamless checkout, secure payments{"\n"}
            and fast delivery guaranteed
          </Text>

          <View className="mt-6 gap-3">
            <View className="flex-row items-center gap-3">
              <View className="w-6 h-6 bg-[#2F2F2F] rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">✓</Text>
              </View>
              <Text className="text-sm text-[#2F2F2F] font-medium">
                Easy one-tap checkout
              </Text>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="w-6 h-6 bg-[#2F2F2F] rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">✓</Text>
              </View>
              <Text className="text-sm text-[#2F2F2F] font-medium">
                Secure payment protection
              </Text>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="w-6 h-6 bg-[#2F2F2F] rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">✓</Text>
              </View>
              <Text className="text-sm text-[#2F2F2F] font-medium">
                Real-time order tracking
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="flex-row items-center justify-center gap-2 mb-8">
        <View className="w-8 h-1.5 bg-[#E5E5E5] rounded-full" />
        <View className="w-8 h-1.5 bg-[#E5E5E5] rounded-full" />
        <View className="w-8 h-1.5 bg-[#2F2F2F] rounded-full" />
      </View>

      <View className="px-6 pb-10 flex-row items-center justify-center gap-4">
        <Pressable
          onPress={() => router.push("/(splash)/first")}
          className="bg-white py-5 rounded-3xl mb-4 shadow-lg active:opacity-90 flex-1 border border-[#E5E5E5]"
        >
          <Text className="text-sm font-ibm_medium text-[#9CA3AF] text-center">
            Back
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.replace("/(auth)")}
          className="bg-[#2F2F2F] py-5 rounded-3xl mb-4 shadow-lg active:opacity-90 flex-1"
        >
          <Text className="text-[17px] font-semibold text-white text-center tracking-wide">
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

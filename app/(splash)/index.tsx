import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function SplashOne() {
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
          <View className="absolute w-64 h-64 rounded-3xl bg-[#2F2F2F] opacity-5 rotate-12" />
          <View className="absolute w-56 h-56 rounded-3xl bg-[#2F2F2F] opacity-10 -rotate-6" />
          
          <View className="w-60 h-60 rounded-3xl bg-white shadow-lg items-center justify-center">
            <View className="items-center">
              <View className="w-32 h-40 bg-[#2F2F2F] rounded-2xl mb-4 items-center justify-center">
                <View className="w-24 h-32 bg-[#F6F4F1] rounded-xl items-center justify-center">
                  <Text className="text-5xl mb-2">🛍️</Text>
                  <View className="flex-row gap-1">
                    <View className="w-2 h-2 rounded-full bg-[#2F2F2F]" />
                    <View className="w-2 h-2 rounded-full bg-[#8E8E8E]" />
                    <View className="w-2 h-2 rounded-full bg-[#8E8E8E]" />
                  </View>
                </View>
              </View>
              
              <View className="flex-row gap-2">
                <View className="bg-[#F6F4F1] px-3 py-1.5 rounded-full">
                  <Text className="text-xs font-medium text-[#2F2F2F]">✨ Clean</Text>
                </View>
                <View className="bg-[#F6F4F1] px-3 py-1.5 rounded-full">
                  <Text className="text-xs font-medium text-[#2F2F2F]">🎨 Modern</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View className="absolute -top-4 -right-4 bg-[#2F2F2F] w-16 h-16 rounded-full items-center justify-center shadow-md">
            <Text className="text-2xl">✓</Text>
          </View>
        </View>

        <View className="mt-8 items-center px-8">
          <Text className="text-[32px] font-bold text-[#2F2F2F] mb-3 text-center">
            Modern Shopping
          </Text>
          <Text className="text-base text-[#8E8E8E] text-center leading-[24px]">
            Experience fashion-forward design{"\n"}
            with intuitive, minimal interface
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-center gap-2 mb-8">
        <View className="w-8 h-1.5 bg-[#2F2F2F] rounded-full" />
        <View className="w-8 h-1.5 bg-[#E5E5E5] rounded-full" />
        <View className="w-8 h-1.5 bg-[#E5E5E5] rounded-full" />
      </View>

      <View className="px-6 pb-10 flex-row items-center justify-center gap-4">
        <Pressable
          onPress={() => router.push("/(splash)/first")}
          className="bg-[#2F2F2F] py-5 rounded-3xl mb-3 shadow-lg active:opacity-90 flex-1"
        >
          <Text className="text-sm font-ibm_medium text-white text-center">
            Welcome
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
import { View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";

export default function SplashTwo() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#FAFAF8]">
      <Pressable
        onPress={() => router.replace("/(auth)")}
        className="absolute top-12 right-8 z-10 px-3 py-2"
      >
        <Text className="text-sm font-ibm_medium text-gray">Skip</Text>
      </Pressable>

      <View className="flex-1 justify-center items-center pt-16">
        <View className="relative w-80 h-80 items-center justify-center mb-8">
          <View className="absolute w-72 h-72 rounded-full bg-[#FFE8D6] opacity-20" />
          <View className="absolute w-60 h-60 rounded-full bg-[#FFD4B8] opacity-25" />

          <View className="w-64 h-64 rounded-full bg-white shadow-xl items-center justify-center overflow-hidden border-4 border-white">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1445205170230-053b83016050",
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          <View className="absolute -bottom-3 bg-[#2F2F2F] px-6 py-3 rounded-full shadow-xl flex-row items-center gap-2">
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="#FAFAF8"
                stroke="#FAFAF8"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text className="text-white text-sm font-ibm_medium tracking-wide">
              Premium Collections
            </Text>
          </View>
        </View>

        <View className="mt-6 items-center px-8">
          <Text className="text-[34px] font-bold text-[#1F2937] mb-4 text-center tracking-tight">
            Discover Your Style
          </Text>
          <Text className="text-[15px] text-[#6B7280] text-center leading-6 max-w-sm">
            Curated collections from top designers tailored just for you
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
          onPress={() => router.push("/(splash)")}
          className="bg-white py-5 rounded-3xl mb-3 shadow-lg active:opacity-90 flex-1 border border-[#E5E5E5]"
        >
          <Text className="text-sm font-ibm_medium text-[#9CA3AF] text-center">
            Back
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.replace("/(splash)/second")}
          className="bg-[#2F2F2F] py-5 rounded-3xl mb-3 shadow-lg active:opacity-90 flex-1"
        >
          <Text className="text-[17px] font-semibold text-white text-center tracking-wide">
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

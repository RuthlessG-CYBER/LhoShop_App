import { View, Text, Pressable, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import Svg, { Path, Circle, Rect, Ellipse, Line } from "react-native-svg";

const { height } = Dimensions.get("window");

function WomanRackIllustration() {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 375 380" fill="none" preserveAspectRatio="xMidYMid meet">
      <Rect width="375" height="380" fill="#FFF6E8" />
      <Path d="M90 0 Q187 0 187 90 L187 380 L0 380 L0 90 Q0 0 90 0Z" fill="#F0E4CC" opacity="0.6" />
      <Rect x="230" y="50" width="6" height="280" rx="3" fill="#C0A878" />
      <Rect x="210" y="48" width="46" height="8" rx="4" fill="#C0A878" />
      <Rect x="210" y="322" width="28" height="8" rx="4" fill="#C0A878" />
      <Rect x="248" y="322" width="28" height="8" rx="4" fill="#C0A878" />
      <Path d="M218 64 Q233 58 248 64 L245 108 Q233 113 221 108 Z" fill="#F2D240" />
      <Path d="M218 64 Q211 59 207 67 L214 76 Q219 71 220 79" fill="#F2D240" />
      <Path d="M248 64 Q255 59 259 67 L252 76 Q247 71 246 79" fill="#F2D240" />
      <Path d="M220 64 Q233 56 246 64" stroke="#B8A060" strokeWidth="2" fill="none" strokeLinecap="round" />
      <Line x1="233" y1="54" x2="233" y2="60" stroke="#B8A060" strokeWidth="2" strokeLinecap="round" />
      <Path d="M218 118 Q233 111 248 118 L246 168 Q233 174 220 168 Z" fill="#E8622A" />
      <Path d="M218 118 Q210 112 206 120 L213 130 Q218 124 219 133" fill="#E8622A" />
      <Path d="M248 118 Q256 112 260 120 L253 130 Q248 124 247 133" fill="#E8622A" />
      <Path d="M220 118 Q233 110 246 118" stroke="#B85A18" strokeWidth="2" fill="none" strokeLinecap="round" />
      <Line x1="233" y1="108" x2="233" y2="114" stroke="#B85A18" strokeWidth="2" strokeLinecap="round" />
      <Path d="M108 195 Q142 188 162 195 L170 310 Q142 318 114 310 Z" fill="#2E5DD4" />
      <Rect x="116" y="195" width="52" height="10" rx="5" fill="#F2D240" />
      <Ellipse cx="138" cy="170" rx="24" ry="28" fill="#E8622A" />
      <Path d="M114 170 Q102 162 96 172 L106 185 Q114 177 114 188" fill="#E8622A" />
      <Path d="M162 170 Q174 162 180 172 L170 185 Q162 177 162 188" fill="#E8622A" />
      <Rect x="100" y="173" width="9" height="36" rx="4.5" fill="#E8622A" />
      <Rect x="103" y="156" width="18" height="30" rx="4" fill="#1A1A1A" />
      <Rect x="106" y="159" width="12" height="20" rx="2" fill="#5AABFF" />
      <Rect x="118" y="305" width="14" height="44" rx="7" fill="#2E5DD4" />
      <Rect x="140" y="305" width="14" height="44" rx="7" fill="#2E5DD4" />
      <Rect x="113" y="344" width="24" height="12" rx="5" fill="#1A1A1A" />
      <Rect x="135" y="342" width="24" height="12" rx="5" fill="#1A1A1A" />
      <Rect x="114" y="354" width="5" height="10" rx="2.5" fill="#1A1A1A" />
      <Rect x="136" y="352" width="5" height="10" rx="2.5" fill="#1A1A1A" />
      <Circle cx="138" cy="134" r="20" fill="#F2C090" />
      <Ellipse cx="138" cy="119" rx="20" ry="14" fill="#1A1A1A" />
      <Rect x="118" y="119" width="8" height="26" rx="4" fill="#1A1A1A" />
    </Svg>
  );
}

export default function SplashTwo() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#FFFDF8]">
      <Pressable
        onPress={() => router.replace("/(auth)")}
        className="absolute top-12 right-6 z-10 p-2"
      >
        <Text className="text-sm text-[#302a2a] font-ibm_regular">Skip</Text>
      </Pressable>

      <View style={{ height: height * 0.70 }} className="w-full bg-[#FFF6E8]">
        <WomanRackIllustration />
      </View>

      <View className="flex-1 bg-[#FFFDF8] px-7 pt-6 pb-9 items-center justify-between">
        <Text className="text-[22px] font-ibm_bold text-[#1A1A1A] text-center tracking-tight">
          Try on clothes in the store
        </Text>

        <Text className="text-sm text-[#999999] text-center leading-6 font-ibm_medium">
          If the outfit does not suit you, we{"\n"}will refund the money.
        </Text>

        <View className="flex-row items-center gap-2">
          <View className="w-2 h-2 rounded-full bg-[#E0E0E0]" />
          <View className="w-6 h-2 rounded-full bg-[#1A1A1A]" />
          <View className="w-2 h-2 rounded-full bg-[#E0E0E0]" />
        </View>

        <Pressable
          onPress={() => router.push("/(splash)/second")}
          className="w-full bg-[#1A1A1A] rounded-2xl py-5 items-center active:opacity-80"
        >
          <Text className="text-white text-base font-ibm_medium tracking-wide">Next</Text>
        </Pressable>
      </View>
    </View>
  );
}
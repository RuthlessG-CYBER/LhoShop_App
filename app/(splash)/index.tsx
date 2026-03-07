import { View, Text, Pressable, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import Svg, { Path, Circle, Rect, Ellipse } from "react-native-svg";

const { height } = Dimensions.get("window");

function WomanSittingIllustration() {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 375 380" fill="none" preserveAspectRatio="xMidYMid meet">
      <Rect width="375" height="380" fill="#FFF6E8" />
      <Rect x="80" y="30" width="200" height="300" rx="100" fill="#F0E4CC" />
      <Rect x="240" y="40" width="5" height="80" rx="2.5" fill="#C8A870" />
      <Path d="M208 40 Q242 78 276 40" fill="#F0BE50" />
      <Path d="M218 50 Q242 76 266 50" fill="#E0AE40" />
      <Ellipse cx="242" cy="42" rx="8" ry="4" fill="#D0A040" />
      <Rect x="258" y="190" width="7" height="90" rx="3.5" fill="#8B6840" />
      <Ellipse cx="256" cy="182" rx="18" ry="25" fill="#D4CC88" />
      <Ellipse cx="246" cy="192" rx="12" ry="18" fill="#CCBE7A" />
      <Ellipse cx="268" cy="195" rx="11" ry="16" fill="#C4B870" />
      <Rect x="250" y="274" width="14" height="6" rx="3" fill="#7A5C30" />
      <Rect x="58" y="210" width="5" height="50" rx="2.5" fill="#1A1A1A" />
      <Rect x="88" y="210" width="5" height="50" rx="2.5" fill="#1A1A1A" />
      <Rect x="54" y="205" width="42" height="9" rx="4.5" fill="#1A1A1A" />
      <Rect x="56" y="148" width="42" height="9" rx="4.5" fill="#1A1A1A" />
      <Rect x="58" y="154" width="5" height="56" rx="2.5" fill="#1A1A1A" />
      <Rect x="88" y="154" width="5" height="56" rx="2.5" fill="#1A1A1A" />
      <Rect x="65" y="160" width="12" height="48" rx="6" fill="#1A1A1A" />
      <Rect x="65" y="205" width="12" height="48" rx="6" fill="#1A1A1A" />
      <Ellipse cx="60" cy="256" rx="14" ry="7" fill="#2E5DD4" />
      <Ellipse cx="77" cy="255" rx="14" ry="7" fill="#2E5DD4" />
      <Path d="M70 170 Q108 155 130 170 L127 218 Q108 226 76 218 Z" fill="#E8622A" />
      <Path d="M70 170 Q59 164 53 174 L62 186 Q69 180 70 190" fill="#E8622A" />
      <Path d="M130 170 Q141 164 146 174 L137 186 Q131 180 130 190" fill="#E8622A" />
      <Rect x="133" y="175" width="9" height="28" rx="4.5" fill="#E8622A" />
      <Rect x="136" y="161" width="17" height="28" rx="4" fill="#1A1A1A" />
      <Rect x="139" y="164" width="11" height="18" rx="2" fill="#5AABFF" />
      <Circle cx="100" cy="140" r="21" fill="#F2C090" />
      <Ellipse cx="100" cy="124" rx="21" ry="14" fill="#1A1A1A" />
      <Rect x="79" y="124" width="8" height="28" rx="4" fill="#1A1A1A" />
    </Svg>
  );
}

export default function SplashOne() {
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
        <WomanSittingIllustration />
      </View>

      <View className="flex-1 bg-[#FFFDF8] px-7 pt-6 pb-9 items-center justify-between">
        <Text className="text-[22px] font-ibm_bold text-[#1A1A1A] text-center tracking-tight">
          Order in the mobile app
        </Text>

        <Text className="text-sm text-[#999999] text-center leading-6 font-ibm_medium">
          Choose clothes online from home and{"\n"}place an order. Get bonuses!
        </Text>

        <View className="flex-row items-center gap-2">
          <View className="w-6 h-2 rounded-full bg-[#1A1A1A]" />
          <View className="w-2 h-2 rounded-full bg-[#E0E0E0]" />
          <View className="w-2 h-2 rounded-full bg-[#E0E0E0]" />
        </View>

        <Pressable
          onPress={() => router.push("/(splash)/first")}
          className="w-full bg-[#1A1A1A] rounded-2xl py-5 items-center active:opacity-80"
        >
          <Text className="text-white text-base font-ibm_medium tracking-wide">Next</Text>
        </Pressable>
      </View>
    </View>
  );
}
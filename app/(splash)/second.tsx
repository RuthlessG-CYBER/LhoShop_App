import { View, Text, Pressable, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import Svg, { Path, Circle, Rect, Ellipse } from "react-native-svg";

const { height } = Dimensions.get("window");

function WomanShoppingIllustration() {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 375 380" fill="none" preserveAspectRatio="xMidYMid meet">
      <Rect width="375" height="380" fill="#FFF6E8" />
      <Ellipse cx="187" cy="370" rx="150" ry="28" fill="#F0E4CC" opacity="0.8" />
      <Ellipse cx="187" cy="200" rx="120" ry="160" fill="#EEF0FF" opacity="0.6" />
      <Path d="M120 195 Q160 185 195 195 L208 330 Q160 340 118 330 Z" fill="#2E5DD4" />
      <Rect x="122" y="194" width="72" height="12" rx="6" fill="#F2D240" />
      <Ellipse cx="156" cy="168" rx="26" ry="30" fill="#2E5DD4" />
      <Path d="M130 168 Q116 158 109 170 L120 184 Q130 176 130 188" fill="#2E5DD4" />
      <Path d="M182 168 Q196 158 203 170 L192 184 Q182 176 182 188" fill="#2E5DD4" />
      <Rect x="96" y="170" width="9" height="44" rx="4.5" fill="#2E5DD4" transform="rotate(-10 100 170)" />
      <Rect x="56" y="196" width="40" height="46" rx="7" fill="#E8622A" />
      <Path d="M64 196 Q64 182 76 182 Q88 182 88 196" stroke="#1A1A1A" strokeWidth="3" fill="none" strokeLinecap="round" />
      <Rect x="63" y="210" width="24" height="3" rx="1.5" fill="#FF8A52" />
      <Rect x="63" y="218" width="18" height="3" rx="1.5" fill="#FF8A52" />
      <Rect x="63" y="226" width="20" height="3" rx="1.5" fill="#FF8A52" />
      <Rect x="186" y="160" width="9" height="48" rx="4.5" fill="#2E5DD4" transform="rotate(15 190 160)" />
      <Rect x="208" y="168" width="38" height="44" rx="7" fill="#1A1A1A" />
      <Path d="M216 168 Q216 154 227 154 Q238 154 238 168" stroke="#555" strokeWidth="3" fill="none" strokeLinecap="round" />
      <Rect x="215" y="182" width="20" height="3" rx="1.5" fill="#404040" />
      <Rect x="215" y="190" width="15" height="3" rx="1.5" fill="#404040" />
      <Rect x="125" y="326" width="18" height="36" rx="9" fill="#1A1A1A" transform="rotate(-6 134 326)" />
      <Rect x="158" y="326" width="18" height="36" rx="9" fill="#1A1A1A" transform="rotate(6 167 326)" />
      <Ellipse cx="126" cy="364" rx="16" ry="7" fill="#F2D240" />
      <Rect x="120" y="366" width="5" height="10" rx="2.5" fill="#F2D240" />
      <Ellipse cx="168" cy="360" rx="16" ry="7" fill="#F2D240" />
      <Rect x="162" y="362" width="5" height="10" rx="2.5" fill="#F2D240" />
      <Circle cx="155" cy="126" r="22" fill="#F2C090" />
      <Ellipse cx="155" cy="112" rx="26" ry="16" fill="#E8622A" />
      <Ellipse cx="155" cy="108" rx="18" ry="11" fill="#E8622A" />
      <Ellipse cx="155" cy="140" rx="22" ry="9" fill="#1A1A1A" />
      <Rect x="133" y="130" width="8" height="18" rx="4" fill="#1A1A1A" />
      <Rect x="174" y="130" width="8" height="18" rx="4" fill="#1A1A1A" />
      <Circle cx="82" cy="80" r="5" fill="#F2D240" opacity="0.85" />
      <Circle cx="280" cy="90" r="4" fill="#E8622A" opacity="0.7" />
      <Circle cx="300" cy="200" r="3" fill="#2E5DD4" opacity="0.6" />
      <Path d="M60 140 L63 132 L66 140 L60 140Z" fill="#2E5DD4" opacity="0.55" />
    </Svg>
  );
}

export default function SplashThree() {
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
        <WomanShoppingIllustration />
      </View>

      <View className="flex-1 bg-[#FFFDF8] px-7 pt-6 pb-9 items-center justify-between">
        <Text className="text-[22px] font-ibm_bold text-[#1A1A1A] text-center tracking-tight">
          Wear clothes with pleasure!
        </Text>

        <Text className="text-sm text-[#999999] text-center leading-6 font-ibm_medium">
          We have clothes for every season{"\n"}and for every taste
        </Text>

        <View className="flex-row items-center gap-2">
          <View className="w-2 h-2 rounded-full bg-[#E0E0E0]" />
          <View className="w-2 h-2 rounded-full bg-[#E0E0E0]" />
          <View className="w-6 h-2 rounded-full bg-[#1A1A1A]" />
        </View>

        <Pressable
          onPress={() => router.replace("/(auth)")}
          className="w-full bg-[#1A1A1A] rounded-2xl py-5 items-center active:opacity-80"
        >
          <Text className="text-white text-base font-ibm_medium tracking-wide">Get Started!</Text>
        </Pressable>
      </View>
    </View>
  );
}
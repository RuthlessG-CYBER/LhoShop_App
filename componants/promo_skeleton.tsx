import { View, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";

const { width } = Dimensions.get("window");

export default function PromoSkeleton() {
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const Shimmer = ({ style }: any) => (
    <View className="bg-gray-200 overflow-hidden" style={style}>
      <Animated.View
        style={{
          width,
          height: "100%",
          transform: [{ translateX }],
        }}
      >
        <LinearGradient
          colors={["#e5e5e5", "#f8f8f8", "#e5e5e5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );

  return (
    <View className="px-5 mt-6">

      <Shimmer style={{ height: 18, width: 140, borderRadius: 6, marginBottom: 12 }} />

      <Shimmer
        style={{
          height: 130,
          borderRadius: 16,
          marginBottom: 12,
        }}
      />

      <Shimmer
        style={{
          height: 130,
          borderRadius: 16,
        }}
      />

    </View>
  );
}

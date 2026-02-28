import { View, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";

export default function ProductSkeleton() {
  const translateX = useRef(new Animated.Value(-250)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: 250,
        duration: 1200,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const Shimmer = ({ style }: any) => (
    <View className="bg-gray-200 overflow-hidden" style={style}>
      <Animated.View
        style={{
          width: 250,
          height: "100%",
          transform: [{ translateX }],
        }}
      >
        <LinearGradient
          colors={["#e5e5e5", "#f8f8f8", "#e5e5e5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: 250, height: "100%" }}
        />
      </Animated.View>
    </View>
  );

  return (
    <View
      style={{
        width: 150,
        marginRight: 12,
      }}
      className="bg-gray-100 rounded-xl overflow-hidden border border-gray-100"
    >
      <Shimmer style={{ height: 176, width: "100%" }} />

      <View className="px-3 py-3">
        <Shimmer
          style={{
            height: 12,
            width: "90%",
            borderRadius: 6,
            marginBottom: 8,
          }}
        />

        <Shimmer
          style={{
            height: 12,
            width: "60%",
            borderRadius: 6,
          }}
        />

        <View className="flex-row justify-between items-center mt-3">
          <Shimmer style={{ height: 14, width: 50, borderRadius: 6 }} />
          <Shimmer style={{ height: 14, width: 40, borderRadius: 6 }} />
        </View>
      </View>
    </View>
  );
}

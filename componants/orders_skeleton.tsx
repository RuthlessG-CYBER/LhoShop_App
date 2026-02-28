import { View, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";

const { width } = Dimensions.get("window");

export default function OrdersSkeleton() {
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        duration: 5000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const Shimmer = ({ style }: any) => (
    <View className="bg-gray-200 overflow-hidden rounded-lg" style={style}>
      <Animated.View
        style={{
          transform: [{ translateX }],
          width: width,
          height: "100%",
        }}
      >
        <LinearGradient
          colors={["#e5e5e5", "#f3f3f3", "#e5e5e5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );

  return (
    <View className="bg-white p-4 px-5 border-b border-gray-300">
      <View className="flex-row justify-between mb-3">
        <Shimmer style={{ height: 10, width: 120 }} />
        <Shimmer style={{ height: 24, width: 70, borderRadius: 20 }} />
      </View>

      <View className="flex-row items-center mb-3">
        <Shimmer style={{ width: 70, height: 70, borderRadius: 12 }} />
        <View className="ml-3 flex-1">
          <Shimmer style={{ height: 12, width: "80%", marginBottom: 6 }} />
          <Shimmer style={{ height: 10, width: "40%", marginBottom: 6 }} />
          <Shimmer style={{ height: 12, width: "30%" }} />
        </View>
      </View>

      <View className="flex-row items-center mb-3">
        <Shimmer style={{ width: 70, height: 70, borderRadius: 12 }} />
        <View className="ml-3 flex-1">
          <Shimmer style={{ height: 12, width: "70%", marginBottom: 6 }} />
          <Shimmer style={{ height: 10, width: "35%" }} />
        </View>
      </View>

      <View className="mb-3">
        <Shimmer style={{ height: 8, width: "100%", borderRadius: 10 }} />
      </View>

      <View className="flex-row justify-between items-center mt-3">
        <Shimmer style={{ height: 10, width: 80 }} />
        <Shimmer style={{ height: 32, width: 90, borderRadius: 10 }} />
      </View>

      <View className="mt-3">
        <Shimmer style={{ height: 14, width: 120, marginBottom: 6 }} />
        <Shimmer style={{ height: 10, width: "90%" }} />
      </View>
    </View>
  );
}

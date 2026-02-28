import { View, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";

const { width } = Dimensions.get("window");

export default function ProductDetailsSkeleton() {
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
          colors={["#e5e5e5", "#f7f7f7", "#e5e5e5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );

  return (
    <View className="flex-1 bg-white">

      <View className="flex-row px-5 py-5 justify-between items-center mt-8">
        <Shimmer style={{ width: 36, height: 36, borderRadius: 10 }} />
        <Shimmer style={{ width: 140, height: 18, borderRadius: 6 }} />
        <Shimmer style={{ width: 36, height: 36, borderRadius: 10 }} />
      </View>

      <Shimmer style={{ width: "100%", height: 288 }} />

      <View className="px-5 mt-5">

        <Shimmer style={{ height: 22, width: "80%", borderRadius: 6, marginBottom: 12 }} />

        <Shimmer style={{ height: 18, width: "40%", borderRadius: 6, marginBottom: 20 }} />

        <View className="flex-row justify-center items-center mb-6">
          <Shimmer style={{ width: 40, height: 40, borderRadius: 10 }} />
          <Shimmer style={{ width: 40, height: 20, borderRadius: 6, marginHorizontal: 16 }} />
          <Shimmer style={{ width: 40, height: 40, borderRadius: 10 }} />
        </View>

        <Shimmer style={{ height: 12, width: "100%", borderRadius: 6, marginBottom: 10 }} />
        <Shimmer style={{ height: 12, width: "92%", borderRadius: 6, marginBottom: 10 }} />
        <Shimmer style={{ height: 12, width: "85%", borderRadius: 6, marginBottom: 20 }} />

        <Shimmer style={{ height: 14, width: 60, borderRadius: 6, marginBottom: 10 }} />

        <View className="flex-row mb-6">
          {[1, 2, 3, 4].map((i) => (
            <Shimmer
              key={i}
              style={{
                width: 40,
                height: 27,
                borderRadius: 10,
                marginRight: 10,
              }}
            />
          ))}
        </View>

        <Shimmer style={{ height: 14, width: 50, borderRadius: 6, marginBottom: 10 }} />

        <View className="flex-row">
          {[1, 2, 3].map((i) => (
            <Shimmer
              key={i}
              style={{
                width: 50,
                height: 30,
                borderRadius: 12,
                marginRight: 10,
              }}
            />
          ))}
        </View>
      </View>

      <View className="absolute bottom-0 left-0 right-0 bg-white p-4">
        <Shimmer style={{ height: 52, borderRadius: 16 }} />
      </View>
    </View>
  );
}

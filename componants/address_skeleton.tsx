import { View, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";

const { width } = Dimensions.get("window");

export default function AddressSkeleton() {
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
    <View
      className="bg-gray-200 overflow-hidden rounded-xl"
      style={style}
    >
      <Animated.View
        style={{
          transform: [{ translateX }],
          width: width,
          height: "100%",
        }}
      >
        <LinearGradient
          colors={["#e5e5e5", "#f5f5f5", "#e5e5e5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );

  return (
    <View className="bg-white p-4 flex-row items-center rounded-2xl mx-3 my-2">
      <Shimmer
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          marginRight: 12,
        }}
      />

      <View className="flex-1">
        <Shimmer
          style={{
            height: 12,
            width: "80%",
            marginBottom: 8,
          }}
        />

        <Shimmer
          style={{
            height: 12,
            width: "55%",
          }}
        />
      </View>

      <Shimmer
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          marginLeft: 12,
        }}
      />
    </View>
  );
}

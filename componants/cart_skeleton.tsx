import { View, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";

const { width } = Dimensions.get("window");

export default function CartSkeleton() {
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
          width: width,
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
    <View className="bg-white p-3 flex-row rounded-2xl border border-gray-200 ml-5 mr-5 mb-2 items-center">

      <Shimmer
        style={{
          width: 96,
          height: 96,
          borderRadius: 16,
        }}
      />

      <View className="flex-1 ml-4 mt-2">
        <Shimmer
          style={{
            height: 14,
            width: "85%",
            borderRadius: 6,
            marginBottom: 10,
          }}
        />

        <Shimmer
          style={{
            height: 12,
            width: "40%",
            borderRadius: 6,
          }}
        />
      </View>

      <Shimmer
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
        }}
      />
    </View>
  );
}

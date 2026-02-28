import { View, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";

const { width } = Dimensions.get("window");

export default function SearchSkeleton() {
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
    <View className="bg-white flex-row items-center px-5 py-3">

      <Shimmer
        style={{
          width: 64,
          height: 64,
          borderRadius: 12,
        }}
      />

      <View className="ml-5 flex-1">
        <Shimmer
          style={{
            height: 12,
            width: "80%",
            borderRadius: 6,
            marginBottom: 8,
          }}
        />

        <Shimmer
          style={{
            height: 10,
            width: "40%",
            borderRadius: 6,
          }}
        />
      </View>

      <Shimmer
        style={{
          width: 14,
          height: 14,
          borderRadius: 7,
        }}
      />
    </View>
  );
}

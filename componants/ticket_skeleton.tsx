import { View, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";

export default function TicketSkeleton() {
  const translateX = useRef(new Animated.Value(-350)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: 350,
        duration: 5000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const Shimmer = ({ style }: any) => (
    <View className="bg-gray-200 overflow-hidden rounded-md" style={style}>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <LinearGradient
          colors={["#e5e5e5", "#f5f5f5", "#e5e5e5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: 350, height: "100%" }}
        />
      </Animated.View>
    </View>
  );

  return (
    <View className="bg-gray-50 rounded-xl p-4 mb-3 mx-5">

      <View className="flex-row justify-between mb-3">
        <Shimmer style={{ width: 100, height: 12 }} />
        <Shimmer style={{ width: 70, height: 12 }} />
      </View>

      <Shimmer style={{ height: 12, width: "80%", marginBottom: 8 }} />

      <Shimmer style={{ height: 10, width: "95%", marginBottom: 6 }} />
      <Shimmer style={{ height: 10, width: "70%" }} />
    </View>
  );
}

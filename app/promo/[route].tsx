import {
  Pressable,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { BASE_URL } from "@/api/api";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  type: string;
}

export default function Promo() {
  const router = useRouter();

  const { id } = useLocalSearchParams();

  console.log(id);
  const [promo, setPromo] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPromo = async () => {
    try {
      setLoading(true);

      const url = `${BASE_URL}/${id}`;
      const res = await axios.get(url);

      setPromo(res.data.products || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromo();
  }, []);

  const ProductCard = ({ item }: { item: Product }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "../product/[id]",
          params: { id: item._id },
        })
      }
      className="flex-1 bg-white rounded-xl overflow-hidden elevation-sm border border-gray-100 gap-2 mb-2 ml-2 mr-2"
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: "100%", height: 150 }}
        resizeMode="cover"
      />

      <View style={{ padding: 10 }} className="bg-gray-100">
        <Text numberOfLines={2} className="text-sm font-ibm_medium">
          {item.name}
        </Text>
        <View className="flex-row items-center justify-between mt-2">
          <Text className="font-ibm_bold text-red-500">₹ {item.price}</Text>

          <View className="flex-row items-center">
            <Ionicons name="star" size={13} color="#F59E0B" />
            <Text className="text-xs ml-1 text-gray-500">{item.rating}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      <View className="flex-row items-center px-4 py-3 bg-white justify-between">
        <Pressable
          onPress={() => router.back()}
          className="px-3 py-2 bg-gray-200 rounded-xl"
        >
          <Ionicons name="chevron-back" size={22} color="black" />
        </Pressable>

        <Text className="text-xl font-ibm_bold">Promo Offers</Text>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      ) : promo.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-400 font-ibm_medium">
            No Promo Available
          </Text>
        </View>
      ) : (
        <FlatList
          data={promo}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ProductCard item={item} />}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ padding: 8 }}
        />
      )}
    </SafeAreaView>
  );
}

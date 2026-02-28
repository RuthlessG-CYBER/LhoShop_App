import { BASE_URL } from "@/api/api";
import SearchSkeleton from "@/componants/search_skeleton";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
}

export default function Search() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const skeletonData: Product[] = Array.from({ length: 6 }).map((_, i) => ({
    _id: `skeleton-${i}`,
    name: "",
    description: "",
    price: 0,
    image: "",
    rating: 0,
  }));

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products`);
      const data: Product[] = res.data.products || [];
      setAllProducts(data);
      setFiltered(data);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setQuery(text);

    if (!text.trim()) {
      setFiltered(allProducts);
      return;
    }

    const result = allProducts.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );

    setFiltered(result);
  };

  const ProductCard = ({ item }: { item: Product }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "../product/[id]",
          params: { id: item._id },
        })
      }
      className="bg-white flex-row items-center p-3 px-5"
    >
      <Image
        source={{ uri: item.image }}
        className="w-16 h-16 rounded-xl"
        resizeMode="cover"
      />

      <View className="ml-5 flex-1">
        <Text numberOfLines={1} className="font-ibm_medium text-black">
          {item.name}
        </Text>

        <Text className="text-gray-500 text-xs mt-1 font-ibm_regular">
          ₹ {item.price}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#aaa" />
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      <View className="flex-row items-center mt-2 gap-3 px-5">
        <Pressable
          onPress={() => router.back()}
          className="bg-gray-100 rounded-2xl py-3.5 px-3 elevation-sm"
        >
          <Ionicons name="chevron-back" size={22} color="black" />
        </Pressable>

        <View
          className="flex-1 flex-row items-center bg-white rounded-3xl px-4 elevation-sm"
          style={{
            height: 50,
          }}
        >
          <Ionicons name="search" size={18} color="#666" />

          <TextInput
            value={query}
            onChangeText={handleSearch}
            placeholder="Search products..."
            placeholderTextColor="#999"
            className="flex-1 ml-3 text-black font-ibm_regular"
            autoFocus
          />

          {query.length > 0 && (
            <Pressable onPress={() => handleSearch("")}>
              <Ionicons name="close-circle" size={18} color="#999" />
            </Pressable>
          )}
        </View>
      </View>
      <FlatList
        data={loading ? skeletonData : filtered}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) =>
          loading ? <SearchSkeleton /> : <ProductCard item={item} />
        }
        contentContainerStyle={{ paddingBottom: 10, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading ? (
            <View className="items-center mt-20">
              <Text className="text-gray-500 font-ibm_regular">
                No products found.
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

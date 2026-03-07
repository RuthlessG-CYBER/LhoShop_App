import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Toast from "react-native-simple-toast";
import { BASE_URL } from "@/api/api";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductSkeleton from "@/componants/product_skeleton";
import PromoSkeleton from "@/componants/promo_skeleton";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  type: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
}

export default function Home() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const data = await AsyncStorage.getItem("user");
      if (!data) return;

      const parsed: User = JSON.parse(data);

      setUser(parsed);
    };

    loadUser();
  }, []);

  const userName = user?.name || "Guest User";

  const skeletonData: Product[] = Array.from({ length: 6 }).map((_, i) => ({
    _id: `skeleton-${i}`,
    name: "",
    image: "",
    price: 0,
    rating: 0,
    type: "",
  }));

  const categories: string[] = [
    "All",
    "Fashion",
    "Shoes",
    "Beauty",
    "Electronics",
  ];

  const fetchProfileImage = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (!userData) return;

      const user = JSON.parse(userData);
      const res = await axios.get(`${BASE_URL}/profile-image/${user.id}`);

      const imageUrl = res.data.image;
      setProfileImage(imageUrl);
    } catch (error) {
      console.log("Error fetching profile image:", error);
    }
  };

  useEffect(() => {
    fetchProfileImage();

    const interval = setInterval(fetchProfileImage, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async (isRefresh = false): Promise<void> => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);

      const res = await axios.get(`${BASE_URL}/products`);

      const data = res.data.products || [];

      setProducts(data);
      setAllProducts(data);
    } catch (error) {
      Toast.show("Failed to load products", Toast.LONG);
      console.log(error);
    } finally {
      isRefresh ? setRefreshing(false) : setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onRefresh = (): void => {
    fetchProducts(true);
  };

  const filterProducts = (index: number) => {
    setActiveCategory(index);

    if (index === 0) {
      setProducts(allProducts);
      return;
    }

    const selectedType = categories[index].toLowerCase();

    const filtered = allProducts.filter(
      (p) => p.type?.toLowerCase() === selectedType,
    );

    setProducts(filtered);
  };

  const ProductCard = ({ item }: { item: Product }) => (
    <View
      style={{
        width: 150,
        marginRight: 12,
      }}
      className="bg-gray-100 rounded-xl overflow-hidden elevation-sm border border-gray-100"
    >
      <Pressable
        android_ripple={{ color: "#eee" }}
        onPress={() =>
          router.push({
            pathname: "../product/[id]",
            params: { id: item._id },
          })
        }
      >
        <Image
          source={{ uri: item.image }}
          className="w-full h-44"
          resizeMode="cover"
        />

        <View className="px-3 py-3">
          <Text
            numberOfLines={2}
            className="text-sm font-ibm_medium text-black"
          >
            {item.name}
          </Text>

          <View className="flex-row items-center justify-between mt-2">
            <Text className="font-ibm_bold text-red-400">₹ {item.price}</Text>
            <View className="flex-row items-center">
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text className="text-xs ml-1 text-gray-500 font-ibm_medium">
                {item.rating}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );

  const promos = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
      title: "FASHION FIESTA",
      subtitle: "UP TO 70% OFF",
      desc: "Trending outfits, casual wear & new arrivals at crazy prices",
      endpoint: "getPromo/fashion",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
      title: "BEAUTY CARNIVAL",
      subtitle: "BUY 1 GET 1 FREE",
      desc: "Makeup, skincare & personal care combos",
      endpoint: "getPromo/beauty",
    },
  ];

  const PromoItem = ({
    image,
    title,
    subtitle,
    desc,
    onPress,
  }: {
    image: string;
    title: string;
    subtitle: string;
    desc: string;
    onPress: () => void;
  }) => (
    <Pressable
      onPress={onPress}
      className="mt-3 rounded-2xl flex-row overflow-hidden"
      style={{
        backgroundColor: "#EDEDED",
        height: 130,
      }}
    >
      <Image
        source={{ uri: image }}
        resizeMode="cover"
        style={{ width: 120, height: "100%" }}
      />

      <View className="flex-1 px-4 justify-center items-end py-1">
        <Text className="text-lg font-ibm_bold text-black text-right">
          {title}
        </Text>

        <Text className="text-lg font-ibm_bold text-black text-right">
          {subtitle}
        </Text>

        <Text
          numberOfLines={2}
          className="text-xs text-gray-600 mt-1 text-right font-ibm_regular"
        >
          {desc}
        </Text>

        <View className="bg-gray-800 px-5 py-1.5 rounded-lg self-end mt-2">
          <Text className="text-white text-[10px] font-ibm_regular">
            Shop Now
          </Text>
        </View>
      </View>
    </Pressable>
  );

  const ListHeader = () => (
    <>
      <View className="flex-row justify-between items-center mt-2 px-5">
        <View>
          <Text className="text-gray-400 text-sm font-ibm_medium">Hello,</Text>
          <Text className="text-3xl font-ibm_bold uppercase">{userName}{" "}</Text>
        </View>

        <Pressable
          onPress={() => router.push("/profile")}
          style={{
            width: 48,
            height: 48,
            borderRadius: 28,
            overflow: "hidden",
            backgroundColor: "#E5E7EB",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          ) : (
            <Ionicons name="person" size={28} color="#555" />
          )}
        </Pressable>
      </View>

      <View className="flex-row items-center px-5 mt-6">
        <Pressable
          onPress={() => router.push("../search")}
          className="flex-1 flex-row items-center bg-gray-100 rounded-3xl px-4 py-4 shadow-sm"
        >
          <Ionicons name="search" size={18} color="#000" />

          <Text className="flex-1 ml-3 text-sm text-gray-400 font-ibm_regular">
            Search clothes, shoes...
          </Text>

          <MaterialIcons name="tune" size={18} color="#444" />
        </Pressable>

        <Pressable
          onPress={() => router.push("../cart")}
          className="ml-3 bg-primary px-4 py-4 rounded-full justify-center items-center"
        >
          <Ionicons name="bag-handle" size={20} color="#fff" />
        </Pressable>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        className="mt-6"
        renderItem={({ item, index }) => {
          const active = index === activeCategory;

          return (
            <Pressable
              onPress={() => filterProducts(index)}
              className={`px-5 py-1 rounded-xl mr-3 border border-gray-500 ${
                active ? "bg-Black" : "bg-white"
              }`}
            >
              <Text
                className={`text-sm font-ibm_medium ${
                  active ? "text-white" : "text-gray-700"
                }`}
              >
                {item}
              </Text>
            </Pressable>
          );
        }}
      />

      <View className="flex-row justify-between items-center mt-4 px-5 mb-4">
        <Text className="text-xl font-ibm_bold text-[#2F2F2F]">
          Popular Items
        </Text>

        <Pressable>
          <Text className="text-sm font-ibm_medium text-primary">See All</Text>
        </Pressable>
      </View>
    </>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      <FlatList
        data={[{ key: "products-section" }]}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={() => (
          <>
            <FlatList
              horizontal
              data={loading ? skeletonData : products}
              keyExtractor={(item) => item._id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              renderItem={({ item }) =>
                loading ? <ProductSkeleton /> : <ProductCard item={item} />
              }
            />
            {loading ? (
              <PromoSkeleton />
            ) : (
              <View className="px-5 mt-6 mb-6">
                <View className="flex-row items-center justify-between">
                  <Text className="text-xl font-ibm_bold text-[#2F2F2F]">
                    Special Promos
                  </Text>

                  <Pressable onPress={() => router.push("../promo")}>
                    <Text className="text-sm text-primary font-ibm_medium">
                      See all
                    </Text>
                  </Pressable>
                </View>

                {promos.map((item) => (
                  <PromoItem
                    key={item.id}
                    image={item.image}
                    title={item.title}
                    subtitle={item.subtitle}
                    desc={item.desc}
                    onPress={() =>
                      router.push({
                        pathname: "../promo/[route]",
                        params: { id: item.endpoint },
                      })
                    }
                  />
                ))}
              </View>
            )}
          </>
        )}
      />
    </SafeAreaView>
  );
}

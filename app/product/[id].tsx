import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/api/api";
import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-simple-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductDetailsSkeleton from "@/componants/product[id]_skeleton";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
}

interface Address {
  _id: string;
  address: string;
}

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);

  const colors = ["#BDBDBD", "#D7CCC8", "#E0E0E0", "#000000"];
  const sizes = ["L", "XL", "XXL"];

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
    fetchAddresses();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products/${id}`);
      setProduct(res.data.product || res.data);
    } finally {
      setLoading(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      const parsed = JSON.parse(userData || "{}");
      const userId = parsed?.id || parsed?.user?.id;

      const res = await axios.get(`${BASE_URL}/addresses/${userId}`);

      const mapped = res.data.addresses.map((a: any) => ({
        _id: a._id,
        address: a.value,
      }));

      setAddresses(mapped);

      if (mapped.length) setSelectedAddress(mapped[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = async (productId?: string) => {
    try {
      if (!productId) return;

      const userData = await AsyncStorage.getItem("user");

      if (!userData) {
        Toast.show("Login first", Toast.LONG);
        return;
      }

      const parsed = JSON.parse(userData);

      const userId = parsed?.id || parsed?.user?.id;

      if (!userId) {
        Toast.show("User not found", Toast.LONG);
        return;
      }

      await axios.post(`${BASE_URL}/cart/add`, {
        userId,
        productId,
        quantity: quantity,
        color: colors[selectedColor].toString(),
        size: sizes[selectedSize].toString(),
      });
      // console.log(
      //   "Added to cart",
      //   productId,
      //   userId,
      //   colors[selectedColor],
      //   sizes[selectedSize],
      // );

      Toast.show("Added to cart successfully!", Toast.LONG);
    } catch (err: any) {
      console.log("Add cart error:", err.response?.data);

      const message = err.response?.data?.message || "Failed to add cart";

      Toast.show(message, Toast.LONG);
    }
  };

  if (loading) return <ProductDetailsSkeleton />;
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row px-5 py-3 justify-between items-center">
        <Pressable
          onPress={() => router.back()}
          className="p-2 bg-gray-100 rounded-xl px-3 py-2"
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </Pressable>
        <Text className="text-lg font-ibm_medium">Product Details</Text>

        <Pressable className="p-2 bg-gray-100 rounded-xl px-3 py-2">
          <FontAwesome name="heart" size={24} color="black" />
        </Pressable>
      </View>

      <ScrollView>
        <View className="mt-3">
          <Image source={{ uri: product?.image }} className="w-full h-72" />

          <View className="flex-row items-center justify-between px-5 mt-3">
            <View className="flex-row items-center gap-2">
              <View className="flex-row items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FontAwesome
                    key={i}
                    name="star"
                    size={12}
                    color={
                      i <= Math.round(product?.rating || 0)
                        ? "#FBBF24"
                        : "#E5E7EB"
                    }
                  />
                ))}
              </View>
              <Text className="text-sm font-ibm_regular text-gray-600">
                | {product?.rating.toFixed(1)} ratings
              </Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between px-5 mt-3">
            <Text className="text-2xl font-ibm_bold">{product?.name}</Text>
            <Text className="text-2xl font-ibm_bold text-red-500">
              ₹{product?.price}
            </Text>
          </View>
          <View className="flex-row items-center justify-center px-5 mt-3">
            <View className="flex-row items-center rounded-full px-4 py-2">
              <Pressable
                className="w-10 h-10 rounded-xl bg-gray-200 items-center justify-center"
                onPress={decreaseQuantity}
              >
                <FontAwesome6 name="minus" size={16} color="black" />
              </Pressable>

              <Text className="mx-4 text-xl font-ibm_bold">{quantity}</Text>

              <Pressable
                className="w-10 h-10 rounded-xl bg-gray-600 items-center justify-center"
                onPress={increaseQuantity}
              >
                <FontAwesome6 name="plus" size={16} color="white" />
              </Pressable>
            </View>
          </View>

          <Text className="text-lg mt-4 font-ibm_medium px-5">Description</Text>
          <Text className="text-gray-600 font-ibm_regular px-5 text-sm mt-1">
            {product?.description}
          </Text>

          <View className="flex-row justify-between px-5 mt-6">
            <View>
              <Text className="text-lg font-ibm_medium mb-3 text-gray-700">
                Color
              </Text>

              <View className="flex-row items-center">
                {colors.map((color, index) => {
                  const active = index === selectedColor;

                  return (
                    <Pressable
                      key={index}
                      onPress={() => setSelectedColor(index)}
                      style={{
                        width: 40,
                        height: 27,
                        borderRadius: 10,
                        backgroundColor: color,
                        marginRight: 10,
                        borderWidth: active ? 2 : 0,
                        borderColor: "#111",
                      }}
                    />
                  );
                })}
              </View>
            </View>

            <View>
              <Text className="text-lg font-ibm_medium mb-3 text-gray-700">
                Size
              </Text>

              <View className="flex-row">
                {sizes.map((size, index) => {
                  const active = index === selectedSize;

                  return (
                    <Pressable
                      key={index}
                      onPress={() => setSelectedSize(index)}
                      className={`px-4 py-1.5 rounded-xl mr-2 border border-gray-600 ${
                        active ? "bg-gray-800" : "bg-gray-100"
                      }`}
                    >
                      <Text
                        className={`text-xs font-ibm_medium ${
                          active ? "text-white" : "text-black"
                        }`}
                      >
                        {size}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 flex-row gap-3">
        <Pressable
          className="flex-1 py-4 rounded-2xl items-center bg-gray-700"
          onPress={() => handleAddToCart(product?._id)}
        >
          <Text className="text-white font-ibm_bold">Add to Cart</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

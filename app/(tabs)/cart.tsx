import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Modal,
  FlatList,
} from "react-native";
import { useState, useMemo, useCallback } from "react";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter, useFocusEffect } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/api/api";
import Toast from "react-native-simple-toast";
import RazorpayCheckout from "react-native-razorpay";
import CartSkeleton from "@/componants/cart_skeleton";

const RAZORPAY_KEY = "rzp_test_Rj5p6Q7Ycz9Msw";

export default function Cart() {
  const router = useRouter();

  const [cart, setCart] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const fetchCart = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (!userData) return;

      const parsed = JSON.parse(userData);
      const userId = parsed?.id || parsed?.user?.id;

      const res = await axios.get(`${BASE_URL}/cart/${userId}`);

      setCart(res.data.products || []);
    } catch (e) {
      console.log("CART ERROR:", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (!userData) return;

      const parsed = JSON.parse(userData);
      const userId = parsed?.id || parsed?.user?.id;

      const res = await axios.get(`${BASE_URL}/addresses/${userId}`);

      const mapped = res.data.addresses.map((a: any) => ({
        _id: a._id,
        address: a.value,
      }));

      setAddresses(mapped);

      if (mapped.length) setSelectedAddress(mapped[0]);
    } catch (e) {
      console.log("ADDRESS ERROR:", e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCart();
      fetchAddresses();
    }, []),
  );

  const deleteCart = async (productId: string) => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (!userData) return;

      const parsed = JSON.parse(userData);
      const userId = parsed?.id || parsed?.user?.id;

      await axios.delete(`${BASE_URL}/cart/remove`, {
        data: { userId, productId },
      });

      Toast.show("Product removed from cart", Toast.LONG);
      fetchCart();
    } catch (e) {
      console.log("DELETE ERROR:", e);
    }
  };

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const changeQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        const id = item.productId?._id || item.productId;

        if (id === productId) {
          const newQty = Math.max(1, item.quantity + delta);

          return { ...item, quantity: newQty };
        }

        return item;
      }),
    );
  };

  const startPayment = async () => {
    try {
      if (!selectedAddress) {
        Toast.show("Select address first", Toast.LONG);
        return;
      }

      if (!cart.length) {
        Toast.show("Cart empty", Toast.LONG);
        return;
      }

      const userData = await AsyncStorage.getItem("user");
      const parsed = JSON.parse(userData || "{}");
      const userId = parsed?.id || parsed?.user?.id;

      const items = cart.map((i) => ({
        productId: i.productId?._id || i.productId,
        quantity: i.quantity,
        price: i.price,
      }));

      const { data } = await axios.post(`${BASE_URL}/payment/order`, {
        amount: total,
      });

      const options = {
        key: RAZORPAY_KEY,
        amount: data.amount,
        order_id: data.id,
        name: "LhoShop App Store",
        currency: "INR",
        description: "Payment for order",
        theme: { color: "#000" },
      };

      const paymentData = await RazorpayCheckout.open(options);

      await axios.post(`${BASE_URL}/payment/verify`, {
        ...paymentData,
        userId,
        items,
        address: selectedAddress.address,
        amount: total,
      });

      Toast.show("Payment Successful", Toast.LONG);

      setShowAddressModal(false);
      fetchCart();
    } catch (error) {
      Toast.show("Payment failed - " + error, Toast.LONG);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      <View className="px-5 py-4 flex-row justify-between items-center">
        <View className="flex-row items-center gap-5">
          <Pressable
            onPress={() => router.back()}
            className="p-2 bg-gray-100 rounded-xl px-4 py-3"
          >
            <Ionicons name="arrow-back" size={20} color="black" />
          </Pressable>
          <Text className="text-2xl font-ibm_medium">Checkout</Text>
        </View>
        <Text className="text-sm text-gray-400 font-ibm_regular">
          {cart.length} items
        </Text>
      </View>

      {cart.length === 0 && !loading && (
        <View className="flex-1 justify-center items-center">
          <Ionicons name="cart-outline" size={100} color="#ccc" />
          <Text className="text-gray-400 font-ibm_regular">Cart is empty</Text>
        </View>
      )}

      <ScrollView className="mt-5">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <CartSkeleton key={i} />)
          : cart.map((item) => (
              <View
                key={item.productId?._id || item.productId}
                className="bg-white p-3 flex-row rounded-2xl border border-gray-200 ml-5 mr-5 mb-2"
              >
                <Image
                  source={{ uri: item.image }}
                  className="w-24 h-24 rounded-2xl"
                />

                <View className="flex-1 ml-4">
                  <View className="flex-row items-center justify-between">
                    <Text className="font-ibm_medium">{item.name}</Text>
                    <Pressable
                      onPress={() => deleteCart(item.productId)}
                      className="bg-red-50 p-2 rounded-xl"
                    >
                      <Ionicons name="trash-outline" size={15} color="red" />
                    </Pressable>
                  </View>
                  <Text className="text-sm text-gray-500 font-ibm_regular">
                    Qty: {item.quantity}
                  </Text>

                  <View className="flex-row items-center gap-4 justify-between">
                    <Text className="text-red-600 font-ibm_bold">
                      ₹ {item.price}
                    </Text>
                    <View className="flex-row items-center gap-3 mt-1">
                      <Pressable
                        onPress={() =>
                          changeQty(item.productId?._id || item.productId, -1)
                        }
                        className="p-2 bg-gray-200 rounded-lg"
                      >
                        <Feather name="minus" size={18} color="black" />
                      </Pressable>

                      <Text className="w-6 text-center font-ibm_medium">
                        {item.quantity}
                      </Text>

                      <Pressable
                        onPress={() =>
                          changeQty(item.productId?._id || item.productId, +1)
                        }
                        className="p-2 bg-gray-200 rounded-lg"
                      >
                        <Feather name="plus" size={18} color="black" />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            ))}

        <View className="h-32" />
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Pressable
          onPress={() => setShowAddressModal((prev) => !prev)}
          className="rounded-2xl p-4 mb-4 flex-row justify-between items-center"
          style={{ backgroundColor: "#F3EDED" }}
        >
          <View className="flex-1">
            <View className="flex-row items-center gap-1">
              <MaterialIcons name="location-on" size={15} color="black" />
              <Text className="font-ibm_bold text-sm mb-1">
                Shipping Address
              </Text>
            </View>

            <Text
              numberOfLines={2}
              className="text-xs text-gray-600 font-ibm_regular ml-1"
            >
              {selectedAddress?.address || "Select address"}
            </Text>
          </View>

          <Ionicons name="chevron-down" size={18} color="#555" />
        </Pressable>

        {showAddressModal && (
          <View className="mb-4 max-h-40">
            <FlatList
              data={addresses}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    setSelectedAddress(item);
                    setShowAddressModal(false);
                  }}
                  className="p-3 rounded-xl mb-2 border border-gray-200 bg-gray-50"
                >
                  <Text className="text-xs font-ibm_regular">{item.address}</Text>
                </Pressable>
              )}
            />
          </View>
        )}

        <View className="mb-4">
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500 text-sm font-ibm_regular">Subtotal</Text>
            <Text className="text-sm font-ibm_regular">₹ {total}</Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500 text-sm font-ibm_regular">Shipping</Text>
            <Text className="text-sm font-ibm_regular">₹ 25</Text>
          </View>

          <View className="h-[1px] bg-gray-200 my-2" />

          <View className="flex-row justify-between">
            <Text className="font-ibm_bold">Total Amount</Text>
            <Text className="font-ibm_bold">₹ {total + 25}</Text>
          </View>
        </View>

        <Pressable
          onPress={startPayment}
          className="bg-Black py-4 rounded-2xl items-center"
        >
          <Text className="text-white font-ibm_medium text-base">
            Order Now
          </Text>
        </Pressable>
      </View>

      {/* <Modal visible={showAddressModal} animationType="slide" transparent>
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-white rounded-t-3xl p-5 max-h-[70%]">
            <FlatList
              data={addresses}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => setSelectedAddress(item)}
                  className={`p-4 rounded-xl mb-3 border ${
                    selectedAddress?._id === item._id
                      ? "border-black bg-gray-100"
                      : "border-gray-200"
                  }`}
                >
                  <Text>{item.address}</Text>
                </Pressable>
              )}
            />

            <Pressable
              onPress={startPayment}
              className="bg-black py-4 rounded-xl items-center mt-2"
            >
              <Text className="text-white">Continue to Pay</Text>
            </Pressable>

            <Pressable
              onPress={() => setShowAddressModal(false)}
              className="bg-gray-200 py-4 rounded-xl items-center mt-2"
            >
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}
    </SafeAreaView>
  );
}

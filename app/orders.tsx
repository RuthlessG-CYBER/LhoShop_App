import { BASE_URL } from "@/api/api";
import OrdersSkeleton from "@/componants/orders_skeleton";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-simple-toast";

export default function Orders() {
  const router = useRouter();

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [returnLoading, setReturnLoading] = useState<string | null>(null);

  const skeletonOrders = Array.from({ length: 4 }).map((_, i) => ({
    _id: `skeleton-${i}`,
  }));

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const userData = await AsyncStorage.getItem("user");
      const parsed = JSON.parse(userData || "{}");
      const userId = parsed?.id || parsed?.user?.id;

      if (!userId) return;

      const res = await axios.get(`${BASE_URL}/orders/${userId}`);
      setOrders(res.data.orders || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getReturnColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Refunded":
        return "bg-blue-100 text-blue-700";
      case "Replaced":
        return "bg-indigo-100 text-indigo-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getProgress = (status: string) => {
    switch (status) {
      case "Processing":
        return 33;
      case "Shipped":
        return 66;
      case "Delivered":
        return 100;
      default:
        return 0;
    }
  };

  const formatDate = (date: string) => new Date(date).toLocaleDateString();

  const downloadInvoice = async (orderId: string) => {
    try {
      const url = `${BASE_URL}/admin/download-invoice/${orderId}`;
      await Linking.openURL(url);
    } catch {
      Alert.alert("Failed to open invoice");
    }
  };

  const requestReturn = async (paymentId: string) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Toast.show("Please login again", Toast.LONG);
        return;
      }

      setReturnLoading(paymentId);

      await axios.post(
        `${BASE_URL}/returns`,
        {
          paymentId,
          reason: "Customer requested return",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      Toast.show("Return request submitted", Toast.LONG);
      fetchOrders();
    } catch (err: any) {
      Toast.show(
        err?.response?.data?.message || "Failed to request return",
        Toast.LONG,
      );
    } finally {
      setReturnLoading(null);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      <View className="flex-row items-center py-4 px-5 justify-between">
        <View className="flex-row items-center gap-5">
          <Pressable
            onPress={() => router.back()}
            className="px-3 py-2 bg-gray-100 rounded-xl"
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </Pressable>
          <Text className="text-2xl font-ibm_medium text-center">
            My Orders
          </Text>
        </View>

        {!loading && (
          <Text className="text-sm text-gray-400 font-ibm_regular">
            {orders.length} {orders.length === 1 ? "Order" : "Orders"}
          </Text>
        )}
      </View>

      <FlatList
        data={loading ? skeletonOrders : orders}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        ListEmptyComponent={
          !loading ? (
            <View className="flex-1 items-center justify-center mt-20">
              <Ionicons name="bag-outline" size={50} color="#9CA3AF" />
              <Text className="text-gray-400 mt-4">No orders found</Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => {
          if (loading) return <OrdersSkeleton />;

          const hasReturn = !!item.returnStatus;

          return (
            <View className="bg-gray-50 p-4 border-b border-gray-200 px-5 mb-2">
              <View className="flex-row justify-between mb-3">
                <Text className="text-xs text-gray-500">
                  Order ID: {item.orderId}
                </Text>

                <View
                  className={`px-3 py-1 rounded-full ${getStatusColor(item.status)}`}
                >
                  <Text className="text-xs capitalize">{item.status}</Text>
                </View>
              </View>

              {item.items?.map((p: any, index: number) => (
                <View key={index} className="flex-row items-center mb-3">
                  <Image
                    source={{ uri: p.productId?.image }}
                    style={{ width: 70, height: 70, borderRadius: 12 }}
                  />
                  <View className="ml-3 flex-1">
                    <Text numberOfLines={1}>{p.productId?.name}</Text>
                    <Text className="text-gray-500 text-xs">
                      Qty: {p.quantity}
                    </Text>
                    <Text className="font-semibold">₹ {p.price}</Text>
                  </View>
                </View>
              ))}

              <View className="mt-3">
                <View className="h-2 bg-gray-200 rounded-full">
                  <View
                    className="h-2 bg-black rounded-full"
                    style={{ width: `${getProgress(item.delivaryStatus)}%` }}
                  />
                </View>

                <Text className="text-xs text-gray-500 mt-1">
                  {item.delivaryStatus}
                </Text>
              </View>

              <View className="border-t border-gray-100 pt-2 mt-3">
                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-500 text-xs">
                    {formatDate(item.createdAt)}
                  </Text>

                  {item.delivaryStatus === "Delivered" && (
                    <View className="flex-row gap-3">
                      <Pressable
                        onPress={() => downloadInvoice(item.orderId)}
                        className="flex-row items-center bg-gray-100 px-3 py-2 rounded-xl border border-gray-300"
                      >
                        <Ionicons
                          name="download-outline"
                          size={16}
                          color="#111"
                        />
                        <Text className="text-xs ml-2">Invoice</Text>
                      </Pressable>

                      {hasReturn ? (
                        <View
                          className={`px-3 py-2 rounded-xl ${getReturnColor(item.returnStatus)}`}
                        >
                          <Text className="text-xs font-semibold">
                            Return {item.returnStatus}
                          </Text>
                        </View>
                      ) : (
                        <Pressable
                          disabled={returnLoading === item.paymentId}
                          onPress={() =>
                            Alert.alert(
                              "Return Item",
                              "Do you want to request return?",
                              [
                                { text: "Cancel" },
                                {
                                  text: "Confirm",
                                  onPress: () => requestReturn(item._id),
                                },
                              ],
                            )
                          }
                          className="flex-row items-center bg-red-50 px-3 py-2 rounded-xl border border-red-200"
                        >
                          {returnLoading === item.paymentId ? (
                            <ActivityIndicator size="small" />
                          ) : (
                            <>
                              <Ionicons
                                name="refresh-outline"
                                size={16}
                                color="#DC2626"
                              />
                              <Text className="text-xs ml-2 text-red-600">
                                Return
                              </Text>
                            </>
                          )}
                        </Pressable>
                      )}
                    </View>
                  )}
                </View>

                <Text className="font-bold text-base mt-2">
                  Total ₹ {item.amount}
                </Text>

                <Text className="text-xs text-gray-500 mt-1">
                  {item.address}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

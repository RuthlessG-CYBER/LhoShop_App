import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  ListRenderItem,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "@/api/api";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import AddressSkeleton from "@/componants/address_skeleton";

type AddressType = {
  _id: string;
  address: string;
};

export default function Address() {
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState("");

  const fetchAddresses = async () => {
    try {
      setLoading(true);

      const userData = await AsyncStorage.getItem("user");
      if (!userData) return;

      const parsed = JSON.parse(userData);
      const userId = parsed?.id;

      const res = await axios.get(`${BASE_URL}/addresses/${userId}`);

      const mapped = res.data.addresses.map((addr: any) => ({
        _id: addr._id,
        address: addr.value,
      }));

      setAddresses(mapped);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const addAddress = async () => {
    if (!input.trim()) return;

    try {
      const userData = await AsyncStorage.getItem("user");
      if (!userData) return;

      const parsed = JSON.parse(userData);
      const userId = parsed?.id;

      await axios.post(`${BASE_URL}/add-address/${userId}`, {
        userId,
        address: input,
      });

      setInput("");
      setVisible(false);

      fetchAddresses();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAddress = async (addressId: string) => {
    try {
      const userData = await AsyncStorage.getItem("user");
      const parsed = JSON.parse(userData!);

      await axios.delete(`${BASE_URL}/addresses/${parsed.id}/${addressId}`);

      fetchAddresses();
    } catch (err: any) {
      console.log("DELETE ERROR:", err.response?.data);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const renderItem: ListRenderItem<AddressType> = ({ item, index }) => (
    <View className="bg-white p-4 flex-row items-center elevation-sm rounded-2xl mx-3 my-2">
      <View className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center mr-3 border border-gray-300">
        <Text className="text-xs font-semibold text-gray-600">{index + 1}</Text>
      </View>

      <View className="flex-1 ml-1">
        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={16} color="#444" />

          <Text numberOfLines={2} className="ml-2 text-sm text-gray-800 flex-1">
            {item.address}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={() => deleteAddress(item._id)}
        className="ml-3 p-2 rounded-full bg-red-50"
      >
        <Ionicons name="trash-outline" size={18} color="#ef4444" />
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="flex-row justify-between items-center py-4 px-5">
        <Pressable
          onPress={() => router.back()}
          className="p-2 bg-gray-100 rounded-xl px-4 py-3"
        >
          <Ionicons name="arrow-back" size={20} color="black" />
        </Pressable>

        <Text className="text-xl font-ibm_medium">My Addresses</Text>

        <Pressable
          onPress={() => setVisible(true)}
          className="bg-black p-3 rounded-full"
        >
          <Ionicons name="add" size={20} color="white" />
        </Pressable>
      </View>

      {addresses.length === 0 && !loading && (
        <View className="flex-1 items-center justify-center">
          <Ionicons name="location-outline" size={60} color="#ccc" />
          <Text className="text-gray-400 mt-3 font-ibm_regular">
            No address added yet
          </Text>
        </View>
      )}

      {loading ? (
        <>
          {Array.from({ length: 6 }).map((_, i) => (
            <AddressSkeleton key={i} />
          ))}
        </>
      ) : (
        <FlatList
          data={addresses}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={() => (
            <View className="flex-1 items-center justify-center mt-24">
              <Ionicons name="location-outline" size={60} color="#ccc" />
              <Text className="text-gray-400 mt-3">No address added yet</Text>
            </View>
          )}
        />
      )}

      <Modal visible={visible} animationType="fade" transparent>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 bg-black/40 justify-end">
              <View className="bg-white rounded-t-3xl p-5 max-h-[85%]">
                <ScrollView
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                >
                  <Text className="text-lg font-semibold mb-4">
                    Add Address
                  </Text>

                  <TextInput
                    placeholder="Enter full address"
                    placeholderTextColor="#666"
                    value={input}
                    onChangeText={setInput}
                    multiline
                    textAlignVertical="top"
                    className="border border-gray-200 rounded-xl px-4 py-4 mb-4 min-h-[100px]"
                  />

                  <View className="flex-row gap-3">
                    <Pressable
                      onPress={() => setVisible(false)}
                      className="flex-1 bg-gray-200 py-3 rounded-xl items-center"
                    >
                      <Text>Cancel</Text>
                    </Pressable>

                    <Pressable
                      onPress={addAddress}
                      className="flex-1 bg-black py-3 rounded-xl items-center"
                    >
                      <Text className="text-white">Save</Text>
                    </Pressable>
                  </View>
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  TextInput,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../api/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import TicketSkeleton from "@/componants/ticket_skeleton";
import Toast from "react-native-simple-toast";

type Ticket = {
  _id: string;
  ticketId: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
};

export default function Report() {
  const [email, setEmail] = useState("");

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [open, setOpen] = useState(false);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const skeletonTickets = Array.from({ length: 6 }).map((_, i) => ({
    _id: `skeleton-${i}`,
  })) as Ticket[];

  useEffect(() => {
    const load = async () => {
      const data = await AsyncStorage.getItem("user");
      if (!data) return;

      const user = JSON.parse(data);
      setEmail(user.email);
      fetchTickets(user.email);
    };

    load();
  }, []);

  const fetchTickets = async (userEmail?: string) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}/tickets/email/${userEmail || email}`,
      );

      setTickets(res.data.tickets || []);
    } catch {
      Alert.alert("Failed to load tickets");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useCallback(() => {
    fetchTickets();
  }, []);

  const submitTicket = async () => {
    if (!subject || !message) {
      Alert.alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${BASE_URL}/tickets`, {
        subject,
        message,
        customerName: "App User",
        customerEmail: email,
        priority: "Medium",
      });

      setOpen(false);
      setSubject("");
      setMessage("");

      fetchTickets();

      Toast.show("Ticket submitted successfully", Toast.LONG);

    } catch {
      Toast.show("Failed to submit ticket", Toast.LONG);
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "Resolved":
      case "Closed":
        return "#22c55e";
      case "In Progress":
        return "#3b82f6";
      default:
        return "#f59e0b";
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="flex-row justify-between items-center mb-6 px-5 mt-5">
        <View>
          <View className="flex-row items-center gap-2 mb-1">
            <Ionicons name="headset-outline" size={28} color="#4b5563" />
            <Text className="text-2xl font-ibm_bold">Support Center</Text>
          </View>
          <View className="flex-row items-center gap-1 ml-10">
            <Ionicons name="mail-outline" size={10} color="#4b5563" />
            <Text className="text-gray-500 text-xs font-ibm_regular">
              {email}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setOpen(true)}
          className="bg-primary px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-ibm_medium">+ New Report</Text>
        </TouchableOpacity>
      </View>

      <View className="mb-3 flex-row items-center justify-between px-5">
        <View className="flex-row items-center gap-5">
          <Ionicons
            name="chevron-back"
            size={24}
            color="black"
            onPress={() => router.back()}
          />

          <Text className="text-md font-ibm_bold mb-2 underline">
            Your Reports
          </Text>
        </View>
        <Text className="text-gray-500 text-sm mb-2 ml-5 font-ibm_regular">
          {tickets.length} Reports
        </Text>
      </View>

      <FlatList
        data={loading ? skeletonTickets : tickets}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchTickets();
            }}
          />
        }
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
        renderItem={({ item }) =>
          loading ? (
            <TicketSkeleton />
          ) : (
            <View className="bg-gray-50 rounded-xl p-4 mb-3 elevation-sm ml-5 mr-5">
              <View className="flex-row justify-between">
                <Text className="font-ibm_medium underline">
                  {item.ticketId}
                </Text>

                <Text
                  style={{ color: statusColor(item.status) }}
                  className="font-ibm_medium"
                >
                  {item.status}
                </Text>
              </View>

              <Text className="mt-1 font-ibm_medium">SUB: {item.subject}</Text>
              <Text className="text-gray-500 text-sm mt-1">
                MSG: {item.message}
              </Text>
            </View>
          )
        }
        ListEmptyComponent={
          !loading ? (
            <View className="flex-1 items-center mt-40">
              <Ionicons name="document" size={60} color="#ccc" />
              <Text className="text-gray-400 mt-4 font-ibm_regular">
                No reports yet
              </Text>
            </View>
          ) : null
        }
      />

      <Modal visible={open} animationType="slide" transparent>
        <View className="flex-1 bg-black/40 justify-center p-5">
          <View className="bg-white rounded-2xl p-5">
            <Text className="text-lg font-ibm_bold mb-4">Create Report</Text>

            <TextInput
              placeholder="Subject"
              value={subject}
              onChangeText={setSubject}
              placeholderTextColor="#000"
              className="border rounded-lg px-4 py-3 mb-3 font-ibm_regular text-black"
            />

            <TextInput
              placeholder="Message"
              multiline
              value={message}
              onChangeText={setMessage}
              placeholderTextColor="#000"
              className="border rounded-lg px-4 py-3 mb-4 h-24 font-ibm_regular text-black"
            />

            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => setOpen(false)}
                className="flex-1 border border-gray-300 py-3 rounded-lg items-center font-ibm_regular"
              >
                <Text className="font-ibm_regular">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={submitTicket}
                className="flex-1 bg-primary py-3 rounded-lg items-center"
              >
                <Text className="text-white font-ibm_bold">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

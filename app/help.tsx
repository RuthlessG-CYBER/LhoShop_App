import { View, Text, Pressable, ScrollView, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

interface RowProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  desc: string;
  onPress?: () => void;
}

export default function Help() {
  const router = useRouter();

  const Row = ({ icon, title, desc, onPress }: RowProps) => (
    <Pressable
      onPress={onPress}
      className="bg-white p-4 rounded-2xl mb-4 flex-row items-center"
      style={{
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      }}
    >
      <View className="bg-gray-100 p-3 rounded-xl">
        <Ionicons name={icon} size={20} color="#111" />
      </View>

      <View className="flex-1 ml-4">
        <Text className="font-ibm_medium text-black">{title}</Text>
        <Text className="text-gray-400 text-xs mt-1 font-ibm_regular">
          {desc}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#bbb" />
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      <View className="flex-row items-center py-4 px-5 justify-between">
        <Pressable onPress={() => router.back()} className="px-3 py-2 bg-gray-100 rounded-xl">
          <Ionicons name="chevron-back" size={24} color="black" />
        </Pressable>

        <Text className="text-xl font-ibm_bold ml-4">Help & Support</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 15 }}
      >
        <Text className="text-gray-400 text-xs mb-3 ml-1 font-ibm_bold">
          FAQ
        </Text>

        <Row
          icon="cube-outline"
          title="Track Orders"
          desc="Check live delivery status from My Orders page"
          onPress={() =>
            alert(
              "To track your orders, go to the 'My Orders' section in your profile. You can see the live status of all your deliveries there.",
            )
          }
        />

        <Row
          icon="card-outline"
          title="Payments"
          desc="Secure payments powered by Razorpay"
          onPress={() =>
            alert(
              "We accept payments via Razorpay. You can find more information about Razorpay here.",
            )
          }
        />

        <Row
          icon="refresh-outline"
          title="Refunds"
          desc="Refunds processed within 5–7 business days"
          onPress={() => alert("We process refunds within 5–7 business days.")}
        />

        <Row
          icon="close-circle-outline"
          title="Cancel Order"
          desc="Cancel within 24 hours of purchase"
          onPress={() =>
            alert("You can cancel your order within 24 hours of purchase.")
          }
        />

        <Text className="text-gray-400 text-xs mt-6 mb-3 ml-1 font-ibm_bold">
          CONTACT US
        </Text>

        <Row
          icon="mail-outline"
          title="Email Support"
          desc="support@lhoshop.com"
          onPress={() => Linking.openURL("mailto:support@lhoshop.com")}
        />

        <Row
          icon="call-outline"
          title="Call Support"
          desc="+91 99999 99999"
          onPress={() => Linking.openURL("tel:9999999999")}
        />

        <Row
          icon="logo-whatsapp"
          title="WhatsApp Chat"
          desc="Chat with our support team"
          onPress={() => Linking.openURL("https://wa.me/919999999999")}
        />

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}

import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { COLORS } from "@/assets/theme/color";

export default function TabLayout() {
  const renderIcon = (name: any, focused: any) => (
    <View
      style={{
        height: 40,
        width: 40,
        marginTop: 20,
        borderRadius: 14,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: focused ? COLORS.darkBlack : "transparent",
      }}
    >
      <Ionicons
        name={name}
        size={20}
        color={focused ? COLORS.White : COLORS.Gray}
      />
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          height: 60,
          backgroundColor: COLORS.White,
          borderTopWidth: 0,
          elevation: 0,
          paddingVertical: 0,
          paddingHorizontal: 0
        },

        tabBarItemStyle: {
          flex: 1,
          padding: 0,
          margin: 0,
        },

        tabBarIconStyle: {
          margin: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => renderIcon("home", focused),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => renderIcon("search", focused),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => renderIcon("cart", focused),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => renderIcon("person", focused),
        }}
      />
    </Tabs>
  );
}

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const minimalMenuItems = [
    {
      icon: "person-outline",
      label: "User Name",
      value: user?.name || "Guest User",
      action: "",
    },
    {
      icon: "mail-outline",
      label: "Email ID",
      value: user?.email || "guest.user@spicedelivery.com",
      action: "",
    },
    {
      icon: "location-outline",
      label: "Saved Address",
      value: "2 Addresses",
      action: "",
    },
    {
      icon: "settings-outline",
      label: "System Settings",
      value: "",
      action: "settings",
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerContainer}>
        <View style={styles.avatarWrapper}>
          <Image
            source={require("../../assets/profile.png")}
            style={styles.avatar}
          />
        </View>
        <Text style={[styles.mainTitle, { color: colors.text }]}>
          My Account
        </Text>
        <Text style={[styles.subTitle, { color: colors.textSecondary }]}>
          guest.user@spicedelivery.com
        </Text>
      </View>

      <View style={styles.listContainer}>
        {minimalMenuItems.map((item, index) => {
          const isActionable = !!item.action;
          return (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.menuItem,
                index < minimalMenuItems.length - 1 && [
                  styles.menuItemBorder,
                  { borderBottomColor: colors.border },
                ],
              ]}
              activeOpacity={isActionable ? 0.6 : 1}
              disabled={!isActionable}
              onPress={() => {
                if (item.action === "settings") {
                  navigation.navigate("Settings");
                }
              }}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={isActionable ? "#FF6B35" : colors.textSecondary}
                  style={styles.iconWidth}
                />
                <Text style={[styles.menuLabel, { color: colors.text }]}>
                  {item.label}
                </Text>
              </View>

              <View style={styles.menuItemRight}>
                {item.value ? (
                  <Text
                    style={[styles.menuValue, { color: colors.textSecondary }]}
                    numberOfLines={1}
                  >
                    {item.value}
                  </Text>
                ) : null}
                {isActionable ? (
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={colors.border}
                  />
                ) : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 88,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 36,
  },
  avatarWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 16,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#f8fafc",
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  subTitle: {
    fontSize: 13,
    fontWeight: "400",
    marginTop: 4,
    opacity: 0.8,
  },
  listContainer: {
    width: "100%",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    height: 56,
  },
  menuItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWidth: {
    width: 24,
    marginRight: 14,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: -0.2,
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: 24,
  },
  menuValue: {
    fontSize: 14,
    fontWeight: "400",
    maxWidth: "85%",
  },
});

export default Profile;
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

const Settings = () => {
  const { colors, theme, toggleTheme } = useTheme();
  const navigation = useNavigation();

  const [pushEnabled, setPushEnabled] = useState(true);
  const [offersEnabled, setOffersEnabled] = useState(false);
  const [gpsTracking, setGpsTracking] = useState(true);
  const [biometrics, setBiometrics] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header bar */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[
            styles.backButton,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
            },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Settings
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Notifications & Updates */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
            Alerts & Notifications
          </Text>
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.row,
                styles.divider,
                { borderBottomColor: colors.border },
              ]}
            >
              <View style={styles.rowLeft}>
                <View
                  style={[
                    styles.iconCircle,
                    {
                      backgroundColor: theme === "dark" ? "#1e3a2f" : "#e6f4ea",
                    },
                  ]}
                >
                  <Ionicons
                    name="notifications-outline"
                    size={18}
                    color="#10b981"
                  />
                </View>
                <View>
                  <Text style={[styles.rowLabel, { color: colors.text }]}>
                    Push Notifications
                  </Text>
                  <Text
                    style={[styles.rowSub, { color: colors.textSecondary }]}
                  >
                    Receive delivery updates
                  </Text>
                </View>
              </View>
              <Switch
                value={pushEnabled}
                onValueChange={setPushEnabled}
                trackColor={{ false: "#cbd5e1", true: "#10b981" }}
                thumbColor={pushEnabled ? "#34d399" : "#f8fafc"}
              />
            </View>

            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <View
                  style={[
                    styles.iconCircle,
                    {
                      backgroundColor: theme === "dark" ? "#4c1d1d" : "#fef2f2",
                    },
                  ]}
                >
                  <Ionicons name="gift-outline" size={18} color="#ef4444" />
                </View>
                <View>
                  <Text style={[styles.rowLabel, { color: colors.text }]}>
                    Promo & Offers
                  </Text>
                  <Text
                    style={[styles.rowSub, { color: colors.textSecondary }]}
                  >
                    Discounts and deals alerts
                  </Text>
                </View>
              </View>
              <Switch
                value={offersEnabled}
                onValueChange={setOffersEnabled}
                trackColor={{ false: "#cbd5e1", true: "#ef4444" }}
                thumbColor={offersEnabled ? "#fca5a5" : "#f8fafc"}
              />
            </View>
          </View>
        </View>

        {/* System & Location */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
            System & Access
          </Text>
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.row,
                styles.divider,
                { borderBottomColor: colors.border },
              ]}
            >
              <View style={styles.rowLeft}>
                <View
                  style={[
                    styles.iconCircle,
                    {
                      backgroundColor: theme === "dark" ? "#1e293b" : "#f1f5f9",
                    },
                  ]}
                >
                  <Ionicons name="location-outline" size={18} color="#64748b" />
                </View>
                <View>
                  <Text style={[styles.rowLabel, { color: colors.text }]}>
                    GPS Tracking
                  </Text>
                  <Text
                    style={[styles.rowSub, { color: colors.textSecondary }]}
                  >
                    Realtime driver location
                  </Text>
                </View>
              </View>
              <Switch
                value={gpsTracking}
                onValueChange={setGpsTracking}
                trackColor={{ false: "#cbd5e1", true: "#64748b" }}
                thumbColor={gpsTracking ? "#cbd5e1" : "#f8fafc"}
              />
            </View>

            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <View
                  style={[
                    styles.iconCircle,
                    {
                      backgroundColor: theme === "dark" ? "#1c2d42" : "#f0f7ff",
                    },
                  ]}
                >
                  <Ionicons
                    name="finger-print-outline"
                    size={18}
                    color="#3b82f6"
                  />
                </View>
                <View>
                  <Text style={[styles.rowLabel, { color: colors.text }]}>
                    Biometrics
                  </Text>
                  <Text
                    style={[styles.rowSub, { color: colors.textSecondary }]}
                  >
                    Fingerprint or FaceID
                  </Text>
                </View>
              </View>
              <Switch
                value={biometrics}
                onValueChange={setBiometrics}
                trackColor={{ false: "#cbd5e1", true: "#3b82f6" }}
                thumbColor={biometrics ? "#60a5fa" : "#f8fafc"}
              />
            </View>
          </View>
        </View>

        {/* Legal and version
        <Text style={[styles.legalText, { color: colors.textSecondary }]}>
          Terms of Service • Privacy Policy • Open Source Licenses
        </Text>
        <Text style={[styles.versionText, { color: colors.textSecondary }]}>
          Spice Delivery v2.1.0 (Production)
        </Text> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 44,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  scrollContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  divider: {
    borderBottomWidth: 1,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 1,
  },
  rowSub: {
    fontSize: 11,
    fontWeight: "500",
  },
  legalText: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 6,
  },
  versionText: {
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 40,
  },
});

export default Settings;

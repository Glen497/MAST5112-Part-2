import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MenuForm, MenuFormValues } from "./src/components/MenuForm";
import { MenuItemCard } from "./src/components/MenuItemCard";
import { Course, MenuItem } from "./src/types";

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [confirmation, setConfirmation] = useState("");

  function addMenuItem(values: MenuFormValues) {
    const item: MenuItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: values.name.trim(),
      description: values.description.trim(),
      course: values.course as Course,
      price: Number(values.price),
    };

    setMenuItems((items) => [item, ...items]);
    setConfirmation("Menu item added successfully!");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.brandMark}>
                <Text style={styles.brandIcon}>✦</Text>
              </View>
              <Text style={styles.title}>Chef&apos;s Menu Manager</Text>
              <Text style={styles.subtitle}>
                Create and keep track of the dishes on your menu.
              </Text>
            </View>

            <MenuForm
              onAdd={addMenuItem}
              onChange={() => setConfirmation("")}
              confirmation={confirmation}
            />

            <View style={styles.menuSection}>
              <View style={styles.menuHeadingRow}>
                <View>
                  <Text style={styles.sectionTitle}>Your Menu</Text>
                  <Text style={styles.itemCount}>
                    {menuItems.length}{" "}
                    {menuItems.length === 1 ? "dish" : "dishes"}
                  </Text>
                </View>
                <View style={styles.countBadge}>
                  <Text style={styles.countBadgeText}>{menuItems.length}</Text>
                </View>
              </View>

              {menuItems.length === 0 ? (
                <View style={styles.emptyState}>
                  <View style={styles.emptyIconCircle}>
                    <Text style={styles.emptyIcon}>🍽</Text>
                  </View>
                  <Text style={styles.emptyTitle}>Your menu is empty</Text>
                  <Text style={styles.emptyMessage}>
                    Add your first dish using the form above.
                  </Text>
                </View>
              ) : (
                <View style={styles.menuList}>
                  {menuItems.map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </View>
              )}
            </View>

            <Text style={styles.footer}>Made for your next great menu.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#18392B",
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: "#F5F6F0",
  },
  content: {
    width: "100%",
    maxWidth: 620,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  header: {
    alignItems: "center",
    backgroundColor: "#18392B",
    marginHorizontal: -20,
    paddingTop: 28,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  brandMark: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#527A52",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  brandIcon: {
    color: "#FFFFFF",
    fontSize: 24,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "700",
    letterSpacing: 0.2,
    textAlign: "center",
  },
  subtitle: {
    color: "#DCE6D9",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 7,
    textAlign: "center",
  },
  menuSection: {
    marginTop: 30,
  },
  menuHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  sectionTitle: {
    color: "#18392B",
    fontSize: 22,
    fontWeight: "700",
  },
  itemCount: {
    color: "#6F776D",
    fontSize: 13,
    marginTop: 3,
  },
  countBadge: {
    minWidth: 38,
    height: 38,
    borderRadius: 19,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E3EBDD",
  },
  countBadgeText: {
    color: "#18392B",
    fontSize: 15,
    fontWeight: "700",
  },
  emptyState: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E7EAE2",
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
  },
  emptyIconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#EEF3EA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  emptyIcon: {
    fontSize: 28,
  },
  emptyTitle: {
    color: "#18392B",
    fontSize: 17,
    fontWeight: "700",
  },
  emptyMessage: {
    color: "#6F776D",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
    textAlign: "center",
  },
  menuList: {
    gap: 12,
  },
  footer: {
    color: "#8A9086",
    fontSize: 12,
    textAlign: "center",
    marginTop: 26,
  },
});

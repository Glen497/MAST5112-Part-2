import { StyleSheet, Text, View } from "react-native";
import { MenuItem } from "../types";

type MenuItemCardProps = {
  item: MenuItem;
};

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.courseTag}>
        <Text style={styles.courseText}>{item.course}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E7EAE2",
    padding: 16,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  name: {
    flex: 1,
    color: "#18392B",
    fontSize: 17,
    fontWeight: "700",
  },
  price: {
    color: "#527A52",
    fontSize: 16,
    fontWeight: "700",
  },
  description: {
    color: "#626B60",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  courseTag: {
    alignSelf: "flex-start",
    backgroundColor: "#EEF3EA",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 12,
  },
  courseText: {
    color: "#406640",
    fontSize: 12,
    fontWeight: "600",
  },
});

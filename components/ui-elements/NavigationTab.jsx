import { View, Text, StyleSheet } from "react-native";

export default function NavigationTab() {
  return (
    <View style={styles.rootContainer}>
      <View>
        <Text>Movies</Text>
      </View>
      <View>
        <Text>Search Results</Text>
      </View>
      <View>
        <Text>TV Shows</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    alignItems: "center",
    borderBottomColor: "#777777ff",
    borderBottomWidth: 2,
  },
});

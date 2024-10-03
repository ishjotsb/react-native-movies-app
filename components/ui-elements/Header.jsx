import { StatusBar, Text, StyleSheet, View } from "react-native";
import Colors from "../constants/colors";

export default function Header() {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.headerText}>Movies App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.primaryColor,
  },
  headerText: {
    padding: 16,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.textColor2,
    marginTop: 50
  },
});

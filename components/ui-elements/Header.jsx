import { SafeAreaView, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";

export default function Header() {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <Text style={styles.headerText}>The Movies App</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.tertiaryColor,
  },
  headerText: {
    padding: 16,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.textColor2
  },
});

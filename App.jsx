import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Colors from "./components/constants/colors";
import Header from "./components/ui-elements/Header";
import NavigationTab from "./components/ui-elements/NavigationTab";
import TVShowsScreen from "./screens/TVShowsScreen";

export default function App() {
  return (
    <View style={styles.rootContainer}>
      <Header />
      <NavigationTab />
      <TVShowsScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.accentColor,
    flex: 1,
  },
});

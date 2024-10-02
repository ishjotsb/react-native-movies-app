import { View, StyleSheet, Text, TouchableOpacity, StatusBar } from "react-native";
import { Colors } from "../constants/colors";

export default function NavigationTab({navigation}) {

    function handleActiveScreen(screen) {
        navigation.navigate(screen)
    }

  return (
    <View style={styles.rootContainer}>
    <StatusBar style="auto" backgroundColor="green" />
      <View>
        <TouchableOpacity style={styles.button} onPress={() => handleActiveScreen("Movies")}>
          <Text style={styles.buttonText}>Movies</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => handleActiveScreen("SearchScreen")}>
          <Text style={styles.buttonText}>Search Results</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => handleActiveScreen("TVShowsScreen")}>
          <Text style={styles.buttonText}>TV Shows</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    alignItems: "center",
    borderBottomColor: "#777777ff",
    borderBottomWidth: 2,
  },
  button: {
    padding: 8,
  },
});

import { View, StyleSheet, Text, TouchableOpacity, StatusBar } from "react-native";
import { Colors } from "../constants/colors";

export default function NavigationTab({navigation, activeScreen}) {

    function handleActiveScreen(screen) {
        navigation.navigate(screen)
    }

  return (
    <View style={styles.rootContainer}>
      <View style={activeScreen == 'movies' ? styles.activeTab : ""}>
        <TouchableOpacity style={[{...styles.button, borderBottomColor: 'black'}]} onPress={() => handleActiveScreen("Movies")}>
          <Text style={[styles.buttonText, (activeScreen == 'movies') ? "" : styles.inactiveText]}>Movies</Text>
        </TouchableOpacity>
      </View>
      <View style={activeScreen == 'search' ? styles.activeTab : ""}>
        <TouchableOpacity style={styles.button} onPress={() => handleActiveScreen("SearchScreen")}>
          <Text style={[styles.buttonText, (activeScreen == 'search') ? "" : styles.inactiveText]}>Search Results</Text>
        </TouchableOpacity>
      </View>
      <View style={activeScreen == 'tv' ? styles.activeTab : ""}>
        <TouchableOpacity style={styles.button} onPress={() => handleActiveScreen("TVShowsScreen")}>
          <Text style={[styles.buttonText, (activeScreen == 'tv') ? "" : styles.inactiveText]}>TV Shows</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    // padding: 12,
    alignItems: "center",
    borderBottomColor: "#ddddddff",
    borderBottomWidth: 2,
  },
  button: {
    padding: 18,
  },
  activeTab: {
    borderBottomColor: '#2b3d50',
    borderBottomWidth: 3
  },
  inactiveText: {
    color: '#777'
  }
});

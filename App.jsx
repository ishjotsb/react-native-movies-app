import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Colors from "./components/constants/colors";
import TVShowsScreen from "./screens/TVShowsScreen";
import MoviesScreen from "./screens/MoviesScreen";
import { useState } from "react";
import MovieStack from "./stacks/AppStack";

export default function App() {
  const [activeScreen, setActiveScreen] = useState("Movies");

  function handleScreenChange(screen) {
    setActiveScreen(screen);
  }

  let currScreen = <MoviesScreen />;

  if (activeScreen == "Movies") {
    currScreen = <MoviesScreen />;
  } else if (activeScreen == "Search Results") {
    // currScreen = <SearchResults />
  } else if (activeScreen == "TV Shows") {
    currScreen = <TVShowsScreen />;
  }

  return (
    <View style={styles.rootContainer}>
      <MovieStack />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.accentColor,
    flex: 1,
  },
});

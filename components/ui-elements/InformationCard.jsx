import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function InformationCard({ data, onPress }) {
  const Stack = createNativeStackNavigator();

  return (
    <View style={styles.rootContainer}>
      <Image
        source={{ uri: "https://image.tmdb.org/t/p/w500" + data.poster_path }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.heading}>
          {!data.name ? data.original_title : data.name}
        </Text>
        <Text style={styles.subtext}>Popularity: {data.popularity}</Text>
        <Text style={styles.subtext}>
          Release Date:{" "}
          {!data.first_air_date ? data.release_date : data.first_air_date}
        </Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    padding: 12,
    gap: 12,
    borderBottomColor: "#aaa",
    borderBottomWidth: 1,
  },
  textContainer: {
    justifyContent: "center",
    flex: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtext: {
    fontSize: 14,
    marginBottom: 8,
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#4DAFE3",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

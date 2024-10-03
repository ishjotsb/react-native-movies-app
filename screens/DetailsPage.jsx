import { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { API_ACCESS_TOKEN } from "@env";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_ACCESS_TOKEN}`,
  },
};

export default function DetailsPage({ route, navigation }) {
  const { id, type } = route.params;
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  console.log("id", id, type);

  useLayoutEffect(() => {
    // console.log(details);
    navigation.setOptions({
      title: !details.original_title ? details.name : details.original_title,
      headerBackTitle:
        type == "movie"
          ? "Movies"
          : type == "tv"
          ? "TV Shows"
          : "Search Results",
    });
  }, [navigation, id, loading]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
          options
        );
        const data = await response.json();
        // console.log(data);
        setDetails(data);
        setLoading(false);
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchDetails();
  }, [id]);

  return (
    <>
      {!loading && (
        <View style={styles.rootContainer}>
          <Text style={styles.header}>
            {!details.original_title ? details.name : details.original_title}
          </Text>
          <Image
            source={{
              uri: "https://image.tmdb.org/t/p/w500" + details.poster_path,
            }}
            style={styles.image}
          />
          <Text style={styles.overviewText}>{details.overview}</Text>
          <View style={styles.information}>
            <Text style={styles.infoText}>
              Popularity: {details.popularity} | Release Date:{" "}
              {!details.first_air_date
                ? details.release_date
                : details.first_air_date}
            </Text>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 52,
    paddingHorizontal: 56,
    gap: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 24,
  },
  image: {
    width: 250,
    height: 250,
  },
  information: {
    flexDirection: "row",
  },
  infoText: {
    fontSize: 12,
    color: "#555",
  },
  overviewText: {
    color: "#555",
    lineHeight: 20,
    marginTop: 12,
  },
});

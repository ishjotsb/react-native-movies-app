import { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDAxMTFhMTM0ODhmZTczYmI1OTI0NWFlNWE2NTg0NyIsIm5iZiI6MTcyNzczMzMyNC44Nzc1NzksInN1YiI6IjY2ZmIxZGMxYzU5YTJkYjMyZGQwMzE4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._P4FAodnx2kM_bZ14g40ji83HB4q90-p4Tq4rgX9Fec`,
  },
};

export default function DetailsPage({ route, navigation }) {
  const { id, type } = route.params;
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: !details.original_title ? details.name : details.original_title,
      headerBackTitle: (type == 'movie' ? "Movies" : "TV Shows")
    });
  }, [navigation, id, loading]);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
        options
      );
      const data = await response.json();
      console.log(data);
      setDetails(data);
      setLoading(false);
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
            <Text style={styles.infoText}>Popularity: {details.popularity} | Release Date: {!details.first_air_date ? details.release_date : details.first_air_date}</Text>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
    rootContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 52,
        paddingHorizontal: 56,
        gap: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 24
    },
    image: {
        width: 250,
        height: 250
    },
    information: {
        flexDirection: 'row',
    },
    infoText: {
        fontSize: 12,
        color: '#555'
    },
    overviewText: {
        color: '#555',
        lineHeight: 20,
        marginTop: 12
    }
})
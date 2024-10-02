import { SafeAreaView, View, StyleSheet, FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
import InformationCard from "../components/ui-elements/InformationCard";
import Dropdown from "../components/ui-elements/Dropdown";
import NavigationTab from "../components/ui-elements/NavigationTab";
import Header from "../components/ui-elements/Header";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDAxMTFhMTM0ODhmZTczYmI1OTI0NWFlNWE2NTg0NyIsIm5iZiI6MTcyNzczMzMyNC44Nzc1NzksInN1YiI6IjY2ZmIxZGMxYzU5YTJkYjMyZGQwMzE4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._P4FAodnx2kM_bZ14g40ji83HB4q90-p4Tq4rgX9Fec`,
  },
};

export default function TVShowsScreen({ navigation }) {
  const [tvShowList, setTvShowList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("popular");

  useEffect(() => {
    const fetchTVShows = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`,
        options
      );
      const data = await response.json();
      setTvShowList(data.results);
      setLoading(false);
    };

    fetchTVShows();
  }, [category]);

  function handleDropdownChange(value) {
    console.log(value);
    setCategory(value);
  }

  function handleDetailsPage(id) {
    navigation.navigate("DetailsPage", { id: id, type: "tv" });
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <Header />
      <NavigationTab navigation={navigation} />
      <View style={styles.dropdownContainer}>
        <Dropdown handleDropdown={handleDropdownChange} page="tv" />
      </View>
      <View style={styles.listContainer}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={tvShowList}
            renderItem={({ item }) => (
              <InformationCard
                data={item}
                onPress={() => handleDetailsPage(item.id)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 12,
  },
  flatListContent: {
    paddingBottom: 16,
  },
  dropdownContainer: {
    zIndex: 10,
    marginBottom: 50,
  },
});

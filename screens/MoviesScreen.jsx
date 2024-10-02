import { SafeAreaView, View, StyleSheet, FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
import InformationCard from "../components/ui-elements/InformationCard";
import Dropdown from "../components/ui-elements/Dropdown";
import DetailsPage from "./DetailsPage";
import Header from "../components/ui-elements/Header";
import NavigationTab from "../components/ui-elements/NavigationTab";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer `,
  },
};

export default function MoviesScreen({ navigation }) {
  const [tvShowList, setTvShowList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("popular");

  useEffect(() => {
    const fetchTVShows = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
        options
      );
      const data = await response.json();
      setTvShowList(data.results);
      setLoading(false);
    };

    fetchTVShows();
  }, [category]);

  function handleDropdownChange(value) {
    setCategory(value);
  }

  function handleDetailsPage(id) {
    console.log(id);
    navigation.navigate("DetailsPage", { id: id, type: "movie" });
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <Header />
      <NavigationTab navigation={navigation} />
      <View style={styles.dropdownContainer}>
        <Dropdown handleDropdown={handleDropdownChange} page="movies" />
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

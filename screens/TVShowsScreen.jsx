import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import InformationCard from "../components/ui-elements/InformationCard";
import Dropdown from "../components/ui-elements/Dropdown";
import NavigationTab from "../components/ui-elements/NavigationTab";
import Header from "../components/ui-elements/Header";
import { API_ACCESS_TOKEN } from "@env";

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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTVShows = async (pageNum = 1) => {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=${pageNum}`,
        options
      );
      const data = await response.json();
      setTvShowList(data.results);
      setTotalPages(data.total_pages);
      setLoading(false);
    };

    fetchTVShows(page);
  }, [category, page]);

  function handleDropdownChange(value) {
    setCategory(value);
    setPage(1);
  }

  
  function handleDetailsPage(id) {
    navigation.navigate("DetailsPage", { id: id, type: "tv" });
  }

  const renderPagination = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <TouchableOpacity
          key={i}
          onPress={() => setPage(i)}
          style={styles.pageButton}
        >
          <Text style={i === page ? styles.activePage : styles.pageNumber}>
            {i}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.paginationContainer}>
        {page > 1 && (
          <TouchableOpacity
            onPress={() => setPage(page - 1)}
            style={styles.pageButton}
          >
            <Text style={styles.pageNumber}>Previous</Text>
          </TouchableOpacity>
        )}
        {pageNumbers}
        {page < totalPages && (
          <TouchableOpacity
            onPress={() => setPage(page + 1)}
            style={styles.pageButton}
          >
            <Text style={styles.pageNumber}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.rootContainer}>
      <Header />
      <NavigationTab navigation={navigation} activeScreen="tv" />
      <View style={styles.dropdownContainer}>
        <Dropdown handleDropdown={handleDropdownChange} page="tv" />
      </View>
      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
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
      {!loading && renderPagination()}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
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
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  pageButton: {
    marginHorizontal: 5,
    padding: 10,
  },
  pageNumber: {
    fontSize: 16,
    color: "#000",
  },
  activePage: {
    fontSize: 16,
    color: "#fff",
    backgroundColor: "#000",
    padding: 5,
    borderRadius: 3,
  },
});

import {
  View,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState } from "react";
import Header from "../components/ui-elements/Header";
import NavigationTab from "../components/ui-elements/NavigationTab";
import Icon from "react-native-vector-icons/FontAwesome";
import DropDownPicker from "react-native-dropdown-picker";
import InformationCard from "../components/ui-elements/InformationCard";
import { API_ACCESS_TOKEN } from "@env";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_ACCESS_TOKEN}`,
  },
};

export default function SearchScreen({ navigation }) {
  const option = [
    { label: "Collection", value: "collection" },
    { label: "Company", value: "company" },
    { label: "Keyword", value: "keyword" },
    { label: "Movie", value: "movie" },
    { label: "Multi", value: "multi" },
    { label: "Person", value: "person" },
    { label: "TV", value: "tv" },
  ];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("movie");
  const [items, setItems] = useState(option);
  const [searchQuery, setSearchQuery] = useState("");
  const [list, setList] = useState([]);
  const [isError, setIsError] = useState(false);

  const fetchResults = async () => {
    if (!searchQuery) {
      setIsError(true);
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/${value}?query=${searchQuery}&page=1`,
        options
      );
      const data = await response.json();
      console.log(data);
      setList(data.results);
      setIsError(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInput = (text) => {
    setSearchQuery(text);
    if (text) {
      setIsError(false);
    }
  };

  function handleDetailsPage(id) {
    console.log(id);
    navigation.navigate("DetailsPage", { id: id, type: value });
  }

  return (
    <View style={styles.container}>
      <Header />
      <NavigationTab navigation={navigation} activeScreen="search" />

      <View style={styles.outerSearchContainer}>
        <Text style={styles.searchLabel}>
          Search Movie/TV Show Name <Text style={styles.mandatoryLabel}>*</Text>
        </Text>
        <View
          style={[
            styles.searchContainer,
            isError && !searchQuery ? styles.errorBorder : null,
          ]}
        >
          <Icon
            name="search"
            size={20}
            color="gray"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            onChangeText={handleInput}
            value={searchQuery}
          />
        </View>

        <View style={styles.dropdownContainer}>
          <Text style={[{ ...styles.searchLabel, marginTop: 20 }]}>
            Choose Search Type <Text style={styles.mandatoryLabel}>*</Text>
          </Text>
          <View
            style={[
              styles.categoryContainer,
              isError && !searchQuery ? styles.errorBorder : null,
            ]}
          >
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={[
                styles.dropdown,
                isError && !searchQuery ? styles.errorBorder : null,
              ]}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={fetchResults}
            >
              <Icon
                name="search"
                size={20}
                color="gray"
                style={[{ ...styles.searchIcon, color: "white" }]}
              />
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>

        {isError && !searchQuery && (
          <Text style={styles.errorMessage}>
            Movie/TV Show name is required
          </Text>
        )}
      </View>

      {list.length !== 0 ? (
        <View style={styles.list}>
          <FlatList
            data={list}
            renderItem={({ item }) => (
              <InformationCard
                data={item}
                onPress={() => handleDetailsPage(item.id)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      ) : (
        <View style={styles.bodyContainer}>
          <Text style={styles.bodyText}>Please initiate a search.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  outerSearchContainer: {
    margin: 32,
  },
  searchLabel: {
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  mandatoryLabel: {
    color: "red",
    fontWeight: "bold",
  },
  dropdownContainer: {
    width: "60%",
    zIndex: 100,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    zIndex: 100,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
    gap: 12,
    zIndex: 1000,
  },
  searchButton: {
    flexDirection: "row",
    backgroundColor: "#4DAFE3",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  bodyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    zIndex: -1,
  },
  bodyText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#555",
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 350,
    zIndex: -1,
  },
  errorMessage: {
    color: "red",
    marginTop: 12,
  },
  errorBorder: {
    borderColor: "red",
  },
  flatListContent: {
    paddingBottom: 100,
  },
});

import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function DropdownExample({ handleDropdown, page }) {
  let options = [];

  if (page === "tv") {
    options = [
      { label: "Airing Today", value: "airing_today" },
      { label: "On The Air", value: "on_the_air" },
      { label: "Popular", value: "popular" },
      { label: "Top Rated", value: "top_rated" },
    ];
  } else {
    options = [
      { label: "Now Playing", value: "now_playing" },
      { label: "Popular", value: "popular" },
      { label: "Top Rated", value: "top_rated" },
      { label: "Upcoming", value: "upcoming" },
    ];
  }

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("popular");
  const [items, setItems] = useState(options);

  function dropdownChange() {
    handleDropdown(value);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Select a programming language:</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select an option"
          style={styles.dropdown}
          onChangeValue={dropdownChange}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    zIndex: 100,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  dropdownContainer: {
    width: "80%",
    zIndex: 100,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: "#ccc",
    borderWidth: 1,
    zIndex: 100,
  },
});

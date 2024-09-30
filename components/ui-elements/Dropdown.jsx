import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Colors from "../constants/colors";

export default function DropdownExample() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "JavaScript", value: "javascript" },
    { label: "Python", value: "python" },
    { label: "Java", value: "java" },
    { label: "C++", value: "cpp" },
  ]);

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
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  dropdownContainer: {
    width: "80%",
  },
  dropdown: {
    backgroundColor: Colors.accentColor,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});

import { View, Text, SafeAreaView } from "react-native";
import Header from "../components/ui-elements/Header";
import NavigationTab from "../components/ui-elements/NavigationTab";

export default function SearchScreen() {
  return (
    <SafeAreaView>
      <Header />
      <NavigationTab />
      <Text>Search</Text>
    </SafeAreaView>
  );
}

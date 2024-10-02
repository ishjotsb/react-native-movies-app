import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MoviesScreen from "../screens/MoviesScreen";
import DetailsPage from "../screens/DetailsPage";
import TVShowsScreen from "../screens/TVShowsScreen";
import SearchScreen from "../screens/SearchScreen";

export default function MovieStack() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={MoviesScreen}
          name="Movies"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={DetailsPage}
          name="DetailsPage"
          options={{ title: "Details Page" }}
        />
        <Stack.Screen
          component={SearchScreen}
          name="SearchScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={TVShowsScreen}
          name="TVShowsScreen"
          options={{
            headerShown: false,
            animation: "none",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

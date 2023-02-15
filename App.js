import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Artist from "./screens/Artist/Artist";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Player from "./screens/Player/Player";
export default function App() {
  const Stack = createNativeStackNavigator();

  // pad(180, 2);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Artist"
          component={Artist}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Player"
          component={Player}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

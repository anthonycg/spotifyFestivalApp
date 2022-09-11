import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Screen from "./app/components/Screen";
import HomePage from "./app/components/HomePage"
import FlyerPage from "./app/components/FlyerPage";

export default function App() {
  return (
    <FlyerPage/>
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

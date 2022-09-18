import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Screen from "./app/components/Screen";
import HomePage from "./app/components/HomePage";
import FlyerPage from "./app/components/FlyerPage";
import AppPicker from "./app/components/AppPicker";
import Picker from "./app/components/Picker";
import AddArtists from "./app/components/AddArtists";
import SpotifyComponent from "./app/components/SpotifyLogin";
import { StateNavigator } from "navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={SpotifyComponent}
                    options={{
                        headerStyle: {
                            backgroundColor: "black",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                            fontSize: 20,
                        },
                    }}
                />
                <Stack.Screen
                    name="FlyerPage"
                    component={FlyerPage}
                    options={{
                        title: "Austin City Limits",
                        headerStyle: {
                            backgroundColor: "black",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                            fontSize: 20,
                        },
                    }}
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

import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Image } from "react-native-elements";
import {
    View,
    Linking,
    Text,
    SafeAreaView,
    KeyboardAvoidingView,
    StyleSheet,
} from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorage } from "react-native";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import axios from "axios";
import * as WebBrowser from 'expo-web-browser';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
    },
    button: {
        width: 200,
        marginTop: 50,
    },
});

const SpotifyComponent = ({navigation}) => {
    const CLIENT_ID = "8cf7a0cf72444805aeda7887e60dea29";
    const REDIRECT_URI = "exp://192.168.1.114:19000";
    const RESPONSE_TYPE = "token";
    const authParams = {
        authorizationEndpoint: "https://accounts.spotify.com/authorize",
        tokenEndpoint: "https://accounts.spotify.com/api/token",
    };

    const [token, setToken] = useState("");
    const [songs, setSongs] = useState();

    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: CLIENT_ID,
            scopes: [
                "user-read-currently-playing",
                "user-read-recently-played",
                "user-read-playback-state",
                "user-top-read",
                "user-modify-playback-state",
                "streaming",
                "user-read-email",
                "user-read-private",
            ],
            // Following "Authorization Code Flow" to fetch token 
            // after authorizationEndpoint
            // this must be set to false
            usePKCE: false,
            redirectUri: REDIRECT_URI,
        },
        authParams
    );

    useEffect(() => {
        if (response?.type === "success") {
            const { access_token } = response.params;
            setToken(access_token);
        }
    }, [response]);

    useEffect(() => {
        if (token) {
            axios(
                "https://api.spotify.com/v1/me/top/tracks?time_range=short_term",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            )
                .then((response) => {
                    console(response)
                    setSongs(response);
                })
                .catch((error) => {
                    console.log("error", error.message);
                });
        }
    });

    setTimeout(
        () =>
            navigation.replace("FlyerPage", {
                token: token,
                songs: songs
            }),
        5000
    );

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            {token ? ( //may change this back to token
                <Text style={{ color: "red" }}>{token}</Text>
            ) : (
                <Text style={{ color: "red" }}>No Token</Text>
            )}
            <Text
                style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "white",
                    marginBottom: "20%",
                }}
            >
                top song player
            </Text>
            <Button
                title="Login with Spotify"
                style={styles.button}
                onPress={() => {
                    promptAsync();
                }}
            />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    );
};

// useEffect(() => {
//     const storeData = async (value) => {
//         try {
//             await AsyncStorage.setItem("@storage_Key", value);
//         } catch (e) {
//             // saving error
//         }
//     };

//     const hash = window.location.hash;
//     let token = window.localStorage.getItem("token");

//     if (!token && hash) {
//         token = hash
//             .substring(1)
//             .split("&")
//             .find((elmnt) => elmnt.startsWith("access_token"))
//             .split("=")[1];

//         window.location.hash = "";
//         window.localStorage.setItem("token", token);
//         setToken(token);
//     }
// }, []);

// const handleLogout = () => {
//     window.localStorage.clear("token");
// };

// return (
//     <SafeAreaView>
//         {!token ? (
//             <Text
//                 style={{ color: "blue" }}
//                 onPress={() =>
//                     Linking.openURL(
//                         `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`
//                     )
//                 }
//             >
//                 LOGIN
//             </Text>
//         ) : (
//             <Text onPress={handleLogout}>LOGOUT</Text>
//         )}
//     </SafeAreaView>
// );
// }

export default SpotifyComponent;

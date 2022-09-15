import React, { useEffect, useState } from "react";
import { View, Linking, Text, SafeAreaView } from "react-native";

function SpotifyComponent(props) {
    const CLIENT_ID = "8cf7a0cf72444805aeda7887e60dea29";
    const REDIRECT_URI = "http://localhost:3000/";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";

    const [token, setToken] = useState("");

    useEffect( () => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            toke = hash.substring(1).split("&").find(elmnt => elmnt.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
            setToken(token)
        }
    }, [])

    return (
        <SafeAreaView>
            <Text
                style={{ color: "blue" }}
                onPress={() =>
                    Linking.openURL(`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`)
                }
            >
                LOGIN
            </Text>
        </SafeAreaView>
    );
}

export default SpotifyComponent;

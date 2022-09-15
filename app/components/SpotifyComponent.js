import React from "react";
import { View, Linking, Text, SafeAreaView } from "react-native";

function SpotifyComponent(props) {
    const CLIENT_ID = "8cf7a0cf72444805aeda7887e60dea29";
    const REDIRECT_URI = "http://localhost:3000/";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";

    return (
        <SafeAreaView>
            <Text
                style={{ color: "blue" }}
                onPress={() =>
                    Linking.openURL(`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&
                redirect_uri=${REDIRECT_URI}&
                response_type=${RESPONSE_TYPE}`)
                }
            >
                LOGIN
            </Text>
        </SafeAreaView>
    );
}

export default SpotifyComponent;

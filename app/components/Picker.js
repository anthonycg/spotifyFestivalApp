import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import CLIENT_ID from "./SpotifyLogin";

import { useState } from "react";
import {
    SafeAreaView,
    Button,
    StyleSheet,
    Pressable,
    Text,
    View,
    Linking,
} from "react-native";
import { useEffect } from "react";
import * as WebBrowser from 'expo-web-browser';
import InAppBrowser from 'react-native-inappbrowser-reborn';

// selectionsObj = {
//     objects : "Record",
//     parts: "cars"
// }

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    listenButton: {
        marginTop: 10,
        backgroundColor: "gold",
        borderRadius: 15,
        width: 110,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    picker: {
        width: "100%",
    },
});

const PickerOfItems = (props) => {
    const { token } = props;
    const [artistsOnFlyer, setArtistsOnFlyer] = useState();
    const [selectedArtist, setSelectedArtist] = useState("");

    const logout = () => {
        // setToken("");
        console.log("token:", token);
    };
    const BEARER_PLUST_TOKEN = "Bearer " + token;

    useEffect(() => console.log(token), []);

    const handleArtistSelection = async () => {
        console.log(BEARER_PLUST_TOKEN);
        await axios(
            "https://api.spotify.com/v1/search",

            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: BEARER_PLUST_TOKEN,
                },
                params: {
                    q: "drake",
                    type: "artist",
                },
            }
        )
            .then(async (returnedArtist) => {
                console.log(returnedArtist);
                let params22 = "3TVXtAsR1Inumwj472S9r4";
                await axios(
                    "https://api.spotify.com/v1/artists/" +
                        params22 +
                        "/top-tracks",
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: BEARER_PLUST_TOKEN,
                        },
                        params: {
                            id: "3TVXtAsR1Inumwj472S9r4",
                            market: "US",
                        },
                    }
                )
                    .then(async (detailedArtistInfo) => {
                        console.log(
                            "!@#$%^&*(*&^%$#@!#$%^&*(*&^%$#",
                            detailedArtistInfo
                        );
                        console.log(
                            "tracks",
                            detailedArtistInfo.data.tracks[0].album.href
                        );
                        // FIGURE OUT HOW TO PASS DATA TO BROWSER, SPECIIFICALLY SPOTIFY TOKEN
                        WebBrowser.openBrowserAsync(detailedArtistInfo.data.tracks[0].album.href);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    };

    const grabPickerIndex = (itemValue) => {
        setSelectedArtist(itemValue);
        console.log(itemValue);
        // console.log(token)
    };

    return (
        <SafeAreaView>
            {token != null || token != "" || token != undefined ? (
                <View style={styles.container}>
                    <Pressable
                        style={styles.listenButton}
                        onPress={handleArtistSelection}
                    >
                        <Text style={{ color: "tomato", fontWeight: "bold" }}>
                            Listen Now
                        </Text>
                    </Pressable>
                    {/* <Pressable style={styles.listenButton} onPress={logout}>
                        <Text style={{ color: "tomato", fontWeight: "bold" }}>
                            Logout
                        </Text>
                    </Pressable>
                    <Text>token: {token}</Text> */}
                    <Picker
                        style={styles.picker}
                        selectedValue={selectedArtist}
                        onValueChange={(itemValue) =>
                            grabPickerIndex(itemValue)
                        }
                    >
                        {/* I'll manually enter the artists from the flyer into the db. 
                From there, I'll retrieve the artists from the db with a fetch and set them to state: artistsOnFlyer
                Then I'll map through the artists and set them as the picker.item -- need to address their value though */}
                        {/* {artistsOnFlyer.map((idx, artist) => {
                    return(
                        <Picker.Item label={artist.name} value="java" />
                    )
                })} */}

                        <Picker.Item label="JavaScript" value="js" />
                        <Picker.Item label="{artist.}" value="java" />
                        <Picker.Item label="{artist.n}" value="java2" />
                        <Picker.Item label="{artist.na}" value="java3" />
                        <Picker.Item label="{artist.nam}" value="java4" />
                    </Picker>
                </View>
            ) : (
                <Text>Please login</Text>
            )}
        </SafeAreaView>
    );
};

export default PickerOfItems;

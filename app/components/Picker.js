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
import * as WebBrowser from "expo-web-browser";
import InAppBrowser from "react-native-inappbrowser-reborn";
import { color } from "react-native-elements/dist/helpers";

// selectionsObj = {
//     objects : "Record",
//     parts: "cars"
// }

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
                    q: selectedArtist,
                    type: "artist",
                },
            }
        )
            .then(async (returnedArtist) => {
                console.log("THIS", returnedArtist.data.artists.items[0].id);
                let params22 = returnedArtist.data.artists.items[0].id;
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
                            id: returnedArtist.data.artists.items[0].id,
                            market: "US",
                        },
                    }
                )
                    .then(async (detailedArtistInfo) => {
                        // console.log(
                        //     "!@#$%^&*(*&^%$#@!#$%^&*(*&^%$#",
                        //     detailedArtistInfo
                        // );
                        // console.log(
                        //     "tracks",
                        //     detailedArtistInfo.data.tracks[0].external_urls.spotify //This returns the artists most current popular song
                        // );
                        //Opens in-app browswer with window to most popular song.
                        WebBrowser.openBrowserAsync(
                            detailedArtistInfo.data.tracks[0].external_urls
                                .spotify
                        );
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
                    {selectedArtist ? (
                        <Pressable
                            style={styles.listenButton}
                            onPress={handleArtistSelection}
                        >
                            <Text
                                style={{ color: "black", fontWeight: "bold" }}
                            >
                                Listen Now
                            </Text>
                        </Pressable>
                    ) : (
                        <Text style={styles.listenButtonNoArtistYet}>
                            Scroll below to select an artist.
                        </Text>
                    )}

                    {/* <Pressable style={styles.listenButton} onPress={logout}>
                        <Text style={{ color: "tomato", fontWeight: "bold" }}>
                            Logout
                        </Text>
                    </Pressable>*/}
                    {/* <Text>token: {token}</Text>  */}
                    <Picker
                        style={styles.picker}
                        itemStyle={styles.picker}
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

                        <Picker.Item label="--Select an artist--" value="" />
                        <Picker.Item label="The Chicks" value="the chicks" />
                        <Picker.Item label="SZA" value="sza" />
                        <Picker.Item label="Phoenix [W2]" value="phoenix" />
                        <Picker.Item
                            label="Nathaniel Rateliff &amp; The Night Sweats"
                            value="nathaniel rateliff &amp; The Night Sweats"
                        />
                        <Picker.Item
                            label="Billy Strings"
                            value="billy strings"
                        />
                        <Picker.Item label="James Blake" value="james blake" />
                        <Picker.Item label="Jazmine Sullivan" value="Jazmine Sullivan" />
                        <Picker.Item label="Conan Gray" value="Conan Gray" />
                        <Picker.Item label="Big Gigantic" value="Big Gigantic" />
                        <Picker.Item label="Zach Bryan" value="Zach Bryan" />
                        <Picker.Item label="Carly Rae Jepsen" value="Carly Rae Jepsen" />
                        <Picker.Item label="Omar Apollo" value="Omar Apollo" />
                        <Picker.Item label="Lucky Daye" value="Lucky Daye" />
                        <Picker.Item label="Arlo Parks" value="Arlo Parks" />
                    </Picker>
                </View>
            ) : (
                <Text>Please login</Text>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    listenButton: {
        marginTop: 10,
        backgroundColor: "tomato",
        borderRadius: 15,
        width: 110,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    listenButtonNoArtistYet: {
        marginTop: 10,
        paddingTop: 7,
        paddingLeft: 4,
        backgroundColor: "gold",
        color: "tomato",
        fontWeight: "bold",
        borderRadius: 15,
        width: 220,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    picker: {
        width: "100%",
        color: "white",
        fontSize: 30,
    },
    pickerItem: {},
});

export default PickerOfItems;

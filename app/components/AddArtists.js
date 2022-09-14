import { SafeAreaView, Text, TextInput, View } from "react-native";

// const styles = StyleSheet.create({});

import React, { useState } from "react";

function AddArtists(props) {
    const [artistName, setArtistName] = useState();
    return (
        <SafeAreaView>
            <View>
                <TextInput
                    placeholder="Artist Name"
                    onChange={(e) => {
                        setArtistName(e.target.value);
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

export default AddArtists;

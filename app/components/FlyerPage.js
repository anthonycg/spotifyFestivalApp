import React from "react";
import {
    View,
    Text,
    SafeAreaView,
    ImageBackground,
    StyleSheet,
    Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Picker from "./Picker";

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "stretch",
    },
});

const FlyerPage = ({route,navigation}) => {
    const {token} = route.params;

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "black",
            }}
        >
            <StatusBar style="light" />
            <View style={{ flex: 1, resizeMode: "contain" }}>
                <Image
                    style={styles.background}
                    source={require("../assets/ACL.png")}
                ></Image>
            </View>
            <View
                style={{
                  flex: 0.5,
                    backgroundColor: "black",
                }}
            >
                
                <Picker style={{color:"white"}} token={token}></Picker>
            </View>
            
        </SafeAreaView>
    );
};

export default FlyerPage;

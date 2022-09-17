import React from "react";
import {
    View,
    Text,
    SafeAreaView,
    ImageBackground,
    StyleSheet,
    Image,
} from "react-native";
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
    const {token, setToken} = route.params;

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "gold",
            }}
        >
            <View style={{ flex: 1, resizeMode: "contain" }}>
                <Image
                    style={styles.background}
                    source={require("../assets/ACL.png")}
                ></Image>
            </View>
            <View
                style={{
                    flex: 0.1,
                    backgroundColor: "blue",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        fontSize: 26,
                        color: "white",
                    }}
                >
                    Select an Artist:
                    
                </Text>
            </View>
            <View
                style={{
                  flex: 0.35,
                    backgroundColor: "tomato",
                }}
            >
                
                <Picker token={token} setToken = {setToken}></Picker>
            </View>
            
        </SafeAreaView>
    );
};

export default FlyerPage;

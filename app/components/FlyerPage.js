import React from "react";
import { View, Text, SafeAreaView } from "react-native";

const FlyerPage = () => {

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "red",
        }}>
            <View style={{
                flex: .65,
                backgroundColor: "tomato",
                alignItems: "center"
            }}>
                <Text>Festival Name</Text>
            </View>
            <View style={{
                flex: .10,
                backgroundColor: "blue", 
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Text style={{
                    fontSize: 26,
                    color: "white"
                }}>Select an Artist:</Text>
            </View>
            <View style={{
                flex: .35,
                backgroundColor: "gold", 
                alignItems: "center"
            }}>
            </View>
        </SafeAreaView>
    )
}

export default FlyerPage;
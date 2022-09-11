import React from "react";
import { View, Text } from "react-native";

const HomePage = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "red",
      }}
    >
      <View
        style={{
          flex: 4,
          backgroundColor: "blue",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Text style={{
            fontSize: 40,
            fontStyle: "italic",
            color: "white"}}>Let's Fest</Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "tomato",
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: "gold",
        }}
      />
      <View
        style={{
          flex: 6,
          backgroundColor: "blue",
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: "tomato",
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: "gold",
        }}
      />
    </View>
  );
};

export default HomePage;

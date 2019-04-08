import React from "react";
import { Text, View, WebView, Image, FlatList, StyleSheet } from "react-native";
import axios from "axios";

export default function Ring({ event }) {
  const style = StyleSheet.create({
    // item: {
    //   padding: 10,
    //   fontSize: 18,
    //   height: 44
    // }
  });

  let imgWidth = 100;
  let imgHeight = 100;

  return (
    <View>
      <View style={style.item}>
        <Text>{event.eventTime}</Text>
      </View>
      <Image
        style={{ width: imgWidth, height: imgHeight }}
        source={{ uri: `${event.imageUrl}` }}
      />
    </View>
  );
}

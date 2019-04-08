import React from "react";
import {
  Text,
  View,
  WebView,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  List
} from "react-native";
import axios from "axios";
import Ring from "./Ring";

export default class History extends React.Component {
  state = { data: [] };
  async componentDidMount() {
    let histdata = await axios.get(
      "https://pidoorbellserver.herokuapp.com/api/picurls"
    );
    this.setState({ data: histdata.data });
    console.log(this.state.data);
  }

  render() {
    return (
      <View style={styles.outter}>
        <Text>History page Here</Text>

        <View style={styles.container}>
          <FlatList
            data={this.state.data}
            keyExtractor={item => item.eventTime}
            renderItem={({ item }) => {
              return (
                // <>
                //   <Text>{item.eventTime}</Text>
                //   <Image
                //     style={{ width: 100, height: 100 }}
                //     source={{ uri: `${item.imageUrl}` }}
                //   />
                // </>
                <Ring event={item} />
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
    height: 400
  },
  outter: {
    marginBottom: 1
  }
});

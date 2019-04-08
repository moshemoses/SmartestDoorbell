import React from "react";
import { Text, View, WebView } from "react-native";

export default class StreamView extends React.Component {
  constructor() {
    super();
    this.state = {
      url: "http://192.168.1.202:8080"
    };
  }
  render() {
    return (
      <WebView
        originWhitelist={["*"]}
        source={{ uri: this.state.url }}
        style={{ flex: 1 }}
        onError={() => {
          this.setState({
            url:
              "http://galtenfarms.com/wp-content/themes/stak-theme/images/video-not-available.png"
          });
        }}
        renderError={() => {
          return (
            <View>
              <Text>Error here....attempting to resolve</Text>
            </View>
          );
        }}
      />
    );
  }
}

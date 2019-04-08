import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Permissions, Notifications } from "expo";

import StreamView from "./StreamView";

const PUSH_REGISTRATION_ENDPOINT =
  "https://pidoorbellserver.herokuapp.com/token";
const MESSAGE_ENPOINT = "https://pidoorbellserver.herokuapp.com/message";

export default class App extends React.Component {
  state = {
    notification: null,
    messageText: ""
  };

  handleNotification = notification => {
    this.setState({ notification });
  };

  handleChangeText = text => {
    this.setState({ messageText: text });
  };

  sendMessage = async () => {
    fetch(MESSAGE_ENPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: this.state.messageText
      })
    });
    this.setState({ messageText: "" });
  };

  registerForPushNotificationsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    return fetch(PUSH_REGISTRATION_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: {
          value: token
        },
        user: {
          username: "warly",
          name: "Dan Ward"
        }
      })
    });

    this.notificationSubscription = Notifications.addListener(
      this.handleNotification
    );
  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();
  }

  renderNotification() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>A new message was recieved!</Text>
        <Text>{this.state.notification.data.message}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Above</Text>
        <View>
          <Text>Smartest Doorbell Ever!</Text>
          <StreamView />
        </View>

        <Text>Beneath</Text>
        {/* {this.state.notification ? this.renderNotification() : null} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    height: 50,
    width: 300,
    borderColor: "#f6f6f6",
    borderWidth: 1,
    backgroundColor: "#fff",
    padding: 10
  },
  button: {
    padding: 10
  },
  buttonText: {
    fontSize: 18,
    color: "#fff"
  },
  label: {
    fontSize: 18
  }
});

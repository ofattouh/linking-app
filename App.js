import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { Linking } from 'react-native';
import * as WebBrowser from 'expo-web-browser'

const slackAppId = {
  ios: 'id618783545',
  android: 'com.Slack',
}

export default class App extends React.Component {
  state = {
    links: [
      {
        title: 'Call Support',
        url: 'tel:+12022022029',
        type: 'phone'
      },
      {
        title: 'Email Support',
        url: 'mailto:support@email.com',
        type: 'email',
      },
      {
        title: 'Text Support',
        url: 'sms:+120220220229',
        type: 'text message',
      },
      {
        title: 'Join us on Slack',
        url: 'slack://channel?team=T5KFMSASF&id=C5K142J57',
        type: 'slack deep link',
      },
      {
        title: 'Visit Site (internal)',
        url: 'https://google.com',
        type: 'internal link'
      },
      {
        title: 'Visit Site (external)',
        url: 'https://google.com',
        type: 'external link'
      }
    ]
  }

  handleMissingApp() {
    if (Platform.OS === 'ios') {
      Linking.openURL(`https://itunes.apple.com/us/app/${slackAppId.ios}`);
    } else {
      Linking.openURL(`https://play.google.com/store/apps/details?id=${slackAppId.android}`);
    }
  }

  handleButtonPress(button) {
    if (button.type === 'internal link') {
      WebBrowser.openBrowserAsync(button.url);
    } else {
      Linking.openURL(button.url).catch(({ message }) => {
        if (message.includes('slack://')) {
          this.handleMissingApp();
        }
      });
    }
  }

  renderButton = (button, index) => {
    return(
      <TouchableOpacity
        key={index}
        onPress={() => this.handleButtonPress(button)}
        style={styles.button}
      >
        <Text style={styles.text}>{button.title}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.buttonList}>
          {this.state.links.map(this.renderButton)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonList: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    margin: 10,
    backgroundColor: '#c0392b',
    borderRadius: 3,
    padding: 10,
    paddingRight: 30,
    paddingLeft: 30,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
});

// expo init my-app
// expo install react-navigation react-navigation-stack react-navigation-tabs
// expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
// expo install react-native-webview
// expo install expo-web-browser

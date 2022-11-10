import React, {useCallback, useEffect, useState} from 'react';

import {GiftedChat} from 'react-native-gifted-chat';

import {Alert, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import messaging from '@react-native-firebase/messaging';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [messagesState, setMessages] = useState([]);

  // Register background handler
  // Get the notification
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    // Extract the body
    let message_body = remoteMessage.notification.body;
    // Extract the title
    let message_title = remoteMessage.notification.title;
    // Extract the notification image
    let avatar = remoteMessage.notification.android.imageUrl;

    // Add the notification to the messages array
    setMessages(messages =>
      GiftedChat.append(messages, {
        _id: Math.round(Math.random() * 1000000),
        text: message_body,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'PartyB',
          avatar: avatar,
        },
      }),
    );

    // Send a notification alert
    Alert.alert(message_title, message_body);
  });

  useEffect(() => {
    // Register background handler
    // Get the notification
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // Extract the body
      let message_body = remoteMessage.notification.body;
      // Extract the title
      let message_title = remoteMessage.notification.title;
      // Extract the notification image
      let avatar = remoteMessage.notification.android.imageUrl;

      // Add the notification to the messages array
      setMessages(messages =>
        GiftedChat.append(messages, {
          _id: Math.round(Math.random() * 1000000),
          text: message_body,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'PartyB',
            avatar: avatar,
          },
        }),
      );

      // Send a notification alert
      Alert.alert(message_title, message_body);
    });
  }, [messagesState]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello there',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'PartyA',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    ); // append the new message to present messages
  }, []);

  return (
    <GiftedChat
      backgroundColor={isDarkMode ? Colors.black : Colors.white}
      messages={messagesState}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default App;

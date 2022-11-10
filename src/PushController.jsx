import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {useEffect, useState} from 'react';
import PushNotification from 'react-native-push-notification';

import React, {Fragment} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {Header, Colors} from 'react-native/Libraries/NewAppScreen';

const pushDataDummy = [
  {
    title: 'First push',
    message: 'First push message',
  },
  {
    title: 'Second push',
    message: 'Second push message',
  },
  {
    foreground: true,
    smallIcon: 'ic_notification',
    priority: 'high',
    largeIconUrl:
      'https://images.unsplash.com/photo-1646660528305-eb8ef9533ba6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60%3E',
    userInteraction: false,
    id: '-1256985495',
    tag: 'campaign_collapse_key_5433272832305140298',
    data: {},
    color: null,
    sound: null,
    title: 'Puspa 3',
    message: 'Puspa Raj 3',
    channelId: 'fcm_fallback_notification_channel',
    visibility: 'private',
    bigPictureUrl:
      'https://images.unsplash.com/photo-1646660528305-eb8ef9533ba6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60%3E',
  },
];

const PushController = () => {
  const [pushData, setPushData] = useState(pushDataDummy);

  const addDataToList = data => {
    setPushData(prev => {
      let newArr = [...prev];
      newArr.push(data);
      return newArr;
    });
  };
  console.log({pushData});

  useEffect(() => {
    return PushNotification.configure({
      onRegister: token => {
        console.log({token});
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification here
        // required on iOS only
        // notification.finish(PushNotificationIOS.FetchResult.NoData);

        addDataToList(notification);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      // Android only
      senderID: '303892494484',
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }, []);

  const renderItem = ({item}) => (
    <View key={item.title}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <View style={styles.listHeader}>
            <Text>Push Notifications</Text>
          </View>
          <View style={styles.body}>
            {pushData.length != 0 && (
              <FlatList
                data={pushData}
                renderItem={item => renderItem(item)}
                keyExtractor={item => item.title}
                // extraData={{ pushData }}
              />
            )}
            {pushData.length == 0 && (
              <View style={styles.noData}>
                <Text style={styles.noDataText}>
                  You don't have any push notification yet. Send some push to
                  show it in the list
                </Text>
              </View>
            )}
            {/* <LearnMoreLinks /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default PushController;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  listHeader: {
    backgroundColor: '#eee',
    color: '#222',
    height: 44,
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  noData: {
    paddingVertical: 50,
  },
  noDataText: {
    fontSize: 14,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    paddingBottom: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

import PushNotification from "react-native-push-notification";

PushNotification.createChannel(
  {
    channelId: "api-failure-channel",
    channelName: "API Failure Notifications"
  },
  () => {}
);

export const showApiFailureNotification = (url: string) => {
  PushNotification.localNotification({
    channelId: "api-failure-channel",
    title: "API Request Failed",
    message: `${url} failed`,
    playSound: true,
    soundName: "default"
  });
};
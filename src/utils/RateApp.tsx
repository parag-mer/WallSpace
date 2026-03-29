import { Linking, Platform } from 'react-native';

export const rateApp = () => {
  const packageName = 'com.wallspace';

  if (Platform.OS === 'android') {
    Linking.openURL(`market://details?id=${packageName}`).catch(() => {
      Linking.openURL(
        `https://play.google.com/store/apps/details?id=${packageName}`,
      );
    });
  }
};

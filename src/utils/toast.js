import { ToastAndroid, Alert, Platform } from 'react-native';

export const showToast = message => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert('', message);
  }
};

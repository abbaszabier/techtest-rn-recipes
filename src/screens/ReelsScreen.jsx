import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ReelsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>👤 Reels Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
  },
});

export default ReelsScreen;

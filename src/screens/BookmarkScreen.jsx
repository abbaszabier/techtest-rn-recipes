import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BookmarkScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>👤 Bookmark Screen</Text>
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

export default BookmarkScreen;

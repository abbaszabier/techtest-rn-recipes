import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BlogScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>👤 Blog Screen</Text>
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

export default BlogScreen;

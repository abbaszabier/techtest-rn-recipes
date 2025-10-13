import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const BookmarkScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/empty-state.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>No Bookmarks Yet</Text>
      <Text style={styles.subtitle}>
        Save your favorite recipes so you can find them easily later!
      </Text>
    </View>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  image: {
    width: 240,
    height: 240,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

import { Camera } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReelsComponent from '../components/ReelsComponent';

const ReelsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Reels</Text>
        <Camera size={28} color="#fff" opacity={1} />
      </View>
      <ReelsComponent />
    </SafeAreaView>
  );
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'black',
    position: 'relative',
  },
  header: {
    position: 'absolute',
    top: 70,
    width: '100%',
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default ReelsScreen;

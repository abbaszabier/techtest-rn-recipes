import React, { useCallback, useState } from 'react';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { videosData } from '../store/database';
import SingleReel from './SingleReel';
import { Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const { height: screenHeight } = Dimensions.get('window');

const ReelsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(true);

  const handleOnchangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => setIsFocused(false);
    }, []),
  );
  return (
    <SwiperFlatList
      data={videosData}
      onChangeIndex={handleOnchangeIndexValue}
      renderItem={({ item, index }) => (
        <SingleReel
          item={item}
          index={index}
          currentIndex={currentIndex}
          isFocused={isFocused}
        />
      )}
      refreshControl={null}
      keyExtractor={(item, index) => index.toString()}
      vertical
      snapToAlignment="start"
      pagingEnabled={true}
      decelerationRate="fast"
      snapToInterval={screenHeight}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews
    />
  );
};

export default ReelsComponent;

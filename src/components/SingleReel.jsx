import {
  Heart,
  MessageCircle,
  MoreVertical,
  Share2,
  VolumeX,
} from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { View, Dimensions, TouchableOpacity, Image, Text } from 'react-native';
import Video from 'react-native-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SingleReel = ({ item, index, currentIndex, isFocused }) => {
  const videoRef = useRef(null);
  const [mute, setMute] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const insets = useSafeAreaInsets();

  const usableHeight = screenHeight - insets.bottom;

  const onBuffer = buffer => {
    console.log('buffering', buffer);
  };

  const onError = error => {
    console.log('error', error);
  };
  return (
    <View style={[style.container, { height: usableHeight - 55 }]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setMute(!mute);
        }}
        style={style.video}
      >
        <Video
          ref={videoRef}
          onBuffer={onBuffer}
          onError={onError}
          repeat
          resizeMode="cover"
          muted={mute}
          source={item.video}
          style={style.video}
          paused={index !== currentIndex || !isFocused}
        />

        {mute && (
          <View style={style.playIconWrapper}>
            <VolumeX color="#fff" />
          </View>
        )}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']}
          style={style.gradient}
        />
      </TouchableOpacity>

      <View style={style.overlay}>
        {/* User Info */}
        <View style={style.userRow}>
          <Image src={item.userImage} style={style.avatar} />
          <View style={{ flex: 1, marginBottom: 5 }}>
            <Text style={style.username}>{item.username} · 3h</Text>
            <Text style={style.description} numberOfLines={1}>
              {item.description}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={style.actions}>
          <TouchableOpacity
            onPress={() => setIsLiked(!isLiked)}
            style={style.iconButton}
          >
            <Heart
              color={isLiked ? 'red' : '#fff'}
              fill={isLiked ? 'red' : 'transparent'}
              size={28}
              strokeWidth={2}
            />
            <Text style={style.iconText}>{item.likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.iconButton}>
            <MessageCircle color="#fff" size={28} strokeWidth={2} />
            <Text style={style.iconText}>{item.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.iconButton}>
            <Share2 color="#fff" size={28} strokeWidth={2} />
            <Text style={style.iconText}>{item.shares}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.moreButton}>
            <MoreVertical color="#fff" size={20} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = {
  container: {
    width: screenWidth,
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  playIconWrapper: {
    fontSize: 20,
    color: '#fff',
    position: 'absolute',
    top: screenHeight / 2.3,
    left: screenWidth / 2.3,
    backgroundColor: 'rgba(52,52,52,0.4)',
    borderRadius: 100,
    padding: 16,
  },
  overlay: {
    position: 'fixed',
    bottom: -465,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userRow: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: screenHeight,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  username: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  description: {
    color: '#ffffffff',
    fontSize: 13,
    fontWeight: '400',
  },
  moreButton: {
    paddingHorizontal: 8,
  },
  actions: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  iconButton: {
    alignItems: 'center',
    marginBottom: 15,
  },
  iconText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },
};

export default SingleReel;

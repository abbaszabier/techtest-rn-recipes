import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Plus } from 'lucide-react-native';

const StoryList = ({ stories, onPressStory }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <FlatList
        data={stories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.storyItem}
            onPress={() => onPressStory?.(item)}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.imageBorder,
                { borderColor: item.id !== 1 ? colors.primary : colors.border },
              ]}
            >
              <Image source={{ uri: item.avatar }} style={styles.storyImage} />
            </View>
            {item.id === 1 && (
              <View
                style={{
                  position: 'absolute',
                  bottom: 20,
                  right: 0,
                  backgroundColor: '#000',
                  borderRadius: 12,
                  padding: 1,
                  borderWidth: 2,
                  borderColor: colors.background,
                }}
              >
                <Plus size={18} color="#fff" strokeWidth={2} />
              </View>
            )}
            <Text
              style={[styles.storyName, { color: colors.text }]}
              numberOfLines={1}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
  },
  storyItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  imageBorder: {
    borderWidth: 2,
    borderRadius: 40,
    padding: 2,
  },
  storyImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  storyName: {
    fontSize: 12,
    marginTop: 4,
    width: 64,
    textAlign: 'center',
  },
});

export default StoryList;

import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {
  Bookmark,
  EllipsisVertical,
  Heart,
  MessageCircle,
  Share2,
} from 'lucide-react-native';

const RecipeCard = ({ item, onPress, disabled }) => {
  const { colors } = useTheme();

  const content = (
    <View
      style={[
        styles.itemContainer,
        { borderColor: colors.border, backgroundColor: colors.card },
      ]}
    >
      <View style={styles.headerRow}>
        <Image
          source={{ uri: item.avatar || 'https://github.com/shadcn.png' }}
          style={styles.avatar}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.itemTitle, { color: colors.text }]}>
              Abbas Zabier
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 10,
                marginTop: 2,
                opacity: 0.6,
              }}
            >
              23 Oktober 2025, 14:30
            </Text>
          </View>
          <EllipsisVertical size={'20'} />
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text style={[styles.itemDesc, { color: colors.text }]}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          expedita quisquam, perspiciatis iste doloribus.
        </Text>
      </View>

      {/* 🔹 Gambar utama */}
      <Image
        source={{ uri: item.image }}
        style={styles.itemImage}
        resizeMode="cover"
      />

      <View style={styles.actionRow}>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <TouchableOpacity style={styles.actionButton}>
            <Heart size={20} opacity={0.8} />
            <Text style={[styles.actionText, { color: colors.text }]}>345</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={20} opacity={0.8} />
            <Text style={[styles.actionText, { color: colors.text }]}>50</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Share2 size={20} opacity={0.8} />
            <Text style={[styles.actionText, { color: colors.text }]}>23</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.actionButton}>
          <Bookmark size={20} opacity={0.8} />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (disabled) {
    return content;
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: 0.5,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 12,
  },
  itemDesc: {
    fontSize: 14,
    opacity: 0.8,
  },
  itemImage: {
    width: '100%',
    height: 240,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '400',
  },
});

export default RecipeCard;

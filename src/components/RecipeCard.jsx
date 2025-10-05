import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

const RecipeCard = ({ item, onPress, disabled }) => {
  const { colors } = useTheme();

  const content = (
    <View
      style={[
        styles.itemContainer,
        { borderColor: colors.border, backgroundColor: colors.card },
      ]}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.itemImage}
        resizeMode="cover"
      />
      <Text style={[styles.itemTitle, { color: colors.text }]}>
        {item.name}
      </Text>
      <View style={styles.infoRow}>
        <Text style={[styles.itemDesc, { color: colors.text }]}>
          Rating: {item.rating} ⭐
        </Text>
        <Text style={[styles.itemDesc, { color: colors.text }]}>
          Calories: {item.caloriesPerServing}
        </Text>
        <Text style={[styles.itemDesc, { color: colors.text }]}>
          Servings: {item.servings}
        </Text>
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
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: 'left',
  },
  itemImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  itemTitle: {
    marginTop: 8,
    marginBottom: 6,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDesc: {
    fontSize: 14,
    opacity: 0.8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default RecipeCard;

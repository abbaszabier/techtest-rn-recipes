import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import RecipeCard from '../components/RecipeCard';

const RecipeDetailScreen = ({ route }) => {
  const { recipe } = route.params;
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <RecipeCard item={recipe} disabled />

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Ingredients
      </Text>
      {recipe.ingredients.map((ingredient, index) => (
        <Text key={index} style={[styles.listItem, { color: colors.text }]}>
          • {ingredient}
        </Text>
      ))}

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Instructions
      </Text>
      {recipe.instructions.map((step, index) => (
        <Text key={index} style={[styles.listItem, { color: colors.text }]}>
          {index + 1}. {step}
        </Text>
      ))}

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Other Info
      </Text>
      <Text style={[styles.listItem, { color: colors.text }]}>
        Cuisine: {recipe.cuisine}
      </Text>
      <Text style={[styles.listItem, { color: colors.text }]}>
        Difficulty: {recipe.difficulty}
      </Text>
      <Text style={[styles.listItem, { color: colors.text }]}>
        Meal Type: {recipe.mealType.join(', ')}
      </Text>
      <Text style={[styles.listItem, { color: colors.text }]}>
        Reviews: {recipe.reviewCount}
      </Text>
      <Text style={[styles.listItem, { color: colors.text }]}>
        Tags: {recipe.tags.join(', ')}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 20 },
  image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 15 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
  },
  listItem: { fontSize: 16, marginBottom: 5 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoText: { fontSize: 14, color: '#555555' },
});

export default RecipeDetailScreen;

import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import Button from '../components/Button';
import { showToast } from '../utils/toast';
import { useThemeContext } from '../context/ThemeContext';
import { useTheme } from '@react-navigation/native';
import RecipeCard from '../components/RecipeCard';
import { Bell } from 'lucide-react-native';
import StoryList from '../components/StoryList';

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const { isDark, toggleTheme } = useThemeContext();
  const { colors } = useTheme();

  useEffect(() => {
    const loadData = async () => {
      const userName = await AsyncStorage.getItem('userName');
      setName(userName || 'User');
    };
    loadData();
  }, []);

  const stories = [
    { id: 1, name: 'Your story', avatar: 'https://github.com/shadcn.png' },
    {
      id: 2,
      name: 'Lina',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 3,
      name: 'Rafi',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    {
      id: 4,
      name: 'Sinta',
      avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
    },
    {
      id: 5,
      name: 'Dimas',
      avatar: 'https://randomuser.me/api/portraits/men/47.jpg',
    },
  ];

  // const handleLogout = async () => {
  //   try {
  //     setLoading(true);
  //     const isLogin = await GoogleSignin.hasPreviousSignIn();
  //     if (isLogin) await GoogleSignin.signOut();

  //     await AsyncStorage.removeItem('authToken');
  //     await AsyncStorage.removeItem('userName');
  //     navigation.replace('Login');
  //     showToast('Logout berhasil');
  //   } catch (error) {
  //     Alert.alert('Error', 'Logout gagal');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchRecipes = async () => {
    try {
      setApiLoading(true);
      const response = await axios.get('https://dummyjson.com/recipes');
      if (response.data && response.data.recipes) {
        setRecipes(response.data.recipes);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal mengambil data recipes');
      setRecipes([]);
    } finally {
      setApiLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchRecipes().finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const renderItem = ({ item }) => (
    <RecipeCard
      item={item}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    />
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <View style={styles.container}>
        {/* <Button
          title="Logout"
          onPress={handleLogout}
          loading={loading}
          disabled={loading}
          containerStyle={styles.logoutButtonContainer}
        /> */}

        {apiLoading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : recipes.length === 0 ? (
          <Text style={[styles.emptyText, { backgroundColor: colors.text }]}>
            Belum ada resep tersedia.
          </Text>
        ) : (
          <>
            <View style={styles.headerRow}>
              <Text style={[styles.textWelcome, { color: colors.text }]}>
                Recipes
              </Text>
              {/* <Switch value={isDark} onValueChange={toggleTheme} /> */}
              <Bell size={24} color={colors.text} />
            </View>
            <FlatList
              data={recipes}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              ListHeaderComponent={
                <>
                  <StoryList
                    stories={stories}
                    onPressStory={story =>
                      console.log('Story clicked:', story.name)
                    }
                  />
                </>
              }
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              contentContainerStyle={styles.flatListContent}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { display: 'flex', backgroundColor: '#fff' },
  container: {
    display: 'flex',
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  textWelcome: {
    fontSize: 24,
    fontWeight: '600',
    width: '80%',
  },
  text: {
    fontSize: 20,
  },
  logoutButtonContainer: {
    marginLeft: 20,
  },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16 },
  itemContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
  },
  flatListContent: {
    paddingBottom: 80,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  itemDesc: { fontSize: 14, color: '#555' },
  itemImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default HomeScreen;

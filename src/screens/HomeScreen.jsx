import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const userName = await AsyncStorage.getItem('userName');
      setName(userName || 'User');
    };
    loadData();
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userName');
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Error', 'Logout gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome {name} 👋</Text>

        <Button
          title="Logout"
          onPress={handleLogout}
          loading={loading}
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  text: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
});

export default HomeScreen;

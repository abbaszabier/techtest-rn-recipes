import { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';
import Button from '../components/Button';
import { generateToken, validateEmail, validatePassword } from '../utils/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    let newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Email tidak valid';
    }
    if (!validatePassword(password)) {
      newErrors.password = 'Password minimal 6 karakter';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);
      const token = generateToken(email);
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userName', email.split('@')[0]);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Error', 'Login gagal');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = text => {
    setEmail(text);
    if (errors.email && validateEmail(text)) {
      setErrors(prev => ({ ...prev, email: null }));
    }
  };

  const handlePasswordChange = text => {
    setPassword(text);
    if (errors.password && validatePassword(text)) {
      setErrors(prev => ({ ...prev, password: null }));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <Input
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
          error={errors.email}
        />

        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
          error={errors.password}
        />

        <Button
          title="Login"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default LoginScreen;

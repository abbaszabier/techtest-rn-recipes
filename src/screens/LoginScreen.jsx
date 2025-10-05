import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';
import Button from '../components/Button';
import { generateToken, validateEmail, validatePassword } from '../utils/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from '@env';
import { showToast } from '../utils/toast';
import { useTheme } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

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
      showToast('Login berhasil!');
    } catch (error) {
      Alert.alert('Error', 'Login gagal');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      await AsyncStorage.setItem(
        'authToken',
        JSON.stringify({
          token: userInfo.idToken,
          expiry: Date.now() + 24 * 60 * 60 * 1000, // expired 1 jam
        }),
      );
      await AsyncStorage.setItem('userName', userInfo.data.user.name);

      navigation.replace('Home');
      showToast('Login berhasil!');
    } catch (error) {
      console.error('Google login error:', error);
      Alert.alert('Error', 'Login Google gagal');
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

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      iosClientId:
        '436041962147-r5rq6mbkj1b5prg7d9fd0olk12o8iai1.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>
          Welcome Back!
        </Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Login to your account
        </Text>

        <View style={styles.card}>
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

          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={[styles.orText, { color: colors.text }]}>OR</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.containerButtonGoogle}>
            <GoogleSigninButton
              onPress={handleGoogleLogin}
              size={GoogleSigninButton.Size.Icon}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f2f2f7' },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  containerButtonGoogle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },

  orText: {
    textAlign: 'center',
    marginVertical: 15,
    color: '#666',
    fontWeight: '600',
  },
  googleButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0,
  },
  line: {
    flex: 1,
    height: 1,
    margin: 8,
    backgroundColor: '#ccc',
  },
});

export default LoginScreen;

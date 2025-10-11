import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';
import Button from '../components/Button';
import { generateToken, validateEmail, validatePassword } from '../utils/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from '@env';
import { showToast } from '../utils/toast';
import { useTheme } from '@react-navigation/native';
import {
  GoogleSocialButton,
  AppleSocialButton,
} from 'react-native-social-buttons';
import RememberMeForgotPassword from '../components/RememberMe';

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
      navigation.replace('MyTabs');
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

      if (userInfo.type === 'cancelled') {
        console.log('Google login dibatalkan oleh user');
        return;
      }

      await AsyncStorage.setItem(
        'authToken',
        JSON.stringify({
          token: userInfo.idToken,
          expiry: Date.now() + 24 * 60 * 60 * 1000, // expired 1 jam
        }),
      );
      await AsyncStorage.setItem('userName', userInfo?.data?.user?.name);

      navigation.navigate('MyTabs', { screen: 'Home' });
      showToast('Login berhasil!');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled Google sign-in');
        return;
      }
      if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in in progress');
        return;
      }
      if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Google Play Services tidak tersedia');
        return;
      }

      console.error('Google login error:', error);
      Alert.alert('Error', 'Login Google gagal, coba lagi nanti.');
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
      iosClientId: GOOGLE_IOS_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Image
            source={require('../assets/original.png')}
            style={[styles.logo]}
          />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>
          Welcome Back!
        </Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Sign In to your account
        </Text>

        <View style={styles.containerInput}>
          <Input
            label={'Email'}
            placeholder="Type your email"
            value={email}
            onChangeText={handleEmailChange}
            error={errors.email}
          />
          <Input
            label={'Password'}
            placeholder="Type your password"
            secureTextEntry
            value={password}
            onChangeText={handlePasswordChange}
            error={errors.password}
          />
          <RememberMeForgotPassword
            onForgotPassword={{}}
            onRememberChange={{}}
          />
        </View>

        <Button
          title="Sign In"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
        />
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={[styles.orText]}>Or continue with</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.containerSocialButton}>
          <GoogleSocialButton
            buttonViewStyle={{ width: '48%', height: '90%' }}
            buttonText="Google"
            onPress={handleGoogleLogin}
            logoStyle={{ width: 40, height: 40 }}
          />
          <AppleSocialButton
            buttonViewStyle={{ width: '48%', height: '90%' }}
            buttonText="Apple"
            onPress={() => {}}
            logoStyle={{ width: 40, height: 40 }}
          />
        </View>
      </View>
      <View style={styles.signup}>
        <Text style={[styles.text]}>Don't have account?</Text>
        <Text style={[styles.text, styles.textsignup]}>Sign Up</Text>
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
  containerInput: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 24,
  },
  containerSocialButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8e8c8cff',
    textAlign: 'center',
    marginBottom: 30,
  },
  textsignup: {
    color: '#007bff',
    marginLeft: 4,
    fontWeight: '400',
  },
  signup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 24,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    color: '#555',
    fontSize: 14,
    fontWeight: '400',
  },
  orText: {
    color: '#555',
    textAlign: 'center',
    marginVertical: 24,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    margin: 4,
    backgroundColor: '#cccccc',
  },
});

export default LoginScreen;

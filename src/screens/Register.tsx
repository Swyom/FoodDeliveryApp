import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Dimensions, 
  Image, 
  StatusBar, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const { height } = Dimensions.get('window');

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { colors, theme } = useTheme();

  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      <StatusBar 
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} 
        translucent 
        backgroundColor="transparent" 
      />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
          
          <View style={styles.bannerContainer}>
            <Image
              source={require('../../assets/BANNER.png')}
              style={styles.bannerImage}
            />
          </View>

          <View style={[styles.formContainer, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Sign up to get started today.</Text>

            <View style={[styles.inputWrapper, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
              <User color={colors.textSecondary} size={20} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Full Name"
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="words"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={[styles.inputWrapper, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
              <Mail color={colors.textSecondary} size={20} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Email Address"
                placeholderTextColor={colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={[styles.inputWrapper, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
              <Lock color={colors.textSecondary} size={20} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Password"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)} 
                style={styles.eyeIcon}
              >
                {showPassword ? (
                  <EyeOff color={colors.textSecondary} size={20} />
                ) : (
                  <Eye color={colors.textSecondary} size={20} />
                )}
              </TouchableOpacity>
            </View>
                
            <TouchableOpacity 
              style={[styles.registerButton, { backgroundColor: colors.primary, shadowColor: colors.primary }]} 
              // @ts-ignore
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.registerButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <SafeAreaView edges={['bottom']} style={styles.footerContainer}>
              <Text style={[styles.footerText, { color: colors.textSecondary }]}>Already have an account? </Text>
              {/* @ts-ignore */}
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={[styles.loginText, { color: colors.primary }]}>Login</Text>
              </TouchableOpacity>
            </SafeAreaView>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    height: height * 0.35,
    width: '100%',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  formContainer: {
    flex: 1,
    borderTopRightRadius: 36,
    borderTopLeftRadius: 36,
    marginTop: -36,
    paddingTop: 24,
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 60,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    height: '100%',
  },
  eyeIcon: {
    padding: 4,
  },
  registerButton: {
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    marginTop: 12,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 16,
    height: 54,
    gap: 8,
  },
  socialIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  socialButtonText: {
    fontWeight: '700',
    fontSize: 15,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 24,
  },
  footerText: {
    fontSize: 15,
    fontWeight: '500',
  },
  loginText: {
    fontWeight: '700',
    fontSize: 15,
  },
});
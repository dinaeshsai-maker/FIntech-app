import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { login } from '../../slices/authSlice';

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((s) => s.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    try {
      await dispatch(login({ email, password })).unwrap();
    } catch (err: any) {
      Alert.alert('Login failed', err?.toString?.() ?? 'Please try again');
    }
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-3xl font-bold text-blue-600 mb-8">Welcome back</Text>

      <View className="mb-4">
        <Text className="text-slate-600 mb-2">Email</Text>
        <TextInput
          className="border border-slate-300 rounded-lg px-4 py-3"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
        />
      </View>

      <View className="mb-6">
        <Text className="text-slate-600 mb-2">Password</Text>
        <TextInput
          className="border border-slate-300 rounded-lg px-4 py-3"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
        />
      </View>

      <TouchableOpacity
        onPress={onSubmit}
        disabled={status === 'loading'}
        className="bg-blue-600 rounded-lg py-3 items-center"
      >
        {status === 'loading' ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold">Sign In</Text>
        )}
      </TouchableOpacity>

      <Text className="text-slate-500 text-center mt-6">
        By continuing, you agree to our Terms and Privacy Policy
      </Text>
    </View>
  );
}


import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { logout } from '../../slices/authSlice';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);

  return (
    <View className="flex-1 bg-white px-5 pt-6">
      <Text className="text-2xl font-bold text-slate-900 mb-2">Profile</Text>
      <View className="border border-slate-200 rounded-xl p-4 mb-6">
        <Text className="text-slate-600">Name</Text>
        <Text className="text-lg font-semibold text-slate-800">{user?.name ?? '—'}</Text>
        <Text className="text-slate-600 mt-3">Email</Text>
        <Text className="text-lg font-semibold text-slate-800">{user?.email ?? '—'}</Text>
        <Text className="text-slate-600 mt-3">KYC Status</Text>
        <Text className="text-lg font-semibold text-green-700">Verified</Text>
      </View>

      <TouchableOpacity
        className="bg-slate-900 rounded-lg py-3 items-center"
        onPress={() => dispatch(logout())}
      >
        <Text className="text-white font-semibold">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}


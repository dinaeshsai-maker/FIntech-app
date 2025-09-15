import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const products = [
  { id: 'i1', name: 'Life Insurance', details: 'Term + rider options' },
  { id: 'i2', name: 'Health Insurance', details: 'Cashless network hospitals' },
  { id: 'i3', name: 'Vehicle Insurance', details: 'Comprehensive cover' },
];

export default function InsuranceListScreen() {
  return (
    <ScrollView className="flex-1 bg-white px-5 pt-6">
      <Text className="text-2xl font-bold text-slate-900 mb-4">Insurance</Text>
      {products.map((p) => (
        <View key={p.id} className="border border-slate-200 rounded-xl p-4 mb-3">
          <Text className="text-lg font-semibold text-slate-800">{p.name}</Text>
          <Text className="text-slate-600 mt-1">{p.details}</Text>
          <Text className="text-blue-600 font-semibold mt-2">View details</Text>
        </View>
      ))}
    </ScrollView>
  );
}


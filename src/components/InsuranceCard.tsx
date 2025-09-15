import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Props = { title: string; sumAssured: string };

export default function InsuranceCard({ title, sumAssured }: Props) {
  return (
    <View className="w-1/2 px-2 mb-4">
      <View className="border border-slate-200 rounded-xl p-4">
        <Text className="text-slate-900 font-semibold">{title}</Text>
        <Text className="text-slate-600 mt-1">Cover: {sumAssured}</Text>
        <TouchableOpacity className="mt-3 bg-green-600 rounded-lg py-2 items-center">
          <Text className="text-white font-semibold">Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


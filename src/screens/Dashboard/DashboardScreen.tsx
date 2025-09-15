import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import LoanCard from '../../components/LoanCard';
import InsuranceCard from '../../components/InsuranceCard';

const banners = [
  { id: 'b1', title: 'Festive Offer', subtitle: 'Low interest micro loans', color: '#e0f2fe' },
  { id: 'b2', title: 'Health Cover', subtitle: 'Protect your family', color: '#dcfce7' },
];

export default function DashboardScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <Text className="text-2xl font-bold text-slate-900 px-5 pt-6">Dashboard</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-4 px-5"
      >
        {banners.map((b) => (
          <View
            key={b.id}
            className="mr-4 rounded-2xl p-5"
            style={{ backgroundColor: b.color, width: 280 }}
          >
            <Text className="text-lg font-semibold text-slate-800">{b.title}</Text>
            <Text className="text-slate-600 mt-1">{b.subtitle}</Text>
          </View>
        ))}
      </ScrollView>

      <View className="px-5 mt-6">
        <Text className="text-xl font-semibold text-slate-900 mb-3">Loan Products</Text>
        <View className="flex-row flex-wrap -mx-2">
          <LoanCard title="Micro Loan" rate="12%" />
          <LoanCard title="Property Loan" rate="9%" />
          <LoanCard title="Gold Loan" rate="10%" />
          <LoanCard title="Personal Loan" rate="14%" />
          <LoanCard title="Business Loan" rate="11%" />
        </View>
      </View>

      <View className="px-5 mt-6 mb-10">
        <Text className="text-xl font-semibold text-slate-900 mb-3">Insurance</Text>
        <View className="flex-row flex-wrap -mx-2">
          <InsuranceCard title="Life Insurance" sumAssured="₹50L" />
          <InsuranceCard title="Health Insurance" sumAssured="₹20L" />
          <InsuranceCard title="Vehicle Insurance" sumAssured="Comprehensive" />
        </View>
      </View>
    </ScrollView>
  );
}


import React, { useMemo, useState } from 'react';
import { View, Text, TextInput } from 'react-native';

function calculateEmi(principal: number, annualRatePercent: number, months: number) {
  const monthlyRate = annualRatePercent / 12 / 100;
  if (monthlyRate === 0) return principal / months;
  const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, months);
  const denominator = Math.pow(1 + monthlyRate, months) - 1;
  return numerator / denominator;
}

export default function LoanCalculatorScreen() {
  const [principal, setPrincipal] = useState('200000');
  const [rate, setRate] = useState('12');
  const [months, setMonths] = useState('24');

  const emi = useMemo(() => {
    const p = Number(principal) || 0;
    const r = Number(rate) || 0;
    const n = Number(months) || 0;
    if (p <= 0 || r < 0 || n <= 0) return 0;
    return calculateEmi(p, r, n);
  }, [principal, rate, months]);

  return (
    <View className="flex-1 bg-white px-5 pt-6">
      <Text className="text-2xl font-bold text-slate-900 mb-4">Loan Calculator</Text>

      <View className="mb-4">
        <Text className="text-slate-600 mb-2">Principal (₹)</Text>
        <TextInput
          className="border border-slate-300 rounded-lg px-4 py-3"
          keyboardType="numeric"
          value={principal}
          onChangeText={setPrincipal}
        />
      </View>

      <View className="mb-4">
        <Text className="text-slate-600 mb-2">Annual Interest Rate (%)</Text>
        <TextInput
          className="border border-slate-300 rounded-lg px-4 py-3"
          keyboardType="numeric"
          value={rate}
          onChangeText={setRate}
        />
      </View>

      <View className="mb-6">
        <Text className="text-slate-600 mb-2">Tenure (months)</Text>
        <TextInput
          className="border border-slate-300 rounded-lg px-4 py-3"
          keyboardType="numeric"
          value={months}
          onChangeText={setMonths}
        />
      </View>

      <View className="bg-green-50 border border-green-200 rounded-xl p-4">
        <Text className="text-green-700 font-semibold">Estimated EMI</Text>
        <Text className="text-3xl font-bold text-green-700 mt-1">₹{emi.toFixed(2)}</Text>
      </View>
    </View>
  );
}


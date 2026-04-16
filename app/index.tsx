import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';

export default function App() {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const targetDate = new Date('2026-04-30T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      // If the countdown is over then render:
      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft('I Got Selected for GSoC 2026!');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#0e0e0e] items-center justify-center">
      <Text className="text-white text-sm font-bold mb-3 tracking-widest">
        GSoC Result Countdown
      </Text>
      <View className="p-8 bg-black rounded-3xl border-2 border-white shadow-xl items-center">
        <Text className="text-cyan-400 text-center text-4xl font-extrabold tabular-nums">
          {timeLeft || 'Calculating...'}
        </Text>
      </View>
    </SafeAreaView>
  );
}
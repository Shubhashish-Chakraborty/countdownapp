import { useAudioPlayer } from 'expo-audio';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function App() {
  const [timeLeft, setTimeLeft] = useState('');
  
  // 1. Let the hook handle initialization and memory cleanup natively
  const tickPlayer = useAudioPlayer(
    'https://actions.google.com/sounds/v1/alarms/beep_short.ogg',
    { downloadFirst: true }
  );

  useEffect(() => {
    const targetDate = new Date('2026-04-30T00:00:00').getTime();
    let interval: ReturnType<typeof setInterval>;

    const updateTimerAndPlay = async () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      // If the countdown is over then render:
      if (distance < 0) {
        if (interval) clearInterval(interval);
        setTimeLeft('I Got Selected for GSoC 2026!');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      
      // 2. Play the sound safely using the hook's instance
      if (tickPlayer) {
        try {
          await tickPlayer.seekTo(0);
          tickPlayer.play();
        } catch (err) {
          console.log('Error playing tick sound', err);
        }
      }
    };

    // Call it immediately on startup
    updateTimerAndPlay();

    // Set the interval to handle every subsequent second
    interval = setInterval(updateTimerAndPlay, 1000);

    return () => {
      if (interval) clearInterval(interval);
      // You no longer need to call tickPlayer.remove() manually;
      // the useAudioPlayer hook handles it on unmount.
    };
  }, [tickPlayer]); 

  return (
    <View className="flex-1 bg-[#0e0e0e] items-center justify-center">
      <Text className="text-white text-center text-xl font-bold mb-3">
        GSoC Result in
      </Text>
      <View className="p-8 bg-black rounded-3xl border-2 border-white shadow-xl items-center">
        <Text className="text-cyan-400 text-center text-4xl font-extrabold tabular-nums">
          {timeLeft || 'Calculating...'}
        </Text>
      </View>
    </View>
  );
}
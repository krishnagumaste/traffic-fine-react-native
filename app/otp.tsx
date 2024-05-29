/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */
import { Ionicons, FontAwesome, Entypo, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter, Link, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import { Button, Input, YStack, H2, Theme, XStack, Card, Paragraph, H4, Image, H3, SizableText, Form } from 'tamagui';
import type { CardProps } from 'tamagui'

import { ip } from './ip';
import { useState } from 'react';

export default function OtpScreen() {
  const [otp,setOtp] = useState('');
  const {token} = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);

    const temp = {
        otp: otp,
        token: token
      }
  
      try {
        const result = await axios.post(`http://` + ip + `/verifyotp`, temp, {
          headers: {
            'Content-Type': 'application/json', // Set the appropriate Content-Type
          },
        });

        if(result.status === 200){
            setLoading(false);
            router.push('/(tabs)');
          } else {
            setLoading(false);
            Alert.alert('Invalid OTP');
        }
  
      } catch (error) {
        Alert.alert("Server Error")
        console.log(error);
      }

    setLoading(false);
  }

  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" style={styles.xstackl}>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        <Form
          style={{ margin: 25, minWidth: 300 }}
          alignItems="center"
          gap="$2"
          onSubmit={handleSubmit}>
          <YStack alignItems="center" space="$2" style={styles.xstackl}>
            <H3>Enter 6-digit OTP</H3>
            <XStack alignItems="center" space="$2" style={styles.xstack}>
              <MaterialIcons name="password" size={24} color="black" />
              <Input flex={1} placeholder="OTP" keyboardType="numeric" onChangeText={(newText) => setOtp(newText)}/>
            </XStack>
          </YStack>

          <Form.Trigger asChild style={styles.submit}>
            <Button theme="active">
              <XStack alignItems="center">
                <Button theme="active" borderRadius="$10" onPress={handleSubmit}>Submit</Button>
              </XStack>
            </Button>
          </Form.Trigger>
        </Form>
      </YStack>
      {loading && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      )}
    </Theme>
  );
}

const styles = StyleSheet.create({
    xstackl: {
      marginTop: 20,
    },
    xstack: {
      marginTop: 5,
    },
    submit: {
      marginTop: 10,
    }
  });
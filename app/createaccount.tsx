/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */
import { Ionicons, FontAwesome, Entypo, FontAwesome6 } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter, Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import { Button, Input, YStack, H2, Theme, XStack, Card, Paragraph, H4, Image, H3, SizableText, Form } from 'tamagui';
import type { CardProps } from 'tamagui'

import { ip } from './ip';
import { useState } from 'react';

export default function CreateAccountScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const router = useRouter();

  const isValidPhoneNumber = (input: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(input);
  };
  
  const isValidEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleSubmit = async () => {
    setLoading(true);

    if(!isValidEmail(email)){
      Alert.alert("Email not Valid.");
    } else if(!isValidPhoneNumber(phone)){
      Alert.alert("Phone Number not Valid.");
    } else {
      const temp = {
        name: name,
        email: email,
        phone_number: phone,
        password: password
      }
  
      try {
        const result = await axios.post(`http://` + ip + `/signup/user`, temp, {
          headers: {
            'Content-Type': 'application/json', // Set the appropriate Content-Type
          },
        });
  
        if(result){
          setToken(result.data.token);
        }
  
      } catch (error) {
        Alert.alert("Email or Phone Number already exists.")
        console.log(error);
      }
  
      try {
        router.push(`/otp?token=${token}`)
      } catch (error) {
        console.log(error);
      }
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
            <H3>Create New Account</H3>
            <XStack alignItems="center" space="$2" style={styles.xstack}>
              <FontAwesome name="user-circle-o" size={24} color="black" />
              <Input flex={1} placeholder="Name" keyboardType="default" onChangeText={(newText) => setName(newText)}/>
            </XStack>
            <XStack alignItems="center" space="$2" style={styles.xstack}>
              <Entypo name="email" size={24} color="black" />
              <Input flex={1} placeholder="Email"  keyboardType="email-address" autoComplete="email" onChangeText={(newText) => setEmail(newText)}/>
            </XStack>
            <XStack alignItems="center" space="$2" style={styles.xstack}>
              <FontAwesome name="phone-square" size={28} color="black" />
              <Input flex={1} placeholder="Phone"  keyboardType="number-pad" autoComplete="tel" onChangeText={(newText) => setPhone(newText)}/>
            </XStack>
            <XStack alignItems="center" space="$2" style={styles.xstack}>
              <Entypo name="lock" size={24} color="black" />
              <Input flex={1} placeholder="Password" textContentType="password" autoComplete="current-password" secureTextEntry onChangeText={(newText) => setPassword(newText)}/>
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

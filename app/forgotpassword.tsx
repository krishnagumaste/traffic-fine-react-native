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

export default function ForgotPasswordScreen() {
  const [phone,setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);

    const temp = {
        phone: phone,
      }
  
      try {
        const result = await axios.post(`http://` + ip + `/forgotpassword`, temp, {
          headers: {
            'Content-Type': 'application/json', // Set the appropriate Content-Type
          },
        });

        if(result.status === 200){
            setLoading(false);
            router.push(`/otpforforgotpassword?phone=${phone}`);
          } else {
            setLoading(false);
            Alert.alert(`Phone Number doesn't exists.`);
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
            <H4>Enter Registered Phone Number</H4>
            <XStack alignItems="center" space="$2" style={styles.xstack}>
              <FontAwesome name="phone-square" size={28} color="black" />
              <Input flex={1} placeholder="Phone"  keyboardType="number-pad" autoComplete="tel" onChangeText={(newText) => setPhone(newText)}/>
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
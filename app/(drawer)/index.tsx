/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */
import { Ionicons, FontAwesome, Entypo, FontAwesome6 } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter, Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, Alert, View, StyleSheet, ActivityIndicator } from 'react-native';
import { YStack, H2, Theme, SizableText, XStack, Input, Button, Form } from 'tamagui';

import { ip } from '../ip';

const Page = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isValidPhoneNumber = (input: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(input);
  };
  
  const isValidEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleLogin = async () => {
    setLoading(true);

    let data;

    if(isValidPhoneNumber(login)){
      data = {
        phone_number : login,
        password : password
      }

      try {
        const result = await axios.post(`http://` + ip + `/login/user/phone_number`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if(result.status === 200){
          setLoading(false);
          router.push('/(tabs)');
        } else {
          setLoading(false);
          Alert.alert('Invalid Phone / Password');
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        Alert.alert('Server Error');
      }

    } else if(isValidEmail(login)) {
      data = {
        email : login,
        password : password
      }

      try {
        const result = await axios.post(`http://` + ip + `/login/user/email`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if(result.status === 200){
          setLoading(false);
          router.push('/(tabs)');
        } else {
          setLoading(false);
          Alert.alert('Invalid Email / Password');
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        Alert.alert('Server Error');
      }

    } else {
      setLoading(false);
      Alert.alert('Check Email / Phone');
    }
  };

  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center">
        <Form
          style={{ margin: 20, minWidth: 300 }}
          alignItems="center"
          gap="$2"
          onSubmit={handleLogin}
          paddingTop="$8">
          <YStack alignItems="center" space="$3">
            <FontAwesome6 name="user-large" size={60} color="black" />
            <H2>User Login</H2>
          </YStack>
          <YStack padding="$3" minWidth={300} space="$4">
            <XStack alignItems="center" space="$2">
              <FontAwesome name="user-circle-o" size={24} color="black" />
              <Input flex={1} placeholder="email / phone"  keyboardType="email-address" autoComplete="email" onChangeText={(newText) => setLogin(newText)}/>
            </XStack>
            <XStack alignItems="center" space="$2">
              <Entypo name="lock" size={24} color="black" />
              <Input flex={1} placeholder="password" textContentType="password" autoComplete="current-password" secureTextEntry onChangeText={(newText) => setPassword(newText)}/>
            </XStack>
          </YStack>

          <Form.Trigger asChild>
            <Button theme="active">
              <XStack alignItems="center">
                <SizableText size="$3">Login</SizableText>
                <Ionicons name="log-in-outline" size={24} />
              </XStack>
            </Button>
          </Form.Trigger>
        </Form>
        <YStack>
          <XStack alignItems="center" space="$7">
            <Link href="/createaccount" asChild>
              <Pressable>
                {({ pressed }) => (
                  <XStack alignItems="center" space="$1">
                    {/* <FontAwesome name="user-plus" size={24} color="grey" /> */}
                    <SizableText
                      size={24}
                      color="grey"
                      style={[{ opacity: pressed ? 0.5 : 1 }]}>
                      Create Account
                    </SizableText>
                  </XStack>
                )}
              </Pressable>
            </Link>
            <Link href="/forgotpassword" asChild>
              <Pressable>
                {({ pressed }) => (
                  <XStack alignItems="center" space="$1">
                    {/* <FontAwesome name="question-circle" size={24} color="grey" /> */}
                    <SizableText
                      size="$3"
                      color="grey"
                      style={[{ opacity: pressed ? 0.5 : 1 }]}>
                      Forgot Password?
                    </SizableText>
                  </XStack>
                )}
              </Pressable>
            </Link>
          </XStack>
          
        </YStack>
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
};

// const styles = StyleSheet.create({});

export default Page;


// router.push('/(tabs)'); // Redirect after delay
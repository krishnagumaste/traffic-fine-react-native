/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */
import { Ionicons, Entypo, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, View, StyleSheet, ActivityIndicator } from 'react-native';
import { YStack, H2, Theme, SizableText, XStack, Input, Button, Form } from 'tamagui';

import { ip } from '../ip';

const Page = () => {
  const [badge_no, setBadge_no] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);

    const data = {
      badge_no: badge_no,
      password: password,
    };

    try {
      const result = await axios.post(`http://` + ip + `/login/police`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (result.status === 200) {
        setLoading(false);
        router.push('/(tabs2)');
      } 
      if (result.status === 404) {
        setLoading(false);
        Alert.alert('Invalid Badge No. / Password');
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert('Server Error');
    }

    setLoading(false);
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
            <FontAwesome6 name="user-secret" size={60} color="black" />
            <H2>Traffic Police Login</H2>
          </YStack>
          <YStack padding="$3" minWidth={300} space="$4">
            <XStack alignItems="center" space="$2">
              <MaterialCommunityIcons name="badge-account-horizontal" size={24} color="black" />
              <Input
                flex={1}
                placeholder="badge-no"
                keyboardType="number-pad"
                onChangeText={(newText) => setBadge_no(newText)}
              />
            </XStack>
            <XStack alignItems="center" space="$2">
              <Entypo name="lock" size={24} color="black" />
              <Input
                flex={1}
                placeholder="password"
                textContentType="password"
                secureTextEntry
                onChangeText={(newText) => setPassword(newText)}
              />
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

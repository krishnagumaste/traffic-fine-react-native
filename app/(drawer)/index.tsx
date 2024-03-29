/* eslint-disable prettier/prettier */
import { Ionicons, FontAwesome, Entypo, FontAwesome6 } from '@expo/vector-icons';
import { useRouter, Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable } from 'react-native'
import { YStack, H2, Theme, SizableText, XStack, Input, Button, Form, Spinner } from 'tamagui';

const Page = () => {
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off');
  const router = useRouter();

  useEffect(() => {
    if (status === 'submitting') {
      const timer = setTimeout(() => {
        setStatus('off');
      }, 2000);
      return () => {
        clearTimeout(timer);
        router.push('/(tabs)'); // Redirect after delay
      };
    }
  }, [status, router]);

  const handleLogin = () => {
    setStatus('submitting');
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
              <Input flex={1} placeholder="email"  keyboardType="email-address" autoComplete="email"/>
            </XStack>
            <XStack alignItems="center" space="$2">
              <Entypo name="lock" size={24} color="black" />
              <Input flex={1} placeholder="password" textContentType="password" autoComplete="current-password" secureTextEntry/>
            </XStack>
          </YStack>

          <Form.Trigger asChild disabled={status !== 'off'}>
            <Button
              icon={status === 'submitting' ? () => <Spinner /> : undefined}
              theme="active"
              onPress={handleLogin}>
              <XStack alignItems="center">
                <SizableText size="$3">Login</SizableText>
                <Ionicons name="log-in-outline" size={24} />
              </XStack>
            </Button>
          </Form.Trigger>
        </Form>
        <YStack>
          <XStack alignItems="center" space="$7">
            <Link href="/modal" asChild>
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
            <Link href="/modal" asChild>
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
    </Theme>
  );
};

// const styles = StyleSheet.create({});

export default Page;

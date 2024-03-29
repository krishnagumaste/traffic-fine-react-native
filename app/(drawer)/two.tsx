/* eslint-disable prettier/prettier */
import { Ionicons, Entypo, FontAwesome6, MaterialCommunityIcons  } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
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
        router.push('/(tabs2)'); // Redirect after delay
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
            <FontAwesome6 name="user-secret" size={60} color="black" />
            <H2>Traffic Police Login</H2>
          </YStack>
          <YStack padding="$3" minWidth={300} space="$4">
            <XStack alignItems="center" space="$2">
              <MaterialCommunityIcons name="badge-account-horizontal" size={24} color="black" />
              <Input flex={1} id="badge_no" placeholder="badge-no" keyboardType="number-pad"/>
            </XStack>
            <XStack alignItems="center" space="$2">
              <Entypo name="lock" size={24} color="black" />
              <Input flex={1} id="password" placeholder="password" textContentType="password" secureTextEntry/>
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
      </YStack>
    </Theme>
  );
};

// const styles = StyleSheet.create({});

export default Page;

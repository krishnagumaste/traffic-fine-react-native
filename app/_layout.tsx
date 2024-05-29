import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack, SplashScreen, Link } from 'expo-router';
import React, { useEffect } from 'react';
import { Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider, XStack, SizableText } from 'tamagui';

import config from '../tamagui.config';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/app/index',
};

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ title: 'Index', presentation: 'fullScreenModal', headerShown: false }}
          />
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(tabs)"
            options={{
              title: 'User',
              presentation: 'fullScreenModal',
              headerBackVisible: false,
              gestureEnabled: false,
              headerRight: () => (
                <Link href="/(drawer)/" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <XStack alignItems="center">
                        <SizableText
                          size="$3"
                          color="grey"
                          style={[{ opacity: pressed ? 0.5 : 1 }]}>
                          LogOut
                        </SizableText>
                        <Ionicons
                          name="log-out-outline"
                          size={24}
                          color="grey"
                          style={[{ opacity: pressed ? 0.5 : 1 }]}
                        />
                      </XStack>
                    )}
                  </Pressable>
                </Link>
              ),
            }}
          />
          <Stack.Screen
            name="(tabs2)"
            options={{
              title: 'Traffic Police',
              presentation: 'fullScreenModal',
              headerBackVisible: false,
              headerRight: () => (
                <Link href="/(drawer)/two" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <XStack alignItems="center">
                        <SizableText
                          size="$3"
                          color="grey"
                          style={[{ opacity: pressed ? 0.5 : 1 }]}>
                          LogOut
                        </SizableText>
                        <Ionicons
                          name="log-out-outline"
                          size={24}
                          color="grey"
                          style={[{ opacity: pressed ? 0.5 : 1 }]}
                        />
                      </XStack>
                    )}
                  </Pressable>
                </Link>
              ),
            }}
          />
          <Stack.Screen
            name="(tabs3)"
            options={{
              title: 'Admin',
              presentation: 'fullScreenModal',
              headerBackVisible: false,
              headerRight: () => (
                <Link href="/(drawer)/three" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <XStack alignItems="center">
                        <SizableText
                          size="$3"
                          color="grey"
                          style={[{ opacity: pressed ? 0.5 : 1 }]}>
                          LogOut
                        </SizableText>
                        <Ionicons
                          name="log-out-outline"
                          size={24}
                          color="grey"
                          style={[{ opacity: pressed ? 0.5 : 1 }]}
                        />
                      </XStack>
                    )}
                  </Pressable>
                </Link>
              ),
            }}
          />
          <Stack.Screen name="modal" options={{ title: 'LogOut', presentation: 'modal' }} />
          <Stack.Screen
            name="forgotpassword"
            options={{ title: 'Forgot Password', presentation: 'modal' }}
          />
          <Stack.Screen
            name="createaccount"
            options={{ title: 'Create Account', presentation: 'modal' }}
          />
          <Stack.Screen name="otp" options={{ title: 'Otp Verification', presentation: 'modal' }} />
          <Stack.Screen
            name="otpforforgotpassword"
            options={{ title: 'Otp Verification', presentation: 'modal' }}
          />
          <Stack.Screen
            name="changepassword"
            options={{ title: 'Change Password', presentation: 'modal' }}
          />
          <Stack.Screen
            name="failedtogenerate"
            options={{ title: 'Failed To Generate', presentation: 'modal' }}
          />
        </Stack>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}

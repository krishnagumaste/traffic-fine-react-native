/* eslint-disable prettier/prettier */
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { YStack, H2, Theme, SizableText, XStack, Image } from 'tamagui';

const Page = () => {
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <H2>Fine Scan Pro</H2>
        <Image
          source={require('C:/Users/Krishna Gumaste/Desktop/react-native/test/app/logo.jpeg')} // adjust the path to your actual image location
          style={{ width: 150, height: 200, marginTop: 10, marginBottom: 10 , borderRadius: 10}}
        />
        <Link href="/(drawer)" asChild>
            <Pressable>
              {({ pressed }) => (
                <XStack alignItems="center">
                  <SizableText size="$3" color="grey" style={[{ opacity: pressed ? 0.5 : 1 }]}>
                    Get Started
                  </SizableText>
                  <Ionicons
                    name="log-out-outline"
                    size={24}
                    color="grey"
                    style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
                  />
                </XStack>
              )}
            </Pressable>
          </Link>
      </YStack>
    </Theme>
  );
};

const styles = StyleSheet.create({
    headerRight: {
        marginRight: 10,
    },
});

export default Page;

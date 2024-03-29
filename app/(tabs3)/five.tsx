/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { YStack, H2, Theme } from 'tamagui';

export default function TabFiveScreen() {

  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center">
        <H2 style={styles.header}>Driver</H2>
      </YStack>
    </Theme>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
  },
});

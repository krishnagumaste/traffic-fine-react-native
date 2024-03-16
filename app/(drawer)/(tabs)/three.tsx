import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, YStack, H2, Theme, XStack } from 'tamagui';

export default function TabThreeScreen() {
  const [licenseNumber, setLicenseNumber] = useState('');

  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center">
        <H2 style={styles.header}>Check Driver Details</H2>
        <XStack alignItems="center" space="$2" style={styles.xstack}>
          <Input size="$3" placeholder="Enter Driving License Number" onChangeText={(newText) => setLicenseNumber(newText)}
            value={licenseNumber}/>
          <Button size="$3" theme="active" onPress={() => console.log(licenseNumber)}>
            Go
          </Button>
        </XStack>
      </YStack>
    </Theme>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
  },
  xstack: {
    marginTop: 10,
  },
});

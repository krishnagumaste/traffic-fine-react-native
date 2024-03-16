import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, YStack, H2, Theme, XStack } from 'tamagui';

export default function TabFourScreen() {
  const [vehicleNumber, setVehicleNumber] = useState('');

  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center">
        <H2 style={styles.header}>Check Vehicle Details</H2>
        <XStack alignItems="center" space="$2" style={styles.xstack}>
          <Input size="$3" placeholder="Enter Vehicle Number" onChangeText={(newText) => setVehicleNumber(newText)}
            value={vehicleNumber}/>
          <Button size="$3" theme="active" onPress={() => console.log(vehicleNumber)}>Go</Button>
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
  
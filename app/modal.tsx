import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { YStack, Paragraph, Theme, Button } from 'tamagui';

const handleSubmit = async () => {
  try {
    const res = await axios.get(`http://192.168.0.110:5000/test`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export default function ModalScreen() {
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        <Paragraph>You have been Logged Out</Paragraph>
        <Button size="$3" theme="active" onPress={handleSubmit}>
          Submit
        </Button>
      </YStack>
    </Theme>
  );
}

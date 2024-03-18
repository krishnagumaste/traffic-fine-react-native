import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { StyleSheet, Image, Pressable } from 'react-native';
import { YStack, H2, Theme, H6, Input, SizableText, XStack, Button, Text } from 'tamagui';

export default function TabOneScreen() {
  //add date to the data to be sent from here itself

  const [fineType, setFineType] = useState('');
  const [fineLocation, setFineLocation] = useState('');
  const [image, setImage] = useState('');
  // const [date, setDate] = useState('');

  const clickImage = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      const result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeImage = () => {
    setImage('');
  };

  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center">
        <H2 style={styles.header}>Add Fine</H2>
        <H6 style={styles.header6}>Provide Information</H6>
        <XStack alignItems="center" space="$2" style={styles.xstack}>
          <SizableText size="$3">Enter Fine Type : </SizableText>
          <Input
            size="$3"
            placeholder="No Helmet/Seatbelt"
            onChangeText={(newText) => setFineType(newText)}
            value={fineType}
          />
        </XStack>
        <XStack alignItems="center" space="$2" style={styles.xstack}>
          <SizableText size="$3">Enter Location : </SizableText>
          <Input
            size="$3"
            placeholder="Kengeri, Bengaluru"
            onChangeText={(newText) => setFineLocation(newText)}
            value={fineLocation}
          />
        </XStack>
        <XStack alignItems="center" space="$2" style={styles.xstack}>
          <SizableText size="$3">Add Image : </SizableText>
        </XStack>
        <XStack alignItems="center" space="$5" style={styles.xstack}>
          <Button size="$6" theme="active" onPress={clickImage}>
            <YStack alignItems="center">
              <SimpleLineIcons name="camera" size={24} color="black" />
              <SizableText size="$3">Camera</SizableText>
            </YStack>
          </Button>
          <Button size="$6" theme="active" onPress={pickImage}>
            <YStack alignItems="center">
              <MaterialCommunityIcons name="view-gallery-outline" size={24} color="black" />
              <SizableText size="$3">Gallery</SizableText>
            </YStack>
          </Button>
        </XStack>
        {image !== '' && (
          <YStack alignItems="center" space="$2" style={styles.xstack}>
            <SizableText size="$3">Image Selected : </SizableText>
            <Image source={{ uri: image }} style={styles.image} />
            <Pressable onPress={removeImage}>
              <Text
                color="red"
                fontFamily="$body"
                fontSize={10}
                hoverStyle={{
                  color: '$colorHover',
                }}>
                Remove Image
              </Text>
            </Pressable>
          </YStack>
        )}
        <XStack alignItems="center" space="$2" style={styles.xstack}>
          <Button size="$3" theme="active">
            Submit
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
  header6: {
    marginTop: 10,
  },
  xstack: {
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 5,
  },
});

/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */

import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location'
import { useRouter } from 'expo-router';
import { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Image, Alert, ActivityIndicator, View } from 'react-native';
import { YStack, H2, Theme, H6, SizableText, XStack, Button, Label, Select, Adapt, Sheet, getFontSize, H4, Card } from 'tamagui';
import type { FontSizeTokens, SelectProps } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'
import type { CardProps } from 'tamagui'

import { ip } from '../ip';

const imgDir = FileSystem.documentDirectory + 'images/';

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

const items = [
  { name: 'No Helmet' },
  { name: 'No Seat Belt' },
  { name: 'Drink and Drive' },
  { name: 'Jumping Red Signal' },
  { name: 'Speeding' },
  { name: 'Rash Driving' },
  { name: 'Driving In Wrong Way' },
  { name: 'No Parking' },
  { name: 'Driving Without License' },
  { name: 'Lapsed Insurance' }
]

export default function TabOneScreen() {
  const [fineType, setFineType] = useState('');
  const [image, setImage] = useState('');
  const [forURL, setForURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Location Loading.....');
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const router = useRouter();

  function DemoCard(props: CardProps) {
    return (
      <Card elevate size="$4" bordered {...props}>
        <Card.Header padded space="$2">
          <XStack alignItems='center' justifyContent='space-between'>
            <H6>Selected Image</H6>
            <Button alignSelf="center" size="$3" themeInverse onPress={removeImage}>
              Remove
            </Button>
          </XStack>
          <XStack justifyContent='center'>
            <Image source={{ uri: image }} style={styles.image} />
          </XStack>  
        </Card.Header>
      </Card>
    )
  }

  function SelectDemoItem(props: SelectProps) {
  

    return (
      <Select value={fineType} onValueChange={(newText) => setFineType(newText)} disablePreventBodyScroll {...props}>
        <Select.Trigger width={220} iconAfter={ChevronDown}>
          <Select.Value placeholder="Select" />
        </Select.Trigger>
  
        <Adapt when="sm" platform="touch">
          <Sheet
            native={!!props.native}
            modal
            dismissOnSnapToBottom
            animationConfig={{
              type: 'spring',
              damping: 20,
              mass: 1.2,
              stiffness: 250,
            }}
          >
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>
  
        <Select.Content zIndex={200000}>
          <Select.ScrollUpButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <ChevronUp size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['$background', 'transparent']}
              borderRadius="$4"
            />
          </Select.ScrollUpButton>
  
          <Select.Viewport
            // to do animations:
            // animation="quick"
            // animateOnly={['transform', 'opacity']}
            // enterStyle={{ o: 0, y: -10 }}
            // exitStyle={{ o: 0, y: 10 }}
            minWidth={200}
          >
            <Select.Group>
              <Select.Label>Select Fine</Select.Label>
              {/* for longer lists memoizing these is useful */}
              {useMemo(
                () =>
                  items.map((item, i) => {
                    return (
                      <Select.Item
                        index={i}
                        key={item.name}
                        value={item.name}
                      >
                        <Select.ItemText>{item.name}</Select.ItemText>
                        <Select.ItemIndicator marginLeft="auto">
                          <Check size={16} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    )
                  }),
                [items]
              )}
            </Select.Group>
            {/* Native gets an extra icon */}
            {props.native && (
              <YStack
                position="absolute"
                right={0}
                top={0}
                bottom={0}
                alignItems="center"
                justifyContent="center"
                width={'$4'}
                pointerEvents="none"
              >
                <ChevronDown
                  size={getFontSize((props.size as FontSizeTokens) ?? '$true')}
                />
              </YStack>
            )}
          </Select.Viewport>
  
          <Select.ScrollDownButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <ChevronDown size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['transparent', '$background']}
              borderRadius="$4"
            />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select>
    )
  }

  useEffect(()=>{
    checkIfLocationEnabled();
    getCurrentLocation();
   },[])

  //check if location is enable or not
  const checkIfLocationEnabled= async ()=>{
    const enabled = await Location.hasServicesEnabledAsync();       //returns true or false
    if(!enabled){                     //if not enable 
      Alert.alert('Location not enabled', 'Please enable your Location', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }else{
      setLocationServicesEnabled(enabled)         //store true into state
    }
  }

  //get current location
  const getCurrentLocation= async ()=>{
    const {status} = await Location.requestForegroundPermissionsAsync();  //used for the pop up box where we give permission to use location 
    // console.log(status);
    if(status !== 'granted'){
     Alert.alert('Permission denied', 'Allow the app to use the location services', [
       {
         text: 'Cancel',
         onPress: () => console.log('Cancel Pressed'),
         style: 'cancel',
       },
       {text: 'OK', onPress: () => console.log('OK Pressed')},
     ]);
    }

      //get current position lat and long
    const {coords} = await Location.getCurrentPositionAsync();  
    // console.log(coords)
    
    if(coords){
      const {latitude,longitude} =coords;
      // console.log(latitude,longitude);

    //provide lat and long to get the the actual address
      const responce = await Location.reverseGeocodeAsync({           
          latitude,
          longitude
      });
      // console.log(responce);
      //loop on the responce to get the actual result
      for(const item of responce ){
        const address = `${item.formattedAddress}`
        setDisplayCurrentAddress(address)
      }
    }
  }

  const saveImage = async (uri: string) => {
    await ensureDirExists();
    const filename = new Date().getTime() + '.jpeg';
    setForURL(filename);
    const dest = imgDir + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });
    setImage(dest);
  };

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
        saveImage(result.assets[0].uri);
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
        saveImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteImage = async (uri: string) => {
    await FileSystem.deleteAsync(uri);
    setImage('');
  };

  const removeImage = () => {
    deleteImage(image);
    setImage('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!fineType || !image) {
      Alert.alert('Please fill in all fields and select an image.');
    } else {
      try {
        const temp = {
          image: forURL,
        };

        const result = await axios.post(`http://` + ip + `/geturl`, temp, {
          headers: {
            'Content-Type': 'application/json', // Set the appropriate Content-Type
          },
        });

        const presignedUrl = result.data.url;

        await FileSystem.uploadAsync(presignedUrl, image, {
          httpMethod: 'PUT',
          fieldName: 'image',
          headers: {
            'Content-Type': 'image/jpeg',
          },
        });
      } catch (error) {
        console.log(error);
      }

      try {
        const temp = {
          image: forURL,
          type: fineType,
          location: displayCurrentAddress,
          ip: ip,
        };

        const result = await axios.post(`http://` + ip + `/addfine`, temp, {
          headers: {
            'Content-Type': 'application/json', // Set the appropriate Content-Type
          },
        });

        if(result.status === 409){
          Alert.alert('Failed ');
        } else {
          Alert.alert('Fine added successfully. ');
        }

      } catch (error) {
        // Alert.alert('Failed to identify the number plate');
        setLoading(false);
        router.push(`/failedtogenerate?imagedisplay=${image}&image=${forURL}&type=${fineType}&location=${displayCurrentAddress}`)
        console.log(error);
      }

      setFineType('');
      setImage('');
      
    }
    setLoading(false);
  };

  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center">
        <H2 style={styles.header}>Add Fine</H2>
        <H6 style={styles.header6}>Provide Information</H6>
          <YStack alignItems="center" justifyContent='center' space="$5" style={styles.xstack}>
            <XStack ai="center">
              <Label htmlFor="select-demo-1" miw={80}>
                Fine Type
              </Label>
              <SelectDemoItem id="select-demo-1" />
            </XStack>
          </YStack>
        <YStack alignItems="center" justifyContent='center' space="$3" style={styles.xstack}>
          <XStack>
            <SizableText size="$3">Select Image</SizableText>
          </XStack>
          <XStack space="$3">
            <Button size="$5" theme="active" onPress={clickImage}>
              <YStack alignItems="center">
                <SimpleLineIcons name="camera" size={24} color="black" />
                <SizableText size="$3">Camera</SizableText>
              </YStack>
            </Button>
            <Button size="$5" theme="active" onPress={pickImage}>
              <YStack alignItems="center">
                <MaterialCommunityIcons name="view-gallery-outline" size={24} color="black" />
                <SizableText size="$3">Gallery</SizableText>
              </YStack>
            </Button>
          </XStack>
        </YStack>
        {image !== '' && (
          <XStack alignItems="center" space="$2" style={styles.xstackl}>
            <DemoCard size="$5" width={350} height={300} />
          </XStack>
        )}
        {image !== '' && (
          <XStack alignItems="center" space="$4" style={styles.xstack}>
            <Button size="$3" theme="active" onPress={handleSubmit}>
              Submit
            </Button>
          </XStack>
        )}
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
  dropdown: {
    width: '50%',
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  button: {
    width: '40%',
    height: 35,
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 16,
  },
  row: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rowText: {
    fontSize: 16,
  },
  xstackl: {
    marginTop: 20,
  },
});

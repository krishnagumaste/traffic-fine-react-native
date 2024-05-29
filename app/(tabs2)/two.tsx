/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */

import axios from 'axios';
import { useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Alert, ScrollView } from 'react-native';
import { Button, Input, YStack, H2, Theme, XStack, Card, Paragraph, H4, Image, H3 } from 'tamagui';
import type { CardProps } from 'tamagui'

import { ip } from '../ip';

export default function TabTwoScreen() {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [fines, setFines] = useState([]);

  const handleViewImage = async (image: any) => {
    setLoading(true);

    const temp = {
      image: image
    }
    try {
      const result = await axios.post(`http://` + ip + `/imageurl`, temp, {
        headers: {
          'Content-Type': 'application/json', // Set the appropriate Content-Type
        },
      });

      setImageUrl(result.data.url);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    setImageLoaded(true);
  }

  const handlePay = () => {
    Alert.alert('Fine Paid');
  }

  const handleClose = () => {
    setImageLoaded(false);
  }

  function DemoCard({ fine }) {
    return (
      <Card elevate size="$4" bordered style={styles.cardStyle}>
        <Card.Header padded space="$2">
          <H2>{fine.license_plate_number}</H2>
          <H4>Amount : {fine.fine_amount}</H4>
          <Paragraph theme="alt2">Fine Type : {fine.fine_type}</Paragraph>
          <Paragraph theme="alt2">Date : {fine.fine_date}</Paragraph>
          <Paragraph theme="alt2">Time : {fine.fine_time}</Paragraph>
          <Paragraph theme="alt2">Location : {fine.fine_location}</Paragraph>
        </Card.Header>
        <Card.Footer padded justifyContent='space-between'>
          <Button theme="active" borderRadius="$10" onPress={handlePay}>Pay Fine</Button>
          <Button theme="active" borderRadius="$10" onPress={() => handleViewImage(fine.image)}>View Image</Button>
        </Card.Footer>
      </Card>
    )
  }

  const handleSubmit = async () => {
    setLoading(true);

    const temp = {
      license_plate_number: vehicleNumber,
    }

    try {
      const result = await axios.post(`http://` + ip + `/details/fine`, temp, {
        headers: {
          'Content-Type': 'application/json', // Set the appropriate Content-Type
        },
      });

      if (result.data.status === 404 || result.data.length === 0) {
        Alert.alert('No fines on vehicle');
        setLoaded(false);
      } else {
        setFines(result.data);
        setLoaded(true);
      }
    } catch (error) {
      Alert.alert('Invalid Vehicle Number');
      console.log(error);
    }

    setLoading(false);
    setVehicleNumber('');
  }

  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center">
        <H2 style={styles.header}>Check Fine</H2>
        <XStack alignItems="center" space="$2" style={styles.xstack}>
          <Input
            size="$3"
            placeholder="Enter Vehicle Number"
            onChangeText={(newText) => setVehicleNumber(newText)}
            value={vehicleNumber}
          />
          <Button size="$3" theme="active" onPress={handleSubmit}>
            Go
          </Button>
        </XStack>
        {loaded && fines.length === 0 && (
          <H3 style={styles.noFinesText}>No fines</H3>
        )}
        {loaded && fines.length > 0 && (
          <ScrollView contentContainerStyle={styles.scrollView}>
            {fines.map((fine, index) => (
              <DemoCard key={index} fine={fine} />
            ))}
          </ScrollView>
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
      {imageLoaded && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <YStack justifyContent='center' alignItems='center' space="$3">
            <Image
              source={{
                uri: imageUrl,
                width: 300,
                height: 300,
              }}
            />
            <Button theme="active" borderRadius="$10" onPress={handleClose}>Close</Button>
          </YStack>
        </View>
      )}
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
  xstackl: {
    marginTop: 20,
  },
  scrollView: {
    margin: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  noFinesText: {
    marginTop: 20,
    color: 'red',
  },
  cardStyle: {
    marginBottom: 20,
  },
});

/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */

import axios from 'axios';
import { useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import { Button, Input, YStack, H2, Theme, XStack, Card, Paragraph, H5 } from 'tamagui';
import type { CardProps } from 'tamagui'

import { ip } from '../ip';

export default function TabThreeScreen() {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [insuranceCompany, setInsuranceCompany] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [licensePlateNumber, setLicensePlateNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [type, setType] = useState('');
  const [year, setYear] = useState('');

  function DemoCard(props: CardProps) {
    return (
      <Card elevate size="$4" bordered {...props}>
        <Card.Header padded space="$2">
          <H2>{licensePlateNumber}</H2>
          <H5>Registration Number : {registrationNumber}</H5>
          <Paragraph theme="alt2">Name : {name}</Paragraph>
          <Paragraph theme="alt2">Phone : {phone}</Paragraph>
          <Paragraph theme="alt2">Email : {email}</Paragraph>
          <Paragraph theme="alt2">Type : {type}</Paragraph>
          <Paragraph theme="alt2">Manufacturer : {make}</Paragraph>
          <Paragraph theme="alt2">Model : {model}</Paragraph>
          <Paragraph theme="alt2">Year of Manufacture : {year}</Paragraph>
          <Paragraph theme="alt2">Insurance Company : {insuranceCompany}</Paragraph>
          <Paragraph theme="alt2">Policy Number : {policyNumber}</Paragraph>
        </Card.Header>
        {/* <Card.Footer padded justifyContent='space-between'>
          <Button theme="active" borderRadius="$10" onPress={handlePay}>Pay Fine</Button>
          <Button theme="active" borderRadius="$10" onPress={handleViewImage}>View Image</Button>
        </Card.Footer> */}
      </Card>
    )
  }

  const handleSubmit = async () => {
    setLoading(true);

    const temp = {
      license_plate_number: vehicleNumber,
    }

    try {
      const result = await axios.post(`http://` + ip + `/details/vehicle`, temp, {
        headers: {
          'Content-Type': 'application/json', // Set the appropriate Content-Type
        },
      });

      setLicensePlateNumber(result.data.license_plate_number);
      setName(result.data.owner_name);
      setPhone(result.data.owner_phone);
      setEmail(result.data.owner_email);
      setInsuranceCompany(result.data.insurance_company);
      setPolicyNumber(result.data.insurance_policy_number);
      setRegistrationNumber(result.data.registration_number);
      setMake(result.data.vehicle_make);
      setModel(result.data.vehicle_model);
      setType(result.data.vehicle_type);
      setYear(result.data.vehicle_year);

    } catch (error) {
      Alert.alert('Invalid Vehicle Number');
      console.log(error);
    }

    setLoading(false);
    setLoaded(true);
    setVehicleNumber('');
  }

  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center">
        <H2 style={styles.header}>Check Vehicle Details</H2>
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
        {loaded && (
          <XStack alignItems="center" space="$2" style={styles.xstackl}>
            <DemoCard size="$5" width={350} height={420} />
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
  xstack: {
    marginTop: 10,
  },
  xstackl: {
    marginTop: 20,
  },
});

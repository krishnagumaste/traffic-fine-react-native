/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */

import axios from 'axios';
import { useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import { Button, Input, YStack, H2, Theme, XStack, Card, Paragraph } from 'tamagui';
import type { CardProps } from 'tamagui'

import { ip } from '../ip';

export default function TabTwoScreen() {
  const [licenseNumber, setLicenseNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [address, setAddress] = useState('');
  const [classofVehicle, setClassOfVehicle] = useState('');
  const [email, setEmail] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [registeredAt, setRegisteredAt] = useState('');
  const [registeredOfficeCode, setRegisteredOfficeCode] = useState('');
  const [status, setStatus] = useState('');
  const [licenseId, setLicenseId] = useState('');

  function DemoCard(props: CardProps) {
    return (
      <Card elevate size="$4" bordered {...props}>
        <Card.Header padded space="$2">
          <H2>{licenseId}</H2>
          {status === 'Active' && (
            <Button width="30%" size="$2" disabled opacity={0.5} color='green' backgroundColor='lightgreen'>
            {status}
            </Button>
          )}
          {status === 'Expired' && (
            <Button width="30%" size="$2" disabled opacity={0.5} color='red' backgroundColor='hsl(359, 69.5%, 74.3%)'>
            {status}
            </Button>
          )}
          <Paragraph theme="alt2">Name : {name}</Paragraph>
          <Paragraph theme="alt2">Phone : {phone}</Paragraph>
          <Paragraph theme="alt2">Email : {email}</Paragraph>
          <Paragraph theme="alt2">Address : {address}</Paragraph>
          <Paragraph theme="alt2">Class of Vehicle : {classofVehicle}</Paragraph>
          <Paragraph theme="alt2">Issue Date : {issueDate}</Paragraph>
          <Paragraph theme="alt2">Registered Office : {registeredAt}</Paragraph>
          <Paragraph theme="alt2">Office Code : {registeredOfficeCode}</Paragraph>
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
      license_id: licenseNumber,
    }

    try {
      const result = await axios.post(`http://` + ip + `/details/driver`, temp, {
        headers: {
          'Content-Type': 'application/json', // Set the appropriate Content-Type
        },
      });

      setStatus(result.data.status);
      setName(result.data.name);
      setPhone(result.data.phone);
      setEmail(result.data.email);
      setAddress(result.data.address);
      setClassOfVehicle(result.data.class_of_vehicle);
      setIssueDate(result.data.issue_date);
      setRegisteredAt(result.data.registered_at);
      setRegisteredOfficeCode(result.data.registered_office_code);
      setLicenseId(result.data.license_id);

    } catch (error) {
      Alert.alert('Invalid Vehicle Number');
      console.log(error);
    }

    setLoading(false);
    setLoaded(true);
    setLicenseNumber('');
  }

  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center">
        <H2 style={styles.header}>Check Driver Details</H2>
        <XStack alignItems="center" space="$2" style={styles.xstack}>
          <Input
            size="$3"
            placeholder="Enter Driving License Number"
            onChangeText={(newText) => setLicenseNumber(newText)}
            value={licenseNumber}
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

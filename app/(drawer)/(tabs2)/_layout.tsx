/* eslint-disable prettier/prettier */
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout2() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
      }}>
       <Tabs.Screen
        name="index"
        options={{
          title: 'Check Fine',
          tabBarIcon: ({ color }) => <FontAwesome6 name="list-check" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Driver Details',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="drivers-license-o" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'Vehicle Details',
          tabBarIcon: ({ color }) => <AntDesign name="car" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

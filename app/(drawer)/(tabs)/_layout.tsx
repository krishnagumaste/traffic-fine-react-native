import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Add Fine',
          tabBarIcon: ({ color }) => <AntDesign name="pluscircleo" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Check Fine',
          tabBarIcon: ({ color }) => <FontAwesome6 name="list-check" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'Driver Details',
          tabBarIcon: ({ color }) => <FontAwesome name="drivers-license-o" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: 'Car Details',
          tabBarIcon: ({ color }) => <AntDesign name="car" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});

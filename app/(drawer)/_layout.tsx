import { FontAwesome6 } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

const DrawerLayout = () => (
  <Drawer>
    <Drawer.Screen
      name="index"
      options={{
        headerTitle: 'User',
        drawerLabel: 'User',
        drawerIcon: ({ size, color }) => (
          <FontAwesome6 name="user-large" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="two"
      options={{
        headerTitle: 'Traffic Police',
        drawerLabel: 'Traffic Police',
        drawerIcon: ({ size, color }) => (
          <FontAwesome6 name="user-secret" size={24} color="black" />
        ),
      }}
    />
    {/* <Drawer.Screen
      name="three"
      options={{
        headerTitle: 'Admin',
        drawerLabel: 'Admin',
        drawerIcon: ({ size, color }) => (
          <FontAwesome6 name="user-gear" size={size} color={color} />
        ),
      }}
    /> */}
  </Drawer>
);

export default DrawerLayout;

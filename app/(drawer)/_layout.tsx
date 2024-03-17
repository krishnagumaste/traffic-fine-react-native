import { FontAwesome, Ionicons, MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Pressable, StyleSheet } from 'react-native';

const DrawerLayout = () => (
  <Drawer>
    <Drawer.Screen
      name="index"
      options={{
        headerTitle: 'Home',
        drawerLabel: 'Home',
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="(tabs)"
      options={{
        headerTitle: 'Traffic Police',
        drawerLabel: 'Traffic Police',
        drawerIcon: ({ size, color }) => (
          <MaterialIcons name="local-police" size={24} color="black" />
        ),
        headerRight: () => (
          <Link href="/modal" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="info-circle"
                  size={25}
                  color="gray"
                  style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    />
    <Drawer.Screen
      name="(tabs2)"
      options={{
        headerTitle: 'User',
        drawerLabel: 'User',
        drawerIcon: ({ size, color }) => <FontAwesome6 name="user-large" size={24} color="black" />,
        headerRight: () => (
          <Link href="/modal" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="info-circle"
                  size={25}
                  color="gray"
                  style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    />
    <Drawer.Screen
      name="(tabs3)"
      options={{
        headerTitle: 'Admin',
        drawerLabel: 'Admin',
        drawerIcon: ({ size, color }) => <FontAwesome6 name="user-gear" size={24} color="black" />,
        headerRight: () => (
          <Link href="/modal" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="info-circle"
                  size={25}
                  color="gray"
                  style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    />
  </Drawer>
);

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
});

export default DrawerLayout;

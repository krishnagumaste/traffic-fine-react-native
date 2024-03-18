import { Ionicons, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Pressable, StyleSheet } from 'react-native';
import { SizableText } from 'tamagui';

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
          <MaterialCommunityIcons name="police-badge" size={size} color={color} />
        ),
        headerRight: () => (
          <Link href="/modal" asChild>
            <Pressable>
              {({ pressed }) => (
                <SizableText
                  size="$3"
                  color="grey"
                  style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}>
                  LogOut{' '}
                </SizableText>
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
        drawerIcon: ({ size, color }) => (
          <FontAwesome6 name="user-large" size={size} color={color} />
        ),
        headerRight: () => (
          <Link href="/modal" asChild>
            <Pressable>
              {({ pressed }) => (
                <SizableText
                  size="$3"
                  color="grey"
                  style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}>
                  LogOut{' '}
                </SizableText>
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
        drawerIcon: ({ size, color }) => (
          <FontAwesome6 name="user-gear" size={size} color={color} />
        ),
        headerRight: () => (
          <Link href="/modal" asChild>
            <Pressable>
              {({ pressed }) => (
                <SizableText
                  size="$3"
                  color="grey"
                  style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}>
                  LogOut{' '}
                </SizableText>
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
    marginTop: 8,
  },
});

export default DrawerLayout;

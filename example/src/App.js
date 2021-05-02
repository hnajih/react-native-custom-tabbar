import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import 'react-native-gesture-handler';
import {
  createBottomTabNavigator,
  BottomTabBar,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CustomTabBar from 'react-native-custom-tabbar';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'black' }}>Home</Text>
    </View>
  );
}
function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'black' }}>Profile</Text>
    </View>
  );
}
function Settings() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'black' }}>Settings</Text>
    </View>
  );
}

export default function App() {
  // const height = useBottomTabBarHeight();
  // console.warn(height)
  const [isFull, setisFull] = React.useState(false);
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
          // activeBackgroundColor: 'blue',
          // inactiveBackgroundColor: 'gray',
          // showLabel: false,
        }}
        // initialRouteName={'settings'}
      >
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="profile" component={Profile} />
        <Tab.Screen name="settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

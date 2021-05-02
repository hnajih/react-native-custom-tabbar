import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import 'react-native-gesture-handler';
import {
  createBottomTabNavigator,
  BottomTabBar,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CustomTabBar, { ActionButton as AB } from 'react-native-custom-tabbar';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';

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
  // const [pressed, setpressed] = React.useState(false);
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => (
          <CustomTabBar
            {...props}
            type={'top-line'}
            focusAnimation={'zoomIn'}
            actionButtonIcon={
              <Icon name="add-outline" size={25} color={'black'} />
            }
          />
        )}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name == 'profile') {
              iconName = 'person-outline';
            } else {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
          // labelPosition: 'beside-icon',
          // activeBackgroundColor: 'blue',
          // inactiveBackgroundColor: 'gray',
          // showLabel: false,
          // labelStyle: { color: 'red' },
        }}
        // initialRouteName={'settings'}
      >
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="profile" component={Profile} />
        <Tab.Screen name="settings" component={Settings} />
        <Tab.Screen name="settings2" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

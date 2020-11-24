import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screen/HomeScreen/HomeScreen';
import SearchScreen from '../../screen/SearchScreen/SearchScreen';
import ChatScreen1 from '../../screen/ChatScreen/ChatScreen1';
import NotifScreen from '../../screen/NotifScreen/NotifScreen';
import ProfileScreen from '../../screen/ProfileScreen/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <FontAwesome5 name={'home'} color={color} size={23} />
          ),
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Search',
          selectedTextColor: '#FFFFFF',
          tabBarIcon: ({color}) => (
            <FontAwesome5 name={'search'} color={color} size={23} />
          ),
        }}
        name="SearchScreen"
        component={SearchScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({color}) => (
            <FontAwesome5 name={'comment-alt'} color={color} size={23} />
          ),
        }}
        name="ChatScreen1"
        component={ChatScreen1}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Notification',

          tabBarIcon: ({color}) => (
            <FontAwesome5 name={'bell'} color={color} size={23} />
          ),
        }}
        name="NotifScreen"
        component={NotifScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <FontAwesome5 name={'user-alt'} color={color} size={23} />
          ),
        }}
        name="ProfileSceen"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

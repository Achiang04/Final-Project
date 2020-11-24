import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../../screen/SplashScreen/SplashScreen';
import LoginScreen from '../../screen/LoginScreen/LoginScreen';
import RegisScreen from '../../screen/RegisScreen/RegisScreen';
import WelcomeScreen from '../../screen/WelcomeScreen/WelcomeScreen';
import EditProfileScreen from '../../screen/ProfileScreen/EditProfileScreen';
import ProfileScreen from '../../screen/ProfileScreen/ProfileScreen';
import TabScreen from '../Tab/TabScreen';
import DetailCard from '../../reusable/DetailCard/DetailCard';
import AddPet from '../../screen/AddPet/AddPet';
import AddPet2 from '../../screen/AddPet/AddPet2';
import Booking from '../../reusable/Booking/Booking';
import ClinicRegister from '../../screen/RegisScreen/ClinicRegister';
import ClinicSchedule from '../../screen/ScheduleScreen/ClinicSchedule';
import DoctorSchedule from '../../screen/ScheduleScreen/DoctorSchedule';
import PetList from '../../screen/AddPet/PetList';
import ChatScreen1 from '../../screen/ChatScreen/ChatScreen1';
import IsiChatnya1 from '../../screen/ChatScreen/IsiChatnya1';

const Stack = createStackNavigator();

export default function StackScreen() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisScreen" component={RegisScreen} />
      <Stack.Screen name="ClinicRegister" component={ClinicRegister} />
      <Stack.Screen name="TabScreen" component={TabScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="PetList" component={PetList} />
      <Stack.Screen name="AddPet2" component={AddPet2} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="ClinicSchedule" component={ClinicSchedule} />
      <Stack.Screen name="DoctorSchedule" component={DoctorSchedule} />
      <Stack.Screen name="DetailCard" component={DetailCard} />
      <Stack.Screen name="AddPet" component={AddPet} />
      <Stack.Screen name="Booking" component={Booking} />
      <Stack.Screen name="ChatScreen1" component={ChatScreen1} />
      <Stack.Screen name="IsiChatnya1" component={IsiChatnya1} />
    </Stack.Navigator>
  );
}

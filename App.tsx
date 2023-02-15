import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Spent from './src/screens/Spent';
import React from 'react';
import { createTableWallet } from './src/service/walletService';
import { createTableGoal } from './src/service/goalService';
import { createTableTypeSpent } from './src/service/typeSpent';
import { db } from './src/repository/db';
import Values from './src/screens/Values';
import { createTableSpent } from './src/service/spents';

export type RootStackParamList = {
  Home: undefined;
  Spent: undefined;
  Values: undefined;
};

export default function App() {
  const RootStack = createNativeStackNavigator<RootStackParamList>();

  React.useEffect(() => {
    createTableWallet();
    createTableGoal();
    createTableTypeSpent();
    createTableSpent();
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Home" component={Home} options={opt.home} />
        <RootStack.Screen name="Spent" component={Spent} options={opt.spent} />
        <RootStack.Screen name="Values" component={Values} options={opt.value} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const opt = {
  home: {
    headerShown: false
  },
  spent: {
    headerShown: false
  },
  value: {
    headerShown: false
  }
};

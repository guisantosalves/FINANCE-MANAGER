import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Spent from "./src/screens/Spent";

export type RootStackParamList = {
  Home: undefined;
  Spent: undefined;
};

export default function App() {
  const RootStack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Home" component={Home} options={opt.home} />
        <RootStack.Screen name="Spent" component={Spent} options={opt.spent} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const opt = {
  home: {
    headerShown: false,
  },
  spent: {
    headerShown: false,
  },
};

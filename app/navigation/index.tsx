import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  HomeScreen,
  GameScreen1,
  GameScreen,
} from "../screens/index";

const Stack = createStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="GameScreen" component={GameScreen} />
  </Stack.Navigator>
  );
};

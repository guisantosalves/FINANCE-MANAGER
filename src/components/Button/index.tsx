import * as React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { style } from "./style";

type Props = {
  title: string;
  funct: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function Button(props: Props) {
  return (
    <TouchableOpacity style={!props.style ? style.container : props.style} onPress={props.funct}>
      <Text style={style.font}>{props.title}</Text>
    </TouchableOpacity>
  );
}

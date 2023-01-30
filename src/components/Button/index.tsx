import * as React from "react";
import { TouchableOpacity, Text } from "react-native";
import { style } from "./style";

type Props = {
  title: string;
  funct: () => void;
};

export default function Button(props: Props) {
  return (
    <TouchableOpacity style={style.container} onPress={props.funct}>
      <Text style={style.font}>{props.title}</Text>
    </TouchableOpacity>
  );
}

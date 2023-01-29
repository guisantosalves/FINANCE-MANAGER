import * as React from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { style } from "./style";

export default function Spent() {
  return (
    <SafeAreaView style={style.containerMain}>
      <View style={style.containerOne}>
        <Text style={{ fontSize: 25, color: "#FFFFFF" }}>Guardar valores</Text>
      </View>
      <View style={style.image}>
        <Image
          source={require("../../../assets/catAstronaut.png")}
        />
      </View>
    </SafeAreaView>
  );
}

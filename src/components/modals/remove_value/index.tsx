import * as React from "react";
import {
  Modal,
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { style } from "./style";
import { MaterialIcons } from "@expo/vector-icons";
import GestureRecognizer from "react-native-swipe-gestures";
import Button from "../../Button";
import { removingFromWallet } from "../../../service/walletService";

type Props = {
  openModal: boolean;
  setStateModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RemoveValueModal(props: Props) {
  const [money, SetMoney] = React.useState<string>();

  const styling = StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 20,
      width: "60%",
      backgroundColor: "#92E3A9",
    },
  });

  function verifyingUser() {
    Alert.alert("Confirmação", "Deseja mesmo retirar esse valor ?", [
      {
        text: "Cancelar",
        onPress: () => console.log("cancela"),
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => removingFromWallet(money!),
        style: "default",
      },
    ]);
  }

  return (
    <GestureRecognizer onSwipeDown={() => props.setStateModal(false)}>
      <Modal animationType="slide" transparent={true} visible={props.openModal}>
        <SafeAreaView style={style.containerMain}>
          <View style={style.containerArrow}>
            <TouchableOpacity
              onPress={() => props.setStateModal(false)}
              activeOpacity={0.8}
            >
              <MaterialIcons
                name="arrow-back-ios"
                size={24}
                color={"#000000"}
              />
            </TouchableOpacity>
          </View>
          <View style={style.containerBody}>
            <View>
              <Text style={style.fontMain}>Quanto deseja retirar ?</Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TextInput
                keyboardType="numeric"
                value={money}
                onChangeText={(text) => SetMoney(text)}
                style={style.input}
                maxLength={9}
                placeholder={"1000"}
                placeholderTextColor={"rgba(0,0,0,0.2)"}
              />
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Button
                title="salvar"
                funct={() => verifyingUser()}
                style={styling.button}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </GestureRecognizer>
  );
}

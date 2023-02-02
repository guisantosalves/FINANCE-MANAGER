import * as React from "react";
import {
  Modal,
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { style } from "./style";
import { MaterialIcons } from "@expo/vector-icons";
import GestureRecognizer from "react-native-swipe-gestures";
import Button from "../../Button";
import { insertingIntoWallet } from "../../../service/walletService";
import { findWallet } from "../../../service/walletService";
import SQLite from "expo-sqlite";
import { db } from "../../../repository/db";

type Props = {
  openModal: boolean;
  setStateModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function InserValueModal(props: Props) {
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

  function InsertingIntoWallet(balance: string, date: Date) {
    insertingIntoWallet(balance, date);
  }

  function getAllInsideTheBalance(){
    findWallet();
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
              <Text style={style.fontMain}>Qual valor você quer guardar?</Text>
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
                funct={() => InsertingIntoWallet(money!, new Date())}
                style={styling.button}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </GestureRecognizer>
  );
}

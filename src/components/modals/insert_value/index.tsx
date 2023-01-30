import * as React from "react";
import { Modal, View, Text, SafeAreaView } from "react-native";
import { style } from "./style";

type Props = {
  openModal: boolean;
  setStateModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function InserValueModal(props: Props) {
  return (
    <Modal animationType="slide" transparent={true} visible={props.openModal}>
      <SafeAreaView style={style.containerMain}>
        <Text>testee</Text>
      </SafeAreaView>
    </Modal>
  );
}

import * as React from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { style } from "./style";
import Button from "../../components/Button";
import InserValueModal from "../../components/modals/insert_value";
import RemoveValueModal from "../../components/modals/remove_value";

export default function Spent() {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [openModalRemove, setopenModalRemove] = React.useState<boolean>(false);

  return (
    <SafeAreaView style={style.containerMain}>
      <InserValueModal openModal={openModal} setStateModal={setOpenModal} />
      <RemoveValueModal
        openModal={openModalRemove}
        setStateModal={setopenModalRemove}
      />
      <View style={style.containerOne}>
        <Text style={{ fontSize: 25, color: "#FFFFFF" }}>Guardar valores</Text>
      </View>
      <View style={style.image}>
        <Image source={require("../../../assets/catAstronaut.png")} />
      </View>
      <View style={style.containerButtons}>
        <Button title="Guardar valor" funct={() => setOpenModal(true)} />
        <Button title="Retirar valor" funct={() => setopenModalRemove(true)} />
      </View>
    </SafeAreaView>
  );
}

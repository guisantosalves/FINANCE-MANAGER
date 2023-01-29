import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { style } from "./style";
import { typeOfSpent } from "../../types/data.t";

// icons
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";

//navigation
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { useNavigation } from "@react-navigation/native";

type navigationProps = NativeStackNavigationProp<RootStackParamList, "Spent">;

export default function Home() {
  const navigation = useNavigation<navigationProps>();

  const data: typeOfSpent[] = [
    {
      name: "laser",
      icon: {
        key: "FontAwesome",
        value: "money",
      },
    },
    {
      name: "food",
      icon: {
        key: "Ionicons",
        value: "fast-food",
      },
    },
  ];

  return (
    <SafeAreaView style={style.containerMain}>
      <View style={style.containerOne}>
        <View>
          <Text style={{ color: "#FFFFFF" }}>Valor guardado</Text>
          <Text style={{ color: "#FFFFFF" }}>R$ 2.800,00</Text>
        </View>
        <AntDesign
          name="pluscircle"
          size={35}
          color={"#027368"}
          onPress={() => {
            navigation.navigate("Spent");
          }}
        />
      </View>
      <View style={style.containerTwo}>
        <View style={{ marginTop: 5 }}>
          <Text style={{ fontSize: 15, color: "#FFFFFF" }}>Objetivo</Text>
        </View>
        <View style={style.boxValuecontainerTwo}>
          <Text style={{ fontSize: 23, fontWeight: "600", color: "#FFFFFF" }}>
            R$ 8.000,0
          </Text>
        </View>
      </View>
      <View>
        <View style={style.containerThree}>
          <View style={style.boxtypeofspentcontainerThree}>
            <Text style={{ fontSize: 15, color: "#FFFFFF" }}>
              Tipos de gastos
            </Text>
            <AntDesign
              name="pluscircle"
              size={35}
              color={"#027368"}
              onPress={() => {
                console.log("salve");
              }}
            />
          </View>
        </View>
        <View style={style.containerFour}>
          <FlatList
            data={data}
            renderItem={({ item }) => CardTypeOfSpent(item)}
            horizontal={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function CardTypeOfSpent(item: typeOfSpent) {
  return (
    <TouchableOpacity style={style.card} onPress={() => console.log(item.name)}>
      {item.icon.key == "FontAwesome" ? (
        <FontAwesome name={"money"} size={60} color={"#dcdcdc"} />
      ) : (
        <Ionicons name={"fast-food"} size={60} color={"#dcdcdc"} />
      )}
    </TouchableOpacity>
  );
}

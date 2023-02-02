import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { findWallet } from "../../service/walletService";
import { style } from "./style";
import { typeOfSpent } from "../../types/data.t";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import { Wallet } from "../../entities/wallet";
import { db } from "../../repository/db";

type navigationProps = NativeStackNavigationProp<RootStackParamList, "Spent">;

export default function Home() {
  const navigation = useNavigation<navigationProps>();
  const [ValueSavedTotal, setValueSavedTotal] = React.useState<number>(0);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  React.useEffect(() => {
    fetchingData();
  }, [refreshing]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  function fetchingData() {
    db.transaction((tx) => {
      tx.executeSql(`select * from wallet`, [], (_, data) => {
        const responseFromDb = data.rows._array;
        let qtd = 0;
        responseFromDb.forEach((item, index) => {
          if (item.balance != null) {
            qtd = qtd + item.balance;
          }
        });
        setValueSavedTotal(qtd);
      });
    });
  }

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
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#FFFFFF"]}
          tintColor={"#FFFFFF"}
        />
      }
      style={{ backgroundColor: "#012626" }}
    >
      <SafeAreaView style={style.containerMain}>
        <View style={style.containerOne}>
          <View>
            <Text style={{ color: "#FFFFFF" }}>Valor guardado</Text>
            <Text style={{ color: "#FFFFFF" }}>R$ {ValueSavedTotal}</Text>
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
            <Text style={{ fontSize: 40, fontWeight: "600", color: "#FFFFFF" }}>
              R$ 8.000,00
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
    </ScrollView>
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

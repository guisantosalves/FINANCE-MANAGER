import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';
import { findWallet } from '../../service/walletService';
import { style } from './style';
import { typeOfSpent } from '../../types/data.t';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useNavigation } from '@react-navigation/native';
import { Wallet } from '../../entities/wallet';
import { db } from '../../repository/db';
import InsertGoal from '../../components/modals/insert_goal';

type navigationProps = NativeStackNavigationProp<RootStackParamList, 'Spent'>;

export default function Home() {
  const navigation = useNavigation<navigationProps>();
  const [ValueSavedTotal, setValueSavedTotal] = React.useState<number>(0);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [valueGoal, setValueGoal] = React.useState<number>();
  const [sumOfAllSpents, setsumOfAllSpents] = React.useState<number>(0);

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
        let qtd: number = 0;
        responseFromDb.forEach((item, index) => {
          if (item.balance != null) {
            if (item.balance.indexOf(',') > -1) {
              qtd = qtd + Number(item.balance.replace(',', '.'));
            } else {
              qtd = qtd + Number(item.balance);
            }
          }
        });
        setValueSavedTotal(qtd);
      });
      tx.executeSql(`select * from goal`, [], (_, data) => {
        const responseFromDb = data.rows._array;
        // get only the last value from table
        setValueGoal(Number(responseFromDb[responseFromDb.length - 1].value));
      });
      tx.executeSql(`select * from spent`, [], (_, data) => {
        let qtd = 0;
        data.rows._array.map((item, index) => {
          if (item.value != null) {
            qtd = qtd + Number(item.value);
          }
        });
        setsumOfAllSpents(qtd);
      });
    });
  }

  function getGoalValueFromModal(value: number) {
    console.log(value);
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#FFFFFF']}
          tintColor={'#FFFFFF'}
        />
      }
      style={{ backgroundColor: '#012626' }}
    >
      <InsertGoal
        openModal={openModal}
        setStateModal={setOpenModal}
        getValue={getGoalValueFromModal}
      />
      <SafeAreaView style={style.containerMain}>
        <View style={style.containerOne}>
          <View>
            <Text style={{ color: '#FFFFFF' }}>Valor guardado</Text>
            <Text style={{ color: '#FFFFFF' }}>R$ {ValueSavedTotal.toFixed(2)}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <AntDesign
              name="pluscircle"
              size={35}
              color={'#027368'}
              onPress={() => {
                navigation.navigate('Spent');
              }}
              style={{ marginRight: 10 }}
            />
            <Ionicons
              name="document-text"
              size={40}
              color="#027368"
              onPress={() => {
                navigation.navigate('Reports');
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={style.containerTwo}
          activeOpacity={0.8}
          onPress={() => setOpenModal(true)}
        >
          <View style={{ marginTop: 5 }}>
            <Text style={{ fontSize: 15, color: '#FFFFFF' }}>Objetivo</Text>
          </View>
          <View style={style.boxValuecontainerTwo}>
            <Text style={{ fontSize: 40, fontWeight: '600', color: '#FFFFFF' }}>
              R$ {valueGoal?.toString()}
            </Text>
          </View>
        </TouchableOpacity>
        <View>
          <View style={style.containerThree}>
            <View style={style.boxtypeofspentcontainerThree}>
              <Text style={{ fontSize: 15, color: '#FFFFFF' }}>Gastos Mensais</Text>
              <AntDesign
                name="pluscircle"
                size={35}
                color={'#027368'}
                onPress={() => {
                  navigation.navigate('Values');
                }}
              />
            </View>
          </View>
          <View style={style.containerFour}>
            <View style={style.boxValuecontainerTwo}>
              <Text style={{ fontSize: 40, fontWeight: '600', color: '#FFFFFF' }}>
                R$ -{sumOfAllSpents.toString()}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

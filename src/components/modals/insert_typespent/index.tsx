import * as React from 'react';
import {
  Modal,
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { style } from './style';
import { MaterialIcons } from '@expo/vector-icons';
import GestureRecognizer from 'react-native-swipe-gestures';
import Button from '../../Button';
import { insertingIntoTypeSpent } from '../../../service/typeSpent';
import { db } from '../../../repository/db';
import { spent } from '../../../entities/spent';
import { Entypo } from '@expo/vector-icons';

type Props = {
  openModal: boolean;
  setStateModal: React.Dispatch<React.SetStateAction<boolean>>;
  refreshState: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function InsertTypeSpent(props: Props) {
  const [typeOfSpent, setTypeOfSpent] = React.useState<string>('');
  const [dataTypeOfSpent, setdataTypeOfSpent] = React.useState<spent[]>([]);
  const [isClicked, setisClicked] = React.useState<number>(-1);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const styling = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 20,
      width: '60%',
      backgroundColor: '#92E3A9'
    }
  });

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`select * from typespent`, [], (_, data) => {
        if (dataTypeOfSpent) {
          setdataTypeOfSpent(data.rows._array);
        }
      });
    });
  }, [refreshing]);

  const handleSave = () => {
    db.transaction((tx) => {
      tx.executeSql(`insert into typespent (typespe) values (?)`, [typeOfSpent], (_, data) => {
        if (data.rowsAffected > 0) {
          setRefreshing((currentState) => !currentState);
        }
      });
    });
  };

  return (
    <GestureRecognizer
      onSwipeDown={() => {
        props.setStateModal(false);
        props.refreshState((currentValue) => !currentValue);
      }}
    >
      <Modal animationType="slide" transparent={true} visible={props.openModal}>
        <SafeAreaView style={style.containerMain}>
          <View style={style.containerArrow}>
            <TouchableOpacity
              onPress={() => {
                props.setStateModal(false);
                props.refreshState((currentValue) => !currentValue);
              }}
              activeOpacity={0.8}
            >
              <MaterialIcons name="arrow-back-ios" size={24} color={'#000000'} />
            </TouchableOpacity>
          </View>
          <View style={style.containerBody}>
            <View>
              <Text style={style.fontMain}>Qual nome gostaria de atribuir ao seu gasto ?</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TextInput
                keyboardType="default"
                value={typeOfSpent}
                onChangeText={(text) => setTypeOfSpent(text)}
                style={style.input}
                placeholder={'Ex: Gatinhos'}
                placeholderTextColor={'rgba(0,0,0,0.2)'}
              />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Button
                title="salvar"
                funct={() => {
                  if (
                    typeOfSpent === '' ||
                    typeOfSpent === undefined ||
                    typeOfSpent === null ||
                    typeOfSpent.length <= 2 || 
                    !isClicked
                  ) {
                    alert('insira valores válidos');
                    return;
                  }
                  handleSave();
                }}
                style={styling.button}
              />
            </View>
          </View>
          <View style={style.containerList}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {dataTypeOfSpent &&
                dataTypeOfSpent.map((item, index) => (
                  <TouchableOpacity
                    style={
                      item.id === isClicked
                        ? [style.typeOfSpent, { backgroundColor: '#fef8eb' }]
                        : style.typeOfSpent
                    }
                    key={item.id}
                    onPress={(event) => {
                      if (isClicked !== -1) {
                        setisClicked(item.id);
                        Alert.alert('Deseja realmente excluir esse item ?', undefined, [
                          {
                            text: 'cancelar',
                            onPress: () => console.log('just cancel'),
                            style: 'cancel'
                          },
                          {
                            text: 'Sim',
                            onPress: () => {
                              db.transaction((tx) => {
                                tx.executeSql(
                                  `delete from typespent where id=?`,
                                  [isClicked],
                                  (_, data) => {
                                    alert('Excluído  com sucesso');
                                    setInterval(() => {
                                      setRefreshing((currentState) => !currentState);
                                    }, 2000);
                                  }
                                );
                              });
                            },
                            style: 'default'
                          }
                        ]);
                      }
                    }}
                  >
                    <Text style={{ fontSize: 20, marginRight: 5 }}>{item.typespe}</Text>
                    <Entypo name="circle-with-cross" size={25} color="black" />
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    </GestureRecognizer>
  );
}

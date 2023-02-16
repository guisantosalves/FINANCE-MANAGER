import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { style } from './style';
import { Entypo } from '@expo/vector-icons';
import InsertTypeSpent from '../../components/modals/insert_typespent';
import { findAllTypeSpent } from '../../service/typeSpent';
import { db } from '../../repository/db';
import { spent } from '../../entities/spent';

function Values() {
  const [valueOfSpent, setvalueOfSpent] = React.useState<string>();
  const [isClicked, setisClicked] = React.useState<number>();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [dataTypeOfSpent, setdataTypeOfSpent] = React.useState<spent[]>([]);
  const [refreshState, setrefreshState] = React.useState<boolean>(false);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`select * from typespent`, [], (_, data) => {
        if (dataTypeOfSpent) {
          setdataTypeOfSpent(data.rows._array);
        }
      });
    });
  }, [refreshState]);

  function resetStates() {
    setvalueOfSpent('');
    setisClicked(undefined);
  }

  function handleSave() {
    if (valueOfSpent && valueOfSpent.indexOf(',') > -1 ) {
      alert('insira valores válidos');
      return;
    }
    if (valueOfSpent && valueOfSpent.indexOf('.') > -1 ) {
      alert('insira valores válidos');
      return;
    }
    if (valueOfSpent && valueOfSpent.length > 0 && isClicked) {
      db.transaction((tx) => {
        tx.executeSql(
          `insert into spent(value, date, typespentId) values (?, ?, ?);`,
          [valueOfSpent, new Date().toISOString(), isClicked],
          (_txtObj, result) => {
            if (result.rowsAffected > 0) {
              alert('salvo com sucesso');
            }
          }
        );
      });
    } else {
      alert('Erro ao salvar');
    }
    resetStates();
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <InsertTypeSpent
        openModal={openModal}
        setStateModal={setOpenModal}
        refreshState={setrefreshState}
      />
      <SafeAreaView style={style.containerMain}>
        <ScrollView>
          <View style={style.containerOne}>
            <Text style={{ fontSize: 25, color: '#FFFFFF' }}>Cadastrar Gastos</Text>
          </View>
          <View style={style.image}>
            <Image
              source={require('../../../assets/CatWithHat.png')}
              style={{ width: 200, height: 250, marginTop: 50 }}
            />
          </View>
          <View style={style.containerForms}>
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
                      setisClicked(item.id);
                    }}
                  >
                    <Text>{item.typespe}</Text>
                  </TouchableOpacity>
                ))}
              <AntDesign
                name="pluscircle"
                size={35}
                color={'#027368'}
                onPress={() => setOpenModal((currentState) => !currentState)}
              />
            </ScrollView>
            <TextInput
              keyboardType="numeric"
              value={valueOfSpent}
              onChangeText={(text) => setvalueOfSpent(text)}
              style={style.input}
              maxLength={9}
              placeholder={'1000'}
              placeholderTextColor={'rgba(0,0,0,0.2)'}
            />
          </View>
          <View style={style.containerSave}>
            <TouchableOpacity>
              <Entypo name="save" size={50} color="#dfd880" onPress={handleSave} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default Values;

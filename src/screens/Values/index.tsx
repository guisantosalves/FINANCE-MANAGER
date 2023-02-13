import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { style } from './style';
import { Entypo } from '@expo/vector-icons';

function Values() {
  const [valueOfSpent, setvalueOfSpent] = React.useState<string>();

  return (
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
          <ScrollView horizontal={true}>
            {[
              { id: 1, value: 'comida' },
              { id: 2, value: 'compras' }
            ].map((item, index) => (
              <TouchableOpacity style={style.typeOfSpent}>
                <Text>{item.value}</Text>
              </TouchableOpacity>
            ))}
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
            <Entypo name="save" size={50} color="#dfd880" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Values;

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
import { style } from './style';
import { Entypo } from '@expo/vector-icons';

function Values() {
  const [valueOfSpent, setvalueOfSpent] = React.useState<string>();
  const [isClicked, setisClicked] = React.useState<number>();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
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
                <TouchableOpacity
                  style={
                    item.id === isClicked
                      ? [style.typeOfSpent, { backgroundColor: '#fef8eb' }]
                      : style.typeOfSpent
                  }
                  onPress={(event) => {
                    setisClicked(item.id);
                  }}
                >
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
    </KeyboardAvoidingView>
  );
}

export default Values;

import React from 'react';
import { View, Text } from 'react-native';
import { style } from './style';

type Props = {
  value: string;
  date: string;
  typespe: string;
};

export default function Card({ value, date, typespe }: Props) {
  return (
    <View style={style.containerCard}>
      <Text style={style.valueT}>R$ {value}</Text>
      <View>
        <Text style={style.valueT}>
          data:{' '}
          {new Date(date).getUTCDay().toString() +
            '/' +
            (new Date(date).getUTCMonth() + 1).toString() +
            '/' +
            new Date(date).getUTCFullYear().toString()}
        </Text>
        <Text style={style.valueT}>tipo: {typespe}</Text>
      </View>
    </View>
  );
}

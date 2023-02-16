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
import { spentData, spentJoinTypeSpent } from '../../entities/spent';
import Card from '../../components/Card';

type navigationProps = NativeStackNavigationProp<RootStackParamList, 'Reports'>;

export default function Reports() {
  const navigation = useNavigation<navigationProps>();
  const [dataFromdb, setdataFromdb] = React.useState<spentJoinTypeSpent[]>();
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `select value, date, typespe from spent inner join typespent on typespent.id = spent.typespentId;`,
        [],
        (_, data) => {
          setdataFromdb(data.rows._array);
        }
      );
    });
  }, [refreshing]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
      <SafeAreaView style={{ marginTop: 40 }}>
        {dataFromdb &&
          dataFromdb.reverse().map((item, index) => {
            return <Card key={index} date={item.date} typespe={item.typespe} value={item.value} />;
          })}
      </SafeAreaView>
    </ScrollView>
  );
}

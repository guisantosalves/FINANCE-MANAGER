import { db } from '../repository/db';

export async function createTableGoal() {
  db.transaction((tx) => {
    tx.executeSql(
      'create table if not exists goal (id integer primary key not null, value text, date text);'
    );
  });
}

export function insertingIntoGoals(value: string, date: Date) {
  db.transaction((tx) => {
    if (value.indexOf(',') > -1) {
      tx.executeSql(
        `insert into goal(value, date) values (?, ?);`,
        [value.replace(',', '.'), date.toISOString()],
        (_txtObj, result) => {
          if (result.rowsAffected > 0) {
            alert('salvo com sucesso');
          }
        }
      );
    } else {
      tx.executeSql(
        `insert into goal(value, date) values (?, ?);`,
        [value, date.toISOString()],
        (_txtObj, result) => {
          if (result.rowsAffected > 0) {
            alert('salvo com sucesso');
          }
        }
      );
    }
  });
}

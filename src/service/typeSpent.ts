import { db } from '../repository/db';

export async function createTableTypeSpent() {
  db.transaction((tx) => {
    tx.executeSql(
      `create table if not exists typespent (id integer primary key not null, typespe text);`
    );
  });
}

export function insertingIntoTypeSpent(typeOfSpent: string) {
  db.transaction((tx) => {
    tx.executeSql(
      `insert into typespent(typespe) values (?);`,
      [typeOfSpent],
      (_txtObj, result) => {
        if (result.rowsAffected > 0) {
          alert('salvo com sucesso');
        }
      }
    );
  });
}

export function findAllTypeSpent() {
  db.transaction((tx) => {
    tx.executeSql(`select * from typespent`, [], (_, data) => {
      return data.rows._array;
    });
  });
}

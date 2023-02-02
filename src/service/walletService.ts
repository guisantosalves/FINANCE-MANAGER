import { Wallet } from "../entities/wallet";
import { db } from "../repository/db";

export async function createTableWallet() {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists wallet (id integer primary key not null, balance text, date text);"
    );
  });
}

enum Status {
  ok = 1,
  error = 2,
}

export function insertingIntoWallet(balance: string, date: Date) {
  db.transaction((tx) => {
    tx.executeSql(
      `insert into wallet(balance, date) values (?, ?);`,
      [balance, date.toISOString()],
      (_txtObj, result) => {
        console.log(result);
      }
    );
  });
}

export async function findWallet() {
  try {
    db.transaction((tx) => {
      tx.executeSql(`select * from wallet`, [], (_, data) =>
        console.log(JSON.stringify(data))
      ),
        null;
    });
  } catch (e) {
    return Status.error;
  }
}

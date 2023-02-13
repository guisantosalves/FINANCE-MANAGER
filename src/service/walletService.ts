import { Wallet } from '../entities/wallet';
import { db } from '../repository/db';

export async function createTableWallet() {
  db.transaction((tx) => {
    tx.executeSql(
      'create table if not exists wallet (id integer primary key not null, balance text, date text);'
    );
  });
}

enum Status {
  ok = 1,
  error = 2
}

export function insertingIntoWallet(balance: string, date: Date) {
  db.transaction((tx) => {
    tx.executeSql(
      `insert into wallet(balance, date) values (?, ?);`,
      [balance, date.toISOString()],
      (_txtObj, result) => {
        if (result.rowsAffected > 0) {
          alert('salvo com sucesso');
        }
      }
    );
  });
}

export function removingFromWallet(balance: string) {
  db.transaction((tx) => {
    let qtd = 0;
    tx.executeSql(`select * from wallet`, [], (_, data) => {
      const responseFromDb = data.rows._array;
      responseFromDb.forEach((item, index) => {
        qtd = qtd + Number(item.balance);
      });
    });
    if (Number(balance) <= qtd) {
      tx.executeSql(
        `insert into wallet(balance, date) values (?, ?);`,
        [-balance, new Date().toISOString()],
        (_txtObj, result) => {
          if (result.rowsAffected > 0) {
            alert('salvo com sucesso');
          }
        }
      );
    }else{
      alert('insira um valor correto');
    }
  });
}

export function findByIdAndUpdate(id: number, newBalance: string) {
  db.transaction((tx) => {
    tx.executeSql(`update wallet set balance = ? where id = ?`),
      [id.toString(), newBalance],
      (_txtObj: any, result: any) => {
        alert('atualizado com sucesso');
      };
  });
}

export function findWallet() {
  db.transaction((tx) => {
    tx.executeSql(`select * from wallet`, [], (_, data) => {
      return data.rows._array;
    });
  });
}

import { db } from '../repository/db';

export async function createTableSpent() {
  db.transaction((tx) => {
    tx.executeSql(
      `create table if not exists spent (id integer primary key not null, value real not null, date text not null, typespentId integer not null, foreign key(typespentId) references typespent(id));`
    );
  });
}

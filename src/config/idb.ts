import { openDB, type IDBPDatabase } from 'idb';

export interface TodoDB {
  todoStore: {
    key: string;
    value: string;
  };
}

export const dbStore = 'todoTB';
export const todoStore = 'todoStoreDatabase';

// dto => text 

export async function idbTran(tableName: string): Promise<IDBPDatabase<TodoDB>>  {

  if (window) {
    const db = await openDB<TodoDB>(tableName, 1, {
      upgrade(db) {
        db.createObjectStore(todoStore);
      },
    });  
    return db;
  } else {
    return Promise.reject('db connect error');
  }

}


const dbPromise = openDB('todoStoreDatabase', 1, {
  upgrade(db) {
    db.createObjectStore(todoStore);
  },
});

export async function get(key: string) {
  return (await dbPromise).get('keyval', key);
}
export async function set(key: string, val: string) {
  return (await dbPromise).put('keyval', val, key);
}
export async function del(key: string) {
  return (await dbPromise).delete('keyval', key);
}
export async function clear() {
  return (await dbPromise).clear('keyval');
}
export async function keys() {
  return (await dbPromise).getAllKeys('keyval');
}
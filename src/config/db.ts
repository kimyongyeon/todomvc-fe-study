// db.ts
import Dexie, { type Table } from 'dexie';
import type { TodoState } from '../model/todo';

export class MySubClassedDexie extends Dexie {
  todos!: Table<TodoEntity, number>; 

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      todos: '++seq, title, detail, regDate, editDate, useYn, state' // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();

export interface TodoEntity {
  seq?: number;
  title: string;
  detail: string;
  regDate: string;
  editDate: string;
  useYn: boolean;
  state: TodoState;
}
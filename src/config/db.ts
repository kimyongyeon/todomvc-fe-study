// db.ts
import Dexie, { type Table } from 'dexie';
import type { TodoState } from '../model/todo';

export interface TodoEntity {
  seq: number | undefined;
  title: string | undefined;
  detail: string | undefined;
  regDate: string | undefined;
  editDate: string | undefined;
  useYn: boolean | undefined;
  state: TodoState | undefined;
}

export class MySubClassedDexie extends Dexie {
  todos!: Table<TodoEntity>; 

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      todos: '++seq, title' // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
import { ComTodoInmemoryDao } from "../dao/com_todo_dao";
import { TodoDexieDao } from "../dao/todo_dexie_dao";
import { TodoDao } from "../dao/todo_indexed_dao";
import { TodoInmemoryDao } from "../dao/todo_inmemory_dao";
import type { TodoRepository } from "../repository/todo_repository";
import { TodoSvc } from "../service/todo_svc";
import { TodoTypes } from "../types/TodoTypes";

export class CommonFactory {
  static createDao(str: string) {
    if (str === TodoTypes.FAC_COM) {
      return new ComTodoInmemoryDao();
    } else if (str === TodoTypes.FAC_DEX) {
      return new TodoDexieDao();
    } else if (str === TodoTypes.FAC_IDX) {
      return new TodoDao();
    } else if (str === TodoTypes.FAC_IM) {
      return new TodoInmemoryDao(new ComTodoInmemoryDao());
    }
  }

  static createSvc(str: string = TodoTypes.FAC_IM) {
    return new TodoSvc(this.createDao(str) as TodoRepository);
  }
}
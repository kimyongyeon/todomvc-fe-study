import { TodoData, TodoState } from "../model/todo";
import type { TodoRepository } from "./todo_repository";
import { db, type TodoEntity } from '../config/db';

export class TodoDexieDao implements TodoRepository {
	list(todo: TodoData): Promise<TodoData[]> {
		throw new Error('Method not implemented.');
	}

	/**
	 * async, await로 내보내는 경우
	 * @param todo
	 * @returns
	 */
	async save(todo: TodoData): Promise<boolean> {


		try {
      // Add the new friend!
      const todoEntity: TodoEntity = {
        seq: todo.seq,
        title: todo.title,
        detail: todo.detail,
        regDate: todo.regDate,
        editDate: todo.editDate,
        useYn: true,
        state: TodoState.PLAN
      }
      const id = await db.todos.add(todoEntity);
      if (id) {
				return Promise.resolve(true);
			} else {
				return Promise.resolve(false);
			}
    } catch (error) {
      return Promise.reject(error);
    }
  
	}
	async update(todo: TodoData): Promise<boolean> {
		try {
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}
	select(todo: TodoData): Promise<TodoData> {

		const title = todo.title || '';
		const lowerNamePattern = title.toLowerCase();

		console.log(db.todos);

		const todoList = db.todos
			.where('seq')
			.startsWithIgnoreCase(lowerNamePattern)
			.filter(t => t.title === lowerNamePattern)
			.toArray();
		console.log(todoList);
    return Promise.resolve(new TodoData());
	}
	delete(todo: TodoData): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}
function liveQuery(arg0: () => Promise<any>) {
	throw new Error("Function not implemented.");
}


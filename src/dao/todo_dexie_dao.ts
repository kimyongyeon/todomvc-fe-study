import { TodoData, TodoState } from "../model/todo";
import type { TodoRepository } from "../repository/todo_repository";
import { db, type TodoEntity } from '../config/db';

export class TodoDexieDao implements TodoRepository {
	allDelete(): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
	list(todo: TodoData): Promise<TodoData[]> {
		throw new Error('Method not implemented.');
	}

	/**
	 * async, await로 내보내는 경우
	 * @param todo
	 * @returns
	 */
	async save(todo: TodoData): Promise<boolean> {
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
      db.table('todos').put(todoEntity); // Fails to compile
			return Promise.resolve(true);
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

		const todoResult = db.table('todos')
		.toArray();

		console.log('todoResult: ', todoResult);

    return new Promise((resolve, reject) => {
			todoResult.then(r => {
				const todoResult = new TodoData({});
				todoResult.title = r[0].title || '';
				todoResult.detail = r[0].detail || '';
				todoResult.regDate = r[0].regDate || '';
				todoResult.editDate = r[0].editDate || '';
				todoResult.useYn = r[0].useYn || true;
				todoResult.state = r[0].state || TodoState.PLAN;
				resolve(todoResult);
			}).catch(e => reject(e));
		});
	}
	delete(todo: TodoData): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}


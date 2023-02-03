import { dbStore, get, idbTran, todoStore } from '../config/idb';
import { TodoData } from '../model/todo';
import type { TodoRepository } from './todo_repository';

// todo: indexeddb를 활용해서 저장하고 처리 한다.

export class TodoDao implements TodoRepository {
	list(todo: TodoData): Promise<TodoData[]> {
		throw new Error('Method not implemented.');
	}

	/**
	 * new Promise 으로 내보내는 경우
	 * @param todo
	 * @returns
	 */
	newSave(todo: TodoData): Promise<boolean> {
		return new Promise((resolve, reject) => {
			try {
				const db = idbTran(dbStore);
				db.then((transaction) => {
					transaction.put(todoStore, 1, TodoData.dtoToCommaTextHelper(todo));
					resolve(true);
				}).catch((e) => reject(e));
			} catch (e) {
				reject(e);
			} finally {
				console.log('success!');
			}
		});
	}

	/**
	 * async, await로 내보내는 경우
	 * @param todo
	 * @returns
	 */
	async save(todo: TodoData): Promise<boolean> {
		try {
			const db = idbTran(dbStore);
			(await db).put(todoStore, 1, TodoData.dtoToCommaTextHelper(todo));
			return true;
		} catch (e) {
			console.error(e);
			return false;
		} finally {
			console.log('저장 성공');
		}
	}
	async update(todo: TodoData): Promise<boolean> {
		try {
			const tx = get(dbStore);
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}
	select(todo: TodoData): Promise<TodoData> {
		throw new Error('Method not implemented.');
	}
	delete(todo: TodoData): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}

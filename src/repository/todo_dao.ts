import { transformWithEsbuild } from 'vite';
import { dbStore, get, idbTran, todoStore } from '../config/idb_config';
import { TodoData } from '../model/todo';
import type { TodoRepository } from './todo_repository';

// todo: indexeddb를 활용해서 저장하고 처리 한다.

export class TodoDao implements TodoRepository {
	list(todo: TodoData): Promise<TodoData[]> {
		throw new Error('Method not implemented.');
	}
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

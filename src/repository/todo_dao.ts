import type { TodoData } from '../model/todo';
import type { TodoRepository } from './todo_repository';

// todo: indexeddb를 활용해서 저장하고 처리 한다.

export class TodoDao implements TodoRepository {
	list(todo: TodoData): TodoData[] {
		throw new Error('Method not implemented.');
	}
	save(todo: TodoData): boolean {
		throw new Error('Method not implemented.');
	}
	update(todo: TodoData): boolean {
		throw new Error('Method not implemented.');
	}
	select(todo: TodoData): TodoData {
		throw new Error('Method not implemented.');
	}
	delete(todo: TodoData): boolean {
		throw new Error('Method not implemented.');
	}
}

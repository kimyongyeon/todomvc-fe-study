import type { TodoData } from '../model/todo';

export interface TodoRepository {
	save(todo: TodoData): boolean;

	update(todo: TodoData): boolean;

	select(todo: TodoData): TodoData;

	list(todo: TodoData): Array<TodoData>;

	delete(todo: TodoData): boolean;
}

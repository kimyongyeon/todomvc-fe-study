import type { TodoData } from '../model/todo';

export interface TodoRepository {
	save(todo: TodoData): Promise<boolean>;

	update(todo: TodoData): Promise<boolean>;

	select(todo: TodoData): Promise<TodoData>;

	list(todo: TodoData): Promise<Array<TodoData>>;

	delete(todo: TodoData): Promise<boolean>;
}

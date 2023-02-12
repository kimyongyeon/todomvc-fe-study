import type { TodoData } from '../model/todo';

export interface TodoRepository {
	save(todo: Partial<TodoData>): Promise<boolean>;

	update(todo: TodoData): Promise<boolean>;

	select(todo: Partial<TodoData>): Promise<TodoData>;

	list(todo: TodoData): Promise<Array<TodoData>>;

	delete(todo: TodoData): Promise<boolean>;
	allDelete(): Promise<boolean> ;
}

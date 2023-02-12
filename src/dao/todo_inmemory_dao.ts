import { TodoData } from '../model/todo';
import type { TodoRepository } from '../repository/todo_repository';

export class TodoInmemoryDao implements TodoRepository {
	private todoList: TodoData[] = [];

	save(todo: TodoData): Promise<boolean> {
		if (todo.sort) {
			this.todoList.unshift(todo);
		} else {
			this.todoList.push(todo);
		}
		
		return Promise.resolve(true);
	}
	update(todo: TodoData): Promise<boolean> {
		const editList = this.todoList.filter((t) => t.seq == todo.seq).map((t) => (t = todo));
    this.todoList = editList;
		return Promise.resolve(true);
	}
	select(todo: Partial<TodoData>): Promise<TodoData> {
    const todoData = this.todoList.filter(t => t.seq == todo.seq)[0] as TodoData || new TodoData({});
		return Promise.resolve(todoData);
	}
	list(): Promise<TodoData[]> {
		return Promise.resolve(this.todoList);
	}
	delete(todo: TodoData): Promise<boolean> {
    this.todoList = this.todoList.filter(t => t.seq !== todo.seq);
		return Promise.resolve(true);
	}

	allDelete(): Promise<boolean> {
		this.todoList = [];
		return Promise.resolve(true);
	}
}

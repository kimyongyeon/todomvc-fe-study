import { TodoState, TodoData } from '../model/todo';
import type { ComTodoRepository } from '../repository/com_todo_repository';
import { compList } from '../store/store';

export class ComTodoInmemoryDao implements ComTodoRepository {
	private todoList: TodoData[] = [];

	deleteMem() {
		this.todoList = [];
	}

	/**
	 * todoList 목록 중복 체크
	 * @param todo
	 */
	private isDupCheck(todo: TodoData) {
		return this.todoList.filter((r) => {
			return r.seq !== todo.seq;
		});
		// this.todoSet.add(todo);
		// this.todoList = Array.from(this.todoSet);
	}

	save(todo: TodoData): Promise<boolean> {
		console.log('com_todo save', this.todoList);

		todo.state = TodoState.COM;
		todo.rowNewItem = true;
		this.todoList = this.isDupCheck(todo);

		if (todo.sort) {
			this.todoList.unshift(todo);
		} else {
			this.todoList.push(todo);
		}
		compList.update((t) => (t = this.todoList));

		return Promise.resolve(true);
	}
	update(todo: TodoData): Promise<boolean> {
		console.log('com_todo update');
		const editList = this.todoList.filter((t) => t.seq == todo.seq).map((t) => (t = todo));
		this.todoList = editList;

		compList.update((v) => (v = this.todoList));

		return Promise.resolve(true);
	}
	select(todo: Partial<TodoData>): Promise<TodoData> {
		console.log('com_todo select');
		const todoData =
			(this.todoList.filter((t) => t.seq == todo.seq)[0] as TodoData) || new TodoData({});
		return Promise.resolve(todoData);
	}
	list(): Promise<TodoData[]> {
		return Promise.resolve(this.todoList);
	}
	delete(todo: TodoData): Promise<boolean> {
		console.log('com_todo delete');

		this.todoList = this.todoList.filter((t) => t.seq !== todo.seq);
		compList.update((v) => (v = this.todoList));
		return Promise.resolve(true);
	}

	allDelete(): Promise<boolean> {
		console.log('com_todo all delete');
		this.todoList = [];
		compList.update((v) => (v = this.todoList));
		return Promise.resolve(true);
	}
}

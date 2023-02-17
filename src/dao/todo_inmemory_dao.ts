import { TodoData } from '../model/todo';
import type { ComTodoRepository } from '../repository/com_todo_repository';
import type { TodoRepository } from '../repository/todo_repository';

export class TodoInmemoryDao implements TodoRepository {
	private todoList: TodoData[] = [];

	private comTodoRepository: ComTodoRepository;

	constructor(comTodoRepository: ComTodoRepository) {
		this.comTodoRepository = comTodoRepository;
	}

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
		const todoData =
			(this.todoList.filter((t) => t.seq == todo.seq)[0] as TodoData) || new TodoData({});
		return Promise.resolve(todoData);
	}
	list(): Promise<TodoData[]> {
		return Promise.resolve(this.todoList);
	}

	/**
	 * 제목: 완료한 목록만 출력하기
	 * @returns
	 */
	comList(): Promise<TodoData[]> {
		return new Promise((resolve, reject) => {
			this.comTodoRepository
				.list()
				.then((r) => resolve(r))
				.catch((e) => reject(e));
		});
	}

	/**
	 * 제목 : 완료된 Todo를 원복하기
	 * condition :
	 *  - 파라미터가 없으면 전체를 원복
	 *  - 파라미터가 하나라도 있으면 선택한 값만 원복
	 * @param todo
	 */
	revertComUpdate(todoList?: Array<TodoData>) {
		if (!todoList) {
			// 완료된 항목에서는 제외 시키기
			this.comList().then((r) => {
				for (const com of r) {
					this.comTodoRepository.delete(com);
				}
			});
			// todoList에는 선택한 목록만 저장하기
			if (Array.isArray(todoList)) {
				this.todoList = [...this.todoList, ...(todoList as Array<TodoData>)];
			}
		} else {
			this.comList().then((r) => {
				this.todoList = [...this.todoList, ...r];
			});
		}
		return Promise.resolve(true);
	}

	/**
	 * 제목 : 완료된 Todo는 삭제 한다.
	 * condition:
	 * 	- 완료된 항목은 TodoList 목록에서 삭제한다.
	 *  - 완료된 항목은 ComTodoList 목록에 추가한다.
	 * @param todo
	 * @returns
	 */
	delete(todo: TodoData): Promise<boolean> {
		// 완료된 목록만 따로 저장한다.
		this.comTodoRepository.save(todo);
		// 실제 목록에서는 삭제 한다.
		this.todoList = this.todoList.filter((t) => t.seq !== todo.seq);
		// console.log(this.comList(), this.todoList);
		return Promise.resolve(true);
	}

	/**
	 * 제목 : 모든 항목을 삭제한다.
	 * condition:
	 *  - 삭제할 모든 항목을 comTodoList에 이동한다.
	 *  - 기존의 TodoList 항목을 모두 삭제한다.
	 * @returns
	 */
	allDelete(): Promise<boolean> {
		// const tempList = this.todoList.map((r) => {
		// 	this.comTodoRepository.save(r);
		// 	return r;
		// });
		// if (tempList.length > 0) {
		// 	this.todoList = [];
		// }
		this.comTodoRepository.allDelete();
		this.todoList = [];
		return Promise.resolve(true);
	}
}

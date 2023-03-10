import { TodoDexieDao } from '../dao/todo_dexie_dao';
import type { TodoData } from '../model/todo';
import type { TodoRepository } from '../repository/todo_repository';
import { TodoTypes } from '../types/TodoTypes';

export class TodoSvc {
	todoDao: TodoRepository;

	constructor(todoDao: TodoRepository) {
		this.todoDao = todoDao;
	}

	async responseResult(isResult: Promise<boolean>) {
		if (await isResult) {
			return {
				code: TodoTypes.SUCCESS_CODE,
				msg: TodoTypes.SUCCESS_MSG
			};
		} else {
			return {
				code: TodoTypes.FAIL_CODE,
				msg: TodoTypes.FAIL_MSG
			};
		}
	}

	async responseFindResult(isParam: Promise<TodoData> | Promise<Array<TodoData>>) {
		const isData = await isParam;
		if (isData !== undefined || isData !== null) {
			if (Array.isArray(isData)) {
				return {
					code: TodoTypes.SUCCESS_CODE,
					msg: TodoTypes.SUCCESS_MSG,
					body: isData
				};
			}

			return {
				code: TodoTypes.SUCCESS_CODE,
				msg: TodoTypes.SUCCESS_MSG,
				body: isData
			};
		} else {
			return {
				code: TodoTypes.FAIL_CODE,
				msg: TodoTypes.FAIL_MSG
			};
		}
	}

	addTodo(todo: Partial<TodoData>) {
		return this.responseResult(this.todoDao.save(todo));
	}

	editTodo(todo: TodoData) {
		return this.responseResult(this.todoDao.update(todo));
	}

	removeTodo(todo: TodoData) {
		return this.responseResult(this.todoDao.delete(todo));
	}

	allRemoveTodo() {
		return this.responseResult(this.todoDao.allDelete());
	}

	findTodo(todo: Partial<TodoData>) {
		return this.responseFindResult(this.todoDao.select(todo));
	}

	findTodos(todo: TodoData) {
		return this.responseFindResult(this.todoDao.list(todo));
	}

	findTodoDtos(todo: TodoData) {
		return new Promise((resolve, reject) => {
			try {
				this.todoDao.list(todo).then((r) => {
					// console.log('findTodoDtos, ', r);
					resolve({
						code: 200,
						msg: 'success',
						body: r
					});
				});
			} catch (e) {
				reject(e);
			}
		});
	}
}

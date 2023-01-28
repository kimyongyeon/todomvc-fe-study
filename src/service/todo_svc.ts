import type { TodoData } from '../model/todo';
import type { TodoRepository } from '../repository/todo_repository';
import { TodoTypes } from '../types/TodoTypes';

export class TodoSvc {
	todoDao: TodoRepository;

	constructor(todoDao: TodoRepository) {
		this.todoDao = todoDao;
	}

	responseResult(isResult: boolean) {
		if (isResult) {
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

	responseFindResult(isData: TodoData | Array<TodoData>) {
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

	addTodo(todo: TodoData) {
		this.responseResult(this.todoDao.save(todo));
	}

	editTodo(todo: TodoData) {
		this.responseResult(this.todoDao.update(todo));
	}

	removeTodo(todo: TodoData) {
		this.responseResult(this.todoDao.delete(todo));
	}

	findTodo(todo: TodoData) {
		this.responseFindResult(this.todoDao.select(todo));
	}

	findTodos(todo: TodoData) {
		this.responseFindResult(this.todoDao.list(todo));
	}
}

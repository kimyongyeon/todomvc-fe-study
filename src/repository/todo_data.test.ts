import { describe, it, expect } from 'vitest';
import { TodoState } from '../model/todo';
import { TodoDao } from './todo_dao';

describe('save test', () => {

  const todoDao = new TodoDao();

  todoDao.save({
    seq: 1, title: 'todo title test', detail: 'todo detail test', regDate: new Date().toDateString(), editDate: new Date().toDateString(), useYn: false, state: TodoState.PLAN
  }).then(r => console.log(r));


	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
});

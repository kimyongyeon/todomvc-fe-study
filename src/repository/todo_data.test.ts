import { describe, it } from 'vitest';
import { TodoDexieDao } from '../dao/todo_dexie_dao';
import { TodoData, TodoState } from '../model/todo';

describe('save test', () => {

  it('add', () => {
    const todoDao = new TodoDexieDao();

    todoDao.save({
      seq: 1, title: 'todo title test', detail: 'todo detail test', regDate: new Date().toDateString(), editDate: new Date().toDateString(), useYn: false, state: TodoState.PLAN
    }).then(r => console.log(r));
  });

  it('query', () => {
    const todoDao = new TodoDexieDao();
    const result = todoDao.select({...new TodoData({}), title: 'todo title test'});
    result.then(r => console.log(r));
  });
});

import { TodoData, TodoState } from '../model/todo';
import type { TodoRepository } from '../repository/todo_repository';
import { db, type TodoEntity } from '../config/db';

export class TodoDexieDao implements TodoRepository {
	allDelete(): Promise<boolean> {
		console.log('dex all delete');
		db.table('todos').clear();
		return Promise.resolve(true);
	}
	list(todo?: TodoData): Promise<TodoData[]> & any {
		console.log('dex list ');
		return db
			.transaction('r', db.table('todos'), async () => {
				// execute
				return Promise.resolve(await db.table('todos').toArray());
			})
			.then(() => {
				// commit zone
			})
			.catch((err) => Promise.reject(err)); // rollback zone
	}

	/**
	 * async, await로 내보내는 경우
	 * @param todo
	 * @returns
	 */
	async save(todo: TodoData): Promise<boolean> {
		console.log('dex save');
		// Add the new friend!
		const todoEntity: TodoEntity = {
			seq: todo.seq,
			title: todo.title,
			detail: todo.detail,
			regDate: todo.regDate,
			editDate: todo.editDate,
			useYn: true,
			state: TodoState.PLAN
		};
		db.table('todos').put(todoEntity); // Fails to compile
		return Promise.resolve(true);
	}
	async update(todo: TodoData): Promise<boolean> {
		try {
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}
	select(todo: TodoData): Promise<TodoData> {
		console.log('dex select');
		const todoResult = db.table('todos').toArray();
		return new Promise((resolve, reject) => {
			todoResult
				.then((r) => {
					const todoResult = new TodoData({});
					todoResult.title = r[0].title || '';
					todoResult.detail = r[0].detail || '';
					todoResult.regDate = r[0].regDate || '';
					todoResult.editDate = r[0].editDate || '';
					todoResult.useYn = r[0].useYn || true;
					todoResult.state = r[0].state || TodoState.PLAN;
					resolve(todoResult);
				})
				.catch((e) => reject(e));
		});
	}
	delete(todo: TodoData): Promise<boolean> {
		console.log('dex delete');
		db.transaction('rw', db.table('todos'), async () => {
			db.table('todos')
				.where({ seq: todo.seq })
				.eachPrimaryKey(async (pkey) => {
					await db.table('todos').delete(pkey);
				});
		});

		return Promise.resolve(true);
	}
}

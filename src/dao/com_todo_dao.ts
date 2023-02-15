import type { TodoData } from "../model/todo";
import type { ComTodoRepository } from "../repository/com_todo_repository";
import { compList } from "../store/store";

export class ComTodoInmemoryDao implements ComTodoRepository {

  private todoList: TodoData[] = [];

  private listDownload() {
    console.log('listDownload start');
    compList.subscribe(value => {
      console.log('value : ', value);
      this.todoList = value;
    });
  }


  /**
   * todoList 목록 중복 체크 
   * @param todo 
   */
  private isDupCheck(todo: TodoData) {
    return this.todoList.filter(r => {
      return r.seq !== todo.seq;
    });
    // this.todoSet.add(todo);
    // this.todoList = Array.from(this.todoSet);
  }

	save(todo: TodoData): Promise<boolean> {

    this.todoList = this.isDupCheck(todo);

		if (todo.sort) {
			this.todoList.unshift(todo);
		} else {
			this.todoList.push(todo);
		}
    this.isDupCheck(todo);
    compList.update(v => v = this.todoList);
		return Promise.resolve(true);
	}
	update(todo: TodoData): Promise<boolean> {
		const editList = this.todoList.filter((t) => t.seq == todo.seq).map((t) => (t = todo));
    this.todoList = editList;

    compList.update(v => v = this.todoList);

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
		compList.update(v => v = this.todoList);
		return Promise.resolve(true);
	}

	allDelete(): Promise<boolean> {
		this.todoList = [];
    compList.update(v => v = this.todoList);
		return Promise.resolve(true);
	}
}
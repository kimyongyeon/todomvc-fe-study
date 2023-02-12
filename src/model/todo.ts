import { TodoTypes } from '../types/TodoTypes';

export class TodoData {
	seq?: number;
	title: string;
	detail: string;
	regDate: string;
	editDate: string;
	useYn: boolean;
	state: TodoState;
	sort: boolean;
	rowNewItem: boolean;

	constructor(todo: Partial<TodoData>) {
		this.seq = todo.seq;
		this.title = todo.title + '';
		this.detail = todo.detail + '';
		this.regDate = todo.regDate + '';
		this.editDate = todo.editDate + '';
		this.useYn = todo.useYn ?? true;
		this.state = todo.state ?? TodoState.PLAN;
		this.sort = todo.sort ?? true; // 화면 전용
		this.rowNewItem = todo.rowNewItem ?? true; // 화면전용
	}

	/**
	 * TodoData 클래스를 콤마 텍스트로 변환하는 헬퍼
	 * @param todo 
	 * @returns "1234,제목,상세내용,20230129,20230129,Y,COM"
	 */
	static dtoToCommaTextHelper(todo: TodoData) {
		const list = [];
		list.push(todo.seq);
		list.push(todo.title);
		list.push(todo.detail);
		list.push(todo.regDate);
		list.push(todo.editDate);
		list.push(todo.useYn ?? 'N');
		list.push(todo.state);
		return list.join(',');
	}

	/**
	 * 콤마 텍스트를 TodoData 클래스로 변환하는 헬퍼 
	 * @param strComma 
	 * @condition 반드시 7자리가 와야 한다. 즉, 데이터가 하나도 없으면 처리 할 수 없다. 
	 * @returns new TodoData();
	 */
	static textCommaToDtoHelper(strComma: string) {
		if (typeof strComma === 'string') {
			const todoDataList = strComma.split(',');
			if (todoDataList.length === TodoTypes.SPLIT_COUNT) {
				const todo: Partial<TodoData> = {
					seq: Number(todoDataList[0]),
					title: todoDataList[1],
					detail: todoDataList[2],
					regDate: todoDataList[3],
					editDate: todoDataList[4],
					useYn: todoDataList[5] === "true" ? true : false,
					state: todoDataList[6] === "COM" ? TodoState.COM : TodoState.PLAN
				};

				if (typeof todo.seq === 'string') {
					todo.seq = Number(todo.seq);
				}

				if (typeof todo.useYn === 'string') {
					if (todo.useYn === 'Y') {
						todo.useYn = true;
					} else {
						todo.useYn = false;
					}
				}

				if (typeof todo.state === 'string') {
					if (todo.state === 'COM') {
						todo.state = TodoState.COM;
					} else if (todo.state === 'PLAN') {
						todo.state = TodoState.PLAN;
					} else if (todo.state === 'CANCEL') {
						todo.state = TodoState.CANCEL;
					}
				}
				return todo;
			} else {
				// 6자리가 안오면 매핑에 순서를 알 수 없어서 인스턴스만 리턴한다.
				return new TodoData({});
			}
		}
	}
}

export enum TodoState {
	COM,
	CANCEL,
	PLAN
}

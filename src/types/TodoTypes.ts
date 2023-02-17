export class TodoTypes {
	static SUCCESS_MSG = '정상 처리 되었습니다.';
	static FAIL_MSG = '처리가 실패 했습니다.';

	static SUCCESS_CODE = 200;
	static FAIL_CODE = 500;

	static SPLIT_COUNT = 7;

	static FAC_COM = 'com';
	static FAC_DEX = 'dex';
	static FAC_IDX = 'idx';
	static FAC_IM = 'im';
}

import type { TodoData } from '../model/todo';

export interface ResponseTodoType {
	code: string;
	msg: string;
	body: Array<TodoData>;
}

export const responseList: ResponseTodoType = {
	code: '',
	msg: '',
	body: []
};

export const comReponseList: ResponseTodoType = {
	code: '',
	msg: '',
	body: []
};

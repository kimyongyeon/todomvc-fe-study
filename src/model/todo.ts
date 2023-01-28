export class TodoData {
	todoSeq: number | undefined;
	title: string | undefined;
	detail: string | undefined;
	regDate: string | undefined;
	editDate: string | undefined;
	useYn: boolean | undefined;
	state: TodoState | undefined;
}

export enum TodoState {
	COM,
	CANCEL,
	PLAN
}

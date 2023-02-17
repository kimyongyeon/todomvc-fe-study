export interface TodoDB {
	todoStore: {
		key: string;
		value: string;
	};
}

export const dbStore = 'todoTB';
export const todoStore = 'todoStoreDatabase';

// dto => text

// eslint-disable-next-line @typescript-eslint/no-empty-function
export async function idbTran(tableName: string) {}
// eslint-disable-next-line @typescript-eslint/no-empty-function
export async function get(key: string) {}
// eslint-disable-next-line @typescript-eslint/no-empty-function
export async function set(key: string, val: string) {}
// eslint-disable-next-line @typescript-eslint/no-empty-function
export async function del(key: string) {}
// eslint-disable-next-line @typescript-eslint/no-empty-function
export async function clear() {}
// eslint-disable-next-line @typescript-eslint/no-empty-function
export async function keys() {}

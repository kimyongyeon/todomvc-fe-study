import { writable } from 'svelte/store';
import type { TodoData } from '../model/todo';

export const compList = writable<TodoData[]>();

export function allCompListDelete() {
	compList.set([]);
}

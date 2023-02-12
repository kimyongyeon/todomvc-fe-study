<script lang="ts">
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { autoSeq } from '../common/common_helper';
	import { TodoInmemoryDao } from '../dao/todo_inmemory_dao';
	import { TodoData } from '../model/todo';
	import { TodoSvc } from '../service/todo_svc';
	import '../styles/app.css';

	const baseURL = 'https://random-data-api.com/api/v2';

	const todoSvc = new TodoSvc(new TodoInmemoryDao());

	let avatarUrl = '';

	async function getRandomUsers() {
		try {
			const result = await axios.get(baseURL + '/users?size=10&is_xml=true');
			avatarUrl = result.data[0]?.avatar;
			return result;
		} catch (err) {
			console.log('error: ', err);
		}
	}

	onMount(async () => {
		getRandomUsers();
		initList();
	});

	function initList() {
		for (let i = 0; i < 10; i++) {
			todoSvc.addTodo({
				seq: autoSeq().next().value || 0,
				title: '주제 ~~~ ' + i,
				detail: new Date().toDateString(),
				rowNewItem: true
			});
		}
	}
	interface ResponseType {
		code: string;
		msg: string;
		body: Array<TodoData>;
	}

	let responseList: ResponseType = {
		code: '',
		msg: '',
		body: []
	};

	let inputText = '';
	let inputRef: any;
	let sortType: boolean = true;
	let hiddenShow: boolean = true;
	function inputValid() {
		if (!inputText) {
			hiddenShow = false;
			setTimeout(() => {
				hiddenShow = true;
			}, 1000);
			throw Error('input error ');
		} else {
			return false;
		}
	}
	function createClick() {
		if (inputValid()) return;

		const todo = new TodoData({
			seq: autoSeq().next().value || 0,
			title: inputText,
			sort: sortType,
			detail: new Date().toLocaleDateString(),
			rowNewItem: false
		});
		console.log(todo);
		todoSvc.addTodo(todo);
		list();
		inputInit();
	}

	function inputInit() {
		inputText = '';
		inputRef.focus();
	}

	function list() {
		todoSvc.findTodoDtos(new TodoData({})).then((r: any) => {
			const list = r.body;
			responseList.body = list;
		});
	}

	function deleteClick(todo: TodoData) {
		todoSvc.removeTodo(todo);
		list();
	}

	function initClick() {
		inputText = '';
		inputRef.focus();
	}
	function allRemoveClick() {
		todoSvc.allRemoveTodo();
		list();
	}

	function sortClick() {
		if (sortType) {
			responseList.body = responseList.body.sort((a, b) => b.seq - a.seq);
		} else {
			responseList.body = responseList.body.sort((a, b) => a.seq - b.seq);
		}
		sortType = !sortType;
		console.log(responseList.body, sortType);
	}

	function reloadClick() {
		// getRandomUsers();
		allRemoveClick();
		initList();
		list();
	}

	let todayCount = 0;

	function getTodayCountCalc() {
		todayCount = Number(sessionStorage.getItem('todayCount') || 0);
		todayCount = todayCount + 1;
		sessionStorage.setItem('todayCount', todayCount + '');
	}

	let date = new Date();
	let dayCount = new Date(date.getUTCFullYear(), date.getMonth() + 1, 0).getDate();

	let newHidden: boolean = true;

	// useState
	// $: getRandomUsers();
	$: list();
	$: sortType = true;
	$: getTodayCountCalc();

	$: if (y) {
		setTimeout(function () {
			responseList.body = responseList.body.map((i) => {
				i.rowNewItem = true;
				return i;
			});
		}, 3000);
	}
	export let y;

	let naviCurrentIndex = 0;
	function naviClick(selector: any) {
		if (selector === 'home') {
			naviCurrentIndex = 0;
		} else if (selector === 'list') {
			naviCurrentIndex = 1;
		} else if (selector === 'chart') {
			naviCurrentIndex = 2;
		} else {
			naviCurrentIndex = 0;
		}
	}
</script>

<svelte:window bind:scrollY={y} />

<div class="container mx-auto mb-20">
	<div class="pt-3" />

	<div class="navbar bg-base-100">
		<div class="avatar">
			<div class="w-24 rounded">
				<img src={avatarUrl} alt="프로필 사진" />
			</div>
		</div>
		<a class="btn btn-ghost normal-case text-xl">Todo</a>

		<div class="stats shadow">
			<div class="stat">
				<div class="stat-title">Total Page Views</div>
				<div class="stat-value">{todayCount}</div>
				<div class="stat-desc">{(todayCount / dayCount).toFixed(2)}% more than last month</div>
			</div>
		</div>
	</div>

	<div class="pt-3" />

	<input
		type="text"
		class="input input-bordered w-30 max-w-xs"
		bind:value={inputText}
		bind:this={inputRef}
		on:keydown={e => { if(e.keyCode === 13) { createClick()}} }
		placeholder="오늘 할일을 기입하세요."
	/>

	<button class="btn btn-success" on:click={createClick}>추가</button>
	<button class="btn btn-warning" on:click={initClick}>초기화</button>
	<button class="btn btn-primary" on:click={sortClick}>{sortType ? '오름차순' : '내림차순'}</button>
	<button class="btn btn-primary" on:click={allRemoveClick}>모두삭제</button>
	<button class="btn btn-primary" on:click={reloadClick}>리로드</button>
	<span class="badge badge-lg">{responseList.body.length}</span>

	<div class="alert alert-error shadow-lg mt-4" class:hidden={hiddenShow}>
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current flex-shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>

			<span>텍스트필드는 하나라도 입력해야 합니다. </span>
		</div>
	</div>

	<div class="divider" />

	<section class:hidden={naviCurrentIndex != 0}>
		<div class="flex flex-wrap p-4">
			{#each responseList.body as item}
				<div class="card w-96 bg-base-100 shadow-xl mr-3 mt-3">
					<div class="card-body">
						<div class="card-actions justify-start">
							<h2 class="flex-1">이름 : {item.title}</h2>
							<button class="btn btn-square btn-sm" on:click={(e) => deleteClick(item)}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/></svg
								>
							</button>
						</div>

						<p>작성일자 : {item.detail}</p>
						<div class="badge badge-error gap-2" class:hidden={item.rowNewItem}>new</div>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class:hidden={naviCurrentIndex != 1}>list</section>
	<section class:hidden={naviCurrentIndex != 2}>chart</section>

	<div class="alert alert-info shadow-lg hidden">
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="stroke-current flex-shrink-0 w-6 h-6"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span>새로운 글을 작성하셨습니다.</span>
		</div>
	</div>

	<div class="btm-nav">
		<button on:click={(e) => naviClick('home')} class:active={naviCurrentIndex === 0}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
				/></svg
			>
		</button>
		<button on:click={(e) => naviClick('list')} class:active={naviCurrentIndex === 1}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
		</button>
		<button on:click={(e) => naviClick('chart')} class:active={naviCurrentIndex === 2}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
				/></svg
			>
		</button>
	</div>
</div>

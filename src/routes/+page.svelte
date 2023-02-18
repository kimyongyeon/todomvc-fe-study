<script lang="ts">
	import { browser } from '$app/environment';
	import axios from 'axios';
	import echarts, { type EChartOption } from 'echarts';
	import { onMount } from 'svelte';
	import { CommonFactory } from '../common/common_factory';
	import { autoSeq } from '../common/common_helper';
	import ListComponent from '../components/ListComponent.svelte';
	import { TodoData, TodoState } from '../model/todo';
	import { allCompListDelete, compList } from '../store/store';
	import '../styles/app.css';
	import {
		comReponseList,
		responseList,
		TodoTypes,
		type ResponseTodoType
	} from '../types/TodoTypes';

	let date = new Date();
	let dayCount = new Date(date.getUTCFullYear(), date.getMonth() + 1, 0).getDate();
	let inputText = '';
	let inputRef: any;
	let sortType: boolean = true;
	let hiddenShow: boolean = true;
	let avatarUrl = '';
	let todayCount = 0;
	let naviCurrentIndex = 0;
	export let y: number;

	const baseURL = 'https://random-data-api.com/api/v2';
	const todoSvc = CommonFactory.createSvc(TodoTypes.FAC_IM);

	onMount(async () => {
		await getRandomUsers();
		initChart();
	});

	async function getRandomUsers() {
		try {
			const result = await axios.get(baseURL + '/users?size=10&is_xml=true');
			console.log('result ssss : ', result);
			avatarUrl = result.data[0]?.avatar;
			return result;
		} catch (err) {
			console.log('error: ', err);
		}
	}

	function initList() {
		for (let i = 0; i < 10; i++) {
			todoSvc.addTodo({
				seq: autoSeq().next().value || 0,
				title: '주제 ~~~ ' + i,
				detail: new Date().toDateString(),
				state: TodoState.PLAN,
				rowNewItem: true
			});
		}
	}

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

	function inputInit() {
		inputText = '';
		inputRef.focus();
	}

	async function list() {
		try {
			const result: ResponseTodoType & any = await todoSvc.findTodoDtos(new TodoData({}));
			responseList.body = result.body;
		} catch (e) {
			console.log(e);
		}
	}

	function comList() {
		compList.subscribe((v) => {
			if (v !== undefined) {
				comReponseList.code = '200';
				comReponseList.msg = 'success';
				comReponseList.body = v;
			} else {
				comReponseList.code = '500';
				comReponseList.msg = 'fail';
				comReponseList.body = [];
			}
		});
	}

	function getTodayCountCalc() {
		if (browser) {
			todayCount = Number(localStorage.getItem('todayCount') || 0);
			todayCount = todayCount + 1;
			localStorage.setItem('todayCount', todayCount + '');
		}
	}

	function createClick() {
		if (inputValid()) return;
		todoSvc.addTodo({
			seq: autoSeq().next().value || 0,
			title: inputText,
			sort: sortType,
			detail: new Date().toLocaleDateString(),
			rowNewItem: false
		});
		list();
		inputInit();
	}

	function naviClick(selector: any) {
		if (selector === 'home') {
			naviCurrentIndex = 0;
			list();
		} else if (selector === 'list') {
			naviCurrentIndex = 1;
			comList();
		} else if (selector === 'chart') {
			naviCurrentIndex = 2;
			initChart();
		} else {
			naviCurrentIndex = 0;
		}
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
			// 유니온이 답인가?
			responseList.body = responseList.body.sort(
				(a: TodoData & any, b: TodoData & any) => b.seq - a.seq
			);
		} else {
			responseList.body = responseList.body.sort(
				(a: TodoData & any, b: TodoData & any) => a.seq - b.seq
			);
		}
		sortType = !sortType;
	}

	function reloadClick() {
		allRemoveClick();
		allCompListDelete();
		initList();
		list();
	}

	async function initDefaultList() {
		if (browser) {
			const fac = sessionStorage.getItem('FAC');

			if (fac === TodoTypes.FAC_DEX) {
				todoSvc.allRemoveTodo();
			}
		}
		initList();
		await list();
	}

	$: (async function () {
		try {
			await initDefaultList();
		} catch (e) {
			console.log(e);
		}
	})();
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

	function initChart() {
		// let totalList = [...responseList.body, ...comReponseList.body];
		let chart = echarts.init(document.getElementById('app') as HTMLCanvasElement);
		let options = {
			title: {
				text: 'Todo 통계 차트',
				subtext: '데이터는 받아서 넣어야 합니다. 아직 입니다.',
				left: 'center'
			},
			tooltip: {
				trigger: 'item'
			},
			legend: {
				orient: 'vertical',
				left: 'left'
			},
			series: [
				{
					name: 'Access From',
					type: 'pie',
					radius: '50%',
					data: [
						{ value: 1048, name: '완료' },
						{ value: 735, name: '계획' },
						{ value: 580, name: '취소' }
					],
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		};
		chart.setOption(options as EChartOption);
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
		<!-- svelte-ignore a11y-missing-attribute -->
		<a class="btn btn-ghost normal-case text-xl">내가 원하는 Todo</a>
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
		on:keydown={(e) => {
			if (e.keyCode === 13) {
				createClick();
			}
		}}
		placeholder="오늘 할일을 기입하세요."
	/>

	<div class="tooltip" data-tip="텍스트필드에 입력한 값을 Todo으로 추가 합니다.">
		<button class="btn btn-success" on:click={createClick}>추가</button>
	</div>
	<div class="tooltip" data-tip="입력한 값을 초기화 합니다.">
		<button class="btn btn-warning" on:click={initClick}>초기화</button>
	</div>

	<div class="tooltip" data-tip="제목을 오름/내림 차순으로 정렬 합니다.">
		<button class="btn btn-primary" on:click={sortClick}
			>{sortType ? '오름차순' : '내림차순'}</button
		>
	</div>
	<div class="tooltip" data-tip="계획하고 완료된 Todo를 모두삭제 합니다.">
		<button class="btn btn-primary" on:click={allRemoveClick}>모두삭제</button>
	</div>

	<div class="tooltip" data-tip="더미계획 Todo만 남기고 완료된 Todo는 삭제 합니다.">
		<button class="btn btn-primary" on:click={reloadClick}>리로드</button>
	</div>
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
		<ListComponent {responseList} {deleteClick} />
	</section>

	<section class:hidden={naviCurrentIndex != 1}>
		<ListComponent responseList={comReponseList} {deleteClick} />
	</section>
	<section class:hidden={naviCurrentIndex != 2}>
		<div id="app" />
	</section>

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

<style>
	#app {
		width: 750px;
		height: 500px;
	}
</style>

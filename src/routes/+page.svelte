<script>
	import '../app.css';
	import { autoSeq } from '../common/common_helper';
	import { TodoInmemoryDao } from '../dao/todo_inmemory_dao';
	import { TodoSvc } from '../service/todo_svc';

	const todoSvc = new TodoSvc(new TodoInmemoryDao());
  // add 
  for(let i=0; i<10; i++) {
    todoSvc.addTodo({ seq: autoSeq().next().value || 0, title: '주제: ' + i });
  }
  // query 
	const result = todoSvc.findTodo({ seq: 1});
	result.then((r) => console.log(r));

	function createClick() {
		
	}
</script>

<div class="container mx-auto">
	<div class="pt-3" />

	<div class="navbar bg-base-100">
    <div class="avatar">
      <div class="w-24 rounded">
        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      </div>
    </div>
		<a class="btn btn-ghost normal-case text-xl">Todo</a>

    <div class="stats shadow">
  
      <div class="stat">
        <div class="stat-title">Total Page Views</div>
        <div class="stat-value">89,400</div>
        <div class="stat-desc">21% more than last month</div>
      </div>
      
    </div>

	</div>

	<div class="pt-3" />

	<input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />

	<button class="btn btn-success">추가</button>
	<button class="btn btn-error">삭제</button>
	<button class="btn btn-warning">초기화</button>
	<button class="btn btn-primary">모두삭제</button>

	<div class="divider" />

	<div class="flex ">
		<div class="card w-96 bg-base-100 shadow-xl mr-3">
			<div class="card-body">
				<div class="card-actions justify-end">
					<button class="btn btn-square btn-sm">
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
				<p>오늘은 스터디날 입니다.</p>
			</div>
		</div>

		<div class="card w-96 bg-base-100 shadow-xl">
			<div class="card-body">
				<div class="card-actions justify-end">
					<button class="btn btn-square btn-sm">
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
				<p>내일도 공부해야 합니다.</p>
			</div>
		</div>
	</div>

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



		<button>
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
		<button class="active">
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
		<button>
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

<script>
	import { TodoDexieDao } from '../repository/todo_dexie_dao';
  import { TodoSvc } from '../service/todo_svc';

  const todoSvc = new TodoSvc(new TodoDexieDao());
  console.log('>>> ', todoSvc.addTodo({seq: 2, title: '할일을'}));
  
  todoSvc.findTodo({title: '할일을'});
  
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

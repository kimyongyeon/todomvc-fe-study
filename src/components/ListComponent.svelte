<script lang="ts">

export let responseList: any;
export let deleteClick: any;

</script>
<div class="flex flex-wrap p-4">

  {responseList.body.length === 0 ? '삭제한 데이터가 존재 하지 않습니다. ' : ''}

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
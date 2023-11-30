<script lang="ts">
	import { cn } from '@dookdiks/utils';
	import Topnavbtn from './Topnavbtn.svelte';
	import { page } from '$app/stores';

	export let dishType: string[];

	$: type = $page.url.searchParams.get('type');
</script>

<div
	class={cn(
		'bg-ivory-400 flex relative overflow-x-scroll w-full gap-4 p-4 scroll-px-4 scroll-smooth snap-proximity snap-x',
		'no-scrollbar'
	)}
>
	{#each dishType as dish}
		<Topnavbtn
			to={dish.toLowerCase()}
			label={dish}
			active={type?.toLowerCase() == dish.toLowerCase()}
		/>
	{/each}
</div>

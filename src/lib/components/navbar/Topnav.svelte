<script lang="ts">
	import { cn } from '@dookdiks/utils';
	import { page } from '$app/stores';
	import Topnavbtn from './Topnavbtn.svelte';

	export let list: string[];
	export let size: 'sm' | 'md' = 'md';

	$: type = $page.url.searchParams.get('type');
</script>

<div
	class={cn(
		$$restProps.class,
		'bg-ivory-400 flex relative overflow-x-scroll w-full gap-4 p-4 scroll-px-4 scroll-smooth snap-proximity snap-x',
		'no-scrollbar'
	)}
>
	{#each list as item}
		<Topnavbtn
			to={item.toLowerCase()}
			label={item}
			active={type?.toLowerCase() == item.toLowerCase()}
			sizeProps={size}
			class="h-12"
		/>
	{/each}
</div>

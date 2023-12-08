<script lang="ts">
	import { cn } from '@dookdiks/utils';
	import type { PageData } from './$types';
	import List from '$lib/components/navbar/add menu/List.svelte';
	import Button from '$lib/components/Button.svelte';
	import Icon from '@iconify/svelte';
	import plusIcon from '@iconify/icons-vaadin/plus';

	export let data: PageData;
</script>

<div class={cn('border-b border-b-timberwolf-base p-4 pb-8 text-3xl font-semibold mb-4')}>
	CATEGORY
</div>
<div class={cn('p-4 flex flex-col gap-4')}>
	{#each data.dishType as category}
		<!-- make list for category -->
		<List label={category.name} />
	{/each}
</div>
<Button class={cn('absolute right-8 bottom-8')}><Icon icon={plusIcon} />Add category</Button>

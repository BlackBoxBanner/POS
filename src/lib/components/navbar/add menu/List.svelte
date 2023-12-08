<script lang="ts">
	import { cn } from '@dookdiks/utils';
	import Icon from '@iconify/svelte';
	import editOutline from '@iconify/icons-ant-design/edit-outline';
	import { capitalizeFirstLetter } from '$lib/utils/format';
	import { createEventDispatcher } from 'svelte';

	type CustomDispatchEvent = {
		edit: undefined;
	};
	const dispatch = createEventDispatcher<CustomDispatchEvent>();

	export let edit = false;
	export let label: string;

	const toggleEdit = () => {
		dispatch('edit');
	};
</script>

<div class={cn('rounded-lg w-full border border-timberwolf-base px-4 py-1 relative')}>
	<div class={cn('flex h-full min-h-[2.25rem] justify-between items-center')}>
		<div>{capitalizeFirstLetter(label)}</div>
		<button on:click={toggleEdit}>
			<Icon icon={editOutline} />
		</button>
	</div>
</div>

<slot />

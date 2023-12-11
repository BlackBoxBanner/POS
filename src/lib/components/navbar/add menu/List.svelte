<script lang="ts">
	import { cn } from '@dookdiks/utils';
	import Icon from '@iconify/svelte';
	import editOutline from '@iconify/icons-ant-design/edit-outline';
	import deleteOutlined from '@iconify/icons-ant-design/delete-outlined';
	import { capitalizeFirstLetter } from '$lib/utils/format';
	import { createEventDispatcher } from 'svelte';

	type CustomDispatchEvent = {
		edit: undefined;
		delete: undefined;
	};
	const dispatch = createEventDispatcher<CustomDispatchEvent>();

	export let label: string;
</script>

<div class={cn('rounded-lg w-full border border-timberwolf-base pl-4 py-1 relative')}>
	<div class={cn('flex h-full min-h-[2.25rem] justify-between items-center')}>
		<div>{capitalizeFirstLetter(label)}</div>
		<div class={cn('absolute top-0 right-0 flex h-full justify-center items-center')}>
			<button
				on:click={() => dispatch('edit')}
				class={cn('px-4 py-2 border-r border-timberwolf-base')}
			>
				<Icon icon={editOutline} />
			</button>
			<button on:click={() => dispatch('delete')} class={cn('px-4 py-2')}>
				<Icon icon={deleteOutlined} />
			</button>
		</div>
	</div>
</div>

<slot />

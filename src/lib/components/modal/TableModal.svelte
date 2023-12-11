<script lang="ts">
	import { cn } from '@dookdiks/utils';
	import { formatNumber } from '$lib/utils/format';
	import AvariableTable from './content/AvariableTable.svelte';
	import UnAvariableTable from './content/UnAvariableTable.svelte';
	import type { TableIn } from '$lib/types/table';

	export let tables: TableIn;

	let isAvariable = !tables.time;
</script>

<div class={cn('flex flex-col w-full p-4')}>
	<div
		class={cn(
			'w-full h-fit text-success flex flex-col justify-center items-center pt-10 pb-4',
			'border-b border-b-timberwolf-base',
			!isAvariable && 'text-error'
		)}
	>
		<div class={cn('text-xl')}>TABLE NO.</div>
		<div class={cn('text-[9.5rem] leading-[9.25rem] font-semibold')}>
			{formatNumber(tables.table_number)}
		</div>
	</div>
	{#if isAvariable}
		<AvariableTable {tables} />
	{:else}
		<UnAvariableTable {tables} />
	{/if}
</div>

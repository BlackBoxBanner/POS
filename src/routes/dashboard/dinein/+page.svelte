<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Topnav from '$lib/components/navbar/Topnav.svelte';
	import { cn } from '@dookdiks/utils';
	import type { PageData } from './$types';
	import CardTable from '$lib/components/card/CardTable.svelte';
	import type { Tables } from '$lib/types/schema';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { addQueryParameters } from '$lib/utils/urlParams';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { formatNumber, formatTime } from '$lib/utils/format';
	import TableModal from '$lib/components/modal/TableModal.svelte';

	export let data: PageData;

	async function onClick() {
		const res = await fetch('/api/auth/signout', { method: 'POST' });
		if (res) goto('/');
	}
	const { tables, customers } = data;
	$: type = $page.url.searchParams.get('type');

	const menuList = ['all', 'Available', 'unavailable'];

	let active = true;

	function mergeTablesAndCustomers(
		tables: Tables<'tables'>[],
		customers: Tables<'customers'>[]
	): TableIn[] {
		return tables.map((table) => {
			const matchingCustomer = customers.find((customer) => customer.table_id === table.id);

			return {
				created_at: table.created_at,
				id: table.id,
				seated: matchingCustomer ? matchingCustomer.seat : null,
				seat: table.seat,
				table_number: table.table_number,
				time: matchingCustomer ? formatTime(matchingCustomer.created_at) : null
			};
		});
	}

	$: lists = mergeTablesAndCustomers(tables, customers);

	$: completeList = lists.filter((value) => {
		switch (type) {
			case 'available':
				return !!value.time;
			case 'unavailable':
				return !value.time;
			default:
				return value;
		}
	});

	let result: TableIn | null;

	function onOpenModal(table: TableIn) {
		active = true;
		result = table;
	}

	function onCloseModal() {
		active = false;
		result = null;
	}

	onMount(() => {
		const newUrl = !type && addQueryParameters($page.url.href, { type: 'all' });
		newUrl && goto(newUrl);
	});
</script>

<Topnav list={menuList} />
<section
	class={cn(
		' p-4 w-full grid grid-cols-3 gap-4 justify-items-center md:grid-cols-4 lg:grid-cols-7'
	)}
>
	{#each completeList as table, index (index)}
		<button on:click={() => onOpenModal(table)}>
			<CardTable>
				<div
					slot="header"
					class={cn(
						'w-full h-full bg-success text-ivory-base flex flex-col justify-center items-center',
						table.time && 'bg-error'
					)}
				>
					<div>TABLE NO.</div>
					<div class={cn('text-8xl font-semibold')}>{formatNumber(table.table_number)}</div>
				</div>
				<div slot="body" class={cn('flex items-end h-full w-full')}>
					{#if table.time}
						<div class={cn('grid grid-cols-2 w-full')}>
							<div class={cn('font-semibold')}>Seat :</div>
							<div>{@html table.seated}</div>
							<div class={cn('font-semibold')}>Time :</div>
							<div>{String(table.time)}</div>
						</div>
					{/if}
				</div>
			</CardTable>
		</button>
	{/each}
</section>

<Button class={cn('absolute right-8 bottom-8')} on:click={onClick}>logout</Button>

{#if result}
	<Modal {active} on:toggle={onCloseModal}>
		<TableModal tables={result} />
	</Modal>
{/if}

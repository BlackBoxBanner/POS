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
	import { list } from 'postcss';

	export let data: PageData;
	async function onClick() {
		const res = await fetch('/api/auth/signout', { method: 'POST' });
		if (res) goto('/');
	}
	const { tables, customers } = data;
	$: type = $page.url.searchParams.get('type');

	const menuList = ['all', 'Available', 'unavailable'];

	function formatNumber(num: number): string {
		return num >= 1 && num <= 9 ? `0${num}` : num.toString();
	}

	type Result = {
		created_at: string;
		id: string;
		seat: number | null;
		table_number: number;
		time: string | null;
	}[];

	function mergeTablesAndCustomers(
		tables: Tables<'tables'>[],
		customers: Tables<'customers'>[]
	): Result {
		return tables.map((table) => {
			const options: Intl.DateTimeFormatOptions = {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false
			};

			const matchingCustomer = customers.find((customer) => customer.table_id === table.id);

			return {
				created_at: table.created_at,
				id: table.id,
				seat: matchingCustomer ? matchingCustomer.seat : null,
				table_number: table.table_number,
				time: matchingCustomer
					? new Date(matchingCustomer.created_at).toLocaleTimeString('en-US', options)
					: null
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
	{#each completeList as table}
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
						<div>{@html table.seat}</div>
						<div class={cn('font-semibold')}>Time :</div>
						<div>{String(table.time)}</div>
					</div>
				{/if}
			</div>
		</CardTable>
	{/each}
</section>

<Button class={cn('absolute right-8 bottom-8')} on:click={onClick}>logout</Button>

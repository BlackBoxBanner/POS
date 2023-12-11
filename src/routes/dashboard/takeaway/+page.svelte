<script lang="ts">
	import { page } from '$app/stores';
	import Topnav from '$lib/components/navbar/Topnav.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { addQueryParameters } from '$lib/utils/urlParams';
	import CardTable from '$lib/components/card/CardTable.svelte';
	import { formatNumber, formatTime } from '$lib/utils/format';
	import { cn } from '@dookdiks/utils';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { Tables } from '$lib/types/schema';
	import Button from '$lib/components/Button.svelte';
	import TakeAwayModal from '$lib/components/modal/TakeAwayModal.svelte';
	import type { CustomerOrder } from '$lib/types/table';

	export let data: PageData;
	let orders = data.customerOrder;

	// merge data if data is already exist

	const orderStatus = ['NEWEST', 'PREPARING', 'READY TO SERVE', 'COMPLETE'];

	$: type = $page.url.searchParams.get('type');
	$: orders = data.customerOrder.filter((order) => {
		if (type == 'all') return data.order;
		return orderStatus[order.status!] == type?.toUpperCase();
	});

	onMount(async () => {
		if (!type) {
			const url = addQueryParameters($page.url.href, { type: 'all' });
			await goto(url);
		}
	});

	let result: CustomerOrder | null | 'takeaway' = null;

	let modal = false;

	function onOpenModal(table: CustomerOrder) {
		result = table;
		modal = true;
	}

	function onCloseModal() {
		result = null;
		modal = false;
	}

	function onOpenModalTakeaway() {
		result = 'takeaway';
		modal = true;
	}
</script>

<Topnav list={['all', ...orderStatus]} />

<section
	class={cn(
		' p-4 w-full grid grid-cols-3 gap-4 justify-items-center md:grid-cols-4 lg:grid-cols-7'
	)}
>
	{#each orders as order, index (index)}
		<button on:click={() => onOpenModal(order)}>
			<CardTable>
				<div
					slot="header"
					class={cn('w-full h-full text-ivory-base flex flex-col justify-center items-center', {
						'bg-philippine-gray-base': order.status == 0,
						'bg-yellow-gold': order.status == 1,
						'bg-success': order.status == 2,
						'bg-raisinblack-base': order.status == 3
					})}
				>
					<div>ORDER ID.</div>
					<div class={cn('text-8xl font-semibold')}>{formatNumber(order['order_number'])}</div>
				</div>
				<div slot="body" class={cn('flex items-end h-full w-full')}>
					<div class={cn('grid grid-cols-2 w-full')}>
						<div class={cn('font-semibold')}>Name :</div>
						<div>{@html order.name}</div>
						<div class={cn('font-semibold')}>Order :</div>
						<div>{@html order.order_takeaway_list.length}</div>
						<div class={cn('font-semibold')}>Time :</div>
						<div>{formatTime(String(order.created_at))}</div>
					</div>
				</div>
			</CardTable>
		</button>
	{/each}
</section>

<Button class={cn('absolute right-8 bottom-8')} on:click={() => onOpenModalTakeaway()}
	>Print QR code</Button
>

{#if result}
	<Modal active={modal} on:toggle={onCloseModal}>
		<TakeAwayModal order={result != 'takeaway' ? result : null} takeaway={result == 'takeaway'} />
	</Modal>
{/if}

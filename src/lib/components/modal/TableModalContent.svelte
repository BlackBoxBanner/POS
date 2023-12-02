<script lang="ts">
	import { awesome, cn } from '@dookdiks/utils';
	import ButtonOutline from '../ButtonOutline.svelte';
	import { formatNumber, formatTime } from '$lib/utils/format';
	import Icon from '@iconify/svelte';
	import plusCircleOutlined from '@iconify/icons-ant-design/plus-circle-outlined';
	import minusCircleOutlined from '@iconify/icons-ant-design/minus-circle-outlined';
	import { onMount } from 'svelte';
	import { axiosInstant } from '$lib/axios';
	import type { Tables } from '$lib/types/schema';

	export let tables: TableIn;

	let total = 0;

	let customerNumber = 0;

	function increaseCustomer() {
		customerNumber = customerNumber < tables.seat ? customerNumber + 1 : customerNumber;
	}

	function decreaseCustomer() {
		customerNumber = customerNumber > 1 ? customerNumber - 1 : customerNumber;
	}

	async function getBill(id: string) {
		const { data } = await axiosInstant.get<Tables<'orders'>[]>('/api/order', {
			params: {
				table_id: id
			}
		});

		return data;
	}

	async function getMenu() {
		const { data } = await axiosInstant.get<{ data: Tables<'menus'>[] }>('/api/menu');

		return data;
	}

	onMount(async () => {
		if (tables.time) {
			let orders = await getBill(tables.id);
			const { data } = await getMenu();

			total = orders.reduce((result, next) => {
				const menu = data.filter((value) => value.name == next.menu);

				result += menu[0].price;
				return result;
			}, 0);
		}
	});
</script>

<div class={cn('flex flex-col w-full p-4')}>
	<div
		class={cn(
			'w-full h-fit text-success flex flex-col justify-center items-center pt-10 pb-4',
			'border-b border-b-timberwolf-base',
			tables.time && 'text-error'
		)}
	>
		<div class={cn('text-xl')}>TABLE NO.</div>
		<div class={cn('text-[9.5rem] leading-[9.25rem] font-semibold')}>
			{formatNumber(tables.table_number)}
		</div>
	</div>
	<!-- avariable -->
	{#if !tables.time}
		<div class={cn('flex p-4 justify-between', 'border-b border-b-timberwolf-base')}>
			<div class={cn('flex w-full justify-center items-center p-2 gap-4')}>
				<div>SEAT :</div>
				<div class={cn('flex justify-between items-center gap-2 w-16')}>
					<button on:click={decreaseCustomer}>
						<Icon icon={minusCircleOutlined} />
					</button>
					{customerNumber}
					<button on:click={increaseCustomer}>
						<Icon icon={plusCircleOutlined} />
					</button>
				</div>
			</div>
			<span class={cn('border-l h-full border-l-timberwolf-base')} />
			<div class={cn('flex w-full justify-center p-2 gap-4')}>
				<div>TIME :</div>
				<div>{formatTime()}</div>
			</div>
		</div>
		<div class={cn('border-b border-b-timberwolf-base px-4 py-7')}>
			<ButtonOutline label="MERGE TABLE" />
		</div>
		<div class={cn('px-4 py-7')}>
			<ButtonOutline label="print qr code" variant="highlight" disabled={customerNumber == 0} />
		</div>
	{:else}
		<!-- not avariable -->
		<div class={cn('flex p-4 justify-between', 'border-b border-b-timberwolf-base')}>
			<div class={cn('flex w-full justify-center p-2 gap-4')}>
				<div>SEAT :</div>
				<div>{tables.seated}</div>
			</div>
			<span class={cn('border-l h-full border-l-timberwolf-base')} />
			<div class={cn('flex w-full justify-center p-2 gap-4')}>
				<div>TIME :</div>
				<div>{tables.time}</div>
			</div>
		</div>
		<div class={cn('border-b border-b-timberwolf-base flex flex-col px-4 py-7 gap-7')}>
			<div class={cn('flex gap-7')}>
				<ButtonOutline label="MOVE table" />
				<ButtonOutline label="MERGE TABLE" />
			</div>
			<ButtonOutline label="Order history" />
		</div>
		<div class={cn('px-4 py-7 flex flex-col gap-7')}>
			<ButtonOutline label="print qr code" variant="highlight" outline />
			<ButtonOutline label="Make payment ( {total} Baht )" variant="highlight" />
		</div>
	{/if}
</div>

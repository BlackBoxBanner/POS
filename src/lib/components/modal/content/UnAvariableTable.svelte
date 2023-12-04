<script lang="ts">
	import { axiosInstant } from '$lib/axios';
	import ButtonOutline from '$lib/components/ButtonOutline.svelte';
	import type { Tables } from '$lib/types/schema';
	import { cn } from '@dookdiks/utils';
	import { onMount } from 'svelte';

	export let tables: TableIn;

	let total = 0;

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

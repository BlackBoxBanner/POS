<script lang="ts">
	import { formatDate, formatNumber, formatTime } from '$lib/utils/format';
	import { cn } from '@dookdiks/utils';
	import Box from './Box.svelte';
	import ButtonOutline from '../ButtonOutline.svelte';
	import type { CustomerOrder } from '$lib/types/table';
	import Icon from '@iconify/svelte';
	import editOutline from '@iconify/icons-ant-design/edit-outline';

	export let order: CustomerOrder | null;
	export let takeaway: boolean = false;
</script>

{#if order}
	<div class={cn('flex flex-col w-full p-4')}>
		<div
			class={cn(
				'w-full h-fit  flex flex-col justify-center items-center pt-10 pb-4',
				'border-b border-b-timberwolf-base',
				{
					'text-philippine-gray-base': order.status == 0,
					'text-yellow-gold': order.status == 1,
					'text-success': order.status == 2,
					'text-raisinblack-base': order.status == 3
				}
			)}
		>
			{#if takeaway}
				<div
					class={cn(
						'text-raisinblack-base text-7xl font-semibold flex justify-center items-center flex-col pb-4'
					)}
				>
					<div>TAKE</div>
					<div>AWAY</div>
				</div>
			{:else}
				<div class={cn('text-xl')}>ORDER ID.</div>
				<div class={cn('text-[9.5rem] leading-[9.25rem] font-semibold')}>
					{formatNumber(order.order_number)}
				</div>
			{/if}
		</div>
		{#if takeaway}
			<Box borderBottom paddingY={4} class={cn('mb-8')}>
				<Box borderRight>DATE: {formatDate()}</Box>
				<Box>TIME: {formatTime()}</Box>
			</Box>
			<ButtonOutline label="print qr code" variant="highlight" />
		{:else}
			<Box borderBottom paddingY={4} class={cn('mb-8')}>
				<Box borderRight>NAME: {order.name.toUpperCase()}</Box>
				<Box>TIME: {formatTime()}</Box>
			</Box>
			<Box>
				<div class={cn('grid grid-cols-8 w-full')}>
					<div class={cn('col-span-7 font-semibold')}>{String('order list').toUpperCase()}</div>
					<div class={cn('flex justify-end')}><button><Icon icon={editOutline} /></button></div>
					{#each order.order_takeaway_list as list}
						<div class={cn('col-span-6')}>{list.menu}</div>
						<div class={cn()}>x{list.portios}</div>
						<div class={cn('flex justify-end')}>{list.price * list.portios}</div>
					{/each}
				</div>
			</Box>
		{/if}
	</div>
{/if}

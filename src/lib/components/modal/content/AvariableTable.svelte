<script lang="ts">
	import ButtonOutline from '$lib/components/ButtonOutline.svelte';
	import type { TableIn } from '$lib/types/table';
	import { formatTime } from '$lib/utils/format';
	import { cn } from '@dookdiks/utils';
	import minusCircleOutlined from '@iconify/icons-ant-design/minus-circle-outlined';
	import plusCircleOutlined from '@iconify/icons-ant-design/plus-circle-outlined';
	import Icon from '@iconify/svelte';

	export let tables: TableIn;

	let customerNumber = 0;

	/**
	 * Increases the customer number by 1.
	 */
	function increaseCustomer() {
		customerNumber = customerNumber < tables.seat ? customerNumber + 1 : customerNumber;
	}

	/**
	 * Decreases the customer number by 1.
	 */
	function decreaseCustomer() {
		customerNumber = customerNumber > 1 ? customerNumber - 1 : customerNumber;
	}
</script>

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

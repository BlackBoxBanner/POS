<script lang="ts">
	import { onMount } from 'svelte';
	import MenuItems from '../MenuItems.svelte';
	import Section from '../Section.svelte';
	import { axiosInstant } from '$lib/axios';
	import type { BillReturn } from '$lib/handler/bill/checkout';
	import type { Tables } from '$lib/types/schema';

	export let customerId: string;

	let billsData: BillReturn | null;

	$: branch = billsData?.branch.branch_name;
	$: tableNumber = billsData?.table.table_number;
	$: customerCount = billsData?.customer.seat;
	$: companyName = '';
	$: address1 = billsData?.branch.branch_name;
	$: address2 = '';
	$: customerID = billsData?.customer.id;
	$: checkoutAt = billsData?.customer.check_out_at;
	$: cashier = billsData?.employee.name;

	onMount(async () => {
		const { data } = await axiosInstant.get<BillReturn>('/api/bill', {
			params: {
				customerId
			}
		});

		billsData = data;
	});

	type Orders = Pick<Tables<'orders'>, 'menu' | 'portion'> & { price: number };

	$: orders = billsData?.order.reduce((result, next) => {
		const menus = billsData?.menus.filter((value) => value.name == next.menu);
		if (!menus || !menus.length) return result;

		const index = result.findIndex((value) => value.menu == next.menu);

		if (index == -1) {
			result.push({
				menu: next.menu,
				portion: next.portion,
				price: menus[0].price * next.portion
			});
		} else {
			result[index].portion += next.portion;
			result[index].price += menus[0].price * next.portion;
		}

		return result;
	}, [] as Orders[]);

	$: total = orders?.reduce((result, next) => {
		result += next.price;
		return result;
	}, 0);

	$: VAT = total ? (total * 0.07).toFixed(2) : '';
	$: subTotal = total ? (total * 1.07).toFixed(2) : '';
	// $: amountReceive = billsData;
	// $: change = billsData;
	// $: remark = billsData;
</script>

{#if billsData && orders}
	<div class="w-[58mm] bg-white text-black flex flex-col items-center p-2 relative gap-2">
		<div class="mx-2 text-center w-full relative">
			<!-- Header of recipe -->
			<span class="text-xl font-bold">グリル ( GU-RI-RU )</span>
			<div class="flex flex-col">
				<span class="text-xs">สาขา {branch}</span>
				<span class="text-xs">{companyName}</span>

				<div class="mt-1 flex flex-col">
					<span class="text-xs">{address1}</span>
					<span class="text-xs">{address2}</span>
				</div>
			</div>
			<!-- Title of recipe -->
			<div class="mt-3 mb-2">
				<span class="text-sm font-bold">ใบเสร็จรับเงิน</span>
			</div>
			<!-- Information of recipe -->
			<div class="justify-items-start">
				<Section data={customerID} label="เลขที่ใบเสร็จ:" />
				<Section data={customerCount} label="จำนวนลูกค้า:" />
				<Section data={checkoutAt} label="เช็คบิล:" />
				<Section data={cashier} label="แคชเชียร์:" />
			</div>
			<!-- Table Number -->
			<div class="mt-3 mb-2 justify-between">
				<span class="text-m font-bold">โต๊ะ: {tableNumber}</span>
			</div>
			<!-- Order detail List -->
			<div class="w-full border-b-2 border-b-raisinblack-base pt-2 mb-2" />
			<div class="grid grid-cols-3">
				<span class="mb-3 text-xs text-left">สินค้า</span>
				<span class="mb-3 text-xs text-right">จำนวน</span>
				<span class="mb-3 text-xs text-right">ราคา</span>
				{#each orders as order}
					<MenuItems
						productAmount={order.portion}
						productName={order.menu}
						productPrice={order.price}
					/>
				{/each}
			</div>
			<div class="w-full border-b-2 border-b-raisinblack-base pt-2 mb-2" />
			<!-- Total/Payment Detail -->
			<div class="justify-items-start">
				<Section data={total} label="ยอดรวม:" />
				<Section data={VAT} label="VAT 7%:" />
				<Section data={subTotal} label="ยอมรวม:" />
				<!-- <Section data={amountReceive} label="เงินสด:" />
				<Section data={change} label="ทอน:" />
				<Section data={remark} label="หมายเหตุ:" /> -->
			</div>
			<div class="mt-5 mb-10">
				<div class="flex gap-2 text-xs justify-between">
					<div class="w-full border-b-2 border-b-raisinblack-base pt-2 mb-2" />
					<div class="w-full min-w-[55%]">ขอบคุณที่มาใช้บริการ</div>
					<div class="w-full border-b-2 border-b-raisinblack-base pt-2 mb-2" />
				</div>
			</div>
		</div>
	</div>
{/if}

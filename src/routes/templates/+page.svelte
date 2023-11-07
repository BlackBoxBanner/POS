<script lang="ts">
	export let branch = 'The Paseo Park';
	export let tableNumber = 1;
	export let customerCount = 10;
	export let companyName = 'บริษัท คิว เอ ซิสเต็มส์ จำกัด';
	export let address1 = '126 Pracha Uthit Rd, Bang Mot';
	export let address2 = 'Thung Khru, Bangkok 10140';

	export let customerID = '00000001';
	export let checkoutAt = '01/06/2026 12:18';
	export let cashier = 'พณศร ศรีสยาม'

	export let productName = "ไก่คาราแกะ";
	export let productAmount = 2;
	export let productPrice = 100;

	export let total = 200;
	export let VAT = 14;
	export let subTotal = 214;
	export let amountReceive = 214;
	export let change = 0;
	export let remark = "";

</script>

<div class="w-[58mm] bg-white text-black flex flex-col items-center p-2 relative gap-2">
	<div class="mx-2 text-center">
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
			<div class="flex flex-row justify-between">
				<span class="text-xs">เลขที่ใบเสร็จ: </span>
				<span class="text-xs">{customerID}</span> 
			</div>
			<div class="flex flex-row justify-between">
				<span class="text-xs">จำนวนลูกค้า: </span>
				<span class="text-xs">{customerCount}</span> 
			</div>
			<div class="flex flex-row justify-between">
				<span class="text-xs">เช็คบิล: </span>
				<span class="text-xs">{checkoutAt}</span> 
			</div>
			<div class="flex flex-row justify-between">
				<span class="text-xs">แคชเชียร์: </span>
				<span class="text-xs">{cashier}</span> 
			</div>
		</div>
		<!-- Table Number -->
		<div class="mt-3 mb-2 justify-between">
			<span class="text-m font-bold">โต๊ะ: {tableNumber}</span>
		</div>
		<!-- Order detail List -->
		<span>-----------------------------</span>
		<div class="grid grid-cols-3">
			<span class="mb-3 text-xs text-left">สินค้า</span>
			<span class="mb-3 text-xs text-right">จำนวน</span>
			<span class="mb-3 text-xs text-right">ราคา</span>

			<span class=" text-xs text-left">{productName}</span>
			<span class="text-xs text-right">{productAmount}</span>
			<span class=" text-xs text-right">{productPrice}</span>
		</div>
		<span>-----------------------------</span>
		<!-- Total/Payment Detail -->
		<div class="justify-items-start">
			<div class="flex flex-row justify-between">
				<span class="text-xs">ยอดรวม: </span>
				<span class="text-xs">{total}</span> 
			</div>
			<div class="flex flex-row justify-between">
				<span class="text-xs">VAT 7%: </span>
				<span class="text-xs">{VAT}</span> 
			</div>
			<div class="flex flex-row justify-between">
				<span class="text-xl font-bold">ยอมรวม: </span>
				<span class="text-xl font-bold">{subTotal}</span> 
			</div>
			<div class="flex flex-row justify-between">
				<span class="text-xs">เงินสด: </span>
				<span class="text-xs">{amountReceive}</span> 
			</div>
			<div class="flex flex-row justify-between">
				<span class="text-xs">ทอน: </span>
				<span class="text-xs">{change}</span> 
			</div>
			<div class="flex flex-row justify-between">
				<span class="text-xs">หมายเหตุ: </span>
				<span class="text-xs">{remark}</span> 
			</div>
		</div>
		<div class="mt-5 mb-10">
			<span class="text-xs">--------ขอบคุณที่มาใช้บริการ---------</span>
		</div>
	</div>
</div>

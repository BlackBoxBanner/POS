<script lang="ts">
	export let branch = 'KMUTT';
	export let tableNumber = 1;
	export let customerCount = 10;
	export let src: string;
</script>

<div
	class="w-[58mm] bg-white text-black flex flex-col items-center p-2 relative gap-2"
>
	<div class="text-center">
		<span class="text-xl font-bold">グリル ( GU-RI-RU )</span>
		<p class="store-detail">
			สาขา:{branch} <br />โต๊ะหมายเลข {tableNumber} <br /> จำนวนลูกค้า:{customerCount}คน
		</p>
	</div>
	<div class="border-b-2 border-black w-full" />
	<div class="image">
		<img class="w-full h-full bg-cover" {src} alt="QR for Ordering food" />
	</div>
	<div class="border-b-2 border-black w-full" />
	<div class="flex flex-col gap-2 items-center text-center">
		<span>*** คำแนะนำการสั่งอาหาร ***</span>
		<span>Andriod สามารถสแกนผ่าน LINE หรือ แอปพลิเคชั่นอื่น</span>
		<span>IOS สามารถสแกนผ่านกล้อง (camera) ได้เลย</span>
	</div>
</div>

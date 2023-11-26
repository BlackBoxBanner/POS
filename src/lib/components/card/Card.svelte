<script lang="ts">
	import { cn } from '@dookdiks/utils';
	export let name: string;
	export let price: string;
	export let image: string;
</script>

<section class={cn('border rounded overflow-clip h-56 w-40 ')}>
	<div class={cn('h-[58%] rounded-b-lg bg-raisinblack-100 w-full relative overflow-clip')}>
		<img src={image} alt="" class={cn('object-cover h-full w-full ')} />
	</div>
	<div class={cn('p-2 pt-4 px-4 h-[42%] flex flex-col justify-between')}>
		<p class={cn('font-semibold')}>{name}</p>
		<p class={cn('')}>{price} Baht</p>
	</div>
</section>

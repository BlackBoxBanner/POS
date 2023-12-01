<script lang="ts">
	import { cn } from '@dookdiks/utils';
	export let name: string;
	export let price: string;
	export let image: string | null;
</script>

<section
	class={cn('border border-raisinblack-base rounded-lg overflow-clip h-56 w-40  bg-ivory-base')}
>
	<div class={cn('h-[58%] rounded-b-lg bg-raisinblack-base w-full relative overflow-clip')}>
		{#if image}
			<img src={image} alt="" class={cn('object-cover h-full w-full ')} />
		{:else}
			<div class={cn('w-full h-full flex justify-center items-center text-ivory-base')}>{name}</div>
		{/if}
	</div>
	<div class={cn('p-2 pt-4 px-4 h-[42%] flex flex-col justify-between')}>
		<p class={cn('font-semibold')}>{name}</p>
		<p class={cn('')}>{price} Baht</p>
	</div>
</section>

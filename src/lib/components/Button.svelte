<script lang="ts">
	import { cn } from '@dookdiks/utils';

	export let ref: HTMLButtonElement | null = null;

	type ButtonSize = 'small' | 'medium' | 'large';
	export let size: ButtonSize = 'medium';

	$: btnSize =
		size === 'small'
			? 'text-xs py-2 px-4'
			: size === 'medium'
			? 'text-base py-2 px-6 min-w-[10rem]'
			: size === 'large'
			? 'text-xl py-2 px-6 min-w-[10rem]'
			: '';
</script>

<button
	{...$$restProps}
	bind:this={ref}
	on:click
	on:focus
	on:mouseover
	on:mouseenter
	on:mouseleave
	class={cn(
		'bg-crayola-base text-milk-base rounded-full',
		'ease-in-out duration-300',
		'hover:bg-crayola-200',
		btnSize,
		$$restProps.class
	)}
>
	<slot />
</button>

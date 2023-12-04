<script lang="ts">
	import { cn } from '@dookdiks/utils';

	export let ref: HTMLButtonElement | null = null;

	export let label: string;

	export let variant: 'base' | 'highlight' = 'base';
	export let disabled: boolean = false;
	export let outline = false;
</script>

<button
	{...$$restProps}
	bind:this={ref}
	on:click
	on:focus
	on:mouseover
	on:mouseenter
	on:mouseleave
	{disabled}
	class={cn(
		'rounded-md flex justify-center items-center w-full h-16 border font-semibold ease-in-out duration-200',
		'disabled:border-timberwolf-base disabled:text-timberwolf-base disabled:bg-ivory-base',
		{
			'border-eerie-black-base text-philippine-gray-base': variant == 'base',
			'border-crayola-base text-ivory-base bg-crayola-base': variant == 'highlight' && !outline,
			'border-crayola-base text-crayola-base ': variant == 'highlight' && outline
		}
	)}
>
	{label.toUpperCase()}
</button>

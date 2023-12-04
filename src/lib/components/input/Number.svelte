<script lang="ts">
	import { cn } from '@dookdiks/utils';

	export let value: string;
	export let error = '';
	export let label = 'Number';
	export let inputClass = '';
	export let id: string = '';

	$: value = value && value.replace(/[^0-9.]/g, '');

	function handleInput() {
		if (error) {
			error = '';
		}
	}
</script>

<div class={cn('flex flex-col min-w-[23rem] relative')} {...$$restProps}>
	<label
		for={id || 'input'}
		class={cn(
			'text-base border-eerie-black-base text-eerie-black-base font-semibold w-full',
			error && 'border-error text-error'
		)}>{label}</label
	>
	<div class={cn('relative')}>
		<input
			bind:value
			id={id || 'input'}
			type="text"
			class={cn(
				'border-b border-eerie-black-base text-eerie-black-base font-light active:no-underline w-full focus:outline-none bg-transparent',
				error && 'border-error text-error',
				inputClass
			)}
			on:input={handleInput}
		/>
	</div>
	<p class={cn('font-light text-sm text-error h-4')}>
		{#if error}
			{error}
		{/if}
	</p>
</div>

<script lang="ts">
	import { cn } from '@dookdiks/utils';

	export let value: string = '';
	export let error = '';
	export let label = 'Input';
	export let inputClass = '';
	export let id: string = '';
	export let placeholder: string = '';
	export let showErrorMessage: boolean = true;
</script>

<div class={cn('flex flex-col min-w-[23rem] relative gap-2')} {...$$restProps}>
	<label
		for={id || 'input'}
		class={cn(
			'text-base border-eerie-black-base text-eerie-black-base w-full',
			error && 'border-error text-error'
		)}>{label}</label
	>
	<input
		bind:value
		id={id || 'input'}
		type="text"
		{placeholder}
		class={cn(
			'border rounded-lg p-2 px-4 border-timberwolf-base text-eerie-black-base placeholder:text-timberwolf-base active:no-underline w-full focus:outline-none bg-transparent',
			error && 'border-error text-error',
			inputClass
		)}
		on:input
	/>
	<p class={cn('font-light text-sm text-error h-4')}>
		{#if showErrorMessage && error}
			{error}
		{/if}
	</p>
</div>

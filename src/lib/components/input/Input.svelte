<script lang="ts">
	import { cn } from '@dookdiks/utils';

	export let value: string;
	export let error = '';
	export let label = 'Input';
	export let inputClass = '';
</script>

<div class={cn('flex flex-col min-w-[23rem] relative')} {...$$restProps}>
	<label
		for="email-input"
		class={cn(
			'text-base border-eerie-black-base text-eerie-black-base font-semibold w-full',
			error && 'border-error text-error'
		)}>{label}</label
	>
	<input
		bind:value
		type="text"
		class={cn(
			'border-b border-eerie-black-base text-eerie-black-base font-light active:no-underline w-full focus:outline-none bg-transparent',
			error && 'border-error text-error',
			inputClass
		)}
		on:input
	/>
	<p class={cn('font-light text-sm text-error h-4')}>
		{#if error}
			{error}
		{/if}
	</p>
</div>

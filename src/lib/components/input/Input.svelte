<script lang="ts">
	import { cn } from '@dookdiks/utils';

	export let value: string;
	export let error = '';
	export let label = 'Input';
	export let inputClass = '';
</script>

<div {...$$restProps} class={cn('flex flex-col min-w-[23rem] relative')}>
	<label for="email-input" class={cn('text-base font-semibold w-full')}>{label}</label>
	<input
		bind:value
		type="email"
		class={cn(
			'border-b font-light active:no-underline w-full focus:outline-none bg-transparent',
			...inputClass
		)}
		on:input
	/>
	<p class={cn('font-light text-sm text-crayola-base h-4')}>
		{#if error}
			{error}
		{/if}
	</p>
</div>

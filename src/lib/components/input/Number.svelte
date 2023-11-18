<script lang="ts">
	import { cn } from '@dookdiks/utils';

	export let value: string;
	export let error = '';
	export let label = 'Number';
	export let inputClass = '';

	$: value = value && value.replace(/[^0-9.]/g, '');

	function handleInput() {
		if (error) {
			error = '';
		}
	}
</script>

<div class={cn('flex flex-col min-w-[23rem] relative')} {...$$restProps}>
	<label for="email-input" class={cn('text-base font-semibold w-full')}>{label}</label>
	<div class={cn('relative')}>
		<input
			bind:value
			type="text"
			class={cn(
				'border-b font-light active:no-underline w-full focus:outline-none bg-transparent',
				inputClass
			)}
			on:input={handleInput}
		/>
	</div>
	<p class={cn('font-light text-sm text-crayola-base h-4')}>
		{#if error}
			{error}
		{/if}
	</p>
</div>

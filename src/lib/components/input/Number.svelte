<script lang="ts">
	import { cn } from '@dookdiks/utils';

	export let value: string;
	export let error = '';
	export let passwordRequirements = 'Value is not a number';
	export let label = 'Number';
	export let check = false;
	export let inputClass = '';

	$: isNumber = checkNumber(value);
	$: isError = !!error;

	function checkNumber(str: string) {
		const dataCheck = str && !str.match(/[^0-9]/g);
		value = value && value.replace(/[^0-9]/g, '');
		return dataCheck;
	}

	function handleInput() {
		if (isError && isNumber) {
			error = '';
		}
	}
</script>

<div {...$$restProps} class={cn('flex flex-col min-w-[23rem] relative')}>
	<label for="email-input" class={cn('text-base font-semibold w-full')}>{label}</label>
	<div class={cn('relative')}>
		<input
			bind:value
			type="text"
			class={cn('border-b font-light active:no-underline w-full focus:outline-none', ...inputClass)}
			on:input={handleInput}
		/>
	</div>
	<p class={cn('font-light text-sm text-crayola-base h-4')}>
		{#if (isNumber || isError) && check && !isError}
			{passwordRequirements}
		{:else}
			{error}
		{/if}
	</p>
</div>

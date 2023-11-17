<script lang="ts">
	import { cn } from '@dookdiks/utils';

	// NOTE - input value
	export let value: string;

	// NOTE - error handler
	export let error = '';
	export let passwordRequirements = 'Value is not a number';

	// NOTE - Label
	export let label = 'Number';

	// NOTE - check for strong password
	export let check = false;

	// NOTE - input styles
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

<div class={cn('flex flex-col min-w-[23rem] relative')} {...$$restProps}>
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

<script lang="ts">
	import { cn } from '@dookdiks/utils';

	export let value: string;
	export let error = '';
	export let emailNotValid = 'Email is not valid';
	export let label = 'Email';
	export let inputClass = '';
	export let id: string = '';

	function checkEmail(str: string) {
		return str && !str.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
	}

	$: isEmail = checkEmail(value);
	$: isError = !!error;

	function handleInput() {
		if (isError && isEmail) {
			error = '';
		}
	}
</script>

<div class={cn('flex flex-col min-w-[23rem] relative')} {...$$restProps}>
	<label
		for={id || 'email-input'}
		class={cn(
			'text-base font-semibold w-full',
			(isEmail || isError) && !isError && 'border-error text-error'
		)}>{label}</label
	>
	<input
		bind:value
		id={id || 'email-input'}
		type="email"
		class={cn(
			'border-b border-eerie-black-base text-eerie-black-base font-light active:no-underline w-full focus:outline-none bg-transparent',
			(isEmail || isError) && !isError && 'border-error text-error',
			inputClass
		)}
		on:input={handleInput}
	/>
	<p class={cn('font-light text-sm text-error h-4')}>
		{#if (isEmail || isError) && !isError}
			{emailNotValid}
		{:else}
			{error}
		{/if}
	</p>
</div>

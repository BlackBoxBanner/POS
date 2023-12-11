<script lang="ts">
	import { cn } from '@dookdiks/utils';

	export let value: string;
	export let error = '';
	export let emailNotValid = 'Email is not valid';
	export let label = 'Email';
	export let inputClass = '';
	export let id: string = '';

	/**
	 * Checks if the given string is a valid email address.
	 *
	 * @param {string} str - The string to be checked.
	 * @returns {boolean} - Returns true if the string is a valid email address, false otherwise.
	 */
	function checkEmail(str: string) {
		return str && !str.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
	}

	$: isEmail = checkEmail(value);
	$: isError = !!error;

	/**
	 * Handles the input event for the email input field.
	 * If there is an error and the input value is a valid email, clears the error message.
	 */
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

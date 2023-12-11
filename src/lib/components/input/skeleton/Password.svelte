<script lang="ts">
	import { cn } from '@dookdiks/utils';
	import Icon from '@iconify/svelte';
	import eyeOutline from '@iconify/icons-ion/eye-outline';
	import eyeOffOutline from '@iconify/icons-ion/eye-off-outline';

	export let value: string;
	export let error = '';
	export let passwordRequirements = 'Password requirements not met';
	export let label = 'Password';
	export let check = false;
	export let inputClass = '';
	export let review = true;
	export let id: string = '';
	let type: 'password' | 'text' = 'password';

	$: isStrongPassword = checkPassword(value);
	$: isError = !!error;

	/**
	 * Checks if the given password meets the following criteria:
	 * - Contains at least one uppercase letter
	 * - Contains at least one digit
	 * - Has a minimum length of 8 characters
	 *
	 * @param {string} str - The password to be checked
	 * @returns {boolean} - Returns true if the password meets the criteria, false otherwise
	 */
	function checkPassword(str: string) {
		return str && !str.match(/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/);
	}

	/**
	 * Handles the input event for the password input field.
	 * If there is an error and the input value is a valid password, clears the error message.
	 */
	function handleInput() {
		if (isError && isStrongPassword) {
			error = '';
		}
	}

	/**
	 * Handles the click event for the review button.
	 * Toggles the password visibility.
	 */
	function onClickHandler() {
		type = type === 'password' ? 'text' : 'password';
	}
</script>

<div class={cn('flex flex-col min-w-[23rem] relative')} {...$$restProps}>
	<label
		for={id || 'password-input'}
		class={cn(
			'text-base font-semibold w-full border-eerie-black-base text-eerie-black-base',
			(isStrongPassword || isError) && check && !isError && 'border-error text-error'
		)}>{label}</label
	>
	<div class={cn('relative')}>
		<input
			bind:value
			id={id || 'password-input'}
			{...{ type }}
			class={cn(
				'border-b font-light border-eerie-black-base text-eerie-black-base active:no-underline w-full focus:outline-none bg-transparent',
				(isStrongPassword || isError) && check && !isError && 'border-error text-error',
				inputClass
			)}
			on:input={handleInput}
		/>
	</div>
	<p class={cn('font-light  text-sm text-error h-4')}>
		{#if (isStrongPassword || isError) && check && !isError}
			{passwordRequirements}
		{:else}
			{error}
		{/if}
	</p>
	{#if review}
		<button
			type="button"
			class={cn('absolute right-1 h-full flex items-center')}
			on:click={onClickHandler}
			tabindex="-1"
		>
			<Icon icon={type == 'password' ? eyeOutline : eyeOffOutline} class={cn('scale-125')} />
		</button>
	{/if}
</div>

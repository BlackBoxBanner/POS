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

	function checkPassword(str: string) {
		return str && !str.match(/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/);
	}

	function handleInput() {
		if (isError && isStrongPassword) {
			error = '';
		}
	}

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

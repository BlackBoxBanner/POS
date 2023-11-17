<script lang="ts">
	import { cn } from '@dookdiks/utils';
	import Icon from '@iconify/svelte';
	import eyeOutline from '@iconify/icons-ion/eye-outline';
	import eyeOffOutline from '@iconify/icons-ion/eye-off-outline';

	// NOTE - input value
	export let value: string;

	// NOTE - error handler
	export let error = '';
	export let passwordRequirements = 'Password requirements not met';

	// NOTE - Label
	export let label = 'Password';

	// NOTE - check for strong password
	export let check = false;

	// NOTE - input styles
	export let inputClass = '';

	// NOTE - show password type
	export let review = true;
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
	<label for="email-input" class={cn('text-base font-semibold w-full')}>{label}</label>
	<div class={cn('relative')}>
		{#if review}
			<button class={cn('absolute right-1 h-full flex items-center')} on:click={onClickHandler}>
				<Icon icon={type == 'password' ? eyeOutline : eyeOffOutline} class={cn('scale-125')} />
			</button>
		{/if}
		<input
			bind:value
			{...{ type }}
			class={cn('border-b font-light active:no-underline w-full focus:outline-none', ...inputClass)}
			on:input={handleInput}
		/>
	</div>
	<p class={cn('font-light text-sm text-crayola-base h-4')}>
		{#if (isStrongPassword || isError) && check && !isError}
			{passwordRequirements}
		{:else}
			{error}
		{/if}
	</p>
</div>

<script lang="ts">
	import { cn } from '@dookdiks/utils';

	export let value: string;
	export let error = '';
	export let emailNotValid = 'Email is not valid';

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

<div class={cn('flex flex-col min-w-[23rem] relative')}>
	<label for="email-input" class={cn('text-base font-semibold w-full')}>Email</label>
	<input
		bind:value
		type="email"
		class={cn('border-b font-light active:no-underline w-full focus:outline-none')}
		on:input={handleInput}
	/>
	<p class={cn('font-light text-sm text-crayola-base h-4')}>
		{#if isEmail || isError}
			{#if isError}
				{error}
			{:else}
				{emailNotValid}
			{/if}
		{/if}
	</p>
</div>

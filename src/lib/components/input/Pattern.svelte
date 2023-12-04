<script lang="ts">
	import { cn } from '@dookdiks/utils';

	export let value: string;
	export let error = '';
	export let label = 'Pattern';
	export let inputClass = '';
	export let id: string = '';

	type Pattern = {
		pattern: RegExp;
		message: string;
	};

	export let pattern: Pattern = {
		pattern: / /,
		message: ''
	};

	function handleInput() {
		error = '';
		error = !!value.match(pattern.pattern) ? pattern.message : '';
	}
</script>

<div class={cn('flex flex-col min-w-[23rem] relative')} {...$$restProps}>
	<label
		for={id || 'email-input'}
		class={cn(
			'text-base font-semibold w-full border-eerie-black-base text-eerie-black-base',
			error && 'border-error text-error'
		)}>{label}</label
	>
	<div class={cn('relative')}>
		<input
			bind:value
			id={id || 'email-input'}
			type="text"
			class={cn(
				'border-b font-light active:no-underline border-eerie-black-base text-eerie-black-base w-full focus:outline-none bg-transparent',
				error && 'border-error text-error',
				inputClass
			)}
			on:input={handleInput}
		/>
	</div>
	<p class={cn('font-light text-sm text-error h-4')}>
		{#if error}
			{error}
		{/if}
	</p>
</div>

<script lang="ts">
	import { cn } from '@dookdiks/utils';

	export let value: string;
	export let error = '';
	export let label = 'Pattern';
	export let inputClass = '';

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

<div {...$$restProps} class={cn('flex flex-col min-w-[23rem] relative')}>
	<label for="email-input" class={cn('text-base font-semibold w-full')}>{label}</label>
	<div class={cn('relative')}>
		<input
			bind:value
			type="text"
			class={cn(
				'border-b font-light active:no-underline w-full focus:outline-none bg-transparent',
				...inputClass
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

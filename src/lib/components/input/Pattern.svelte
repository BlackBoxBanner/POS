<script lang="ts">
	import { cn } from '@dookdiks/utils';

	// NOTE - input value
	export let value: string;

	// NOTE - error handler
	export let error = '';

	// NOTE - Label
	export let label = 'Pattern';

	// NOTE - input styles
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
		{#if error}
			{error}
		{/if}
	</p>
</div>

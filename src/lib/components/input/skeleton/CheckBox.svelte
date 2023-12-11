<script lang="ts">
	import { cn } from '@dookdiks/utils';

	export let checked: boolean = false;
	export let error = '';
	export let label = 'Input';
	export let inputClass = '';
	export let id: string = '';
</script>

<div class={cn('flex flex-col min-w-[23rem] relative')} {...$$restProps}>
	<div class={cn('flex gap-4')}>
		<input
			bind:checked
			id={id || 'checkbox-input'}
			type="checkbox"
			class={cn(
				'border-b border-eerie-black-base text-eerie-black-base font-light active:no-underline focus:outline-none bg-transparent',
				error && 'border-error text-error',
				inputClass
			)}
			on:input
		/>
		<label
			for={id || 'checkbox-input'}
			class={cn(
				'text-base border-eerie-black-base text-eerie-black-base font-normal w-full',
				error && 'border-error text-error'
			)}>{label}</label
		>
	</div>
</div>

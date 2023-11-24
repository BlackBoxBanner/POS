<script lang="ts">
	import { addParamsToURL } from '$lib/utils/urlParams';
	import { cn } from '@dookdiks/utils';

	export let to: string;
	export let label: string;
	export let active = false;
</script>

<button
	on:click={() => addParamsToURL({ type: to })}
	{...$$restProps}
	class={cn(
		'rounded-md flex justify-center items-center min-w-[11rem] w-44 h-16 border font-semibold',
		active
			? 'bg-blue-sapphire-base text-ivory-400'
			: 'border-timberwolf-base bg-transparent text-philippine-gray-base',
		'snap-start'
	)}
>
	{label.toLocaleUpperCase()}
</button>

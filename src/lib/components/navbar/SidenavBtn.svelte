<script lang="ts">
	import { goto } from '$app/navigation';
	import { cn } from '@dookdiks/utils';
	import Icon from '@iconify/svelte';
	export let label: string;
	export let to: string;
	export let icon: string;

	export let active = false;
</script>

<button
	{...$$restProps}
	on:click={() => goto(to)}
	class={cn(
		'w-full p-4 py-7 border-b border-b-philippine-gray-base text-ivory-base flex justify-start items-center gap-4',
		$$restProps.class,
		active && 'bg-blue-sapphire-base'
	)}
>
	<div class={cn('relative w-6')}>
		<Icon {icon} width="100%" />
	</div>
	<div class={cn('')}>
		{label.toUpperCase()}
	</div>
</button>

<script lang="ts">
	import { cn } from '@dookdiks/utils';
	import Icon, { type IconifyIcon } from '@iconify/svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let label: string;
	export let to: string;
	export let icon: string | IconifyIcon;

	export let active = $page.url.pathname.includes(to);
</script>

<button
	{...$$restProps}
	on:click={() => goto($page.url.origin + '/' + to)}
	class={cn(
		'w-full p-4 py-7 border-b border-b-philippine-gray-base text-ivory-base flex justify-start items-center gap-4 ease-in-out duration-300',
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

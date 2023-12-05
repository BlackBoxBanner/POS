<script lang="ts">
	import { goto } from '$app/navigation';
	import { cn } from '@dookdiks/utils';
	export let href: string;
	export let label: string;
	export let active: boolean = false;
</script>

<button
	class={cn(
		'text-philippine-gray-base bg-ivory-400 w-full p-8 flex border-b border-b-timberwolf-base',
		active && 'bg-blue-sapphire-base text-ivory-400'
	)}
	on:click={async () => await goto(`/dashboard/menu/add/${href}`)}
>
	{label.toUpperCase()}
</button>

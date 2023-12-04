<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { addQueryParameters } from '$lib/utils/urlParams';
	import { cn } from '@dookdiks/utils';

	export let to: string;
	export let label: string;
	export let active = false;

	async function clickHandler() {
		const url = addQueryParameters($page.url.href, { type: to });
		await goto(url);
	}
</script>

<button
	on:click={clickHandler}
	id={to}
	{...$$restProps}
	class={cn(
		'rounded-md flex justify-center items-center min-w-[11rem] w-44 h-16 border font-semibold ease-in-out duration-200',
		active
			? 'bg-blue-sapphire-base text-ivory-400'
			: 'border-timberwolf-base bg-transparent text-philippine-gray-base',
		'snap-start'
	)}
>
	{label.toLocaleUpperCase()}
</button>

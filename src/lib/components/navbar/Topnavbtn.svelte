<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { addQueryParameters } from '$lib/utils/urlParams';
	import { cn } from '@dookdiks/utils';

	export let to: string;
	export let label: string;
	export let active = false;

	export let sizeProps: 'sm' | 'md' = 'md';

	
	/**
	 * Handles the click event of the top navigation button.
	 * Adds query parameters to the current page URL and navigates to the updated URL.
	 * @async
	 * @function clickHandler
	 * @returns {Promise<void>}
	 */
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
		'rounded-md flex justify-center items-center min-w-[11rem] w-44 border font-semibold ease-in-out duration-200',
		{
			'bg-blue-sapphire-base border-blue-sapphire-base text-ivory-400': active,
			'border-timberwolf-base bg-transparent text-philippine-gray-base': !active,
			'h-12': sizeProps == 'sm',
			'h-16': sizeProps == 'md',
			'border-raisinblack-base': sizeProps == 'sm' && !active
		},
		'snap-start'
	)}
>
	{label.toLocaleUpperCase()}
</button>

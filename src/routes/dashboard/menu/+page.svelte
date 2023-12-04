<script lang="ts">
	import Topnav from '$lib/components/navbar/Topnav.svelte';
	import { cn } from '@dookdiks/utils';
	import type { PageData } from './$types';
	import type { Tables } from '$lib/types/schema';
	import { page } from '$app/stores';
	import Card from '$lib/components/card/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Icon from '@iconify/svelte';
	import plusIcon from '@iconify/icons-vaadin/plus';

	export let data: PageData;

	const dishTypeArr = data.dishType.reduce((result, next) => {
		result.push(next.name);
		return result;
	}, [] as string[]);

	$: typeQuery = $page.url.searchParams.get('type');

	$: typeId = data.dishType.reduce((result, next) => {
		if (next.name.toLowerCase() == typeQuery?.toLowerCase()) result = next.id;
		return result;
	}, '' as string);

	$: menus = data.menus.reduce((result, next) => {
		const id = next.type == typeId;

		if (id) {
			result.push(next);
		}

		return result;
	}, [] as Tables<'menus'>[]);
</script>

<Topnav list={dishTypeArr} />
<section
	class={cn(
		' p-4 w-full grid grid-cols-3 gap-4 justify-items-center md:grid-cols-4 lg:grid-cols-7'
	)}
>
	{#each menus as menu}
		<Card name={menu.name} price={String(menu.price)} image={menu.image} />
	{/each}
</section>
<Button class={cn('absolute right-8 bottom-8')}><Icon icon={plusIcon} />Add menu</Button>

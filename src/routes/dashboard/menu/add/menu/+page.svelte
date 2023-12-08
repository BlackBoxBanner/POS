<script lang="ts">
	import Topnav from '$lib/components/navbar/Topnav.svelte';
	import { cn } from '@dookdiks/utils';
	import type { PageData } from './$types';
	import List from '$lib/components/navbar/add menu/List.svelte';
	import Button from '$lib/components/Button.svelte';
	import Icon from '@iconify/svelte';
	import plusIcon from '@iconify/icons-vaadin/plus';
	import type { Tables } from '$lib/types/schema';
	import { page } from '$app/stores';
	import { error } from '@sveltejs/kit';

	export let data: PageData;

	$: typeQuery = $page.url.searchParams.get('type');

	function getMenus(type: string | null) {
		return data.menus.reduce((result, next) => {
			if (!type) return result;
			const menusId = data.dishType.filter(
				(item) => item.name.toLowerCase() == type?.toLowerCase()
			)[0].id;

			const id = next.type == menusId;

			if (id) {
				result.push(next);
			}

			return result;
		}, [] as Tables<'menus'>[]);
	}

	$: menus = getMenus(typeQuery);

	const dishTypeArr = data.dishType.reduce((result, next) => {
		result.push(next.name);
		return result;
	}, [] as string[]);
</script>

<div class={cn('border-b border-b-timberwolf-base p-4 pb-8 text-3xl font-semibold mb-4')}>MENU</div>
<div class={cn('')}>
	<Topnav list={dishTypeArr} size="sm" />
</div>
<div class={cn('p-4')}>
	{#each menus as menu}
		<!-- make list for category -->
		<List label={menu.name} />
	{/each}
</div>

<Button class={cn('absolute right-8 bottom-8')}><Icon icon={plusIcon} />Add menu</Button>

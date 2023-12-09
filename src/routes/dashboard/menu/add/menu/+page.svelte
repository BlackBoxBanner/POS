<script lang="ts">
	import Topnav from '$lib/components/navbar/Topnav.svelte';
	import { awesome, cn } from '@dookdiks/utils';
	import type { PageData } from './$types';
	import List from '$lib/components/navbar/add menu/List.svelte';
	import Button from '$lib/components/Button.svelte';
	import Icon from '@iconify/svelte';
	import plusIcon from '@iconify/icons-vaadin/plus';
	import type { Tables } from '$lib/types/schema';
	import { page } from '$app/stores';
	import Modal from '$lib/components/modal/Modal.svelte';

	export let data: PageData;

	$: dishType = data.dishType;

	async function onRefresh() {
		const { data: newDishType, error: newDishTypeError } = await awesome.fetch('/api/type');
		if (newDishTypeError) return console.error(newDishTypeError);
		dishType = newDishType as Tables<'dish_types'>[];
	}

	let modal = false;

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

	$: dishTypeArr = dishType.reduce((result, next) => {
		result.push(next.name);
		return result;
	}, [] as string[]);

	function handleAddMenu() {
		modal = !modal;
	}
	async function onDeleteHandler(id: string) {
		const { data: resDelete, error: resErrorDelete } = await awesome.fetch('/api/menu', {
			method: 'DELETE',
			body: {
				id
			}
		});
		if (resErrorDelete) return console.error(resErrorDelete);
		onRefresh();
	}
</script>

<div class={cn('border-b border-b-timberwolf-base p-4 pb-8 text-3xl font-semibold mb-4')}>MENU</div>
<div class={cn('')}>
	<Topnav list={dishTypeArr} size="sm" />
</div>
<div class={cn('p-4')}>
	{#each menus as menu}
		<!-- make list for category -->
		<List label={menu.name} on:delete={() => onDeleteHandler(menu.id)} />
	{/each}
</div>

<Modal
	active={modal}
	on:toggle={handleAddMenu}
	position="center"
	class={cn('w-2/5 p-4 pt-12 h-4/5')}
	closeSize={30}
>
	<!-- <AddCategoryForm on:afterSubmit={handlerAddCategoryModal} /> -->
</Modal>

<Button class={cn('absolute right-8 bottom-8')} on:click={handleAddMenu}>
	<Icon icon={plusIcon} />Add menu
</Button>

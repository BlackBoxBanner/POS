<script lang="ts">
	import { awesome, cn } from '@dookdiks/utils';
	import type { PageData } from './$types';
	import List from '$lib/components/navbar/add menu/List.svelte';
	import Button from '$lib/components/Button.svelte';
	import Icon from '@iconify/svelte';
	import plusIcon from '@iconify/icons-vaadin/plus';
	import Modal from '$lib/components/modal/Modal.svelte';
	import AddCategoryForm from '$lib/components/forms/AddCategoryForm.svelte';
	import type { Tables } from '$lib/types/schema';

	export let data: PageData;

	let addCategoryModal = false;

	$: dishType = data.dishType;

	async function onRefresh() {
		const { data: newDishType, error: newDishTypeError } = await awesome.fetch('/api/type');
		if (newDishTypeError) return console.error(newDishTypeError);
		dishType = newDishType as Tables<'dish_types'>[];
	}

	function handlerAddCategoryModal() {
		onRefresh();
		addCategoryModal = !addCategoryModal;
	}

	async function onDeleteHandler(id: string) {
		const { data: resDelete, error: resErrorDelete } = await awesome.fetch('/api/type', {
			method: 'DELETE',
			body: {
				id
			}
		});
		if (resErrorDelete) return console.error(resErrorDelete);
		onRefresh();
	}
</script>

<div class={cn('border-b border-b-timberwolf-base p-4 pb-8 text-3xl font-semibold mb-4')}>
	CATEGORY
</div>
<div class={cn('p-4 flex flex-col gap-4')}>
	{#each dishType as category}
		<!-- make list for category -->
		<List label={category.name} on:delete={() => onDeleteHandler(category.id)} />
	{/each}
</div>

<Modal
	active={addCategoryModal}
	on:toggle={handlerAddCategoryModal}
	position="center"
	class={cn('w-2/5 p-4 pt-12 h-4/5')}
	closeSize={30}
>
	<AddCategoryForm on:afterSubmit={handlerAddCategoryModal} />
</Modal>

<Button class={cn('absolute right-8 bottom-8')} on:click={handlerAddCategoryModal}>
	<Icon icon={plusIcon} />Add category
</Button>

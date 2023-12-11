<script lang="ts">
	import { awesome, cn } from '@dookdiks/utils';
	import Input from '$lib/components/input/Input.svelte';
	import Button from '../Button.svelte';
	import { createEventDispatcher } from 'svelte';
	import { axiosInstant } from '$lib/axios';
	import type { CreateTypeProps } from '$lib/handler/type';
	import { AxiosError } from 'axios';

	let addCategoryValue: string = '';
	let addCategoryValueError: string = '';

	/**
	 * CustomDispatchEvent type definition.
	 * @typedef {Object} CustomDispatchEvent
	 * @property {undefined} afterSubmit - Event triggered after form submission.
	 */
	type CustomDispatchEvent = {
		afterSubmit: undefined;
	};
	const dispatch = createEventDispatcher<CustomDispatchEvent>();

	/**
	 * Handles the form submission by making a POST request to the server.
	 * If the request is successful, it dispatches the 'afterSubmit' event.
	 * If there is an error, it sets the 'addCategoryValueError' variable with the error message.
	 */
	async function handleSubmit() {
		try {
			await axiosInstant<CreateTypeProps>({
				method: 'POST',
				url: '/api/type',
				data: {
					name: addCategoryValue
				}
			});

			dispatch('afterSubmit');
		} catch (error) {
			if (error instanceof AxiosError && error.response?.data?.message) {
				addCategoryValueError = error.response.data.message;
			}
		}
	}
</script>

<form class={cn('w-full flex justify-between flex-col')} on:submit={handleSubmit}>
	<section>
		<div class={cn('flex flex-col justify-start items-center mb-8 text-xl font-semibold')}>
			Add category
		</div>
		<Input
			label="Category’s Name"
			placeholder="Category’s Name"
			bind:value={addCategoryValue}
			error={addCategoryValueError}
			id="category"
		/>
	</section>
	<Button type="submit" class={cn('w-full rounded-md')}>Save</Button>
</form>

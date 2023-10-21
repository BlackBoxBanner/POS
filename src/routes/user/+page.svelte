<script lang="ts">
	import { tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { axiosInstant } from '$lib/axios';
	import type { AxiosResponse } from 'axios';

	export let data: PageData;

	const { employees } = data;
	const tableData: TableSource = {
		head: ['ID', 'Name', 'Email', 'Create at'],
		body: tableMapperValues(employees, ['id', 'name', 'email', 'created_at'])
	};

	let select: number[] = [];

	const selectionHandler = (index: number) => {
		if (select.includes(index)) {
			return (select = select.reduce((result, next) => {
				if (next != index) {
					result = [...result, next];
				}
				return result;
			}, [] as number[]));
		}
		return (select = [...select, index]);
	};

	async function deleteHandler() {
		const id = select.reduce((result, next) => {
			result = [...result, employees[next].id];
			return result;
		}, [] as string[]);

		const func = id.reduce((result, next) => {
			result = [
				...result,
				axiosInstant.delete('/api/auth/users', {
					data: {
						id: next
					}
				})
			];
			return result;
		}, [] as Promise<AxiosResponse<any, any>>[]);

		const resResult = await Promise.all(func);

		resResult.forEach((res) => {
			if (res.status !== 200) throw new Error(res.statusText);
		});

		location.reload();
	}
</script>

<div class="flex flex-col justify-center items-center h-full gap-4">
	<div class="table-container w-auto">
		<table class="table table-compact table-hover table-interactive">
			<thead>
				<tr>
					{#each tableData.head as head}
						<th>
							{head}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each tableData.body as body, index}
					<tr on:click={() => selectionHandler(index)}>
						{#each body as data}
							<td>
								{data}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<th colspan="3">Select</th>
					<td>{select}</td>
				</tr>
			</tfoot>
		</table>
	</div>
	<div class="flex gap-4">
		{#each select as index}
			<div>
				{employees[index].id}
			</div>
		{/each}
	</div>
	<button
		class="btn variant-filled-primary hover:variant-filled-secondary ease-in-out duration-200"
		on:click={deleteHandler}
	>
		delete
	</button>
</div>

<script lang="ts">
	import EnterBill from '$lib/components/bill/template/EnterBill.svelte';
	import OutBill from '$lib/components/bill/template/OutBill.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	const id = $page.url.searchParams.get('id');
	console.log(id);
</script>

<div class="flex gap-2">
	<!-- <EnterBill url="test" /> -->
	{#if id}
		<OutBill customerId={id} />
	{/if}
</div>

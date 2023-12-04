<script lang="ts">
	import EnterBill from '$lib/components/bill/template/EnterBill.svelte';
	import OutBill from '$lib/components/bill/template/OutBill.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex gap-2">
	<!-- <EnterBill url="test" /> -->
	<OutBill customerId="b419f9ba-921c-432a-a89c-875fa8921dc5" />
</div>

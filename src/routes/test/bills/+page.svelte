<script lang="ts">
	import BillQrCode from '$lib/components/bill/BillQrCode.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<BillQrCode url="https://kit.svelte.dev/docs/form-actions" />

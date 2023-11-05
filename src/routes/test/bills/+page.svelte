<script lang="ts">
	import Qr from '$lib/components/bill/QR.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Qr url="https://kit.svelte.dev/docs/form-actions" />

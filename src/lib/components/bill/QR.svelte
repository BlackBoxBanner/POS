<script lang="ts">
	import { axiosInstant } from '$lib/axios';
	import { onMount } from 'svelte';
	import Enter from './template/Enter.svelte';

	export let url: string;
	export let enter = true;

	export let branch = 'KMUTT';
	export let tableNumber = 1;
	export let customerCount = 1;

	let qrCode: string;

	onMount(async () => {
		qrCode = await getQr();
	});

	async function getQr() {
		const { data } = await axiosInstant.get('/api/qr', {
			params: {
				url: 'localhost:3000'
				// type: 'string'
			}
		});
		return data as string;
	}
</script>

{#if enter}
	<Enter src={qrCode} {branch} {tableNumber} {customerCount} />
{:else}
	<!-- TODO : Change this to out QR code -->
	<Enter src={qrCode} {branch} {tableNumber} {customerCount} />
{/if}

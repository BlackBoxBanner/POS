<script lang="ts">
	import { axiosInstant } from '$lib/axios';
	import { onMount } from 'svelte';

	let qrCode: string;

	onMount(async () => {
		qrCode = await getQr();
	});

	async function getQr() {
		const { data } = await axiosInstant.get('/api/qr', {
			params: {
				url: 'localhost:3000',
				// type: 'string'
			}
		});
		return data as string;
	}
</script>

<img class="bg-cover" src={qrCode} alt="QRCode" />

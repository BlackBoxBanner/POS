<script lang="ts">
	import { axiosInstant } from '$lib/axios';
	import Button from '$lib/components/Button.svelte';
	import Image from '$lib/components/input/Image.svelte';
	import Logo from '$lib/components/logo.svelte';
	import { getImage } from '$lib/utils/image';
	import axios from 'axios';
	import type { PageData } from './$types';
	import { awesome, cn } from '@dookdiks/utils';

	export let data: PageData;

	let files: FileList;
	let form: HTMLFormElement;

	function signOutHandler() {
		axiosInstant('/api/auth/signout', { method: 'POST' });
	}

	const toBase64 = (file: File) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});

	async function submitHandler(e: SubmitEvent) {
		e.preventDefault();
		const file = getImage(files);
		if (!file) return;

		const formData = (await toBase64(file)) as string;

		// const res = await axios.post('/api/image', formData, {
		// 	headers: { 'Content-Type': 'multipart/form-data' }
		// });

		// console.log(res);

		const { data, error } = await awesome.fetch('/api/image', {
			method: 'POST',
			body: {
				image: formData
			},
			headers: {}
		});
		console.log({ data, error });
	}
</script>

<div class="bg-ivory-base font-exo h-full flex justify-center items-center flex-col gap-4">
	<Logo class={cn('scale-75')} />
	<Button on:click={signOutHandler}>Sign out</Button>
	<form on:submit={submitHandler} bind:this={form}>
		<Image bind:files id="image" />
		<Button type="submit">upload</Button>
	</form>
</div>

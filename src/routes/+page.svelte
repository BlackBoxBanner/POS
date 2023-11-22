<script lang="ts">
	import { axiosInstant } from '$lib/axios';
	import Button from '$lib/components/Button.svelte';
	import Image from '$lib/components/input/Image.svelte';
	import Logo from '$lib/components/logo.svelte';
	import { getImage, toBase64 } from '$lib/utils/image';
	import type { AxiosError } from 'axios';
	import type { PageData } from './$types';
	import { cn } from '@dookdiks/utils';

	export let data: PageData;

	let errorImage: string | undefined;

	let emptyFileList: FileList;
	let files: FileList;

	function signOutHandler() {
		axiosInstant('/api/auth/signout', { method: 'POST' });
	}

	function resetImage() {
		files = emptyFileList;
	}

	async function submitHandler(e: SubmitEvent) {
		e.preventDefault();
		const file = getImage(files);
		if (!file) return;

		try {
			const imageUrl = await axiosInstant.post('/api/image', {
				image: await toBase64(file),
				name: file.name
			});

			errorImage = '';
		} catch (err: unknown) {
			const error = err as AxiosError;

			errorImage = error.response?.data as string | undefined;
			resetImage();
		}
	}
</script>

<div class="bg-ivory-base font-exo h-full flex justify-center items-center flex-col gap-4">
	<Logo class={cn('scale-75')} />
	<Button on:click={signOutHandler}>Sign out</Button>
	<form on:submit={submitHandler} class={cn('flex flex-col justify-center items-center')}>
		<Image bind:files id="image" error={errorImage} />
		<Button type="submit" size="small">upload</Button>
	</form>
</div>

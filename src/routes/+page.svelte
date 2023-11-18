<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
	import type { PageData } from './$types';
	import Email from '$lib/components/input/Email.svelte';
	import Password from '$lib/components/input/Password.svelte';
	import Button from '$lib/components/Button.svelte';
	import { axiosInstant } from '$lib/axios';
	import { awesome } from '@dookdiks/utils';
	async function Login() {
		
		const { data, error } = await awesome.async( () =>
			axiosInstant.post('http://localhost:5173/api/auth/signin', {
				email,
				password 
				
			})
		);
		console.log({data})
	}
	export let data: PageData;

	let email="";
	let password="";
</script>

<div class="bg-ivory-base font-exo h-full flex justify-center items-center flex-col gap-4">
	<Logo />
	<form class="w-1/2 flex justify-center items-center flex-col">
		<Email bind:value={email} inputClass="flex w-full item-left p-4"/> 
		<Password bind:value={password} />
		<Button on:click={Login} class="flex justify-center items-center rounded-full text-xl w-1/3 mt-4">Login</Button>
	</form>
</div>

<script lang="ts">
	import { dev } from '$app/environment';
	// import type { PageData } from './$types';

	// export let data: PageData;

	import { goto } from '$app/navigation';
	import { axiosInstant } from '$lib/axios';
	import Input from '$lib/components/input.svelte';
	import type { SignUpProps } from '$lib/types/auth';

	let email = '';
	let password = '';
	let name = '';
	let repetePassword = '';

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();
		const endPointUrl = '/api/auth/signup';

		const { status, statusText } = await axiosInstant.post(endPointUrl, {
			email,
			name,
			password,
			repetePassword,
			force: dev
		} as SignUpProps);

		if (status !== 200) throw new Error(statusText);
		goto('/');
	};
</script>

<form on:submit={handleSubmit} class="flex flex-col gap-2">
	<Input
		label="email"
		type="text"
		id="email"
		placeholder="email"
		bind:value={email}
		class="input w-80 px-4 py-1"
		autocomplete="email"
		required
	/>
	<Input
		label="name"
		type="text"
		id="name"
		placeholder="name"
		bind:value={name}
		class="input w-80 px-4 py-1"
		autocomplete="email"
		required
	/>
	<Input
		label="password"
		type="password"
		id="password"
		placeholder="password"
		bind:value={password}
		class="input w-80 px-4 py-1"
		autocomplete="current-password"
		required
	/>
	<Input
		label="repete password"
		type="password"
		id="repetePassword"
		placeholder="repete password"
		bind:value={repetePassword}
		class="input w-80 px-4 py-1"
		autocomplete="current-password"
		required
	/>
	<button
		class="ease-in-out duration-150"
		type="submit">sign up</button
	>
</form>

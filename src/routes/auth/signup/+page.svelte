<script lang="ts">
	import { dev } from '$app/environment';
	// import type { PageData } from './$types';

	// export let data: PageData;

	import { goto } from '$app/navigation';
	import type { SignUpProps } from '$lib/auth';
	import { axiosInstant } from '$lib/axios';

	let email = '';
	let password = '';
	let name = '';
	let repetePassword = '';

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();
		const endPointUrl = dev ? '/api/auth/signup/force' : '/api/auth/signup';

		const { status, statusText } = await axiosInstant.post(endPointUrl, {
			email,
			name,
			password,
			repetePassword
		} as SignUpProps);

		if (status !== 200) throw new Error(statusText);
		goto('/');
	};
</script>

<form on:submit={handleSubmit} class="flex flex-col gap-2">
	<input
		type="text"
		placeholder="email"
		bind:value={email}
		class="input w-80 px-4 py-1"
		autocomplete="email"
		required
	/>
	<input
		type="text"
		placeholder="name"
		bind:value={name}
		class="input w-80 px-4 py-1"
		autocomplete="email"
		required
	/>
	<input
		type="password"
		placeholder="password"
		bind:value={password}
		class="input w-80 px-4 py-1"
		autocomplete="current-password"
		required
	/>
	<input
		type="password"
		placeholder="repete password"
		bind:value={repetePassword}
		class="input w-80 px-4 py-1"
		autocomplete="current-password"
		required
	/>
	<button
		class="btn hover:variant-outline-secondary variant-outline-primary ease-in-out duration-150"
		type="submit">sign up</button
	>
</form>

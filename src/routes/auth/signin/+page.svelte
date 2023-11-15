<script lang="ts">
	// import type { PageData } from './$types';

	// export let data: PageData;

	import { goto } from '$app/navigation';
	import { axiosInstant } from '$lib/axios';
	import type { SignInProps } from '$lib/types/auth';
	import Input from '$lib/components/input.svelte';

	$: emailInput = '';
	$: passwordInput = '';

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();

		const { status, statusText } = await axiosInstant.post('/api/auth/signin', {
			email: emailInput,
			password: passwordInput
		} as SignInProps);

		if (status !== 200) throw new Error(statusText);
		goto('/');
	};
</script>

<form on:submit={handleSubmit} class="flex flex-col gap-2">
	<Input
		label="Email"
		type="text"
		id="email"
		placeholder="email"
		bind:value={emailInput}
		class="input w-80 px-4 py-1"
		autocomplete="email"
		required
	/>
	<Input
		label="Password"
		type="password"
		id="password"
		placeholder="password"
		bind:value={passwordInput}
		class="input w-80 px-4 py-1"
		autocomplete="current-password"
		required
	/>
	<button
		class="ease-in-out duration-150"
		type="submit">sign in</button
	>
</form>

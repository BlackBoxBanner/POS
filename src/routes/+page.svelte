<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
	import Button from '$lib/components/Button.svelte';
	import { customAxios } from '$lib/axios';
	import { cn } from '@dookdiks/utils';
	import { goto } from '$app/navigation';
	import Email from '$lib/components/input/skeleton/Email.svelte';
	import Password from '$lib/components/input/skeleton/Password.svelte';

	let email = '';
	let password = '';

	let emailError = '';
	let passwordError = '';

	function resetError() {
		emailError = '';
		passwordError = '';
	}

	async function loginHandler() {
		resetError();
		const { data, error } = await customAxios('/api/auth/signin', {
			method: 'POST',
			data: {
				email,
				password
			}
		});

		if (data) goto('/dashboard');

		if (error) {
			if (error.id === 'email') emailError = error.message;
			if (error.id === 'password') passwordError = error.message;
		}
	}
</script>

<div class="bg-ivory-base font-exo h-full flex justify-center items-center flex-col gap-4">
	<Logo class={cn('scale-75')} />
	<form class="flex justify-center items-center flex-col gap-2">
		<Email bind:value={email} error={emailError} />
		<Password bind:value={password} error={passwordError} />
		<Button on:click={loginHandler} class={cn('mt-8')}>Login</Button>
	</form>
</div>

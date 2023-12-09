<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
	import Email from '$lib/components/input/skeleton/Email.svelte';
	import Password from '$lib/components/input/skeleton/Password.svelte';
	import Button from '$lib/components/Button.svelte';
	import { customAxios } from '$lib/axios';
	import { cn } from '@dookdiks/utils';
	import { goto } from '$app/navigation';
	import Input from '$lib/components/input/skeleton/Input.svelte';
	import CheckBox from '$lib/components/input/skeleton/CheckBox.svelte';

	let email = '';
	let password = '';
	let repetePassword = '';
	let name = '';

	let emailError = '';
	let passwordError = '';
	let repetePasswordError = '';
	let nameError = '';

	let force = false;

	function resetError() {
		emailError = '';
		passwordError = '';
	}

	async function signUpHandler() {
		resetError();
		const { data, error } = await customAxios('/api/auth/signup', {
			method: 'POST',
			data: {
				email,
				password,
				repetePassword,
				name,
				force
			}
		});

		if (data) goto('/');

		if (error) {
			if (error.id === 'email') emailError = error.message;
			if (error.id === 'password') passwordError = error.message;
			if (error.id === 'name') nameError = error.message;
			if (error.id === 'repetePassword') repetePasswordError = error.message;
		}
	}
</script>

<div class="bg-ivory-base font-exo h-full flex justify-center items-center flex-col gap-4">
	<Logo class={cn('scale-75')} />
	<form class="flex justify-center items-center flex-col gap-2">
		<Input bind:value={name} error={nameError} label="Name" />
		<Email bind:value={email} error={emailError} />
		<Password bind:value={password} error={passwordError} />
		<Password bind:value={repetePassword} error={repetePasswordError} label="Repete Password" />
		<CheckBox bind:checked={force} label="Force register?" />
		<Button on:click={signUpHandler} class={cn('mt-8')}>Sign Up</Button>
	</form>
</div>

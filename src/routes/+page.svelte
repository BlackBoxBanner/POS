<script lang="ts">
	import { axiosInstant } from '$lib/axios';
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/logo.svelte';
	import type { PageData } from './$types';
	import { cn } from '@dookdiks/utils';

	export let data: PageData;

function signOutHandler(){
	axiosInstant("/api/auth/signout",{method:"POST"})
}
</script>

<div class="bg-ivory-base font-exo h-full flex justify-center items-center flex-col gap-4">
	<Logo class={cn('scale-75')} />
	<Button on:click={signOutHandler}>Sign out</Button>
</div>

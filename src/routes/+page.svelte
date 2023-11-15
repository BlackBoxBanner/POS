<script lang="ts">
	import type { PageData } from './$types';
	import Signout from '$lib/components/signout.svelte';
	import Logo from '$lib/components/logo.svelte';
	import Icon from '@iconify/svelte';
	import eyeIcon from '@iconify/icons-ion/eye';
	import eyeOffOutline from '@iconify/icons-ion/eye-off-outline';

	export let data: PageData;
</script>

<div class="font-exo h-full flex justify-center items-center flex-col gap-4">
	<Logo />
	<div>
		{#if !data.session}
			<a class="" href="/auth/signin">sign in</a>
			<a class="" href="/auth/signup">sign up</a>
		{:else}
			<Signout />
		{/if}
	</div>
	<Icon icon={eyeIcon} />
	<Icon icon={eyeOffOutline} />
</div>

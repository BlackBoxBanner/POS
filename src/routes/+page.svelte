<script lang="ts">
	import type { PageData } from './$types';
	import Signout from '$lib/components/signout.svelte';

	export let data: PageData;
</script>

<div class="font-exo h-full flex justify-center items-center flex-col gap-4">
	<h1 class="text-4xl font-bold">
		{`グリル ( GU-RI-RU )`}
	</h1>
	<div>
		{#if !data.session}
			<a class="btn-base variant-filled-secondary" href="/auth/signin">sign in</a>
			<a class="btn-base variant-filled-secondary" href="/auth/signup">sign up</a>
		{:else}
			<Signout />
		{/if}
	</div>
	<a class="btn variant-filled-secondary" href="/user">user</a>
</div>

<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="font-exo h-full flex justify-center items-center flex-col gap-4">
	<Logo />
</div>

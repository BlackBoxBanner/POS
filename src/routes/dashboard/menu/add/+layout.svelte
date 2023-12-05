<script lang="ts">
	import AddMenuSideNav from '$lib/components/navbar/add menu/AddMenuSideNav.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<AddMenuSideNav>
	<slot />
</AddMenuSideNav>

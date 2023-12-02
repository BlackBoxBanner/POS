<script lang="ts">
	import type { LayoutData } from './$types';
	import Sidenav from '$lib/components/navbar/Sidenav.svelte';

	export let data: LayoutData;
</script>

<div class="bg-timberwolf-base h-screen w-full overflow-auto">
	<Sidenav empolyee={data.empolyee}>
		<slot />
	</Sidenav>
</div>

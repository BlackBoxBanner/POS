<script lang="ts">
	import { goto } from '$app/navigation';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	if (data.session) goto('/');
</script>

<div class="flex h-full justify-center items-center flex-col gap-4">
	<slot />
</div>

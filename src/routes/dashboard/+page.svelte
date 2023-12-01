<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
	import { cn } from '@dookdiks/utils';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class={cn('w-full h-full flex justify-center items-center')}>
	<Logo class={cn('opacity-20 aspect-auto')} />
</div>

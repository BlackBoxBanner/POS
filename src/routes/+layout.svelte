<script>
	import '../app.postcss';
	import { autoModeWatcher } from '@skeletonlabs/skeleton';
</script>

<svelte:head
	>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head
>
<div class="bg-slate-800 text-slate-300 h-screen overflow-auto">
	<slot />
</div>

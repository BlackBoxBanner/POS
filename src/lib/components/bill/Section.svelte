<script lang="ts">
	import { cn } from '$lib/utils/cn';

	type Size = 'small' | 'medium';

	export let label: string;
	export let data: unknown;
	export let size: Size = 'small';
</script>

<div class="flex flex-row justify-between">
	<span class={cn(size == 'small' ? 'text-xs' : 'text-xl')}>{label}</span>
	<span class={cn(size == 'small' ? 'text-xs' : 'text-xl')}>{data}</span>
</div>

<script lang="ts">
	import { cn } from '@dookdiks/utils';

	export let borderBottom: boolean = false;
	export let borderTop: boolean = false;
	export let borderLeft: boolean = false;
	export let borderRight: boolean = false;
	export let basis: boolean = false;
	export let paddingY: number = 2;
</script>

<div
	{...$$restProps}
	class={cn(
		'flex w-full justify-center items-center',
		{
			'border-b border-b-timberwolf-base': borderBottom,
			'border-t border-t-timberwolf-base': borderTop,
			'border-l border-l-timberwolf-base': borderLeft,
			'border-r border-r-timberwolf-base': borderRight,
			'basis-1/2': basis
		},
		`py-${paddingY}`,
		$$restProps.class
	)}
>
	<slot />
</div>

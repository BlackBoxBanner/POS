<script lang="ts">
	import type { Tables } from '$lib/types/schema';
	import { cn } from '@dookdiks/utils';
	import Icon from '@iconify/svelte';
	import caretDownFill from '@iconify/icons-bi/caret-down-fill';

	export let empolyee: Tables<'employees'> | null;
</script>

<div
	class={cn(
		'bg-philippine-gray-base p-2 px-4 flex gap-4 text-ivory-base justify-start items-center w-full;'
	)}
>
	<img
		class={cn('w-8 h-8 object-cover bg-cover rounded-full')}
		src={empolyee?.image ? empolyee.image : '/profile.png'}
		alt=""
	/>
	<div class={cn('flex justify-between w-full items-center')}>
		<div class={cn('flex flex-col overflow-clip')}>
			<span>
				{empolyee?.name}
			</span>
			<span class={cn('text-sm font-extralight text-eerie-black-base')}>
				{empolyee?.name}
			</span>
		</div>
		<button class={cn('h-fit p-1 ')}>
			<Icon icon={caretDownFill} />
		</button>
	</div>
</div>

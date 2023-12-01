<script lang="ts">
	import { cn } from '@dookdiks/utils';
	import Icon from '@iconify/svelte';
	import addIcon from '@iconify/icons-ion/add';
	import { getImage } from '$lib/utils/image';

	export let files: FileList;
	export let id: string;
	export let error = '';

	let image: File | null;

	$: image = getImage(files);
</script>

<div class={cn('flex flex-col relative')} {...$$restProps}>
	<input {id} type="file" bind:files accept="image/*" class="hidden" />
	<label
		for={id}
		class={cn(
			'w-24 h-32 flex justify-center items-center',
			'border-raisinblack-base border rounded',
			'cursor-pointer group  overflow-hidden relative',
			error && 'border-error text-error'
		)}
	>
		{#if image}
			<img
				src={URL.createObjectURL(image)}
				alt=""
				class={cn('object-cover h-full w-full absolute top-0 left-0')}
			/>
			<div class={cn('bg-raisinblack-base bg-opacity-30 w-full h-full absolute top-0 left-0')} />
		{/if}
		<div
			class={cn(
				'bg-raisinblack-base bg-opacity-0 group-hover:bg-opacity-20',
				'ease-in-out duration-200',
				'w-full h-full flex justify-center items-center',
				'absolute top-0 left-0'
			)}
		>
			<Icon icon={addIcon} color={image ? '#FFFFF0' : undefined} class={cn('scale-[2]')} />
		</div>
	</label>
	<p class={cn('font-light text-sm text-error h-4')}>
		{#if error}
			{error}
		{/if}
	</p>
</div>

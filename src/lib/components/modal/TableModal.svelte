<script lang="ts">
	import { cn } from '@dookdiks/utils';
	import { createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';
	import closeCircleOutlined from '@iconify/icons-ant-design/close-circle-outlined';

	const dispatch = createEventDispatcher();

	function onToggle() {
		dispatch('toggle');
	}
	export let active: boolean;
</script>

{#if active}
	<section class="absolute top-0 left-0 h-full w-full">
		<button
			on:click={onToggle}
			class="bg-eerie-black-base opacity-80 absolute top-0 left-0 h-full w-full z-40"
		/>
		<div class={cn('absolute h-full top-0 right-0 flex z-50 bg-ivory-base w-[28rem]')}>
			<button class={cn('absolute top-3 right-3 rounded-full')} on:click={onToggle}>
				<Icon icon={closeCircleOutlined} width={50} />
			</button>
			<slot />
		</div>
	</section>
{/if}

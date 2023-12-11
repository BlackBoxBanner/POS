<script lang="ts">
	import { cn } from '@dookdiks/utils';
	import { createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';
	import closeCircleOutlined from '@iconify/icons-ant-design/close-circle-outlined';

	const dispatch = createEventDispatcher();
	export let position: 'left' | 'center' = 'left';
	export let closeSize = 45;

	/**
	 * Toggles the modal.
	 */
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
		<div
			class={cn(
				'absolute flex z-50 bg-ivory-base ',
				{
					'h-full top-0 right-0 w-[28rem]': position == 'left',
					'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[10rem] min-h-[10rem] rounded-lg':
						position == 'center'
				},
				$$restProps.class
			)}
		>
			<button class={cn('absolute top-3 right-3 rounded-full')} on:click={onToggle}>
				<Icon icon={closeCircleOutlined} width={closeSize} />
			</button>
			<slot />
		</div>
	</section>
{/if}

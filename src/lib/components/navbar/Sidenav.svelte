<script lang="ts">
	import { cn } from '@dookdiks/utils';
	import Logo from '../logo.svelte';
	import SidenavBtn from './SidenavBtn.svelte';
	import type { Tables } from '$lib/types/schema';
	import SideNavFooter from './SideNavFooter.svelte';
	import { onMount } from 'svelte';

	export let empolyee: Tables<'employees'> | null;

	$: url = ``;

	type BtnSideBar = {
		to: string;
		label: string;
		icon: string;
	}[];

	const btnSideBar: BtnSideBar = [
		{
			to: 'dashboard/dinein',
			label: 'DINE IN',
			icon: 'bi:people'
		},
		{
			to: 'dashboard/takeaway',
			label: 'TAKE AWAY',
			icon: 'bx:home-smile'
		},
		{
			to: 'dashboard/menu',
			label: 'MENU',
			icon: 'bx:food-menu'
		},
		{
			to: 'dashboard/stock',
			label: 'STOCK',
			icon: 'bi:box-seam'
		},
		{
			to: 'dashboard/bill',
			label: 'BILL HISTORY',
			icon: 'fa:money'
		},
		{
			to: 'dashboard/report',
			label: 'REPORT',
			icon: 'bi:file-bar-graph'
		},
		{
			to: 'dashboard/setting',
			label: 'SETTING',
			icon: 'bi:gear'
		}
	];

	onMount(() => (url = window.location.href));
</script>

<section class={cn('flex relative h-full w-full')}>
	<nav
		class={cn(
			'flex flex-col justify-between bg-eerie-black-base w-64 relative fill-ivory-base overflow-clip'
		)}
	>
		<div class={cn('w-full overflow-clip')}>
			<div class={cn('px-6 border-b border-b-philippine-gray-base text-ivory-base')}>
				<Logo class={cn('fill-ivory-base w-full ')} />
			</div>
			<div class="block h-full overflow-auto">
				{#each btnSideBar as btn}
					<SidenavBtn icon={btn.icon} label={btn.label} to={btn.to} active={url.includes(btn.to)} />
				{/each}
			</div>
		</div>
		<SideNavFooter {empolyee} />
	</nav>
	<slot />
</section>

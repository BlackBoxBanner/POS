<script lang="ts">
	import { cn } from '@dookdiks/utils';
	import Logo from '../logo.svelte';
	import SidenavBtn from './SidenavBtn.svelte';
	import type { Tables } from '$lib/types/schema';
	import SideNavFooter from './SideNavFooter.svelte';
	import { page } from '$app/stores';

	import type { IconifyIcon } from '@iconify/svelte';

	import peopleIcon from '@iconify/icons-bi/people';
	import boxSeam from '@iconify/icons-bi/box-seam';
	import gearIcon from '@iconify/icons-bi/gear';
	import fileBarGraph from '@iconify/icons-bi/file-bar-graph';

	import homeSmile from '@iconify/icons-bx/home-smile';
	import foodMenu from '@iconify/icons-bx/food-menu';

	import moneyIcon from '@iconify/icons-fa/money';

	export let empolyee: Tables<'employees'> | null;

	type BtnSideBar = {
		to: string;
		label: string;
		icon: string | IconifyIcon;
	}[];

	const btnSideBar: BtnSideBar = [
		{
			to: 'dashboard/dinein',
			label: 'DINE IN',
			icon: peopleIcon
		},
		{
			to: 'dashboard/takeaway',
			label: 'TAKE AWAY',
			icon: homeSmile
		},
		{
			to: 'dashboard/menu',
			label: 'MENU',
			icon: foodMenu
		},
		{
			to: 'dashboard/stock',
			label: 'STOCK',
			icon: boxSeam
		},
		{
			to: 'dashboard/bill',
			label: 'BILL HISTORY',
			icon: moneyIcon
		},
		{
			to: 'dashboard/report',
			label: 'REPORT',
			icon: fileBarGraph
		},
		{
			to: 'dashboard/setting',
			label: 'SETTING',
			icon: gearIcon
		}
	];
</script>

<section class={cn('flex relative h-full w-full')}>
	<nav
		class={cn(
			'flex flex-col justify-between bg-eerie-black-base min-w-[14rem] w-64 relative fill-ivory-base overflow-clip'
		)}
	>
		<div class={cn('w-full overflow-clip')}>
			<div class={cn('px-6 border-b border-b-philippine-gray-base text-ivory-base')}>
				<Logo class={cn('fill-ivory-base w-full ')} />
			</div>
			<div class="block h-full overflow-auto">
				{#each btnSideBar as btn}
					<SidenavBtn
						icon={btn.icon}
						label={btn.label}
						to={btn.to}
						active={$page.url.pathname.includes(btn.to)}
					/>
				{/each}
			</div>
		</div>
		<SideNavFooter {empolyee} />
	</nav>
	<div class="overflow-scroll w-full">
		<slot />
	</div>
</section>

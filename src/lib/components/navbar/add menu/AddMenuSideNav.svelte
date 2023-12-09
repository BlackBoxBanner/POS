<script>
	import { page } from '$app/stores';
	import { cn } from '@dookdiks/utils';
	import AddMenuSideNavBtn from './AddMenuSideNavBtn.svelte';

	$: path = $page.url.pathname;
	const route = {
		menu: '/dashboard/menu/add/menu',
		category: '/dashboard/menu/add/category'
	};
</script>

<section class={cn('flex h-full w-full gap-4')}>
	<nav
		class={cn(
			'flex flex-col justify-between bg-ivory-400 min-w-[14rem] w-64 relative fill-ivory-base overflow-clip'
		)}
	>
		<div class={cn('w-full overflow-clip')}>
			<div class="h-full overflow-auto no-scrollbar flex flex-col">
				<AddMenuSideNavBtn label="menu" href="menu" active={path == route.menu} />
				<AddMenuSideNavBtn label="category" href="category" active={path == route.category} />
			</div>
		</div>
	</nav>
	<section class="overflow-auto w-full bg-ivory-400 p-4">
		<slot />
	</section>
</section>

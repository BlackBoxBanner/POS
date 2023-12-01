<script lang="ts">
	import { cn } from '@dookdiks/utils';
</script>

<section
	class={cn('border border-raisinblack-base rounded-lg overflow-clip h-56 w-40  bg-ivory-base')}
>
	<div class={cn('h-[58%] rounded-b-lg bg-raisinblack-base w-full relative overflow-clip')}>
		<slot name="header" />
	</div>
	<div class={cn('p-2 pt-4 px-4 h-[42%] flex flex-col justify-between')}>
		<slot name="body" />
	</div>
</section>

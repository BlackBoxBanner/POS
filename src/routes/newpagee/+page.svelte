<script lang="ts">
    import type { PageData } from './$types';
    import Sidebar from '$lib/components/navbar/sidebar.svelte'


    export let data: PageData;
</script>


<div class="bg-ivory-base font-exo h-full flex justify-center items-center flex-col gap-4">
    <Sidebar/>


</div>
<script lang="ts">
    export let image: string 
    export let name: string
    export let rawprice: number
    $: price = rawprice !== undefined ? `${rawprice} Baht` : '';
</script>



<div 
    class="snap-start w-52 h-72 bg-neutral-300 border aspect-[3/4] rounded-md overflow-hidden flex flex-col flex-grow"
>
    <!-- Display image -->
    <img src={image} alt={name} class="w-52 h-40"/>

    <!-- Display name -->
    <h2 class="font-bold text-3xl leading-9 pl-4 mt-2">{name.replace(/,$/, '')}</h2>

    <!-- Display price -->
    <p class="text-xl pl-4 mt-4">{price}</p>
</div>
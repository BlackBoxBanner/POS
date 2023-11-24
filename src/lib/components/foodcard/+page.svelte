<script lang="ts">
	import Card from "$lib/components/foodcard/template/Card.svelte";
	import type { Tables } from "$lib/types/schema"; 
    //export let data: unknown;
	const menusLists: Tables < "menus" >[] = [{id: "1"
											,image: "https://images-ext-2.discordapp.net/external/x6j1vZ8RNZ-nmJV3KE4iz9UZ4pQfFHNC82Xqpwa3tLU/https/domf5oio6qrcr.cloudfront.net/medialibrary/3440/w0714a16207251033667.jpg?format=webp"
											,name: "Dusty"
											,created_at: new Date(1970).toISOString()
											,price: 3000
											,status: true
											,type: "Birb"
											},
											{id: "1"
											,image: "https://images-ext-2.discordapp.net/external/x6j1vZ8RNZ-nmJV3KE4iz9UZ4pQfFHNC82Xqpwa3tLU/https/domf5oio6qrcr.cloudfront.net/medialibrary/3440/w0714a16207251033667.jpg?format=webp"
											,name: "Dustin"
											,created_at: new Date(1970).toISOString()
											,price: 1500
											,status: true
											,type: "Birb"
											}] 
</script>


<div class="bg-neutral-400 border p-4 overflow-x-auto snap-x snap-proximity scroll-x-4 scroll-pl-4 flex" >
		
		{#each menusLists as data}
		<div class="mx-2">
			<Card 
					image = {data.image},
					name = {data.name},
					rawprice = {data.price}
					
			/>
		</div>	
		{/each}
		
</div>

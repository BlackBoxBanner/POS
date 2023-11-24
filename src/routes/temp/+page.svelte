<script lang="ts">
	import Card from "$lib/components/foodcard/template/Card.svelte";
	import type { Tables } from "$lib/types/schema"; 
    //export let data: unknown;
	const menusLists: Tables < "menus" >[] = [{id: "1"
											,image: "https://lafeber.com/pet-birds/wp-content/uploads/2018/06/Cockatiel-2-300x300.jpg"
											,name: "Dusty"
											,created_at: new Date(1970).toISOString()
											,price: 3000
											,status: true
											,type: "Birb"
											},
											{id: "2"
											,image: "https://petopedia.petscorner.co.uk/wp-content/uploads/cockatiel.jpg"
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

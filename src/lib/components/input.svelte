<script lang="ts">
	export let label = '';
	export let id: string;
	export let value: string;
</script>

<div class="flex flex-col gap-1">
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	<input bind:value class="input w-80 px-4 py-1" {id} {...$$restProps} />
</div>

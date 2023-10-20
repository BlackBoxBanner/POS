<script lang="ts">
	import axios from 'axios';

	const onClick = async () => {
		const { status, statusText } = await axios.post('/api/auth/signout');
		if (status !== 200) throw new Error(statusText);
		location.reload();
	};
</script>

<button
	type="button"
	class="btn variant-filled-primary hover:variant-filled-secondary ease-in-out duration-300"
	on:click={onClick}
>
	sign out
</button>

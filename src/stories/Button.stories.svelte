<script context="module" lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { Meta } from '@storybook/svelte';

	export const meta = {
		title: 'Button/Button',
		component: Button,
		tags: ['autodocs'],
		argTypes: {
			size: {
				description: 'Size of it button. `small`, `medium`, `large`'
			},
			ref: {
				description: 'Reference of button element. Ref type `HTMLButtonElement`'
			}
		}
	} satisfies Meta<Button>;
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Button {...args}>Click</Button>
</Template>

<Story name="Default" />
<Story name="Small" args={{ size: 'small' }} />
<Story name="Medium" args={{ size: 'medium' }} />
<Story name="Large" args={{ size: 'large' }} />

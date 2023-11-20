import Button from '$lib/components/Button.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
	title: 'Button/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		ref: {
			description: 'reference of button `HTMLButtonElement`'
		},
		size: {
			description: 'size of the button `small`, `medium`, `large`'
		},
		label: {
			description: 'Label of input'
		}
	}
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Button'
	}
};

export const Small: Story = {
	args: {
		label: 'Small',
		size: 'small'
	}
};

export const Medium: Story = {
	args: {
		label: 'Medium',
		size: 'medium'
	}
};

export const Large: Story = {
	args: {
		label: 'Large',
		size: 'large'
	}
};

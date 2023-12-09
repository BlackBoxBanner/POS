import Input from '$lib/components/input/skeleton/Input.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
	title: 'Input/Input',
	component: Input,
	tags: ['autodocs'],
	argTypes: {
		value: {
			description: 'Value of input. `string`'
		},
		inputClass: {
			description: 'Class if input HTML tag.'
		},
		error: {
			description: 'Error message if there is one.'
		},
		label: {
			description: 'Label of input'
		}
	}
} satisfies Meta<Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: ''
	}
};

export const Label: Story = {
	args: {
		value: '',
		label: 'Custom label'
	}
};

export const Error: Story = {
	args: {
		value: '',
		error: 'Custom error'
	}
};

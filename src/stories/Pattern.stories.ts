import Pattern from '$lib/components/input/Pattern.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
	title: 'Input/Pattern',
	component: Pattern,
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
		},
		pattern: {
			description: 'pattern for filtering `RegExp`'
		}
	}
} satisfies Meta<Pattern>;

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

export const CustomPattern: Story = {
	args: {
		value: '',
		pattern: {
			pattern: /[^\d.]/g,
			message: 'input not number'
		}
	}
};

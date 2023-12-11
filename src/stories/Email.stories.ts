import Email from '$lib/components/input/skeleton/Email.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
	title: 'Input/Email',
	component: Email,
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
		emailNotValid: {
			description: 'Error display if email is not valid.'
		}
	}
} satisfies Meta<Email>;

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

export const NotValidEmail: Story = {
	args: {
		value: 'This is not email'
	}
};

export const CustomNotValidEmail: Story = {
	args: {
		value: 'This is not email',
		emailNotValid: 'Custom valid email error!!'
	}
};

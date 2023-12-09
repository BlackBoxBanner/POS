import Password from '$lib/components/input/skeleton/Password.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
	title: 'Input/Password',
	component: Password,
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
		passwordRequirements: {
			description: 'Error display if email is not valid.'
		},
		review: {
			description: 'Toggle if review password button display.'
		},
		check: {
			description: 'Check for strong password.'
		}
	}
} satisfies Meta<Password>;

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

export const Check: Story = {
	args: {
		value: 'Not checking for string password',
		check: true
	}
};

export const CustomPasswordNotStrongError: Story = {
	args: {
		value: 'Show custom error',
		passwordRequirements: 'Custom error - weak password',
		check: true
	}
};

export const NoReviewToggle: Story = {
	args: {
		value: '',
		review: false
	}
};

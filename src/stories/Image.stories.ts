import Image from '$lib/components/input/skeleton/Image.svelte';
import { mockFileList } from '$lib/utils/mockImage';
import type { Meta, StoryObj } from '@storybook/svelte';

const fileList = mockFileList([]);

const meta = {
	title: 'Input/Image',
	component: Image,
	tags: ['autodocs'],
	argTypes: {}
} satisfies Meta<Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		files: fileList,
		id: 'image'
	}
};

export const Error: Story = {
	args: {
		files: fileList,
		id: 'image',
		error: 'Custom error.'
	}
};

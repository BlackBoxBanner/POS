import Button from '$lib/components/Button.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';
// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};
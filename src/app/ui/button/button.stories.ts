import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from '@ui/button/button';

const meta: Meta<Button & { content: string }> = {
  title: 'UI/Bouton',
  component: Button,
  argTypes: {
    content: {
      name: 'Contenu',
      control: 'text',
      description: 'Mon Bouton',
    },
  },
};

export default meta;
type Story = StoryObj<Button & { content: string }>;

export const Default: Story = {
  args: {
    content: 'Mon Bouton',
  },
  render: (args) => ({
    props: args,
    template: `<app-button>${args.content}</app-button>`,
  }),
};

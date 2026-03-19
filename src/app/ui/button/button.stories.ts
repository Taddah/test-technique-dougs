import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button';

const meta: Meta<ButtonComponent & { content: string }> = {
  title: 'UI/Bouton',
  component: ButtonComponent,
  argTypes: {
    content: {
      name: 'Contenu',
      control: 'text',
      description: 'Mon Bouton',
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent & { content: string }>;

export const Default: Story = {
  args: {
    content: 'Mon Bouton',
  },
  render: (args) => ({
    props: args,
    template: `<app-button>${args.content}</app-button>`,
  }),
};

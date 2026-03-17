import type { Meta, StoryObj } from '@storybook/angular';
import { Pill } from '@ui/pill/pill';

const meta: Meta<Pill & { content: string }> = {
  title: 'UI/Pill',
  component: Pill,
  argTypes: {
    content: {
      name: 'Contenu',
      control: 'text',
      description: 'Le texte à afficher',
    },
    color: {
      name: 'Couleur',
      control: 'select',
      options: ['blue', 'red', 'yellow'],
    },
  },
};

export default meta;
type Story = StoryObj<Pill & { content: string }>;

export const Default: Story = {
  args: {
    content: 'Opérations diverses',
    color: 'yellow',
  },
  render: (args) => ({
    props: args,
    template: `<app-pill [color]="color">{{content}}</app-pill>`,
  }),
};

import type { Meta, StoryObj } from '@storybook/angular';
import { Subnav } from './subnav';

const meta: Meta<Subnav & { content: string }> = {
  title: 'UI/Subnav',
  component: Subnav,
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
type Story = StoryObj<Subnav & { content: string }>;

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

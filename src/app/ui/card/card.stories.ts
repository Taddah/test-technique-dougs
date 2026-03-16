import type { Meta, StoryObj } from '@storybook/angular';
import { Card } from './card';

const meta: Meta<Card> = {
  title: 'UI/Card',
  component: Card,
  argTypes: {
    title: {
      name: 'Titre',
      control: 'text',
      description: 'Le titre de la carte',
    },
    description: {
      name: 'Description',
      control: 'text',
      description: 'La description de la carte',
    },
    selected: {
      name: 'Sélectionné',
      control: 'boolean',
      description: 'Indique si la carte est sélectionnée',
    },
  },
};

export default meta;
type Story = StoryObj<Card>;

export const Default: Story = {
  args: {
    title: 'Fonds de commerce',
    description:
      "Acquisition d'un fonds de commerce partie incorporelle. Partie non amortissable. ",
    selected: false,
  },
  render: (args) => ({
    props: args,
    template: `<app-card [title]="title" [description]="description" [selected]="selected"></app-card>`,
  }),
};

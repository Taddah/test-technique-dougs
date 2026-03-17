import { type Meta, type StoryObj } from '@storybook/angular';
import { TextInput } from '@ui/form/text-input/text-input';

const meta: Meta<TextInput> = {
  title: 'UI/Form/Text Input',
  component: TextInput,
  argTypes: {
    iconName: { control: 'text' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<TextInput>;

export const Default: Story = {
  args: {
    iconName: 'search',
    placeholder: 'Rechercher une catégorie',
  },
  render: (args) => ({
    props: args,
    template: `<app-text-input [placeholder]="placeholder" [iconName]="iconName"></app-text-input>`,
  }),
};

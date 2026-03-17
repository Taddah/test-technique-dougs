import { JsonPipe } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { type Meta, type StoryObj } from '@storybook/angular';
import { TextInput } from '@ui/form/text-input/text-input';
import { DropdownComponent } from '../dropdown/dropdown';

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
  render: (args) => {
    const form = new FormGroup({
      search: new FormControl({ value: null, disabled: args.disabled }),
    });

    return {
      props: {
        ...args,
        form: form,
      },
      template: `
        <div style="width: 18.75rem;">
          <form [formGroup]="form">
             <app-text-input formControlName="search" [placeholder]="placeholder" [iconName]="iconName"></app-text-input>
          </form>

          <p style="margin-top: 1rem"><strong>Form Value:</strong> {{ form.value | json }}</p>
        </div>
      `,
      moduleMetadata: {
        imports: [ReactiveFormsModule, JsonPipe, DropdownComponent],
      },
    };
  },
};

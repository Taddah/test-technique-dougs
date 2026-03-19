import { type Meta, type StoryObj } from '@storybook/angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Dropdown, DropdownOption } from '@ui/form/dropdown/dropdown';

const meta: Meta<Dropdown<string>> = {
  title: 'UI/Form/Dropdown',
  component: Dropdown,
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<Dropdown<string>>;

const exampleOptions: DropdownOption<string>[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export const Default: Story = {
  args: {
    placeholder: 'Tous les groupes de catégorie',
    options: exampleOptions,
    disabled: false,
  },
  render: (args) => {
    const form = new FormGroup({
      dropdown: new FormControl({ value: null, disabled: args.disabled }),
    });

    return {
      props: {
        ...args,
        form: form,
      },
      template: `
        <div style="width: 18.75rem;">
          <form [formGroup]="form">
            <app-dropdown
              formControlName="dropdown"
              [placeholder]="placeholder"
              [options]="options"
            ></app-dropdown>
          </form>

          <p style="margin-top: 1rem"><strong>Form Value:</strong> {{ form.value | json }}</p>
        </div>
      `,
      moduleMetadata: {
        imports: [ReactiveFormsModule, JsonPipe, Dropdown],
      },
    };
  },
};

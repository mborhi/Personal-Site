import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MenuOptions from '../components/MenuOptions';

export default {
    title: 'Menu Options',
    component: MenuOptions,
} as ComponentMeta<typeof MenuOptions>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof MenuOptions> = (args) => <MenuOptions {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    selector: () => null,
    options: [{ name: "Example Option", value: null }],
    selected: "Example Option",
    comingSoon: true
};
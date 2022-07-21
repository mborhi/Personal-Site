import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Feature from '../components/Feature';

export default {
    title: 'Main Content',
    component: Feature,
} as ComponentMeta<typeof Feature>;

const Template: ComponentStory<typeof Feature> = (args) => <Feature {...args} />;

export const Features = Template.bind({});

Features.args = {
    text: "Example Name",
    icon: "",
    iconBg: "gray.200",
    roundness: "sm",
    desc: "Example description to describe this example"
};
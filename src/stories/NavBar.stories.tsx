import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import NavBar from '../components/NavBar';

export default {
    title: 'NavBar',
    component: NavBar,
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar />;

export const Primary = Template.bind({});
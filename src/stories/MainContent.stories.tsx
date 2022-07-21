import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MainContent from '../components/MainContent';

export default {
    title: 'Main Content',
    component: MainContent,
} as ComponentMeta<typeof MainContent>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof MainContent> = (args) => <MainContent {...args} />;

export const Content = Template.bind({});

Content.args = {
    content: []
};
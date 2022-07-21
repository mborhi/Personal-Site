import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SortDisplay from '../components/SortDisplay';

//👇 This default export determines where your story goes in the story list
export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Sort Display',
    component: SortDisplay,
} as ComponentMeta<typeof SortDisplay>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof SortDisplay> = (args) => <SortDisplay {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    nums: [10, 5, 11, 16, 19, 20, 3, 31, 9]
};
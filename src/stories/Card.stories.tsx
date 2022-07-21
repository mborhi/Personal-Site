import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card from '../components/Card';

//👇 This default export determines where your story goes in the story list
export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'YourComponent',
    component: Card,
} as ComponentMeta<typeof Card>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
    name: "Test Name",
    description: "This is a test name for StoryBook",
    image: "/images/profile.jpeg",
    tech: "React.js, Next.js",
    date: "02-12-2002",
    id: "test-project"
};
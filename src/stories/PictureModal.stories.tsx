import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PictureModal from '../components/PictureModal';

//👇 This default export determines where your story goes in the story list
export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Picture Modal',
    component: PictureModal,
} as ComponentMeta<typeof PictureModal>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof PictureModal> = (args) => <PictureModal {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    title: "Example Title",
    image: "/image/profile.jpeg",
    open: true,
    handleModal: () => null,
};
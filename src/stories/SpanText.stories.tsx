import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SpanText from '../components/SpanText';

export default {
    title: 'Text',
    component: SpanText,
} as ComponentMeta<typeof SpanText>;

const Template: ComponentStory<typeof SpanText> = (args) => <SpanText {...args} />;

export const UnderlineLink = Template.bind({});
export const ItalicText = Template.bind({});

UnderlineLink.args = {
    text: "Example Underline Link Text",
    link: "#",
    decoration: "underline"
};

ItalicText.args = {
    text: "Example Italic Text",
    style: "italic"
}
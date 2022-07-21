import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TableDisplay from '../components/TableDisplay';
import { academicRecord } from '../../academics';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box
} from '@chakra-ui/react'

export default {
    title: 'Table Display',
    component: TableDisplay,
} as ComponentMeta<typeof TableDisplay>;

const Template: ComponentStory<typeof TableDisplay> = (args) => (
    <Accordion defaultIndex={[1]} allowToggle>
        <AccordionItem>
            <AccordionButton>
                <Box flex='1' textAlign='left'>
                    Section 1 title
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
                <TableDisplay {...args} />
            </AccordionPanel>
        </AccordionItem>
    </Accordion>
);

export const AccordianDisplay = Template.bind({});

export const Primary = (args) => <TableDisplay {...args} />

AccordianDisplay.args = {
    title: "Example Entry",
    data: academicRecord[1].data,
    options: [(entry) => true]
};

Primary.args = {
    title: "Example Entry",
    data: academicRecord[1].data,
    options: [(entry) => true]
}
import {
    Stack,
    Flex,
    Text
} from '@chakra-ui/react';

// change this to FeatureInfo
interface FeatureProps {
    text: string;
    iconBg: string;
    icon?: JSX.Element;
    roundness?: string;
    desc?: string;
}

const Feature = ({ text, icon, iconBg, roundness, desc }: FeatureProps) => {

    return (
        <>
            <Stack direction={'row'} align={'center'}>
                <Flex
                    w={8}
                    h={8}
                    align={'center'}
                    justify={'center'}
                    rounded={roundness ? roundness : 'full'}
                    bg={iconBg}>
                    {icon}
                </Flex>
                <Text fontWeight={600}>{text}</Text>
            </Stack>
            <Text fontWeight={500} paddingTop={3}>{desc}</Text>
        </>

    );
};

export default Feature
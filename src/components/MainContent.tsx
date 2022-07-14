import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    useColorModeValue,
    Box
} from '@chakra-ui/react';
import {
    IoAnalyticsSharp,
    IoLogoBitcoin,
    IoSearchSharp,
} from 'react-icons/io5';
import { ReactElement, useState } from 'react';
import PictureModal from './PictureModal';

interface FeatureProps {
    text: string;
    iconBg: string;
    icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
    return (
        <Stack direction={'row'} align={'center'}>
            <Flex
                w={8}
                h={8}
                align={'center'}
                justify={'center'}
                rounded={'full'}
                bg={iconBg}>
                {icon}
            </Flex>
            <Text fontWeight={600}>{text}</Text>
        </Stack>
    );
};

export default function SplitWithImage() {

    const [modalOpen, setModelOpen] = useState(false);

    const handleModal = () => {
        // console.log('clicked')
        setModelOpen(!modalOpen)

    }

    return (
        <Container maxW={'5xl'} py={12} >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Stack spacing={4}>
                    <Text
                        textTransform={'uppercase'}
                        color={'blue.500'}
                        fontWeight={600}
                        fontSize={'sm'}
                        bg={useColorModeValue('blue.100', 'blue.900')}
                        p={2}
                        alignSelf={'flex-start'}
                        rounded={'md'}>
                        About Me
                    </Text>
                    <Heading>Software Engineer</Heading>
                    <Text fontSize={'lg'}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                        nonumy eirmod tempor invidunt ut laboreLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                        nonumy eirmod tempor invidunt ut laboreLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                        nonumy eirmod tempor invidunt ut laboreLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                        nonumy eirmod tempor invidunt ut labore
                    </Text>
                    <Heading as='h2' size='lg'>Skills</Heading>
                    <Stack
                        spacing={4}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                            />
                        }>
                        <Feature
                            icon={
                                <Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                            text={'Business Planning'}
                        />
                        <Feature
                            icon={<Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />}
                            iconBg={useColorModeValue('green.100', 'green.900')}
                            text={'Financial Planning'}
                        />
                        <Feature
                            icon={
                                <Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('purple.100', 'purple.900')}
                            text={'Market Analysis'}
                        />
                    </Stack>
                    <Heading as='h2' size='lg'>Hobbies</Heading>
                    <Stack
                        spacing={4}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                            />
                        }>
                        <Feature
                            icon={
                                <Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                            text={'Business Planning'}
                        />
                        <Feature
                            icon={<Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />}
                            iconBg={useColorModeValue('green.100', 'green.900')}
                            text={'Financial Planning'}
                        />
                        <Feature
                            icon={
                                <Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('purple.100', 'purple.900')}
                            text={'Market Analysis'}
                        />
                    </Stack>
                </Stack>
                <Flex>
                    <Image
                        onClick={() => handleModal()}
                        rounded={'md'}
                        alt={'feature image'}
                        src={
                            'https://coda.newjobs.com/api/imagesproxy/ms/seo-media/us/resume-images/it-developer-experienced.jpg'
                        }
                        objectFit={'cover'}
                    />
                </Flex>
            </SimpleGrid>
            <PictureModal image={<Image
                rounded={'md'}
                alt={'feature image'}
                src={
                    'https://coda.newjobs.com/api/imagesproxy/ms/seo-media/us/resume-images/it-developer-experienced.jpg'
                }
                objectFit={'cover'}
            />} open={modalOpen} handleModal={handleModal} title="Resume" />
        </Container>
    );
}
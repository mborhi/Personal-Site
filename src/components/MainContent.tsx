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
    Box,
    Divider
} from '@chakra-ui/react';
import { IoTennisball } from 'react-icons/io5';
import { SiJava, SiJavascript, SiPython, SiReact, SiNextdotjs } from 'react-icons/si';
import { MdOutlineComputer } from 'react-icons/md'
import { GiWeightLiftingUp, GiHiking } from 'react-icons/gi'
import { ReactElement, useState } from 'react';
import PictureModal from './PictureModal';
import { saveAs } from 'file-saver';


// change this to FeatureInfo
interface FeatureProps {
    text: string;
    iconBg: string;
    icon?: ReactElement;
    roundness?: string;
    desc?: string;
}



// Move to separate file
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
            <Text>{desc}</Text>
        </>

    );
};

interface PictureProps {
    action: () => void
    src?: string
}

/**
 * A React Component displaying an image, with the specified action onClick.
 */
const Picture = ({ action }: PictureProps) => {
    return (
        <Image
            onClick={() => action()}
            rounded={'md'}
            alt={'feature image'}
            src={
                'https://coda.newjobs.com/api/imagesproxy/ms/seo-media/us/resume-images/it-developer-experienced.jpg'
            }
            objectFit={'cover'}
        />
    )
}

/**
 * Content on left with an image display on right.
 * Bootstrapped from ChakraUI Templates.
 */
export default function SplitWithImage() {

    const [modalOpen, setModelOpen] = useState(false);

    const descText = "This is something that I learned. I applied this in this way. Go to my projects section to see\
    the work I did using this skill.";

    const handleModal = () => {
        setModelOpen(!modalOpen)
    }

    const downloadImage = (image: string, name: string) => {
        try {
            let isFileSaverSupported = !!new Blob;
            if (isFileSaverSupported) {
                // download the image
                saveAs('https://coda.newjobs.com/api/imagesproxy/ms/seo-media/us/resume-images/it-developer-experienced.jpg', name);
            }
        } catch (e) {
            console.log('error downloading: ', e);
            // display a toast to user notify of this
        }
    }

    return (
        <Container maxW={'5xl'} py={12} >
            <Box marginBottom={10}>
                <Text fontWeight='thin' fontSize='4xl'>
                    Hello! I'm
                    { } <Text as='span' textDecoration='' fontWeight='light'>Marcell Borhi</Text>
                    , a Computer Science major at Indiana University.
                </Text>
            </Box>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Stack spacing={4}>
                    {/*
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
                    */}
                    <Heading as='h1' fontSize='1.2em' fontWeight='semibold'>ABOUT ME</Heading>
                    <Text fontSize={'lg'}>
                        As a Computer Science major, I am specializing in Artifical Intelligence and graduating in Spring 2025.
                        I began studying at IU in the Fall of 2021, and have only become more driven and passionate since. sed diam
                        nonumy eirmod tempor invidunt ut laboreLorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        nonumy eirmod tempor invidunt ut labore
                    </Text>
                    <Divider color='blueviolet' />
                    <Heading as='h2' fontSize='1.2em' fontWeight='semibold'>SKILLS</Heading>
                    <Stack
                        spacing={4}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                            />
                        }>
                        <Feature
                            icon={
                                <Icon as={SiJavascript} color={'yellow.500'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                            text={'JavaScript / Typescript'}
                            roundness={'sm'}
                            desc={descText}
                        />
                        <Feature
                            icon={<Icon as={SiJava} color={'green.500'} w={5} h={5} />}
                            iconBg={useColorModeValue('green.100', 'green.900')}
                            text={'Java'}
                            desc={descText}
                        />
                        <Feature
                            icon={
                                <Icon as={SiPython} color={'purple.500'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('purple.100', 'purple.900')}
                            text={'Python'}
                            roundness={'md'}
                            desc={descText}
                        />
                        <Feature
                            icon={
                                <Icon as={SiReact} color={'facebook.500'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('facebook.100', 'facebook.900')}
                            text={'React'}
                            desc={descText}
                        />
                        <Feature
                            icon={
                                <Icon as={SiNextdotjs} color={'black.500'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('gray.200', 'gray.700')}
                            text={'Next.js'}
                            desc={descText}
                        />
                        <Feature
                            icon={
                                <Icon as={MdOutlineComputer} color={'black.500'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('gray.200', 'gray.700')}
                            text={'Other Skills'}
                            roundness={'lg'}
                            desc={"For the full list of all my skills please check out the Expereince section below"}
                        />
                    </Stack>
                    <Divider />
                    <Heading as='h2' fontSize='1.2em' fontWeight='semibold'>HOBBIES</Heading>
                    <Stack
                        spacing={4}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                            />
                        }>
                        <Feature
                            icon={<Icon as={IoTennisball} color={'green.500'} w={5} h={5} />}
                            iconBg={useColorModeValue('green.100', 'green.900')}
                            text={'Tennis'}
                            desc={descText}
                        />
                        <Feature
                            icon={
                                <Icon as={GiHiking} color={'yellow.500'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                            text={'Hiking'}
                            roundness={'sm'}
                            desc={descText}
                        />
                        <Feature
                            icon={
                                <Icon as={GiWeightLiftingUp} color={'purple.500'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('purple.100', 'purple.900')}
                            text={'Weight Lifting'}
                            desc={descText}
                        />
                    </Stack>
                </Stack>
                <Flex>
                    <Picture action={handleModal} />
                </Flex>
            </SimpleGrid>
            <PictureModal image={<Picture action={() => null} />} open={modalOpen} handleModal={handleModal} title="Resume" action={downloadImage} />
        </Container>
    );
}
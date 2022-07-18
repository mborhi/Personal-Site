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
    Link,
    Divider
} from '@chakra-ui/react';
import { IoTennisball, IoCodeSlashOutline } from 'react-icons/io5';
// import { SiJava, SiJavascript, SiPython, SiReact, SiNextdotjs, SiTypescript } from 'react-icons/si';
import { MdOutlineComputer } from 'react-icons/md';
import * as SiIcons from 'react-icons/si';
import * as GiIcons from 'react-icons/gi';
import * as IoIcons from 'react-icons/io5';
import * as MdIcons from 'react-icons/md'
import { GiWeightLiftingUp, GiHiking, GiDatabase } from 'react-icons/gi';
import { FiServer } from 'react-icons/fi';
import { ReactElement, useState } from 'react';
import PictureModal from './PictureModal';
import { saveAs } from 'file-saver';
import { FeaturesData } from '../../interfaces';
import { IconType } from 'react-icons/lib';


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
            {/*<Text paddingTop={3}>
                {infos.map((info, i) => (
                    <> {info.icon} {info.name} </>
                ))}
                </Text>*/}
            <Text fontWeight={500} paddingTop={3}>{desc}</Text>
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

interface Props {
    content: FeaturesData[]
}
/**
 * Content on left with an image display on right.
 * Bootstrapped from ChakraUI Templates.
 */
export default function SplitWithImage({ content }: Props) {

    const [modalOpen, setModelOpen] = useState(false);

    const iconTypes = [SiIcons, GiIcons, IoIcons, MdIcons];

    const resIcon = (iconName: string) => {
        let icon;
        iconTypes.forEach((i) => {
            if (i[iconName] !== undefined) icon = i[iconName];
        });
        return icon;
    }

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
                        I began studying at IU in the Fall of 2021, and have only become more driven and passionate since. Read
                        about my skills and hobbies below. And make sure to check out my sorting { }
                        <Link href='/visualizations' textDecoration='underline'>visualizations</Link>
                        , my { }
                        <Link href='academics' textDecoration='underline'>academics</Link> { }
                        and my { }
                        <Link href='projects' textDecoration='underline'>projects</Link>!
                    </Text>
                    {/*<Divider color='blueviolet' /><Heading as='h2' fontSize='1.1em' fontWeight='semibold'>SKILLS</Heading>*/}
                    {content.map((data) => (
                        <Stack
                            spacing={4}
                            divider={
                                <StackDivider
                                    borderColor={useColorModeValue('gray.100', 'gray.700')}
                                />
                            }
                            key={data.title}>
                            <Heading as='h2' fontSize='1.1em' fontWeight='semibold'>{data.title}</Heading>
                            {data.features.map((feature, i) => (

                                <Feature
                                    icon={
                                        <Icon as={resIcon(feature.icon)} color={feature.color} w={5} h={5} />
                                    }
                                    iconBg={useColorModeValue(feature.iconBg[0], feature.iconBg[1])}
                                    text={feature.name}
                                    roundness={feature.roundness}
                                    desc={feature.desc}
                                    key={feature.name}
                                />

                            ))}
                        </Stack>
                    ))}
                    {/*}
                    <Heading as='h2' fontSize='1.1em' fontWeight='semibold'>SKILLS</Heading>
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
                            iconBg={useColorModeValue('yellow.200', 'yellow.900')}
                            text={'JavaScript / Typescript'}
                            roundness={'sm'}
                            desc={descText}
                        />
                        <Feature
                            icon={<Icon as={SiJava} color={'orange.300'} w={5} h={5} />}
                            iconBg={useColorModeValue('gray.100', 'gray.700')}
                            text={'Java'}
                            desc={'I used Java to develop my very simple Ray Tracer, as well as in my courses: Software Systems, Data Structures'}
                        />
                        <Feature
                            icon={
                                <Icon as={SiPython} color={'purple.500'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('purple.100', 'purple.900')}
                            text={'Python'}
                            roundness={'md'}
                            desc={'The first programming language I learned!'}
                        />
                        <Feature
                            icon={
                                <Icon as={MdOutlineComputer} color={'black.400'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('gray.200', 'gray.700')}
                            text={'Web Dev'}
                            roundness={'lg'}
                            desc={"Next.js, React.js, HTML, CSS"}
                        />
                        <Feature
                            icon={
                                <Icon as={FiServer} color={'green.500'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('gray.300', 'gray.700')}
                            text={'Development Tools'}
                            desc={'Git, Kubernetes, Docker, Vercel'}
                            roundness={'md'}
                        />
                        <Feature
                            icon={
                                <Icon as={GiDatabase} color={'black.700'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('gray.200', 'gray.700')}
                            text={'Database'}
                            desc={'MongoDB, Redis, SQLite'}
                            roundness={'xl'}
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
                            desc={'Played competitively until end of high school, now I\'m volunteer instructor, while still hitting for fun'}
                        />
                        <Feature
                            icon={
                                <Icon as={GiHiking} color={'yellow.500'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('yellow.200', 'yellow.900')}
                            text={'Hiking'}
                            roundness={'sm'}
                            desc={'I love hiking with friends and family, but also ejnoy exploring on my own!'}
                        />
                        <Feature
                            icon={
                                <Icon as={GiWeightLiftingUp} color={'purple.500'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('purple.100', 'purple.900')}
                            text={'Weight Lifting'}
                            desc={'I\'m super passtionate about being physically active and healthy. I haven\'t missed a workout in almost 3 years!'}
                            roundness='lg'
                        />
                    </Stack>
                        */}
                </Stack>
                <Flex>
                    <Picture action={handleModal} />
                </Flex>
            </SimpleGrid>
            <PictureModal image={<Picture action={() => null} />} open={modalOpen} handleModal={handleModal} title="Resume" action={downloadImage} />
        </Container>
    );
}
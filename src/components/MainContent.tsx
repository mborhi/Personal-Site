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
} from '@chakra-ui/react';
import * as SiIcons from 'react-icons/si';
import * as GiIcons from 'react-icons/gi';
import * as IoIcons from 'react-icons/io5';
import * as MdIcons from 'react-icons/md';
import * as FiIcons from 'react-icons/fi';
import Feature from './Feature';
import { useState } from 'react';
import PictureModal from './PictureModal';
import { saveAs } from 'file-saver';
import { FeaturesData } from '../../interfaces';
import { IconType } from 'react-icons/lib';

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
            // rounded={'md'}
            alt={'feature image'}
            src={useColorModeValue(
                '/images/PersonalSiteResumeLight.jpeg', // light mode
                '/images/PersonalSiteResumeDark.jpeg' // dark mode
            )
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

    // types of Icons 
    const iconTypes = [SiIcons, GiIcons, IoIcons, MdIcons, FiIcons];

    /**
     * Resolves an icon name to an icon
     * @param {string} iconName the name of the icon
     * @returns {IconType} the Icon
     */
    const resIcon = (iconName: string) => {
        let icon: IconType;
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
                // download the image (light mode resume)
                saveAs('/images/PersonalSiteResumeLight.pdf', name + 'MarcellBorhi');
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
                    <Heading as='h1' fontSize='1.2em' fontWeight='semibold'>ABOUT ME</Heading>
                    <Text fontSize={'lg'}>
                        As a Computer Science major, I am specializing in Artifical Intelligence and graduating in Spring 2025.
                        I began studying at IU in the Fall of 2021, and have only become more driven and passionate since. Read
                        about my skills, hobbies and experience below. And make sure to check out my sorting { }
                        <Link href='/visualizations' textDecoration='underline'>visualizations</Link>
                        , my { }
                        <Link href='academics' textDecoration='underline'>academics</Link> { }
                        and my { }
                        <Link href='projects' textDecoration='underline'>projects</Link>!
                    </Text>
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
                </Stack>
                <Flex>
                    <Picture action={handleModal} />
                </Flex>
            </SimpleGrid>
            <Flex paddingTop={5}>
                <Stack>
                    <Heading as='h1' fontSize='1.2em' fontWeight='semibold'>EXPERIENCE</Heading>
                    <Text fontSize={'lg'}>
                        Through acadmeic work and personal projects, I have gained expereince in building full stack web applications,
                        distributed systems, and simple computer graphics. Playing competitive tennis both individually and on a team
                        has given me great communication, leadership and teamwork skills.
                    </Text>
                </Stack>
            </Flex>
            <PictureModal image={<Picture action={() => null} />} open={modalOpen} handleModal={handleModal} title="Resume" action={downloadImage} />
        </Container>
    );
}
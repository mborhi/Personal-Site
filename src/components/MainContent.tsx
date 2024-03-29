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
import NextImage from 'next/image';
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
import resumePictureLight from '../../public/images/resume/PersonalSiteResumeLight.jpeg';
import resumePictureDark from '../../public/images/resume/PersonalSiteResumeDark.jpeg';

interface PictureProps {
    action: () => void
    src?: string
}

/**
 * A React Component displaying an image, with the specified action onClick.
 */
const Picture = ({ action }: PictureProps) => {
    return (
        <NextImage
            onClick={() => action()}
            // rounded={'md'}
            alt={'feature image'}
            src={useColorModeValue(
                resumePictureLight, // light mode
                resumePictureDark // dark mode
            )
            }
            objectFit={'cover'}
            priority
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
                // download the light mode resume as pdf
                saveAs('/images/resume/PersonalSiteResumeLight.pdf', name + 'MarcellBorhi');
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
                        I'm a Computer Science major specializing in Artificial Intelligence and graduating in Spring 2025.
                        I began studying at IU in the Fall of 2021, and have only become more driven and passionate since. Read
                        about my skills, hobbies, and experience below. Also, make sure to check out my sorting { }
                        <Link href='/visualizations' textDecoration='underline'>visualizations</Link>
                        , my { }
                        <Link href='academics' textDecoration='underline'>academics,</Link> { }
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
                <Flex style={{ cursor: 'pointer' }}>
                    <Picture action={handleModal} />
                </Flex>
            </SimpleGrid>
            <Flex paddingTop={5}>
                <Stack>
                    <Heading as='h1' fontSize='1.2em' fontWeight='semibold'>EXPERIENCE</Heading>
                    <Text fontSize={'lg'}>
                        Through academic work and personal projects, I have gained experience in building full stack web applications,
                        distributed systems, and simple computer graphics. Playing competitive tennis both individually and on a team
                        has given me great communication, leadership and teamwork skills.
                    </Text>
                </Stack>
            </Flex>
            <PictureModal image={<Picture action={() => null} />} open={modalOpen} handleModal={handleModal} title="Resume" action={downloadImage} />
        </Container>
    );
}
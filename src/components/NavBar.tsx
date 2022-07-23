import { ReactNode } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Text,
    useDisclosure,
    useColorModeValue,
    Tooltip,
    Stack,
    VStack,
    Container,
    Divider,
    useColorMode
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FaGithub } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { BsLinkedin } from 'react-icons/bs';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Links = ['academics', 'visualizations', 'projects'];

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={`/${children}`}>
        {children}
    </Link>
);

export default function NavBar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();

    const linkedIn = (
        <Link href="https://www.linkedin.com/in/marcell-borhi/">
            <Tooltip hasArrow label='LinkedIn' bg='gray.300' color='black'>
                <Button>
                    <BsLinkedin size="1.5em" />
                </Button>
            </Tooltip>
        </Link>
    )

    const contactMe = (
        <Link href="https://www.linkedin.com/in/marcell-borhi/">
            <Tooltip hasArrow label='Contact Me' bg='gray.300' color='black'>
                <Button>
                    <FiMail size="1.5em" />
                </Button>
            </Tooltip>
        </Link>
    );

    const gitHub = (
        <Link href="https://github.com/mborhi">
            <Tooltip hasArrow label='GitHub' bg='gray.300' color='black'>
                <Button >
                    <FaGithub size="1.5em" />
                </Button>
            </Tooltip>
        </Link>
    );

    const toggleColor = (
        <Tooltip hasArrow label='Toggle Color' bg='gray.300' color='black'>
            <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon boxSize="1.5em" /> : <SunIcon boxSize="1.5em" />}
            </Button>
        </Tooltip>
    );

    const qlinks = [linkedIn, contactMe, gitHub, toggleColor];

    const quickLinks = (
        <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={3}>
                <Link href="https://www.linkedin.com/in/marcell-borhi/">
                    <Tooltip hasArrow label='LinkedIn' bg='gray.300' color='black'>
                        <Button>
                            <BsLinkedin size="1.5em" />
                        </Button>
                    </Tooltip>
                </Link>
                <Link href="mailto:mborhi@iu.edu">
                    <Tooltip hasArrow label='Contact Me' bg='gray.300' color='black'>
                        <Button>
                            <FiMail size="1.5em" />
                        </Button>
                    </Tooltip>
                </Link>
                <Link href="https://github.com/mborhi">
                    <Tooltip hasArrow label='GitHub' bg='gray.300' color='black'>
                        <Button >
                            <FaGithub size="1.5em" />
                        </Button>
                    </Tooltip>
                </Link>
                <Tooltip hasArrow label='Toggle Color' bg='gray.300' color='black'>
                    <Button onClick={toggleColorMode}>
                        {colorMode === 'light' ? <MoonIcon boxSize="1.5em" /> : <SunIcon boxSize="1.5em" />}
                    </Button>
                </Tooltip>
            </Stack>
        </Flex>
    );

    return (
        <>
            <Box bg={useColorModeValue('gray.50', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>

                        <Box>
                            <Link href='/' style={{ textDecoration: 'none' }}><Text decoration='underline' fontSize='1.25em' fontWeight='semibold'>marcell borhi</Text></Link>
                        </Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Box display={{ base: 'none', md: 'flex' }}>
                        {quickLinks}
                    </Box>
                </Flex>

                {isOpen ? (
                    <>
                        <Box pb={4} display={{ md: 'none' }}>
                            <Stack as={'nav'} spacing={4}>
                                {Links.map((link) => (
                                    <NavLink key={link}>{link}</NavLink>
                                ))}
                            </Stack>
                        </Box>
                        <Box display={{ md: 'none' }}>
                            <Divider />
                            <Container centerContent>
                                <HStack spacing={1} align=''>
                                    {qlinks.map((q, i) => (
                                        <Box key={i}>
                                            {q}
                                        </Box>
                                    ))}
                                </HStack>
                            </Container>
                            <Divider />
                        </Box>
                    </>
                ) : null}
            </Box>
        </>
    );
}
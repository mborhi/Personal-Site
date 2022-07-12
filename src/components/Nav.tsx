import { ReactNode } from 'react';
import {
    Box,
    Flex,
    Link,
    Button,
    useColorModeValue,
    Stack,
    useColorMode,
    Text,
    Container,
    Tooltip
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { TbSend } from 'react-icons/tb';
import { FaGithub } from 'react-icons/fa'

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);

const NavUnused = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'black')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                        <Link href="/">
                            <Text fontSize="3xl" fontWeight="bold">Marcell Borhi</Text>
                        </Link>
                    </Box>
                    <Box>
                        <Link href="/academics">
                            <Text fontSize="3xl">Academics</Text>
                        </Link>
                    </Box>
                    <Box>
                        <Link href="/visualizations">
                            <Text fontSize="3xl">Visualizations</Text>
                        </Link>
                    </Box>
                    <Box>
                        <Link href="/projects">
                            <Text fontSize="3xl">Projects</Text>
                        </Link>
                    </Box>
                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Link href="#">
                                <Tooltip hasArrow label='Contact Me' bg='gray.300' color='black'>
                                    <Button>
                                        <TbSend size="2em" />
                                    </Button>
                                </Tooltip>
                            </Link>
                            <Link href="https://github.com/mborhi">
                                <Tooltip hasArrow label='GitHub' bg='gray.300' color='black'>
                                    <Button size="lg" >
                                        <FaGithub size="2em" />
                                    </Button>
                                </Tooltip>
                            </Link>
                            <Button onClick={toggleColorMode} size="lg">
                                {colorMode === 'light' ? <MoonIcon boxSize="2em" /> : <SunIcon boxSize="2em" />}
                            </Button>
                        </Stack>
                    </Flex>
                </Flex>
            </Box >
        </>
    );
}

export default NavUnused;
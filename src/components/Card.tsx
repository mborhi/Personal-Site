import Image from 'next/image';
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    HStack,
    Tag,
    TagLabel,
    useColorModeValue,
    Link,
} from '@chakra-ui/react';

export default function blogPostWithImage({ name, description, image, tech, date, id }) {
    console.log(tech);
    const technologies = tech.split(',');

    const TagDisplay = ({ items }) => {
        console.log(items);
        return (
            <HStack spacing={2}>
                {items.map((item) => (
                    <Tag
                        size={'md'}
                        key={item}
                        borderRadius='full'
                        variant='solid'
                        colorScheme='facebook'
                    >
                        <TagLabel>{item}</TagLabel>
                    </Tag>
                ))};
            </HStack>
        );
    }

    return (
        <Center py={6}>
            <Box
                maxW={'445px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}>
                <Box
                    h={'210px'}
                    bg={'gray.100'}
                    mt={-6}
                    mx={-6}
                    mb={6}
                    pos={'relative'}>
                    <Image
                        src={image}
                        layout={'fill'}
                    />
                </Box>
                <Stack>
                    <TagDisplay items={technologies} />
                    {/*
                    <Text
                        color={'green.500'}
                        textTransform={'uppercase'}
                        fontWeight={800}
                        fontSize={'sm'}
                        letterSpacing={1.1}>
                        Java
                    </Text>
                    */}
                    <Heading
                        color={useColorModeValue('gray.700', 'white')}
                        fontSize={'2xl'}
                        fontFamily={'body'}>
                        <Link href={`/projects/${id}`}>
                            {name}
                        </Link>
                    </Heading>
                    <Text>{date}</Text>
                    <Text color={'gray.500'}>
                        {description}
                    </Text>
                </Stack>
                {/*
                <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                    <Avatar
                        src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
                        alt={'Author'}
                    />
                    <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                        <Text fontWeight={600}>Achim Rolle</Text>
                        <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
                    </Stack>
                </Stack>
                */}
            </Box>
        </Center>
    );
}
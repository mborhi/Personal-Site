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

interface Props {
    name: string,
    description: string,
    image: string,
    tech: string,
    date: string,
    id: string
}

export default function Card({ name, description, image, tech, date, id }: Props) {
    const technologies = tech.split(',');

    const TagDisplay = ({ items }) => {
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
                    <Link href={`/projects/${id}`}>
                        <Image
                            src={image}
                            alt="project image"
                            layout={'fill'}
                        />
                    </Link>
                </Box>
                <Stack>
                    <TagDisplay items={technologies} />
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
            </Box>
        </Center>
    );
}
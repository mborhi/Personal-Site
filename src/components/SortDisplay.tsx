import { Container, Box, } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";

interface Props {
    nums: number[]
}

const SortDisplay = ({ nums }: Props) => {

    return (

        <Box
            rounded={"sm"}
            display="grid"
            gridAutoFlow={"column"}
            gridAutoColumns={"auto"}
            bg={useColorModeValue('gray.50', 'gray.900')}
            minH={"full"}
            overflow={"auto"}
            flex="1"
        >
            {nums.map((num, i) => {
                return (
                    <Box
                        display={"flex"}
                        justifyContent="flex-end"
                        textAlign="center"
                        flexDirection="column"
                        key={i}
                    >
                        <Box
                            roundedTop={"xs"}
                            border={"1px"}
                            borderColor={"facebook.600"}
                            bg={"facebook.500"}
                            height={`${num}px`}
                        ></Box>
                    </Box>
                );
            })}
        </Box>

    )
}

export default SortDisplay;
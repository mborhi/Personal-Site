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
            bg={useColorModeValue('gray.100', 'gray.900')}
            minH={"full"}
            overflow={"auto"}
            flex="1"
        >
            {nums.map((num) => {
                return (
                    <Box
                        display={"flex"}
                        justifyContent="flex-end"
                        textAlign="center"
                        flexDirection="column"
                    >
                        <Box
                            roundedTop={"xs"}
                            border={"1px"}
                            borderColor={"facebook.600"}
                            bg={"facebook.500"}
                            style={{ height: `${num}px` }}
                        ></Box>
                    </Box>
                );
            })}
        </Box>

    )
}

export default SortDisplay;
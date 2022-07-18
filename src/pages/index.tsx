import Footer from '../components/Footer'
import MainContent from '../components/MainContent';
import NavBar from '../components/NavBar';
import { Box, Container, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';


const Index = () => (
  <>
    <NavBar />
    <Box bg={useColorModeValue('gray.50', 'gray.900')} paddingTop={5}>
      <Container>
        <Text fontWeight='light' fontSize='4xl'>
          Hello! I'm
          { } <Text as='span' textDecoration='' fontWeight='medium' color='blue.400'>Marcell Borhi</Text>
          , a Computer Science major at Indiana University.
        </Text>
      </Container>
      <MainContent />
      <Footer />
    </Box>
  </>
)

export default Index

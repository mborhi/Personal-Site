import Footer from '../components/Footer'
import MainContent from '../components/MainContent';
import NavBar from '../components/NavBar';
import { Box, Container } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';


const Index = () => (
  <>
    <NavBar />
    <Box bg={useColorModeValue('gray.100', 'gray.900')}>
      <MainContent />
      <Footer />
    </Box>
  </>
)

export default Index

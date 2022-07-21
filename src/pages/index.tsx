import Footer from '../components/Footer'
import MainContent from '../components/MainContent';
import NavBar from '../components/NavBar';
import { Box, Container, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import { loadFeaturesFromFile } from '../../utils/features';
import Header from '../components/Header';

export const getStaticProps = async () => {
  const features = loadFeaturesFromFile("features.txt");
  return {
    props: {
      content: features
    }
  }
}

const Index = ({ content }) => {
  return (
    <>
      <Header title='Home' />
      <NavBar />
      <Box bg={useColorModeValue('gray.50', 'gray.900')} paddingTop={5}>
        <Container>
          <Text fontWeight='light' fontSize='4xl'>
            Hello! I'm
            { } <Text as='span' textDecoration='' fontWeight='medium' color='blue.400'>Marcell Borhi</Text>
            , a Computer Science major at Indiana University.
          </Text>
        </Container>
        <MainContent content={content} />
        <Footer />
      </Box>
    </>
  )
}

export default Index

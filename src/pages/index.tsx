import { Container } from '../components/Container'
import Footer from '../components/Footer'
import Nav from '../components/Nav';
import MainContent from '../components/MainContent';
import NavBar from '../components/NavBar';


const Index = () => (
  <>
    <NavBar />
    <Container>
      <MainContent />
      <Footer />
    </Container>
  </>
)

export default Index

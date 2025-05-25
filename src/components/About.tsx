import styled from 'styled-components';
import { motion } from 'framer-motion';
import aboutPic from '../assets/aboutPic.jpeg';

const AboutSection = styled.section`
  padding: 5rem 2rem;
  background-color: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Content = styled(motion.div)`
  h2 {
    font-size: 2.5rem;
    color: #1a1a2e;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #4a4a4a;
  }
`;

const ImageContainer = styled(motion.div)`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  
  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const About = () => {
  return (
    <AboutSection id="about">
      <Container>
        <Content
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2>About Me</h2>
          <p>
            I've built clean, pixel-perfect UIs and tackled full-stack challenges—whether it's
            integrating REST APIs, spinning up servers, or diving into DevOps pipelines. I also
            founded an AR/VR services startup to bridge immersive tech with real-world needs,
            which taught me adaptability and end-to-end project ownership.
          </p>
        </Content>
        <ImageContainer
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <img src={aboutPic} alt="Tharun Paruchuru" />
        </ImageContainer>
      </Container>
    </AboutSection>
  );
};

export default About; 
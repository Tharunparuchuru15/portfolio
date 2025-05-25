import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;
  color: #e0e0e0;
`;

const DownloadButton = styled(motion.a)`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  background-color: #00b4d8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;

  &:hover {
    background-color: #0096c7;
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Hi, I'm Tharun—Front-end Developer turned Full-Stack enthusiast.
      </Title>
      <Subtitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        With 2.2 years of experience in React/JavaScript and Node.js, I'm passionate about
        building scalable applications and eager to expand my expertise in DevOps and backend technologies.
      </Subtitle>
      <DownloadButton
        href="/resume.pdf"
        download="Tharun_Paruchuru_Resume.pdf"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Download Resume
      </DownloadButton>
    </HeroSection>
  );
};

export default Hero; 
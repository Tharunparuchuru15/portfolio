import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContactSection = styled.section`
  padding: 5rem 2rem;
  background-color: #1a1a2e;
  color: white;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
`;

const ContactText = styled(motion.div)`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
  font-size: 1.1rem;
`;

const ContactLink = styled(motion.a)`
  color: #00b4d8;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #0096c7;
    text-decoration: underline;
  }
`;

const Emoji = styled.span`
  font-size: 1.5rem;
  margin: 0 0.5rem;
`;

const Contact = () => {
  return (
    <ContactSection id="contact">
      <Container>
        <Title>Get in Touch</Title>
        <ContactText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Impressed !!!
        </ContactText>
        <ContactInfo
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div>Ph.No: 09490937701</div>
          <div>Mail: tharunparuchuru15@gmail.com</div>
          <div>
            LinkedIn:{' '}
            <ContactLink
              href="https://www.linkedin.com/in/tharun-paruchuru-0a9001159/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
            >
              @tharun-paruchuru
            </ContactLink>
          </div>
        </ContactInfo>
        <ContactText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Not impressed <Emoji>😢</Emoji>
        </ContactText>
        <ContactText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          No worries, I will be better. But anyways I can take the help of AI and do the job you need. 
          Feel free to save my details for future purpose.
        </ContactText>
      </Container>
    </ContactSection>
  );
};

export default Contact; 
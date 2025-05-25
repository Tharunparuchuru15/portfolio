import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaGitAlt } from 'react-icons/fa';
import { SiJavascript, SiTailwindcss } from 'react-icons/si';

const SkillsSection = styled.section`
  padding: 5rem 2rem;
  background-color: #1a1a2e;
  color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const SkillCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  svg {
    font-size: 3rem;
    color: #00b4d8;
  }

  span {
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

const skills = [
  { icon: <FaReact />, name: 'React' },
  { icon: <SiJavascript />, name: 'JavaScript' },
  { icon: <FaNodeJs />, name: 'Node.js' },
  { icon: <SiTailwindcss />, name: 'Tailwind CSS' },
  { icon: <FaGitAlt />, name: 'Git' },
];

const Skills = () => {
  return (
    <SkillsSection id="skills">
      <Container>
        <Title>Skills</Title>
        <SkillsGrid>
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              {skill.icon}
              <span>{skill.name}</span>
            </SkillCard>
          ))}
        </SkillsGrid>
      </Container>
    </SkillsSection>
  );
};

export default Skills; 
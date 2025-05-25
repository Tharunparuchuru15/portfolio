import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import SudokuSolver from './SudokuSolver';
import SpinTheWheel from './SpinTheWheel';

const ProjectsSection = styled.section`
  padding: 5rem 2rem;
  background-color: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  color: #1a1a2e;
  margin-bottom: 3rem;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled(motion.div)`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 1.2rem;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;

  h3 {
    font-size: 1.5rem;
    color: #1a1a2e;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    margin-bottom: 1rem;
  }
`;

const ProjectLink = styled(motion.button)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #00b4d8;
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0096c7;
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
`;

const projects = [
  {
    title: 'Sudoku Solver',
    description: 'Interactive Sudoku solver with real-time puzzle generation',
    id: 'sudoku',
  },
  {
    title: 'Spin-the-Wheel Game',
    description: 'Simple and fun spin-the-wheel game!',
    id: 'wheel',
  },
  {
    title: 'Tic-Tac-Toe',
    description: 'Coming soon!',
    id: 'tictactoe',
  },
  {
    title: 'Snake Game',
    description: 'Coming soon!',
    id: 'snake',
  },
  {
    title: 'Memory Matching',
    description: 'Coming soon!',
    id: 'memory',
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const renderProjectDemo = () => {
    switch (selectedProject) {
      case 'sudoku':
        return <SudokuSolver />;
      case 'wheel':
        return <SpinTheWheel />;
      default:
        return null;
    }
  };

  return (
    <ProjectsSection id="projects">
      <Container>
        <Title>Featured Projects</Title>
        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectImage>Project Preview</ProjectImage>
              <ProjectContent>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ProjectLink
                  onClick={() => setSelectedProject(project.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {project.id === 'sudoku' || project.id === 'wheel' ? 'View Demo' : 'Coming Soon'}
                </ProjectLink>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>

      <AnimatePresence>
        {selectedProject && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CloseButton onClick={() => setSelectedProject(null)}>×</CloseButton>
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {renderProjectDemo()}
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </ProjectsSection>
  );
};

export default Projects; 
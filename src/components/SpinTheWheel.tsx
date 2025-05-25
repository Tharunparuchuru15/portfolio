import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const prizes = [
  '🎉 Prize 1',
  '🎁 Prize 2',
  '🍀 Prize 3',
  '⭐ Prize 4',
  '🎊 Prize 5',
  '💎 Prize 6',
  '🍕 Prize 7',
  '🎮 Prize 8',
];

const WheelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
`;

const Wheel = styled(motion.div)`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 8px solid #00b4d8;
  background: conic-gradient(
    #f9d923 0% 12.5%,
    #00b4d8 12.5% 25%,
    #f3722c 25% 37.5%,
    #43aa8b 37.5% 50%,
    #f94144 50% 62.5%,
    #577590 62.5% 75%,
    #f8961e 75% 87.5%,
    #277da1 87.5% 100%
  );
  position: relative;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
`;

const SegmentLabel = styled.div<{ angle: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: ${({ angle }) => `rotate(${angle}deg) translate(120px) rotate(-${angle}deg)`};
  transform-origin: center left;
  font-size: 1rem;
  font-weight: 600;
  color: #222;
  white-space: nowrap;
`;

const SpinButton = styled.button`
  margin-top: 2rem;
  padding: 0.75rem 2rem;
  font-size: 1.2rem;
  background: #00b4d8;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  transition: background 0.2s;
  &:hover {
    background: #0096c7;
  }
`;

const Result = styled.div`
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
`;

const Pointer = styled.div`
  width: 0;
  height: 0;
  border-left: 18px solid transparent;
  border-right: 18px solid transparent;
  border-bottom: 30px solid #f94144;
  position: absolute;
  left: 50%;
  top: -36px;
  transform: translateX(-50%);
  z-index: 2;
`;

const SpinTheWheel: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const lastPrizeIndex = useRef<number | null>(null);

  const spin = () => {
    if (spinning) return;
    setResult(null);
    setSpinning(true);
    // Pick a random prize index, not the same as last
    let prizeIndex: number;
    do {
      prizeIndex = Math.floor(Math.random() * prizes.length);
    } while (prizes.length > 1 && prizeIndex === lastPrizeIndex.current);
    lastPrizeIndex.current = prizeIndex;
    // Each segment is 360 / prizes.length degrees
    const segmentAngle = 360 / prizes.length;
    // Spin at least 5 full turns + land on the prize
    const targetRotation = 360 * 5 + (360 - prizeIndex * segmentAngle - segmentAngle / 2);
    setRotation(targetRotation);
    setTimeout(() => {
      setSpinning(false);
      setResult(prizes[prizeIndex]);
    }, 3500);
  };

  return (
    <WheelContainer>
      <div style={{ position: 'relative', width: 300, height: 300 }}>
        <Pointer />
        <Wheel
          animate={{ rotate: rotation }}
          transition={{ duration: 3, ease: [0.17, 0.67, 0.83, 0.67] }}
          style={{ position: 'absolute', left: 0, top: 0 }}
        >
          {prizes.map((label, i) => (
            <SegmentLabel
              key={label}
              angle={i * (360 / prizes.length)}
            >
              {label}
            </SegmentLabel>
          ))}
        </Wheel>
      </div>
      <SpinButton onClick={spin} disabled={spinning}>
        {spinning ? 'Spinning...' : 'Spin'}
      </SpinButton>
      {result && <Result>Result: {result}</Result>}
    </WheelContainer>
  );
};

export default SpinTheWheel; 
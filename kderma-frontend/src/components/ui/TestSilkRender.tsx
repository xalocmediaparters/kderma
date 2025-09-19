import React from 'react';
import Silk from '../components/Silk';

const TestSilkRender: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#222' }}>
      <Silk speed={3} scale={2} color="#662483" noiseIntensity={0.8} rotation={0.1} />
    </div>
  );
};

export default TestSilkRender;

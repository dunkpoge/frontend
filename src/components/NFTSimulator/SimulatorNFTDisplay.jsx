// src/components/NFTSimulator/SimulatorNFTDisplay.jsx
import React from 'react';

export const SimulatorNFTDisplay = ({ svg, size = 256 }) => {
  return (
    <div style={{ width: size, height: size }}>
      <div dangerouslySetInnerHTML={{ __html: svg }} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default SimulatorNFTDisplay;
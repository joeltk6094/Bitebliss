import React, { useEffect } from 'react';
import { Application } from '@splinetool/runtime';

const Spline = () => {
  useEffect(() => {
    const canvas = document.getElementById('canvas3d');
    const app = new Application(canvas);

    app.load('https://prod.spline.design/RiFokgYzs2JExSv0/scene.splinecode');
    

    return () => {
        
      if (app && typeof app.destroy === 'function') {
        app.destroy();
      }
    };
  }, []); 
  return (
    
    <div>
      <canvas id="canvas3d"></canvas>
    </div>
  );
};

export default Spline;

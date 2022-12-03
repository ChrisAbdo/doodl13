'use client';

import { useState, createRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { ChromePicker } from 'react-color';

const Draw = () => {
  // State for the color, dimensions, and brush and lazy radii
  const [color, setColor] = useState('black');
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const [brushRadius, setBrushRadius] = useState(3);
  const [lazyRadius, setLazyRadius] = useState(0);

  // Ref for the CanvasDraw component
  const saveableCanvas = createRef();

  return (
    <div>
      {/* place them all in one row */}
      <div className="flex justify-between px-20">
        <button
          onClick={() => {
            saveableCanvas.current.eraseAll();
          }}
          className="btn gap-2"
        >
          Erase
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>

        <button
          onClick={() => {
            saveableCanvas.current.undo();
          }}
          className="btn gap-2"
        >
          Undo
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </button>

        <input
          type="number"
          value={brushRadius}
          onChange={(e) => setBrushRadius(parseInt(e.target.value, 10))}
        />

        <input
          type="number"
          value={lazyRadius}
          onChange={(e) => setLazyRadius(parseInt(e.target.value, 10))}
        />
        {/* Add the ChromePicker component here */}
        <ChromePicker
          color={color}
          onChange={(newColor) => setColor(newColor.hex)}
        />
      </div>

      <div className="flex justify-center">
        <CanvasDraw
          ref={saveableCanvas}
          brushColor={color}
          brushRadius={brushRadius}
          lazyRadius={lazyRadius}
          canvasWidth={width}
          canvasHeight={height}
          // chnange the dot color
          catenaryColor={color}
          className="border-2 border-black"
        />
      </div>
    </div>
  );
};

export default Draw;

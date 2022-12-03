'use client';

import { useState, createRef, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { ChromePicker } from 'react-color';
import toast, { Toaster } from 'react-hot-toast';

import Marketplace from '../../backend/build/contracts/Marketplace.json';
import NFT from '../../backend/build/contracts/NFT.json';
import { create } from 'ipfs-http-client';

const Draw = () => {
  // State for the color, dimensions, and brush and lazy radii
  const [color, setColor] = useState('black');
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const [brushRadius, setBrushRadius] = useState(3);
  const [lazyRadius, setLazyRadius] = useState(0);

  //   State and authorization for IPFS client

  const projectId = '2FdliMGfWHQCzVYTtFlGQsknZvb';
  const projectSecret = '2274a79139ff6fdb2f016d12f713dca1';
  const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });
  const IPFSGateway = 'https://ipfs.io/ipfs/';

  const [account, setAccount] = useState();
  const [nfts, setNfts] = useState([]);

  // State for the timer
  const [timer, setTimer] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(true);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [fileUrl, setFileUrl] = useState(null);

  // Ref for the CanvasDraw component
  const saveableCanvas = createRef();

  return (
    <div>
      <div className="flex items-center justify-center ">
        <div className=" rounded overflow-hidden shadow-lg border border-primary">
          <div className="px-6 py-4 text-center">
            <h1 className=" text-xl mb-2 ">Prompt:</h1>
            <h1 className="font-bold text-xl mb-6">ROBOTIC CHIPMUNK</h1>
            <h1 className=" text-xl mb-2">Time Remaining:</h1>
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
              <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                  <span style={{ '--value': 15 }}></span>
                </span>
                days
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                  <span style={{ '--value': 10 }}></span>
                </span>
                hours
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                  <span style={{ '--value': 24 }}></span>
                </span>
                min
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                  <span style={{ '--value': 47 }}></span>
                </span>
                sec
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between px-20 mt-20 items-center">
        <button
          onClick={() => {
            toast.success('Cleared!', {
              style: {
                borderRadius: '2px',
                border: '2px solid #000',
              },
            });
            saveableCanvas.current.eraseAll();
          }}
          className="btn btn-outline gap-2"
        >
          Erase
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>

        <button
          onClick={() => {
            toast.success('Undone!', {
              style: {
                borderRadius: '2px',
                border: '2px solid #000',
              },
            });
            saveableCanvas.current.undo();
          }}
          className="btn gap-2"
        >
          Undo
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </button>

        <label>
          brush size&nbsp;
          <input
            type="number"
            min="0"
            max="100"
            value={brushRadius}
            className="input input-bordered w-20"
            onChange={(e) => setBrushRadius(parseInt(e.target.value, 10))}
          />
        </label>

        <label>
          lazy radius&nbsp;
          <input
            type="number"
            value={lazyRadius}
            className="input input-bordered w-20"
            onChange={(e) => setLazyRadius(parseInt(e.target.value, 10))}
          />
        </label>
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

      <div className="flex justify-center mt-10 text-center">
        <a
          href="#_"
          className="relative inline-block px-4 py-2 font-medium group w-1/2"
        >
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#3ace3a] border-2 border-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#3ace3a]"></span>
          <span className="relative text-black group-hover:text-primary ">
            Submit doodl!
          </span>
        </a>
      </div>

      <Toaster />
    </div>
  );
};

export default Draw;

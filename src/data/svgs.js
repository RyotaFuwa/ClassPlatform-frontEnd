import React from 'react';

export const WaveDown = ({color}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 1 1440 320">
    <path fill={color} strokeWidth={0} fillOpacity="1" d="M0,96L120,80C240,64,480,32,720,42.7C960,53,1200,107,1320,133.3L1440,160L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z" />
  </svg>
)

export const LinearLeftUp = ({color}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220">
    <path fill={color} strokeWidth={0} fillOpacity="1" d="M0,96L1440,224L1440,0L0,0Z" />
  </svg>
)

export const LinearRightDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path fill="royalblue" strokeWidth={0} fillOpacity="1" d="M0,128L1440,32L1440,320L0,320Z"/>
  </svg>
)
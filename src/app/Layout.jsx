// src/app/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
// We will create the AudioPlayer in a future step.
// import AudioPlayer from '../components/AudioPlayer';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="page-content">
        <Outlet /> {/* This renders the active page */}
      </main>
      {/* <AudioPlayer /> */}
    </>
  );
};

export default Layout;
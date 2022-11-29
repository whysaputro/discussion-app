import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../../pages/Home';
import Leaderboard from '../../pages/Leaderboard';
import Thread from '../../pages/Thread';
import Register from '../../pages/Register';

export default function Router() {
  const {
    authUser,
  } = useSelector((states) => states);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/threads/:id" element={<Thread />} />
      {!authUser && <Route path="/register" element={<Register />} />}
    </Routes>
  );
}

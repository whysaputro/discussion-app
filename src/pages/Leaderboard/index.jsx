import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboards } from '../../states/leaderboards/action';

export default function Leaderboard() {
  const {
    leaderboards = [],
    authUser,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(asyncReceiveLeaderboards());
    },
    [dispatch],
  );

  return (
    <section>
      {/* Leaderboard */}
      <div>
        <h1 className="font-bold text-3xl text-center mt-8">Leaderboard</h1>
        {/* Leaderboard list */}
        <div className="max-w-2xl mx-auto mt-20">
          {/* Leaderboard item */}
          {
            leaderboards.map(
              (leaderboard) => (
                <div key={leaderboard.user.id} className="flex justify-between items-center my-8">
                  {/* Profile */}
                  <div className="flex items-center gap-3">
                    <img src={leaderboard.user.avatar} alt={leaderboard.user.avatar} className="rounded-full w-30" />
                    <p className="font-semibold text-xl">
                      {leaderboard.user.name}
                    </p>
                    {authUser && leaderboard.user.id === authUser.id && <span className="italic">(ANDA)</span>}
                  </div>
                  {/* Score */}
                  <h1 className="text-2xl">{leaderboard.score}</h1>
                </div>
              ),
            )
          }
        </div>
      </div>
    </section>
  );
}

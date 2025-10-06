import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react';
import itemsData from '../data/items.json';
import { storage } from '../utils/storage';

const VoteContext = createContext(null);
const STORAGE_KEYS = {
  userResults: '@coffee_vote_user_results',
  userName: '@coffee_vote_user_name',
};

function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function VoteProvider({ children }) {
  const [screen, setScreen] = useState('welcome'); 
  const [userName, setUserName] = useState('');


  const [allItems] = useState(() => itemsData);
  const [currentRound, setCurrentRound] = useState([]); 
  const [nextRound, setNextRound] = useState([]);
  const [roundIndex, setRoundIndex] = useState(1); 
  const [pairIndex, setPairIndex] = useState(0); 
  const [winsMap, setWinsMap] = useState({}); 
  const [finalWinner, setFinalWinner] = useState(null); 
  const [finalRanking, setFinalRanking] = useState([]); 

  const [userResults, setUserResults] = useState({});

 
  useEffect(() => {
    (async () => {
      try {
        const raw = await storage.getItem(STORAGE_KEYS.userResults);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === 'object') {
            setUserResults(parsed);
          }
        }
        const savedName = await storage.getItem(STORAGE_KEYS.userName);
        if (savedName) setUserName(savedName);
      } catch (e) {

      }
    })();
  }, []);


  useEffect(() => {
    (async () => {
      try {
        await storage.setItem(STORAGE_KEYS.userResults, JSON.stringify(userResults));
        await storage.setItem(STORAGE_KEYS.userName, userName || '');
      } catch (e) {
        
      }
    })();
  }, [userResults, userName]);

  const startTournament = useCallback(() => {
    const shuffled = shuffle(allItems);
   
    const initWins = {};
    shuffled.forEach((it) => (initWins[it.id] = 0));

    
    setCurrentRound(shuffled);
    setNextRound([]);
    setPairIndex(0);
    setRoundIndex(1);
    setWinsMap(initWins);
    setFinalWinner(null);
    setFinalRanking([]);
    setScreen('vote');
  }, [allItems]);

  const getCurrentPair = useCallback(() => {
    if (!currentRound || currentRound.length === 0) return [null, null];
    const a = currentRound[pairIndex] || null;
    const b = currentRound[pairIndex + 1] || null;
    return [a, b];
  }, [currentRound, pairIndex]);

  const progress = useMemo(() => {
    const totalPairsThisRound = Math.ceil(currentRound.length / 2);
    const playedPairs = Math.min(
      Math.floor(pairIndex / 2),
      Math.max(0, totalPairsThisRound - 1)
    );
    return {
      round: roundIndex,
      totalPairs: totalPairsThisRound,
      playedPairs,
    };
  }, [currentRound.length, pairIndex, roundIndex]);

  const chooseWinner = useCallback(
    (winner) => {
      if (!winner) return;

     
      setWinsMap((prev) => ({ ...prev, [winner.id]: (prev[winner.id] || 0) + 1 }));

      const oldPairIndex = pairIndex;
      const totalInRound = currentRound.length;

      setNextRound((prevNext) => {
        const updatedNext = [...prevNext, winner];

        
        setPairIndex(oldPairIndex + 2);

        const finishedRound = oldPairIndex + 2 >= totalInRound;

        if (finishedRound) {
          if (updatedNext.length === 1) {
            setFinalWinner(updatedNext[0]);
            setScreen('results');
          } else {
            setCurrentRound(updatedNext);
            setNextRound([]);
            setPairIndex(0);
            setRoundIndex((r) => r + 1);
          }
        }

        return updatedNext;
      });
    },
    [currentRound, pairIndex]
  );

  
  const computeFinalRanking = useCallback(() => {
    const list = allItems.map((it) => ({ ...it, wins: winsMap[it.id] || 0 }));
    list.sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [allItems, winsMap]);

  const finalizeNow = useCallback(() => {
    const ranking = computeFinalRanking();
    setFinalRanking(ranking);
  }, [computeFinalRanking]);

  const resetTournament = useCallback(() => {
    setScreen('welcome');
    setCurrentRound([]);
    setNextRound([]);
    setPairIndex(0);
    setRoundIndex(1);
    setWinsMap({});
    setFinalWinner(null);
    setFinalRanking([]);
  }, []);

  const saveCurrentResult = useCallback(() => {
    if (!userName) return;
    const ranking = computeFinalRanking();
    const winner = ranking[0] || finalWinner;
    setUserResults((prev) => ({
      ...prev,
      [userName]: {
        user: userName,
        updatedAt: new Date().toISOString(),
        winnerId: winner?.id || null,
        ranking,
      },
    }));
    setScreen('stats');
  }, [computeFinalRanking, finalWinner, userName, setScreen]);

  const value = useMemo(
    () => ({
      screen,
      setScreen,

      userName,
      setUserName,

      allItems,

      currentRound,
      nextRound,
      roundIndex,
      pairIndex,
      winsMap,
      finalWinner,
      finalRanking,
      progress,

      startTournament,
      getCurrentPair,
      chooseWinner,
      finalizeNow,
      resetTournament,

      userResults,
      saveCurrentResult,
    }),
    [
      screen,
      userName,
      allItems,
      currentRound,
      nextRound,
      roundIndex,
      pairIndex,
      winsMap,
      finalWinner,
      finalRanking,
      progress,
      startTournament,
      getCurrentPair,
      chooseWinner,
      finalizeNow,
      resetTournament,
      userResults,
      saveCurrentResult,
    ]
  );

  return <VoteContext.Provider value={value}>{children}</VoteContext.Provider>;
}

export function useVote() {
  const ctx = useContext(VoteContext);
  if (!ctx) throw new Error('useVote must be used within VoteProvider');
  return ctx;
}

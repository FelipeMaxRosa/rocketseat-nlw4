import { createContext, useState, ReactNode } from 'react';
import challenges from "../../challenges.json";

interface IChallengesProviderProps {
  children: ReactNode;
}

interface IChallenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface IChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: IChallenge,
  levelUp: () => void;
  startNewChalenge: () => void;
  resetChallenge: () => void;
}

export const ChallengesContext = createContext({} as IChallengesContextData);


export function ChallengesProvider({children}: IChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(22);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);


  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChalenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        levelUp,
        startNewChalenge,
        resetChallenge
      }}>
      {children}
    </ChallengesContext.Provider>
  )
}
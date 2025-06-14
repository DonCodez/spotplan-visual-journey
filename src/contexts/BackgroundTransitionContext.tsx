
import React, { createContext, useContext, useState, ReactNode } from "react";

type BgTransitionType = "to-dark" | "to-light" | null;

interface BgTransitionContextProps {
  triggerTransition: (direction: BgTransitionType) => void;
  transition: BgTransitionType;
  setTransition: React.Dispatch<React.SetStateAction<BgTransitionType>>;
}

const BgTransitionContext = createContext<BgTransitionContextProps | undefined>(undefined);

export const useBgTransition = () => {
  const ctx = useContext(BgTransitionContext);
  if (!ctx) throw new Error("useBgTransition must be used within BgTransitionProvider");
  return ctx;
};

export const BgTransitionProvider = ({ children }: { children: ReactNode }) => {
  const [transition, setTransition] = useState<BgTransitionType>(null);

  const triggerTransition = (direction: BgTransitionType) => {
    setTransition(direction);
  };

  return (
    <BgTransitionContext.Provider value={{ triggerTransition, transition, setTransition }}>
      {children}
    </BgTransitionContext.Provider>
  );
};

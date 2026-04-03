"use client";

import { useReducer, useMemo } from "react";
import type { DecisionPathway } from "@/types";

interface HistoryEntry {
  nodeId: string;
  selectedOptionIndex: number;
}

interface PathwayState {
  currentNodeId: string;
  history: HistoryEntry[];
}

type PathwayAction =
  | { type: "SELECT_OPTION"; optionIndex: number; nextNodeId: string }
  | { type: "GO_BACK" }
  | { type: "JUMP_TO"; historyIndex: number }
  | { type: "RESET"; startNodeId: string };

function pathwayReducer(
  state: PathwayState,
  action: PathwayAction
): PathwayState {
  switch (action.type) {
    case "SELECT_OPTION":
      return {
        currentNodeId: action.nextNodeId,
        history: [
          ...state.history,
          {
            nodeId: state.currentNodeId,
            selectedOptionIndex: action.optionIndex,
          },
        ],
      };
    case "GO_BACK": {
      if (state.history.length === 0) return state;
      const previousEntry = state.history[state.history.length - 1];
      return {
        currentNodeId: previousEntry.nodeId,
        history: state.history.slice(0, -1),
      };
    }
    case "JUMP_TO": {
      const targetEntry = state.history[action.historyIndex];
      return {
        currentNodeId: targetEntry.nodeId,
        history: state.history.slice(0, action.historyIndex),
      };
    }
    case "RESET":
      return { currentNodeId: action.startNodeId, history: [] };
    default:
      return state;
  }
}

export function usePathway(pathway: DecisionPathway) {
  const [state, dispatch] = useReducer(pathwayReducer, {
    currentNodeId: pathway.startNode,
    history: [],
  });

  const currentNode = pathway.nodes[state.currentNodeId];
  const canGoBack = state.history.length > 0;
  const isOutcome = currentNode?.type === "outcome";

  const progress = useMemo(() => {
    const totalNodes = Object.keys(pathway.nodes).length;
    const visited = state.history.length + 1;
    return Math.min((visited / totalNodes) * 100, 100);
  }, [state.history.length, pathway.nodes]);

  return { state, dispatch, currentNode, canGoBack, isOutcome, progress };
}

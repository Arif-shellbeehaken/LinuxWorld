"use client";

import { useEffect, useRef, useState } from "react";
import {
  createInitialState,
  promptPath,
  runCommand,
  type TermState,
} from "@/lib/terminal/vfs";

type Line = { text: string; kind: "cmd" | "out" | "err" | "hint" };

export default function Terminal({ className = "" }: { className?: string }) {
  const [state, setState] = useState<TermState>(() => createInitialState());
  const [lines, setLines] = useState<Line[]>([
    {
      text: "এখানে কমান্ড লিখুন। শুরু করতে help লিখুন।",
      kind: "hint",
    },
  ]);
  const [input, setInput] = useState("");
  const [histIdx, setHistIdx] = useState(-1);
  const outRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (outRef.current) outRef.current.scrollTop = outRef.current.scrollHeight;
  }, [lines]);

  const run = (raw: string) => {
    const line = raw.trim();
    const prompt = `learner@linux:${promptPath(state.cwd)}$ ${raw}`;
    const res = runCommand(state, line);
    setState(res.state);
    setHistIdx(-1);

    if (res.output === "__CLEAR__") {
      setLines([]);
      return;
    }
    const next: Line[] = [{ text: prompt, kind: "cmd" }];
    if (res.output) next.push({ text: res.output, kind: res.isError ? "err" : "out" });
    setLines((prev) => [...prev, ...next]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
      return;
    }
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const hist = state.history;
      if (!hist.length) return;
      let idx = histIdx;
      if (e.key === "ArrowUp") idx = idx < 0 ? hist.length - 1 : Math.max(0, idx - 1);
      else idx = idx < 0 ? -1 : Math.min(hist.length - 1, idx + 1);
      setHistIdx(idx);
      setInput(idx >= 0 ? hist[idx] : "");
    }
  };

  return (
    <div
      className={`terminal-box ${className}`}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="term-dots">
        <span /><span /><span />
      </div>
      <div className="term-output" ref={outRef}>
        {lines.map((l, i) => (
          <div
            key={i}
            className={
              "term-line " +
              (l.kind === "cmd"
                ? "term-cmd"
                : l.kind === "err"
                ? "term-error"
                : l.kind === "hint"
                ? "term-hint"
                : "")
            }
          >
            {l.text}
          </div>
        ))}
      </div>
      <div className="term-input-row">
        <span className="term-prompt">
          learner@linux:{promptPath(state.cwd)}$
        </span>
        <input
          ref={inputRef}
          className="term-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          spellCheck={false}
          placeholder="কমান্ড লিখুন..."
        />
      </div>
    </div>
  );
}

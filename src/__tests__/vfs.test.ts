import { describe, it, expect } from "vitest";
import { createInitialState, runCommand } from "@/lib/terminal/vfs";

describe("terminal VFS", () => {
  it("pwd and mkdir/ls", () => {
    let s = createInitialState();
    let r = runCommand(s, "pwd");
    expect(r.output).toContain("/home/learner");
    s = r.state;
    r = runCommand(s, "mkdir lab");
    s = r.state;
    r = runCommand(s, "ls");
    expect(r.output).toContain("lab/");
  });

  it("echo redirect and cat", () => {
    let s = createInitialState();
    let r = runCommand(s, 'echo hello > note.txt');
    s = r.state;
    r = runCommand(s, "cat note.txt");
    expect(r.output).toBe("hello");
  });

  it("unknown command errors", () => {
    const r = runCommand(createInitialState(), "notacommand");
    expect(r.isError).toBe(true);
  });
});

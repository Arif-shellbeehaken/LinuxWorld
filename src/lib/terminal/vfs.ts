/** Virtual File System + command interpreter — pure, testable */

export type FSNode =
  | { name: string; type: "dir"; children: Record<string, FSNode> }
  | { name: string; type: "file"; content: string; mode?: string };

export type TermState = {
  fs: FSNode;
  cwd: string[];
  history: string[];
};

export function createInitialFS(): FSNode {
  return {
    name: "/",
    type: "dir",
    children: {
      home: {
        name: "home",
        type: "dir",
        children: {
          learner: {
            name: "learner",
            type: "dir",
            children: {
              "welcome.txt": {
                name: "welcome.txt",
                type: "file",
                content:
                  "লিনাক্স জিরো টু হিরো-তে স্বাগতম!\nএখানে ভয় না পেয়ে যেকোনো কমান্ড চেষ্টা করুন।",
              },
              projects: { name: "projects", type: "dir", children: {} },
            },
          },
        },
      },
      etc: { name: "etc", type: "dir", children: {} },
      var: {
        name: "var",
        type: "dir",
        children: { log: { name: "log", type: "dir", children: {} } },
      },
      tmp: { name: "tmp", type: "dir", children: {} },
    },
  };
}

export function createInitialState(): TermState {
  return { fs: createInitialFS(), cwd: ["home", "learner"], history: [] };
}

function cloneFS(fs: FSNode): FSNode {
  return JSON.parse(JSON.stringify(fs));
}

function resolvePath(cwd: string[], pathStr?: string): string[] {
  if (!pathStr || pathStr === ".") return [...cwd];
  let parts: string[];
  if (pathStr.startsWith("/")) parts = pathStr.split("/").filter(Boolean);
  else if (pathStr === "~") return ["home", "learner"];
  else parts = [...cwd, ...pathStr.split("/").filter(Boolean)];
  const result: string[] = [];
  for (const p of parts) {
    if (p === "..") result.pop();
    else if (p !== ".") result.push(p);
  }
  return result;
}

function getNode(fs: FSNode, pathArr: string[]): FSNode | null {
  let node: FSNode = fs;
  for (const part of pathArr) {
    if (node.type !== "dir" || !node.children[part]) return null;
    node = node.children[part];
  }
  return node;
}

function getParentAndName(fs: FSNode, pathArr: string[]) {
  const name = pathArr[pathArr.length - 1];
  const parent = getNode(fs, pathArr.slice(0, -1));
  return { parent, name };
}

const HELP = [
  "ব্যবহারযোগ্য কমান্ড:",
  "pwd, ls [-la], cd <path>, mkdir, touch, rm [-r], cp, mv, cat,",
  "echo [> >>], grep, chmod, whoami, id, date, uname, hostname,",
  "free, df, uptime, env, head, tail, wc, tree, history, clear, help, man",
].join("\n");

export function promptPath(cwd: string[]): string {
  return "~/" + cwd.slice(2).join("/");
}

export function runCommand(
  state: TermState,
  rawLine: string
): { state: TermState; output: string; isError: boolean } {
  const line = rawLine.trim();
  const newState: TermState = {
    fs: cloneFS(state.fs),
    cwd: [...state.cwd],
    history: [...state.history, line],
  };
  if (!line) return { state: newState, output: "", isError: false };

  const tokens = line.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
  const cmd = tokens[0];
  const args = tokens.slice(1).map((t) => t.replace(/^"|"$/g, ""));
  const ok = (output: string) => ({ state: newState, output, isError: false });
  const err = (output: string) => ({ state: newState, output, isError: true });

  switch (cmd) {
    case "help":
      return ok(HELP);
    case "pwd":
      return ok("/" + newState.cwd.join("/"));
    case "whoami":
      return ok("learner");
    case "id":
      return ok("uid=1000(learner) gid=1000(learner) groups=1000(learner),27(sudo)");
    case "date":
      return ok(new Date().toString());
    case "uname":
      return ok("Linux linux-zero-to-hero 6.8.0-hero #1 SMP x86_64 GNU/Linux");
    case "hostname":
      return ok("linux-zero-to-hero");
    case "uptime":
      return ok(" 12:00:01 up 3 days,  4:12,  1 user,  load average: 0.08, 0.12, 0.09");
    case "free":
      return ok(
        "               total        used        free\nMem:         8192000     2100000     6092000\nSwap:        2048000           0     2048000"
      );
    case "df":
      return ok(
        "Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        40G   12G   26G  32% /\ntmpfs            2.0G     0  2.0G   0% /tmp"
      );
    case "env":
    case "printenv":
      return ok(
        "USER=learner\nHOME=/home/learner\nSHELL=/bin/bash\nPATH=/usr/local/bin:/usr/bin:/bin\nLANG=bn_BD.UTF-8"
      );
    case "history":
      return ok(newState.history.map((h, i) => `${i + 1}  ${h}`).join("\n"));
    case "clear":
      return { state: newState, output: "__CLEAR__", isError: false };
    case "man": {
      const pages: Record<string, string> = {
        ls: "ls — কনটেন্ট লিস্ট। -l বিস্তারিত, -a লুকানোসহ।",
        cd: "cd <path> — ডিরেক্টরি পরিবর্তন। cd .. উপরে, cd ~ হোম।",
        mkdir: "mkdir <name> — নতুন ডিরেক্টরি।",
        rm: "rm <name> — ফাইল ডিলিট। rm -r ডিরেক্টরি।",
        grep: "grep <pattern> <file> — টেক্সট খোঁজে।",
      };
      if (!args[0]) return err("man: কমান্ডের নাম দিন");
      return ok(pages[args[0]] || `man: ${args[0]} পাওয়া যায়নি`);
    }
    case "ls": {
      const showAll = args.some((a) => a.includes("a"));
      const longFmt = args.some((a) => a.includes("l"));
      const pathArg = args.find((a) => !a.startsWith("-"));
      const targetPath = pathArg ? resolvePath(newState.cwd, pathArg) : newState.cwd;
      const node = getNode(newState.fs, targetPath);
      if (!node) return err(`ls: '${pathArg || "."}' পাওয়া যায়নি`);
      if (node.type === "file") return ok(node.name);
      let entries = Object.values(node.children);
      if (!showAll) entries = entries.filter((e) => !e.name.startsWith("."));
      if (!entries.length) return ok("");
      if (longFmt) {
        return ok(
          entries
            .map(
              (e) =>
                `${e.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--"}  learner  ${
                  e.type === "file" ? (e.content || "").length : 4096
                }  ${e.name}${e.type === "dir" ? "/" : ""}`
            )
            .join("\n")
        );
      }
      return ok(entries.map((e) => (e.type === "dir" ? e.name + "/" : e.name)).join("  "));
    }
    case "cd": {
      const target =
        args[0] === undefined ? ["home", "learner"] : resolvePath(newState.cwd, args[0]);
      const node = getNode(newState.fs, target);
      if (!node) return err(`cd: '${args[0]}': ফোল্ডার নেই`);
      if (node.type !== "dir") return err(`cd: '${args[0]}': ফাইল, ফোল্ডার নয়`);
      newState.cwd = target;
      return ok("");
    }
    case "mkdir": {
      if (!args[0]) return err("mkdir: নাম দিন");
      const target = resolvePath(newState.cwd, args[0]);
      const { parent, name } = getParentAndName(newState.fs, target);
      if (!parent || parent.type !== "dir") return err("mkdir: পাথ নেই");
      if (parent.children[name]) return err(`mkdir: '${name}' আছে`);
      parent.children[name] = { name, type: "dir", children: {} };
      return ok("");
    }
    case "touch": {
      if (!args[0]) return err("touch: নাম দিন");
      const target = resolvePath(newState.cwd, args[0]);
      const { parent, name } = getParentAndName(newState.fs, target);
      if (!parent || parent.type !== "dir") return err("touch: পাথ নেই");
      if (!parent.children[name]) parent.children[name] = { name, type: "file", content: "" };
      return ok("");
    }
    case "rm": {
      const recursive = args.includes("-r") || args.includes("-rf");
      const fileArg = args.find((a) => !a.startsWith("-"));
      if (!fileArg) return err("rm: নাম দিন");
      const target = resolvePath(newState.cwd, fileArg);
      const { parent, name } = getParentAndName(newState.fs, target);
      if (!parent || parent.type !== "dir" || !parent.children[name])
        return err(`rm: '${fileArg}' নেই`);
      if (parent.children[name].type === "dir" && !recursive)
        return err(`rm: ডিরেক্টরি — rm -r ব্যবহার করুন`);
      delete parent.children[name];
      return ok("");
    }
    case "cp": {
      if (!args[0] || !args[1]) return err("cp: src dst দিন");
      const srcNode = getNode(newState.fs, resolvePath(newState.cwd, args[0]));
      if (!srcNode) return err(`cp: '${args[0]}' নেই`);
      const { parent, name } = getParentAndName(newState.fs, resolvePath(newState.cwd, args[1]));
      if (!parent || parent.type !== "dir") return err("cp: গন্তব্য নেই");
      parent.children[name] = JSON.parse(JSON.stringify({ ...srcNode, name }));
      return ok("");
    }
    case "mv": {
      if (!args[0] || !args[1]) return err("mv: src dst দিন");
      const srcPath = resolvePath(newState.cwd, args[0]);
      const { parent: sp, name: sn } = getParentAndName(newState.fs, srcPath);
      if (!sp || sp.type !== "dir" || !sp.children[sn]) return err(`mv: '${args[0]}' নেই`);
      const { parent: dp, name: dn } = getParentAndName(newState.fs, resolvePath(newState.cwd, args[1]));
      if (!dp || dp.type !== "dir") return err("mv: গন্তব্য নেই");
      const node = sp.children[sn];
      if (node.type === "file" || node.type === "dir") node.name = dn;
      dp.children[dn] = node;
      delete sp.children[sn];
      return ok("");
    }
    case "cat": {
      if (!args[0]) return err("cat: ফাইল দিন");
      const node = getNode(newState.fs, resolvePath(newState.cwd, args[0]));
      if (!node) return err(`cat: '${args[0]}' নেই`);
      if (node.type !== "file") return err("cat: ডিরেক্টরি");
      return ok(node.content || "");
    }
    case "echo": {
      const gt = args.indexOf(">");
      const ap = args.indexOf(">>");
      if (gt !== -1 || ap !== -1) {
        const idx = gt !== -1 ? gt : ap;
        const text = args.slice(0, idx).join(" ");
        const fileArg = args[idx + 1];
        if (!fileArg) return err("echo: ফাইল দিন");
        const { parent, name } = getParentAndName(newState.fs, resolvePath(newState.cwd, fileArg));
        if (!parent || parent.type !== "dir") return err("echo: পাথ নেই");
        if (!parent.children[name] || parent.children[name].type !== "file")
          parent.children[name] = { name, type: "file", content: "" };
        const f = parent.children[name];
        if (f.type === "file") {
          if (ap !== -1) f.content += (f.content ? "\n" : "") + text;
          else f.content = text;
        }
        return ok("");
      }
      return ok(args.join(" "));
    }
    case "grep": {
      if (!args[0] || !args[1]) return err("grep: pattern file দিন");
      const node = getNode(newState.fs, resolvePath(newState.cwd, args[1]));
      if (!node || node.type !== "file") return err(`grep: '${args[1]}' নেই`);
      const matches = (node.content || "").split("\n").filter((l) => l.includes(args[0]));
      return ok(matches.join("\n"));
    }
    case "chmod": {
      if (!args[0] || !args[1]) return err("chmod: mode file দিন");
      const node = getNode(newState.fs, resolvePath(newState.cwd, args[1]));
      if (!node) return err(`chmod: '${args[1]}' নেই`);
      if (node.type === "file") node.mode = args[0];
      return ok("");
    }
    case "head":
    case "tail": {
      const fileArg = args.find((a) => !a.startsWith("-"));
      if (!fileArg) return err(`${cmd}: ফাইল দিন`);
      const nIdx = args.indexOf("-n");
      const n = nIdx !== -1 ? parseInt(args[nIdx + 1], 10) || 10 : 10;
      const node = getNode(newState.fs, resolvePath(newState.cwd, fileArg));
      if (!node || node.type !== "file") return err(`${cmd}: নেই`);
      const lines = (node.content || "").split("\n");
      return ok((cmd === "head" ? lines.slice(0, n) : lines.slice(-n)).join("\n"));
    }
    case "wc": {
      if (!args[0]) return err("wc: ফাইল দিন");
      const node = getNode(newState.fs, resolvePath(newState.cwd, args[0]));
      if (!node || node.type !== "file") return err("wc: নেই");
      const lines = (node.content || "").split("\n");
      const words = (node.content || "").trim()
        ? (node.content || "").trim().split(/\s+/).length
        : 0;
      return ok(`${lines.length} ${words} ${(node.content || "").length} ${args[0]}`);
    }
    case "tree": {
      const render = (node: FSNode, prefix = ""): string => {
        if (node.type !== "dir") return "";
        const entries = Object.values(node.children);
        return entries
          .map((e, i) => {
            const last = i === entries.length - 1;
            const line =
              prefix + (last ? "└── " : "├── ") + e.name + (e.type === "dir" ? "/" : "");
            const childPrefix = prefix + (last ? "    " : "│   ");
            return e.type === "dir" ? line + "\n" + render(e, childPrefix) : line;
          })
          .join("\n");
      };
      const cur = getNode(newState.fs, newState.cwd);
      return ok((cur && render(cur)) || "(খালি)");
    }
    default:
      return err(`bash: ${cmd}: কমান্ড নেই (help লিখুন)`);
  }
}

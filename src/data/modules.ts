import { Module, Quiz, PracticeExercise, Badge, LeaderboardEntry } from "@/types";

/**
 * Complete Linux Zero to Hero — Basic → Advanced
 * Deep lessons, many practices, multi-stage exams
 */
export const modules: Module[] = [
  {
    id: "mod-01",
    title: "লিনাক্স পরিচিতি ও ইনস্টলেশন",
    description: "ইতিহাস, ডিস্ট্রো, ফাইল সিস্টেম হাইয়ারার্কি, VM/WSL/Dual-boot ইনস্টল।",
    icon: "🐧",
    order: 1,
    totalPoints: 200,
    lessons: [
      {
        id: "les-01-01",
        moduleId: "mod-01",
        title: "লিনাক্স কী, কেন এবং কোথায় ব্যবহার হয়",
        description: "কার্নেল, GNU, ওপেন সোর্স, ক্যারিয়ার পাথ।",
        durationMinutes: 15,
        order: 1,
        pointsReward: 25,
        content: `# লিনাক্স কী, কেন এবং কোথায় ব্যবহার হয়

## লিনাক্স কী?
লিনাক্স একটি **ওপেন সোর্স কার্নেল**। পূর্ণ অপারেটিং সিস্টেমকে সাধারণত **GNU/Linux** বলা হয় (কার্নেল + GNU টুলস + ডিস্ট্রিবিউশন)।

লিনাস টরভাল্ডস ১৯৯১ সালে প্রথম কার্নেল রিলিজ করেন। আজ এটি বিশ্বের:
- অধিকাংশ ওয়েব সার্ভার
- সুপারকম্পিউটার (TOP500-এ প্রায় সব)
- অ্যান্ড্রয়েড ডিভাইস
- ক্লাউড (AWS, GCP, Azure VM)
- DevOps, Docker, Kubernetes

## কেন শিখবেন?
1. **সার্ভার অ্যাডমিন** — প্রোডাকশন সার্ভার প্রায় সব লিনাক্স
2. **DevOps / SRE** — CI/CD, কন্টেইনার, অটোমেশন
3. **সাইবার সিকিউরিটি** — পেনিট্রেশন টেস্টিং, ফরেনসিক
4. **ক্লাউড ইঞ্জিনিয়ার** — লিনাক্স ছাড়া ক্লাউড অসম্পূর্ণ
5. **বিনামূল্যে ও স্বচ্ছ** — সোর্স দেখা ও কাস্টমাইজ করা যায়

## লিনাক্স vs Windows vs macOS
| বিষয় | Linux | Windows | macOS |
|------|-------|---------|-------|
| খরচ | ফ্রি | লাইসেন্স | হার্ডওয়্যার+OS |
| সোর্স | ওপেন | ক্লোজড | ক্লোজড |
| প্যাকেজ ম্যানেজমেন্ট | apt/dnf/pacman | Store/Installer | Homebrew/App Store |
| সার্ভার শেয়ার | সর্বোচ্চ | কম | খুব কম |
| শেল | bash/zsh/fish | PowerShell/CMD | zsh |

## শেখার পথ (এই কোর্সে)
ইনস্টল → টার্মিনাল → ফাইল/পারমিশন → ইউজার → প্রসেস → প্যাকেজ → নেটওয়ার্ক → স্ক্রিপ্টিং → সার্ভিস → স্টোরেজ → সিকিউরিটি → ট্রাবলশুটিং → অ্যাডভান্সড।`
      },
      {
        id: "les-01-02",
        moduleId: "mod-01",
        title: "ডিস্ট্রিবিউশন বেছে নেওয়া",
        description: "Ubuntu, Debian, RHEL, Fedora, Arch, Kali — কখন কোনটি।",
        durationMinutes: 18,
        order: 2,
        pointsReward: 25,
        content: `# ডিস্ট্রিবিউশন (Distro)

**ডিস্ট্রো** = কার্নেল + ইউজারল্যান্ড + প্যাকেজ ম্যানেজার + রিলিজ নীতি।

## পরিবার অনুযায়ী

### Debian পরিবার
- **Debian** — স্থিতিশীল, সার্ভারের ভিত্তি
- **Ubuntu** — নবীন-বান্ধব, LTS (৫ বছর সাপোর্ট), ক্লাউডে সবচেয়ে জনপ্রিয়
- **Linux Mint** — ডেস্কটপ ফোকাস
- **Kali** — সিকিউরিটি টুল প্রি-ইনস্টল

প্যাকেজ: \`apt\` / \`.deb\`

### Red Hat পরিবার
- **RHEL** — এন্টারপ্রাইজ, সাবস্ক্রিপশন
- **Rocky / AlmaLinux** — RHEL ক্লোন, ফ্রি
- **Fedora** — আপ-টু-ডেট, ডেভেলপার

প্যাকেজ: \`dnf\` / \`.rpm\`

### Arch পরিবার
- **Arch** — রোলিং রিলিজ, সম্পূর্ণ নিয়ন্ত্রণ
- **Manjaro** — Arch সহজ করে

প্যাকেজ: \`pacman\`

## কোনটি দিয়ে শুরু?
| লক্ষ্য | সুপারিশ |
|--------|---------|
| প্রথমবার শেখা | Ubuntu 24.04 LTS |
| জব (সার্ভার) | Ubuntu বা Rocky |
| সিকিউরিটি ক্যারিয়ার | Kali (আলাদা VM) |
| কাস্টম লার্নিং | Arch (পরে) |

**এই কোর্সের কমান্ড উদাহরণ মূলত Ubuntu/Debian (\`apt\`)।** RHEL-এ সমতুল্য \`dnf\` উল্লেখ করা হবে।`
      },
      {
        id: "les-01-03",
        moduleId: "mod-01",
        title: "ইনস্টলেশন: VM, WSL2, Dual Boot, ক্লাউড",
        description: "প্রতিটি পদ্ধতির ধাপ, সুবিধা-অসুবিধা।",
        durationMinutes: 25,
        order: 3,
        pointsReward: 35,
        content: `# ইনস্টলেশন পদ্ধতি

## ১. VirtualBox / VMware (সবচেয়ে নিরাপদ শেখার জন্য)
1. VirtualBox ইনস্টল
2. Ubuntu ISO ডাউনলোড (ubuntu.com)
3. New VM: Type Linux, Version Ubuntu 64-bit
4. RAM ≥ 2GB (৪GB ভালো), Disk ≥ 25GB
5. ISO অ্যাটাচ করে বুট → Install

**সুবিধা:** হোস্ট OS নষ্ট হয় না, স্ন্যাপশট নেওয়া যায়।

## ২. WSL2 (Windows এ দ্রুত)
\`\`\`powershell
wsl --install
wsl --set-default-version 2
wsl --install -d Ubuntu-24.04
\`\`\`
Windows Terminal দিয়ে ব্যবহার করুন।

## ৩. Dual Boot
ডিস্ক পার্টিশন করে পাশাপাশি ইনস্টল। **আগে ব্যাকআপ**। Bootloader (GRUB) সাবধানে।

## ৪. ক্লাউড VM
- AWS EC2 (Amazon Linux / Ubuntu AMI)
- DigitalOcean Droplet
- Google Compute Engine

SSH দিয়ে কানেক্ট:
\`\`\`bash
ssh -i key.pem ubuntu@PUBLIC_IP
\`\`\`

## ইনস্টলের পর প্রথম কাজ
\`\`\`bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git vim htop net-tools
\`\`\``
      },
      {
        id: "les-01-04",
        moduleId: "mod-01",
        title: "FHS: ফাইল সিস্টেম হাইয়ারার্কি গভীরে",
        description: "/, /etc, /var, /home, /usr, /proc, /sys — প্রতিটির কাজ।",
        durationMinutes: 20,
        order: 4,
        pointsReward: 30,
        content: `# Filesystem Hierarchy Standard (FHS)

লিনাক্সে **সবকিছুই ফাইল** (ডিভাইস, প্রসেস ইনফো সহ)।

| পাথ | উদ্দেশ্য | উদাহরণ |
|-----|----------|--------|
| \`/\` | রুট | সবকিছুর শুরু |
| \`/bin\` | Essential user binaries | ls, cp, bash |
| \`/sbin\` | System binaries | fdisk, iptables |
| \`/etc\` | Configuration | nginx.conf, passwd |
| \`/home\` | User homes | /home/arif |
| \`/root\` | root-এর হোম | |
| \`/var\` | Variable data | log, cache, spool |
| \`/var/log\` | Logs | syslog, auth.log |
| \`/tmp\` | Temporary | রিবুটে মুছতে পারে |
| \`/usr\` | User programs | /usr/bin, /usr/lib |
| \`/opt\` | Optional software | থার্ড-পার্টি অ্যাপ |
| \`/dev\` | Device files | /dev/sda, /dev/null |
| \`/proc\` | Process/kernel info | /proc/cpuinfo |
| \`/sys\` | Sysfs (kernel) | ডিভাইস ট্রি |
| \`/boot\` | Bootloader, kernel | vmlinuz, grub |
| \`/mnt\` \`/media\` | Mount points | USB, ISO |

\`\`\`bash
ls /
man hier
ls /etc | head
ls /var/log
\`\`\`

**প্র্যাকটিস:** প্রতিটি ডিরেক্টরিতে \`ls\` চালিয়ে দেখুন কী আছে।`
      },
      {
        id: "les-01-05",
        moduleId: "mod-01",
        title: "রুট, সুডো এবং বেসিক সিকিউরিটি ধারণা",
        description: "root কেন বিপজ্জনক, sudo কীভাবে কাজ করে।",
        durationMinutes: 15,
        order: 5,
        pointsReward: 25,
        content: `# root এবং sudo

## root ইউজার
UID 0 — সিস্টেমের পূর্ণ ক্ষমতা। ভুল কমান্ডে পুরো সিস্টেম নষ্ট হতে পারে।

\`\`\`bash
# কখনোই প্রোডাকশনে দৈনন্দিন root লগইন করবেন না
sudo -i          # অস্থায়ী root শেল
sudo command     # এক কমান্ড root হিসেবে
\`\`\`

## sudo
\`/etc/sudoers\` এবং \`/etc/sudoers.d/\` দিয়ে নিয়ন্ত্রিত।

\`\`\`bash
sudo visudo      # নিরাপদ এডিট
groups           # আপনি sudo গ্রুপে আছেন কিনা
\`\`\`

## সোনার নিয়ম
1. ন্যূনতম প্রিভিলেজ
2. \`rm -rf /\` টাইপ করবেন না
3. প্রোডাকশনে আগে \`man\` / \`--help\` পড়ুন
4. গুরুত্বপূর্ণ কাজে স্ন্যাপশট/ব্যাকআপ`
      },
    ],
  },
  {
    id: "mod-02",
    title: "টার্মিনাল মাস্টারি",
    description: "শেল, নেভিগেশন, হিস্টরি, এডিটর, হেল্প সিস্টেম — দৈনন্দিন দক্ষতা।",
    icon: "⌨️",
    order: 2,
    totalPoints: 280,
    lessons: [
      {
        id: "les-02-01",
        moduleId: "mod-02",
        title: "শেল, টার্মিনাল, কনসোল — পার্থক্য",
        description: "bash/zsh, TTY, প্রম্পট, environment।",
        durationMinutes: 12,
        order: 1,
        pointsReward: 20,
        content: `# শেল vs টার্মিনাল

- **Terminal emulator**: উইন্ডো (GNOME Terminal, Windows Terminal)
- **Shell**: কমান্ড ইন্টারপ্রেটার (\`bash\`, \`zsh\`, \`fish\`)
- **Console/TTY**: টেক্সট লগইন ইন্টারফেস

\`\`\`bash
echo $SHELL
bash --version
echo $0
whoami
hostname
uname -a
\`\`\`

প্রম্পট সাধারণত: \`user@host:path$\` — \`$\` মানে সাধারণ ইউজার, \`#\` মানে root।`
      },
      {
        id: "les-02-02",
        moduleId: "mod-02",
        title: "নেভিগেশন: pwd, ls, cd গভীরে",
        description: "অপশন, লুকানো ফাইল, সর্ট, human-readable।",
        durationMinutes: 18,
        order: 2,
        pointsReward: 30,
        content: `# নেভিগেশন

\`\`\`bash
pwd
ls
ls -l          # long
ls -la         # all + long
ls -lh         # human sizes
ls -lt         # sort by time
ls -lS         # sort by size
ls -R          # recursive
cd /var/log
cd ..
cd ~
cd -
cd            # same as cd ~
\`\`\`

**Absolute path:** \`/home/user/file\`  
**Relative path:** \`./file\`, \`../file\`

\`\`\`bash
realpath .
readlink -f .
\`\`\``
      },
      {
        id: "les-02-03",
        moduleId: "mod-02",
        title: "ফাইল তৈরি, কপি, মুভ, ডিলিট",
        description: "touch, mkdir, cp, mv, rm — নিরাপদ ব্যবহার।",
        durationMinutes: 20,
        order: 3,
        pointsReward: 30,
        content: `# ফাইল অপারেশন

\`\`\`bash
mkdir -p projects/linux/lab1
touch notes.txt
cp notes.txt notes.bak
cp -r projects projects-backup
mv notes.txt docs/
mv oldname.txt newname.txt
rm file.txt
rm -i file.txt      # interactive
rm -r dirname
rm -rf dirname      # DANGEROUS — no undo
\`\`\`

**নিরাপদ অভ্যাস:**
- প্রথমে \`ls\` দিয়ে টার্গেট দেখুন
- \`rm -rf\` এ ওয়াইল্ডকার্ড সাবধানে
- গুরুত্বপূর্ণ ডেটায় ট্র্যাশ টুল (\`trash-cli\`) বিবেচনা করুন`
      },
      {
        id: "les-02-04",
        moduleId: "mod-02",
        title: "ফাইল পড়া ও এডিট: cat, less, nano, vim বেসিক",
        description: "পেজার, হেড/টেইল, ন্যানো ও ভিম চলাচল।",
        durationMinutes: 22,
        order: 4,
        pointsReward: 35,
        content: `# পড়া ও এডিট

\`\`\`bash
cat file.txt
cat -n file.txt
less file.txt          # q = quit, / = search
head -n 20 file.txt
tail -n 50 file.txt
tail -f /var/log/syslog
\`\`\`

## nano
\`\`\`bash
nano file.txt
# Ctrl+O save, Ctrl+X exit, Ctrl+W search
\`\`\`

## vim (অপরিহার্য বেসিক)
\`\`\`bash
vim file.txt
# i = insert, Esc = normal
# :w save, :q quit, :wq save+quit, :q! force quit
# dd delete line, yy yank, p paste
# /pattern search, n next
\`\`\`

ভিম শেখা কঠিন কিন্তু সার্ভারে সবসময় থাকে।`
      },
      {
        id: "les-02-05",
        moduleId: "mod-02",
        title: "help, man, info, --help",
        description: "ডকুমেন্টেশন পড়ার অভ্যাস গঠন।",
        durationMinutes: 12,
        order: 5,
        pointsReward: 20,
        content: `# হেল্প সিস্টেম

\`\`\`bash
ls --help
man ls
man 5 passwd       # section 5 = file formats
man -k search
whatis ls
type ls
which ls
\`\`\`

**man সেকশন:** 1 commands, 5 file formats, 8 system admin।

প্রতিটি নতুন কমান্ডে প্রথমে \`--help\` বা \`man\` দেখার অভ্যাস করুন।`
      },
      {
        id: "les-02-06",
        moduleId: "mod-02",
        title: "হিস্টরি, এলিয়াস, ট্যাব কমপ্লিশন",
        description: "গতি বাড়ানোর টুল।",
        durationMinutes: 14,
        order: 6,
        pointsReward: 25,
        content: `# হিস্টরি ও এলিয়াস

\`\`\`bash
history
history | grep apt
!100                 # run history item 100
!!                   # last command
!$                   # last argument
Ctrl+R               # reverse search
\`\`\`

\`\`\`bash
alias ll='ls -lah'
alias update='sudo apt update && sudo apt upgrade -y'
alias rm='rm -i'
unalias rm
\`\`\`

স্থায়ী করতে \`~/.bashrc\` এ লিখুন:
\`\`\`bash
echo "alias ll='ls -lah'" >> ~/.bashrc
source ~/.bashrc
\`\`\``
      },
    ],
  },
  {
    id: "mod-03",
    title: "ফাইল সিস্টেম অপারেশন ও সার্চ",
    description: "find, grep, locate, ওয়াইল্ডকার্ড, রিডাইরেকশন, পাইপ।",
    icon: "🔍",
    order: 3,
    totalPoints: 260,
    lessons: [
      {
        id: "les-03-01",
        moduleId: "mod-03",
        title: "ওয়াইল্ডকার্ড ও গ্লোবিং",
        description: "*, ?, [], {}, ব্রেস এক্সপানশন।",
        durationMinutes: 15,
        order: 1,
        pointsReward: 25,
        content: `# ওয়াইল্ডকার্ড

\`\`\`bash
ls *.txt
ls file?.log
ls file[123].txt
ls file[a-z]*
ls *.{txt,log,md}
cp /etc/{passwd,group} /tmp/
mkdir -p lab/{src,bin,docs}
\`\`\``
      },
      {
        id: "les-03-02",
        moduleId: "mod-03",
        title: "রিডাইরেকশন ও পাইপ",
        description: "stdin/stdout/stderr, >, >>, |, tee।",
        durationMinutes: 20,
        order: 2,
        pointsReward: 35,
        content: `# রিডাইরেকশন ও পাইপ

\`\`\`bash
echo hello > out.txt
echo world >> out.txt
ls /nofile 2> err.txt
ls /nofile > all.txt 2>&1
ls /nofile &> all.txt
command | tee file.txt
cat file.txt | sort | uniq | wc -l
ps aux | grep nginx | grep -v grep
\`\`\`

| সিম্বল | কাজ |
|--------|-----|
| \`>\` | stdout ওভাররাইট |
| \`>>\` | stdout অ্যাপেন্ড |
| \`2>\` | stderr |
| \`|\` | পাইপ |
| \`tee\` | স্ক্রিন + ফাইল |`
      },
      {
        id: "les-03-03",
        moduleId: "mod-03",
        title: "find — শক্তিশালী ফাইল সার্চ",
        description: "নাম, টাইপ, সাইজ, টাইম, -exec।",
        durationMinutes: 22,
        order: 3,
        pointsReward: 35,
        content: `# find

\`\`\`bash
find /home -name "*.pdf"
find . -type f -name "*.log"
find . -type d -name "node_modules"
find /var -size +100M
find /tmp -mtime +7
find . -name "*.tmp" -delete
find . -name "*.txt" -exec cp {} /backup/ \\;
find . -type f -perm 777
\`\`\`

**টাইপ:** \`f\` file, \`d\` directory, \`l\` symlink।`
      },
      {
        id: "les-03-04",
        moduleId: "mod-03",
        title: "grep ও টেক্সট সার্চ",
        description: "regex বেসিক, -r, -i, -n, -A/-B/-C।",
        durationMinutes: 20,
        order: 4,
        pointsReward: 35,
        content: `# grep

\`\`\`bash
grep "error" app.log
grep -i "error" app.log
grep -n "TODO" *.py
grep -r "password" /etc 2>/dev/null
grep -v "DEBUG" app.log
grep -E "error|fail|fatal" app.log
grep -A2 -B2 "Exception" app.log
\`\`\`

পরে **ripgrep (\`rg\`)** শিখলে আরও দ্রুত।`
      },
      {
        id: "les-03-05",
        moduleId: "mod-03",
        title: "locate, which, whereis, file",
        description: "দ্রুত সার্চ ও ফাইল টাইপ।",
        durationMinutes: 12,
        order: 5,
        pointsReward: 20,
        content: `# অন্যান্য সার্চ টুল

\`\`\`bash
sudo updatedb
locate nginx.conf
which python3
whereis ls
file /bin/ls
file document.pdf
\`\`\``
      },
      {
        id: "les-03-06",
        moduleId: "mod-03",
        title: "লিংক: soft link ও hard link",
        description: "ln -s vs ln, inode ধারণা।",
        durationMinutes: 16,
        order: 6,
        pointsReward: 30,
        content: `# Soft ও Hard Link

\`\`\`bash
ln -s /etc/nginx/nginx.conf ~/nginx.conf.link
ln original.txt hardlink.txt
ls -li
stat file.txt
\`\`\`

- **Soft link:** পথের পয়েন্টার, ক্রস-ফাইলসিস্টেম OK, ব্রোকেন হতে পারে
- **Hard link:** একই inode, একই ফাইলসিস্টেমে, আসল মুছলেও ডেটা থাকে (লিংক থাকলে)`
      },
    ],
  },
  {
    id: "mod-04",
    title: "পারমিশন ও অ্যাক্সেস কন্ট্রোল",
    description: "rwx, chmod, chown, umask, SUID/SGID/sticky, ACL ধারণা।",
    icon: "🔐",
    order: 4,
    totalPoints: 240,
    lessons: [
      {
        id: "les-04-01",
        moduleId: "mod-04",
        title: "পারমিশন মডেল সম্পূর্ণ ব্যাখ্যা",
        description: "owner/group/others, rwx, ডিরেক্টরির x।",
        durationMinutes: 18,
        order: 1,
        pointsReward: 30,
        content: `# পারমিশন মডেল

\`ls -l\` → \`-rwxr-xr--\`

| পজিশন | অর্থ |
|--------|------|
| 1 | টাইপ (- file, d dir, l link) |
| 2-4 | owner rwx |
| 5-7 | group rwx |
| 8-10 | others rwx |

**ফাইলে:** r=পড়তে, w=লিখতে, x=এক্সিকিউট  
**ডিরেক্টরিতে:** r=লিস্ট, w=তৈরি/মুছতে, x=এন্টার (cd)

অক্টাল: r=4, w=2, x=1 → 7=rwx, 5=r-x, 6=rw-, 4=r--`
      },
      {
        id: "les-04-02",
        moduleId: "mod-04",
        title: "chmod — সিম্বলিক ও অক্টাল",
        description: "সব কমন প্যাটার্ন প্র্যাকটিস।",
        durationMinutes: 18,
        order: 2,
        pointsReward: 30,
        content: `# chmod

\`\`\`bash
chmod 755 script.sh
chmod 644 file.txt
chmod 700 private_dir
chmod u+x script.sh
chmod g-w file.txt
chmod o= file.txt
chmod -R 755 project/
\`\`\`

| মান | অর্থ |
|-----|------|
| 755 | স্ক্রিপ্ট/ডিরেক্টরি সাধারণ |
| 644 | সাধারণ ফাইল |
| 600 | শুধু মালিক পড়তে/লিখতে |
| 700 | শুধু মালিক সব |`
      },
      {
        id: "les-04-03",
        moduleId: "mod-04",
        title: "chown, chgrp",
        description: "মালিকানা পরিবর্তন।",
        durationMinutes: 12,
        order: 3,
        pointsReward: 25,
        content: `# chown / chgrp

\`\`\`bash
sudo chown user file.txt
sudo chown user:group file.txt
sudo chown -R user:group /var/www/html
sudo chgrp developers project/
\`\`\``
      },
      {
        id: "les-04-04",
        moduleId: "mod-04",
        title: "SUID, SGID, Sticky bit",
        description: "বিশেষ বিট — passwd, /tmp উদাহরণ।",
        durationMinutes: 18,
        order: 4,
        pointsReward: 35,
        content: `# বিশেষ পারমিশন

\`\`\`bash
ls -l /usr/bin/passwd     # often has s (SUID)
ls -ld /tmp               # sticky t
chmod u+s program
chmod g+s shared_dir
chmod +t /shared/tmp
chmod 4755 program        # SUID + 755
\`\`\`

- **SUID:** এক্সিকিউটকালে owner-এর পারমিশন
- **SGID (dir):** নতুন ফাইল একই গ্রুপ
- **Sticky:** শুধু মালিক ফাইল ডিলিট করতে পারে`
      },
      {
        id: "les-04-05",
        moduleId: "mod-04",
        title: "umask ও ডিফল্ট পারমিশন",
        description: "নতুন ফাইলের পারমিশন নিয়ন্ত্রণ।",
        durationMinutes: 12,
        order: 5,
        pointsReward: 25,
        content: `# umask

\`\`\`bash
umask
umask 022
umask 077
touch a && ls -l a
\`\`\`

ফাইল বেস 666, ডিরেক্টরি 777 থেকে umask বিয়োগ।`
      },
    ],
  },
  {
    id: "mod-05",
    title: "ইউজার ও গ্রুপ অ্যাডমিন",
    description: "useradd, usermod, passwd, group, sudoers।",
    icon: "👥",
    order: 5,
    totalPoints: 220,
    lessons: [
      {
        id: "les-05-01",
        moduleId: "mod-05",
        title: "ইউজার অ্যাকাউন্ট লাইফসাইকেল",
        description: "তৈরি, লক, ডিলিট, /etc/passwd ও shadow।",
        durationMinutes: 20,
        order: 1,
        pointsReward: 35,
        content: `# ইউজার ম্যানেজমেন্ট

\`\`\`bash
sudo useradd -m -s /bin/bash student1
sudo passwd student1
sudo usermod -aG sudo student1
sudo usermod -L student1
sudo usermod -U student1
sudo userdel -r student1
id student1
\`\`\`

ফাইল:
- \`/etc/passwd\` — ইউজার ইনফো
- \`/etc/shadow\` — পাসওয়ার্ড হ্যাশ (root only)
- \`/etc/group\` — গ্রুপ`
      },
      {
        id: "les-05-02",
        moduleId: "mod-05",
        title: "গ্রুপ ও শেয়ার্ড অ্যাক্সেস",
        description: "groupadd, প্রাইমারি/সাপ্লিমেন্টারি গ্রুপ।",
        durationMinutes: 14,
        order: 2,
        pointsReward: 25,
        content: `# গ্রুপ

\`\`\`bash
sudo groupadd devs
sudo usermod -aG devs student1
groups student1
\`\`\``
      },
      {
        id: "les-05-03",
        moduleId: "mod-05",
        title: "sudoers নিরাপদ কনফিগ",
        description: "visudo, limited sudo, NOPASSWD ঝুঁকি।",
        durationMinutes: 16,
        order: 3,
        pointsReward: 35,
        content: `# sudoers

\`\`\`bash
sudo visudo
sudo visudo -f /etc/sudoers.d/developers
\`\`\`

উদাহরণ: নির্দিষ্ট কমান্ড শুধু:
\`\`\`
student1 ALL=(ALL) /usr/bin/apt, /bin/systemctl
\`\`\`

NOPASSWD সুবিধাজনক কিন্তু ঝুঁকিপূর্ণ — শুধু বুঝে ব্যবহার।`
      },
    ],
  },
  {
    id: "mod-06",
    title: "প্রসেস ও রিসোর্স মনিটরিং",
    description: "ps, top, htop, kill, nice, jobs, background।",
    icon: "📊",
    order: 6,
    totalPoints: 240,
    lessons: [
      {
        id: "les-06-01",
        moduleId: "mod-06",
        title: "প্রসেস দেখা: ps, top, htop",
        description: "PID, স্টেট, CPU/MEM।",
        durationMinutes: 18,
        order: 1,
        pointsReward: 30,
        content: `# প্রসেস ভিউ

\`\`\`bash
ps aux
ps aux --sort=-%mem | head
ps -ef
top
htop
pstree
\`\`\`

স্টেট: R running, S sleep, D uninterruptible, Z zombie, T stopped।`
      },
      {
        id: "les-06-02",
        moduleId: "mod-06",
        title: "সিগন্যাল ও kill",
        description: "SIGTERM, SIGKILL, pkill, killall।",
        durationMinutes: 15,
        order: 2,
        pointsReward: 30,
        content: `# kill

\`\`\`bash
kill PID
kill -15 PID
kill -9 PID
kill -l
pkill nginx
killall -9 processname
\`\`\`

প্রথমে -15 (নরম), না হলে -9।`
      },
      {
        id: "les-06-03",
        moduleId: "mod-06",
        title: "জব কন্ট্রোল ও প্রাইওরিটি",
        description: "&, Ctrl+Z, fg, bg, nohup, nice।",
        durationMinutes: 18,
        order: 3,
        pointsReward: 30,
        content: `# জব ও nice

\`\`\`bash
long_task &
jobs
fg %1
bg %1
nohup ./script.sh > out.log 2>&1 &
nice -n 10 ./heavy.sh
renice -n 5 -p PID
\`\`\``
      },
      {
        id: "les-06-04",
        moduleId: "mod-06",
        title: "মেমোরি, ডিস্ক, লোড",
        description: "free, df, du, uptime, vmstat।",
        durationMinutes: 15,
        order: 4,
        pointsReward: 30,
        content: `# রিসোর্স

\`\`\`bash
free -h
df -h
du -sh *
du -h --max-depth=1 /var
uptime
cat /proc/cpuinfo | head
cat /proc/meminfo | head
\`\`\``
      },
    ],
  },
  {
    id: "mod-07",
    title: "প্যাকেজ ম্যানেজমেন্ট",
    description: "apt, dpkg, repositories, snap — সফটওয়্যার ইনস্টল লাইফসাইকেল।",
    icon: "📦",
    order: 7,
    totalPoints: 200,
    lessons: [
      {
        id: "les-07-01",
        moduleId: "mod-07",
        title: "APT সম্পূর্ণ ওয়ার্কফ্লো",
        description: "update, install, remove, purge, search, hold।",
        durationMinutes: 20,
        order: 1,
        pointsReward: 35,
        content: `# APT

\`\`\`bash
sudo apt update
sudo apt upgrade -y
sudo apt full-upgrade
sudo apt install nginx curl git
sudo apt remove nginx
sudo apt purge nginx
sudo apt autoremove
apt search htop
apt show nginx
apt list --installed | grep nginx
sudo apt-mark hold docker-ce
\`\`\``
      },
      {
        id: "les-07-02",
        moduleId: "mod-07",
        title: "dpkg ও .deb",
        description: "লোকাল প্যাকেজ ইনস্টল ও তথ্য।",
        durationMinutes: 12,
        order: 2,
        pointsReward: 25,
        content: `# dpkg

\`\`\`bash
sudo dpkg -i package.deb
sudo apt-get install -f
dpkg -l | grep nginx
dpkg -L nginx
dpkg -S /usr/sbin/nginx
\`\`\``
      },
      {
        id: "les-07-03",
        moduleId: "mod-07",
        title: "রিপোজিটরি ও PPA ধারণা",
        description: "sources.list, থার্ড-পার্টি রিপো নিরাপত্তা।",
        durationMinutes: 14,
        order: 3,
        pointsReward: 25,
        content: `# রিপো

\`\`\`bash
ls /etc/apt/sources.list.d/
cat /etc/apt/sources.list
\`\`\`

অজানা PPA যোগ করার আগে বিশ্বাসযোগ্যতা যাচাই করুন।`
      },
    ],
  },
  {
    id: "mod-08",
    title: "নেটওয়ার্কিং",
    description: "IP, DNS, পোর্ট, curl, SSH, UFW ফায়ারওয়াল।",
    icon: "🌐",
    order: 8,
    totalPoints: 280,
    lessons: [
      {
        id: "les-08-01",
        moduleId: "mod-08",
        title: "নেটওয়ার্ক বেসিক কমান্ড",
        description: "ip, ping, traceroute, dig, host।",
        durationMinutes: 18,
        order: 1,
        pointsReward: 30,
        content: `# নেটওয়ার্ক ডায়াগনস্টিকস

\`\`\`bash
ip a
ip r
ip link
ping -c 4 8.8.8.8
ping -c 4 google.com
traceroute google.com
dig google.com
dig +short google.com
host google.com
\`\`\``
      },
      {
        id: "les-08-02",
        moduleId: "mod-08",
        title: "পোর্ট, সকেট, HTTP ক্লায়েন্ট",
        description: "ss, curl, wget।",
        durationMinutes: 16,
        order: 2,
        pointsReward: 30,
        content: `# পোর্ট ও HTTP

\`\`\`bash
ss -tuln
ss -tp
curl -I https://example.com
curl -v https://api.github.com
curl -o file.zip URL
wget URL
\`\`\``
      },
      {
        id: "les-08-03",
        moduleId: "mod-08",
        title: "SSH মাস্টারি",
        description: "কী-পেয়ার, config, স্কপ, পোর্ট ফরওয়ার্ড ধারণা।",
        durationMinutes: 22,
        order: 3,
        pointsReward: 40,
        content: `# SSH

\`\`\`bash
ssh user@host
ssh -p 2222 user@host
ssh-keygen -t ed25519 -C "you@email.com"
ssh-copy-id user@host
\`\`\`

\`~/.ssh/config\`:
\`\`\`
Host myserver
  HostName 1.2.3.4
  User ubuntu
  IdentityFile ~/.ssh/id_ed25519
  Port 22
\`\`\`

\`\`\`bash
scp file.txt user@host:/path/
rsync -avz -e ssh dir/ user@host:/path/
\`\`\``
      },
      {
        id: "les-08-04",
        moduleId: "mod-08",
        title: "UFW ফায়ারওয়াল",
        description: "allow/deny, পোর্ট, স্ট্যাটাস।",
        durationMinutes: 16,
        order: 4,
        pointsReward: 30,
        content: `# UFW

\`\`\`bash
sudo ufw status verbose
sudo ufw enable
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80,443/tcp
sudo ufw allow from 192.168.1.0/24
sudo ufw delete allow 80/tcp
sudo ufw reload
\`\`\`

**সতর্কতা:** রিমোট সার্ভারে SSH পোর্ট আগে খুলে তারপর enable।`
      },
    ],
  },
  {
    id: "mod-09",
    title: "শেল স্ক্রিপ্টিং",
    description: "ভেরিয়েবল, কন্ডিশন, লুপ, ফাংশন, আর্গুমেন্ট, ডিবাগ — অটোমেশন ভিত্তি।",
    icon: "📜",
    order: 9,
    totalPoints: 320,
    lessons: [
      {
        id: "les-09-01",
        moduleId: "mod-09",
        title: "স্ক্রিপ্ট স্ট্রাকচার ও ভেরিয়েবল",
        description: "shebang, কোটিং, env vars।",
        durationMinutes: 18,
        order: 1,
        pointsReward: 30,
        content: `# প্রথম স্ক্রিপ্ট

\`\`\`bash
#!/bin/bash
set -euo pipefail
NAME="Linux"
echo "Hello $NAME"
echo "User: $USER Home: $HOME"
read -p "নাম: " n
echo "Hi $n"
\`\`\`

\`\`\`bash
chmod +x script.sh
./script.sh
bash script.sh
\`\`\``
      },
      {
        id: "les-09-02",
        moduleId: "mod-09",
        title: "কন্ডিশন ও টেস্ট",
        description: "if, [[ ]], ফাইল টেস্ট, সংখ্যা/স্ট্রিং।",
        durationMinutes: 20,
        order: 2,
        pointsReward: 35,
        content: `# if / test

\`\`\`bash
if [[ -f "$file" ]]; then
  echo "file exists"
elif [[ -d "$file" ]]; then
  echo "directory"
else
  echo "missing"
fi

[[ $a -eq $b ]]
[[ -z "$str" ]]
[[ -n "$str" ]]
[[ "$str" == "hello" ]]
\`\`\``
      },
      {
        id: "les-09-03",
        moduleId: "mod-09",
        title: "লুপ: for, while, until",
        description: "ফাইল ব্যাচ প্রসেসিং।",
        durationMinutes: 18,
        order: 3,
        pointsReward: 30,
        content: `# লুপ

\`\`\`bash
for f in *.log; do
  echo "processing $f"
done

for i in {1..5}; do echo $i; done

while read -r line; do
  echo "$line"
done < file.txt
\`\`\``
      },
      {
        id: "les-09-04",
        moduleId: "mod-09",
        title: "ফাংশন, আর্গুমেন্ট, exit codes",
        description: "$1, $@, $?, ফাংশন রিটার্ন।",
        durationMinutes: 18,
        order: 4,
        pointsReward: 35,
        content: `# আর্গুমেন্ট ও ফাংশন

\`\`\`bash
#!/bin/bash
backup() {
  local src=$1
  tar -czf "backup-$(date +%F).tar.gz" "$src"
}
backup /etc

echo "script=$0 args=$# first=$1 all=$@"
some_command
echo "exit code: $?"
\`\`\``
      },
      {
        id: "les-09-05",
        moduleId: "mod-09",
        title: "ডিবাগ ও সেফ স্ক্রিপ্টিং",
        description: "set -x, set -e, shellcheck ধারণা।",
        durationMinutes: 14,
        order: 5,
        pointsReward: 30,
        content: `# সেফটি

\`\`\`bash
set -e          # error এ বেরিয়ে যাও
set -u          # undefined var এ এরর
set -o pipefail
set -x          # ট্রেস
bash -x script.sh
\`\`\`

\`shellcheck script.sh\` — স্ট্যাটিক অ্যানালাইসিস (ইনস্টল করে ব্যবহার)।`
      },
    ],
  },
  {
    id: "mod-10",
    title: "টেক্সট প্রসেসিং: sed, awk, cut, sort",
    description: "লগ অ্যানালাইসিস ও ডেটা ট্রান্সফর্মের অপরিহার্য টুল।",
    icon: "📝",
    order: 10,
    totalPoints: 220,
    lessons: [
      {
        id: "les-10-01",
        moduleId: "mod-10",
        title: "cut, sort, uniq, wc, tr",
        description: "কলাম ও কাউন্টিং।",
        durationMinutes: 16,
        order: 1,
        pointsReward: 30,
        content: `# টেক্সট ইউটিলিটি

\`\`\`bash
cut -d: -f1 /etc/passwd
sort file.txt
sort -n numbers.txt
sort file.txt | uniq -c | sort -nr
wc -l file.txt
tr 'a-z' 'A-Z' < file.txt
\`\`\``
      },
      {
        id: "les-10-02",
        moduleId: "mod-10",
        title: "sed বেসিক",
        description: "সার্চ-রিপ্লেস, ডিলিট লাইন।",
        durationMinutes: 18,
        order: 2,
        pointsReward: 35,
        content: `# sed

\`\`\`bash
sed 's/old/new/' file.txt
sed 's/old/new/g' file.txt
sed -i 's/old/new/g' file.txt
sed -n '10,20p' file.txt
sed '/^#/d' file.txt
\`\`\``
      },
      {
        id: "les-10-03",
        moduleId: "mod-10",
        title: "awk বেসিক",
        description: "ফিল্ড প্রসেসিং, প্যাটার্ন।",
        durationMinutes: 20,
        order: 3,
        pointsReward: 40,
        content: `# awk

\`\`\`bash
awk -F: '{print $1}' /etc/passwd
awk '{print $1, $3}' file.txt
awk '$3 > 100' data.txt
awk '/error/ {print $0}' app.log
awk 'END {print NR}' file.txt
\`\`\``
      },
    ],
  },
  {
    id: "mod-11",
    title: "systemd ও সার্ভিস ম্যানেজমেন্ট",
    description: "systemctl, journalctl, কাস্টম সার্ভিস ইউনিট।",
    icon: "⚙️",
    order: 11,
    totalPoints: 200,
    lessons: [
      {
        id: "les-11-01",
        moduleId: "mod-11",
        title: "systemctl দৈনন্দিন ব্যবহার",
        description: "start/stop/enable/status।",
        durationMinutes: 16,
        order: 1,
        pointsReward: 30,
        content: `# systemctl

\`\`\`bash
systemctl status nginx
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx
sudo systemctl reload nginx
sudo systemctl enable nginx
sudo systemctl disable nginx
systemctl is-active nginx
systemctl list-units --type=service --state=running
\`\`\``
      },
      {
        id: "les-11-02",
        moduleId: "mod-11",
        title: "journalctl দিয়ে লগ",
        description: "সার্ভিস লগ, টাইম ফিল্টার, ফলো।",
        durationMinutes: 14,
        order: 2,
        pointsReward: 30,
        content: `# journalctl

\`\`\`bash
journalctl -u nginx
journalctl -u nginx -f
journalctl --since "1 hour ago"
journalctl -p err
journalctl -b
\`\`\``
      },
      {
        id: "les-11-03",
        moduleId: "mod-11",
        title: "কাস্টম systemd সার্ভিস লেখা",
        description: "unit ফাইল স্ট্রাকচার।",
        durationMinutes: 20,
        order: 3,
        pointsReward: 40,
        content: `# কাস্টম সার্ভিস

\`/etc/systemd/system/myapp.service\`:
\`\`\`
[Unit]
Description=My App
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/myapp
ExecStart=/usr/bin/python3 /opt/myapp/app.py
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
\`\`\`

\`\`\`bash
sudo systemctl daemon-reload
sudo systemctl enable --now myapp
\`\`\``
      },
    ],
  },
  {
    id: "mod-12",
    title: "ডিস্ক, পার্টিশন, LVM",
    description: "lsblk, fdisk, mkfs, mount, fstab, LVM বেসিক।",
    icon: "💾",
    order: 12,
    totalPoints: 220,
    lessons: [
      {
        id: "les-12-01",
        moduleId: "mod-12",
        title: "ডিস্ক দেখা ও ফাইলসিস্টেম",
        description: "lsblk, df, blkid, mkfs।",
        durationMinutes: 16,
        order: 1,
        pointsReward: 30,
        content: `# ডিস্ক

\`\`\`bash
lsblk -f
sudo fdisk -l
df -hT
blkid
sudo mkfs.ext4 /dev/sdb1
sudo mkfs.xfs /dev/sdb1
\`\`\``
      },
      {
        id: "les-12-02",
        moduleId: "mod-12",
        title: "mount এবং fstab",
        description: "স্থায়ী মাউন্ট, UUID।",
        durationMinutes: 18,
        order: 2,
        pointsReward: 35,
        content: `# mount / fstab

\`\`\`bash
sudo mount /dev/sdb1 /mnt/data
sudo umount /mnt/data
\`\`\`

\`/etc/fstab\`:
\`\`\`
UUID=xxxx  /mnt/data  ext4  defaults  0  2
\`\`\`

\`\`\`bash
sudo findmnt
sudo mount -a
\`\`\``
      },
      {
        id: "les-12-03",
        moduleId: "mod-12",
        title: "LVM ধারণা",
        description: "PV, VG, LV — কেন দরকার।",
        durationMinutes: 18,
        order: 3,
        pointsReward: 35,
        content: `# LVM

PV → VG → LV

\`\`\`bash
sudo pvcreate /dev/sdb1
sudo vgcreate vgdata /dev/sdb1
sudo lvcreate -n lvdata -L 10G vgdata
sudo mkfs.ext4 /dev/vgdata/lvdata
\`\`\`

সুবিধা: সহজে রিসাইজ, স্ন্যাপশট।`
      },
    ],
  },
  {
    id: "mod-13",
    title: "ক্রোন, ব্যাকআপ, আর্কাইভ",
    description: "crontab, tar, gzip, rsync ব্যাকআপ স্ট্র্যাটেজি।",
    icon: "⏱️",
    order: 13,
    totalPoints: 200,
    lessons: [
      {
        id: "les-13-01",
        moduleId: "mod-13",
        title: "cron সম্পূর্ণ গাইড",
        description: "সিনট্যাক্স, crontab, সিস্টেম ক্রোন।",
        durationMinutes: 18,
        order: 1,
        pointsReward: 35,
        content: `# cron

\`\`\`bash
crontab -e
crontab -l
\`\`\`

\`\`\`
# m h dom mon dow command
0 2 * * * /opt/backup.sh
*/15 * * * * /usr/local/bin/check.sh
0 0 * * 0 /opt/weekly.sh
\`\`\`

\`/etc/cron.daily/\`, \`/etc/cron.d/\` ও দেখুন। লগ: \`/var/log/syslog\` এ CRON।`
      },
      {
        id: "les-13-02",
        moduleId: "mod-13",
        title: "tar, gzip, zip",
        description: "কম্প্রেশন ও আর্কাইভ।",
        durationMinutes: 14,
        order: 2,
        pointsReward: 25,
        content: `# আর্কাইভ

\`\`\`bash
tar -czvf backup.tar.gz /home/user
tar -xzvf backup.tar.gz
tar -tzvf backup.tar.gz
gzip file.txt
gunzip file.txt.gz
zip -r out.zip folder/
unzip out.zip
\`\`\``
      },
      {
        id: "les-13-03",
        moduleId: "mod-13",
        title: "rsync ব্যাকআপ",
        description: "লোকাল ও রিমোট সিঙ্ক।",
        durationMinutes: 16,
        order: 3,
        pointsReward: 35,
        content: `# rsync

\`\`\`bash
rsync -avh /source/ /backup/
rsync -avh --delete /source/ /backup/
rsync -avh -e ssh /data/ user@host:/backup/
\`\`\`

ট্রেইলিং \`/\` গুরুত্বপূর্ণ — সোর্স ডিরেক্টরির *কন্টেন্ট* vs ডিরেক্টরি নিজে।`
      },
    ],
  },
  {
    id: "mod-14",
    title: "সিকিউরিটি হার্ডেনিং",
    description: "SSH হার্ডেন, fail2ban, আপডেট, বেসিক অডিট।",
    icon: "🛡️",
    order: 14,
    totalPoints: 240,
    lessons: [
      {
        id: "les-14-01",
        moduleId: "mod-14",
        title: "সিস্টেম আপডেট ও আনঅটেন্ডেড আপগ্রেড",
        description: "সিকিউরিটি প্যাচ অভ্যাস।",
        durationMinutes: 12,
        order: 1,
        pointsReward: 25,
        content: `# আপডেট

\`\`\`bash
sudo apt update && sudo apt upgrade -y
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
\`\`\``
      },
      {
        id: "les-14-02",
        moduleId: "mod-14",
        title: "SSH হার্ডেনিং চেকলিস্ট",
        description: "কী-অনলি, root বন্ধ, পোর্ট, MaxAuthTries।",
        durationMinutes: 20,
        order: 2,
        pointsReward: 40,
        content: `# SSH হার্ডেন

\`/etc/ssh/sshd_config\`:
\`\`\`
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
# Port 2222
\`\`\`

\`\`\`bash
sudo sshd -t
sudo systemctl reload sshd
\`\`\`

**আগে** নতুন সেশনে কী-লগইন টেস্ট করুন।`
      },
      {
        id: "les-14-03",
        moduleId: "mod-14",
        title: "fail2ban",
        description: "ব্রুটফোর্স প্রতিরোধ।",
        durationMinutes: 14,
        order: 3,
        pointsReward: 30,
        content: `# fail2ban

\`\`\`bash
sudo apt install fail2ban
sudo systemctl enable --now fail2ban
sudo fail2ban-client status
sudo fail2ban-client status sshd
\`\`\``
      },
      {
        id: "les-14-04",
        moduleId: "mod-14",
        title: "ফাইল পারমিশন অডিট ও সিক্রেট",
        description: "world-writable, SSH key পারমিশন।",
        durationMinutes: 14,
        order: 4,
        pointsReward: 30,
        content: `# অডিট

\`\`\`bash
find / -perm -0002 -type f 2>/dev/null | head
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
chmod 600 ~/.ssh/authorized_keys
\`\`\``
      },
    ],
  },
  {
    id: "mod-15",
    title: "ট্রাবলশুটিং ও লগ অ্যানালাইসিস",
    description: "সিস্টেমেটিক ডিবাগ, বুট ইস্যু, কমন ফেইলর।",
    icon: "🔧",
    order: 15,
    totalPoints: 200,
    lessons: [
      {
        id: "les-15-01",
        moduleId: "mod-15",
        title: "ট্রাবলশুটিং চেকলিস্ট",
        description: "ধাপে ধাপে সমস্যা সমাধান।",
        durationMinutes: 18,
        order: 1,
        pointsReward: 35,
        content: `# চেকলিস্ট

1. কী এরর মেসেজ? \`journalctl -xe\`
2. সার্ভিস স্ট্যাটাস? \`systemctl status\`
3. ডিস্ক ফুল? \`df -h\`
4. মেমোরি? \`free -h\`
5. পোর্ট লিসেন? \`ss -tuln\`
6. নেটওয়ার্ক? \`ping\`, \`ip a\`
7. পারমিশন? \`ls -l\`, \`namei -l /path\`
8. লগ: \`/var/log/syslog\`, \`auth.log\``
      },
      {
        id: "les-15-02",
        moduleId: "mod-15",
        title: "গুরুত্বপূর্ণ লগ ফাইল",
        description: "auth.log, syslog, dmesg।",
        durationMinutes: 14,
        order: 2,
        pointsReward: 30,
        content: `# লগ

\`\`\`bash
sudo tail -f /var/log/auth.log
sudo tail -f /var/log/syslog
dmesg | tail
journalctl -p err -b
\`\`\``
      },
      {
        id: "les-15-03",
        moduleId: "mod-15",
        title: "বুট প্রসেস ধারণা",
        description: "BIOS/UEFI → bootloader → kernel → systemd।",
        durationMinutes: 14,
        order: 3,
        pointsReward: 30,
        content: `# বুট

1. UEFI/BIOS
2. GRUB (bootloader)
3. Kernel + initramfs
4. systemd (pid 1)
5. multi-user / graphical target

\`\`\`bash
systemctl get-default
ls /boot
\`\`\``
      },
    ],
  },
  {
    id: "mod-16",
    title: "অ্যাডভান্সড: Docker বেসিক অন লিনাক্স",
    description: "কন্টেইনার ধারণা, Docker ইনস্টল, ইমেজ, কন্টেইনার লাইফসাইকেল।",
    icon: "🐳",
    order: 16,
    totalPoints: 200,
    lessons: [
      {
        id: "les-16-01",
        moduleId: "mod-16",
        title: "কন্টেইনার vs VM",
        description: "কেন Docker, লিনাক্স নেমস্পেস/cgroups ধারণা।",
        durationMinutes: 14,
        order: 1,
        pointsReward: 25,
        content: `# কন্টেইনার

VM পুরো গেস্ট OS চালায়। কন্টেইনার হোস্ট কার্নেল শেয়ার করে — হালকা ও দ্রুত।

লিনাক্স ফিচার: namespaces, cgroups, union filesystem।`
      },
      {
        id: "les-16-02",
        moduleId: "mod-16",
        title: "Docker ইনস্টল ও বেসিক কমান্ড",
        description: "run, ps, logs, exec, stop।",
        durationMinutes: 20,
        order: 2,
        pointsReward: 40,
        content: `# Docker বেসিক

\`\`\`bash
sudo apt install docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
# re-login

docker run hello-world
docker run -d -p 8080:80 --name web nginx
docker ps
docker logs web
docker exec -it web bash
docker stop web
docker rm web
docker images
\`\`\``
      },
      {
        id: "les-16-03",
        moduleId: "mod-16",
        title: "Dockerfile ধারণা",
        description: "ইমেজ বিল্ডের প্রথম ধাপ।",
        durationMinutes: 16,
        order: 3,
        pointsReward: 35,
        content: `# Dockerfile

\`\`\`dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
\`\`\`

\`\`\`bash
docker build -t myapp .
docker run --rm myapp
\`\`\``
      },
    ],
  },
]
;

export const quizzes: Quiz[] = [
  {
    id: "quiz-01",
    title: "মডিউল ১ কুইজ: পরিচিতি ও FHS",
    moduleId: "mod-01",
    timeLimitMinutes: 15,
    passingScore: 70,
    questions: [
      { id: "q1", question: "লিনাক্স কার্নেল কে তৈরি করেন?", options: ["বিল গেটস", "লিনাস টরভাল্ডস", "স্টিভ জবস", "ডেনিস রিচি"], correctIndex: 1, explanation: "লিনাস টরভাল্ডস, ১৯৯১।", points: 10 },
      { id: "q2", question: "নবীনদের জন্য কোন ডিস্ট্রো সবচেয়ে উপযোগী?", options: ["Arch", "Gentoo", "Ubuntu LTS", "Slackware"], correctIndex: 2, explanation: "Ubuntu LTS নবীন-বান্ধব।", points: 10 },
      { id: "q3", question: "/etc ডিরেক্টরির প্রধান কাজ কী?", options: ["লগ রাখা", "কনফিগারেশন", "ইউজার হোম", "টেম্প ফাইল"], correctIndex: 1, explanation: "সিস্টেম কনফিগারেশন।", points: 10 },
      { id: "q4", question: "WSL-এর পূর্ণরূপ?", options: ["Windows System Linux", "Windows Subsystem for Linux", "Wide Server Linux", "Web Socket Linux"], correctIndex: 1, explanation: "Windows Subsystem for Linux।", points: 10 },
      { id: "q5", question: "root ইউজারের UID কত?", options: ["1", "0", "1000", "100"], correctIndex: 1, explanation: "UID 0 = root।", points: 10 },
      { id: "q6", question: "/var/log-এ সাধারণত কী থাকে?", options: ["বাইনারি", "লগ ফাইল", "কোনফিগ", "হোম"], correctIndex: 1, explanation: "সিস্টেম ও অ্যাপ লগ।", points: 10 },
    ],
  },
  {
    id: "quiz-02",
    title: "মডিউল ২ কুইজ: টার্মিনাল",
    moduleId: "mod-02",
    timeLimitMinutes: 15,
    passingScore: 70,
    questions: [
      { id: "q1", question: "বর্তমান ডিরেক্টরি দেখতে?", options: ["ls", "cd", "pwd", "dir"], correctIndex: 2, explanation: "pwd", points: 10 },
      { id: "q2", question: "লুকানো ফাইলসহ long listing?", options: ["ls -a", "ls -l", "ls -la", "ls -h"], correctIndex: 2, explanation: "ls -la", points: 10 },
      { id: "q3", question: "vim-এ সেভ করে বের হতে?", options: [":q", ":w", ":wq", "ZZZ"], correctIndex: 2, explanation: ":wq", points: 10 },
      { id: "q4", question: "আগের ডিরেক্টরিতে ফিরতে?", options: ["cd ..", "cd -", "cd ~", "cd /"], correctIndex: 1, explanation: "cd -", points: 10 },
      { id: "q5", question: "man পেজ থেকে বের হতে?", options: ["Esc", "q", "exit", "Ctrl+C"], correctIndex: 1, explanation: "q", points: 10 },
      { id: "q6", question: "last command আবার চালাতে?", options: ["!!", "!!", "!$", "#!"], correctIndex: 0, explanation: "!!", points: 10 },
    ],
  },
  {
    id: "quiz-03",
    title: "মডিউল ৩ কুইজ: সার্চ ও পাইপ",
    moduleId: "mod-03",
    timeLimitMinutes: 12,
    passingScore: 70,
    questions: [
      { id: "q1", question: "stdout ফাইলে ওভাররাইট?", options: [">>", ">", "|", "2>"], correctIndex: 1, explanation: ">", points: 10 },
      { id: "q2", question: "সব .log ফাইল খুঁজতে find?", options: ['find . -name "*.log"', "find *.log", "grep .log", "locate -r log"], correctIndex: 0, explanation: "find -name", points: 10 },
      { id: "q3", question: "কেস-ইনসেনসিটিভ grep?", options: ["grep -v", "grep -i", "grep -n", "grep -r"], correctIndex: 1, explanation: "grep -i", points: 10 },
      { id: "q4", question: "সফট লিংক তৈরি?", options: ["ln file", "ln -s target link", "link -s", "cp -s"], correctIndex: 1, explanation: "ln -s", points: 10 },
    ],
  },
  {
    id: "quiz-04",
    title: "মডিউল ৪ কুইজ: পারমিশন",
    moduleId: "mod-04",
    timeLimitMinutes: 12,
    passingScore: 70,
    questions: [
      { id: "q1", question: "chmod 755 মানে?", options: ["rwxrwxrwx", "rwxr-xr-x", "rw-r--r--", "rwx------"], correctIndex: 1, explanation: "owner rwx, group/other r-x", points: 10 },
      { id: "q2", question: "r,w,x অক্টাল?", options: ["1,2,3", "4,2,1", "2,4,1", "8,4,2"], correctIndex: 1, explanation: "4,2,1", points: 10 },
      { id: "q3", question: "SUID সেট?", options: ["chmod +t", "chmod u+s", "chmod g+s", "chmod +x"], correctIndex: 1, explanation: "u+s", points: 10 },
      { id: "q4", question: "ফাইলের মালিক বদলাতে?", options: ["chmod", "chown", "chgrp only", "umask"], correctIndex: 1, explanation: "chown", points: 10 },
      { id: "q5", question: "/tmp-এ sticky bit-এর কাজ?", options: ["সবাই ডিলিট করতে পারে", "শুধু মালিক ডিলিট", "এক্সিকিউট বন্ধ", "SUID"], correctIndex: 1, explanation: "শুধু মালিক ডিলিট করতে পারে", points: 10 },
    ],
  },
  {
    id: "quiz-05",
    title: "মডিউল ৫–৬ কুইজ: ইউজার ও প্রসেস",
    moduleId: "mod-06",
    timeLimitMinutes: 12,
    passingScore: 70,
    questions: [
      { id: "q1", question: "নতুন ইউজার + হোম?", options: ["adduser -r", "useradd -m", "newuser", "useradd only"], correctIndex: 1, explanation: "useradd -m", points: 10 },
      { id: "q2", question: "পাসওয়ার্ড হ্যাশ কোন ফাইলে?", options: ["/etc/passwd", "/etc/shadow", "/etc/group", "/etc/sudoers"], correctIndex: 1, explanation: "/etc/shadow", points: 10 },
      { id: "q3", question: "সব প্রসেস লিস্ট?", options: ["top only", "ps aux", "kill -l", "jobs"], correctIndex: 1, explanation: "ps aux", points: 10 },
      { id: "q4", question: "জোর করে প্রসেস মারতে?", options: ["kill -15", "kill -9", "kill -1", "pkill -15"], correctIndex: 1, explanation: "SIGKILL -9", points: 10 },
    ],
  },
  {
    id: "quiz-06",
    title: "মডিউল ৭–৮ কুইজ: প্যাকেজ ও নেটওয়ার্ক",
    moduleId: "mod-08",
    timeLimitMinutes: 15,
    passingScore: 70,
    questions: [
      { id: "q1", question: "প্যাকেজ লিস্ট আপডেট (Ubuntu)?", options: ["apt upgrade", "apt update", "apt refresh", "apt install"], correctIndex: 1, explanation: "apt update", points: 10 },
      { id: "q2", question: "IP দেখতে আধুনিক কমান্ড?", options: ["ifconfig", "ip a", "hostname -I only", "netstat"], correctIndex: 1, explanation: "ip a", points: 10 },
      { id: "q3", question: "লিসেনিং পোর্ট?", options: ["ping", "ss -tuln", "dig", "curl"], correctIndex: 1, explanation: "ss -tuln", points: 10 },
      { id: "q4", question: "SSH কী জেনারেট?", options: ["ssh-copy-id", "ssh-keygen", "ssh-add", "ssh-agent"], correctIndex: 1, explanation: "ssh-keygen", points: 10 },
      { id: "q5", question: "UFW-তে SSH খুলতে?", options: ["ufw open 22", "ufw allow 22/tcp", "ufw enable 22", "ufw start 22"], correctIndex: 1, explanation: "ufw allow 22/tcp", points: 10 },
    ],
  },
  {
    id: "quiz-07",
    title: "মডিউল ৯ কুইজ: শেল স্ক্রিপ্টিং",
    moduleId: "mod-09",
    timeLimitMinutes: 12,
    passingScore: 70,
    questions: [
      { id: "q1", question: "Shebang সঠিক?", options: ["#bash", "#!/bin/bash", "#!bash", "/bin/bash"], correctIndex: 1, explanation: "#!/bin/bash", points: 10 },
      { id: "q2", question: "স্ক্রিপ্ট এক্সিকিউটেবল?", options: ["chmod 644", "chmod +x", "chown +x", "bash +x"], correctIndex: 1, explanation: "chmod +x", points: 10 },
      { id: "q3", question: "প্রথম আর্গুমেন্ট?", options: ["$0", "$1", "$#", "$@"], correctIndex: 1, explanation: "$1", points: 10 },
      { id: "q4", question: "আগের কমান্ডের exit code?", options: ["$!", "$$", "$?", "$#"], correctIndex: 2, explanation: "$?", points: 10 },
    ],
  },
  {
    id: "quiz-08",
    title: "মডিউল ১০ কুইজ: sed/awk/cut",
    moduleId: "mod-10",
    timeLimitMinutes: 10,
    passingScore: 70,
    questions: [
      { id: "q1", question: "কolon দিয়ে প্রথম ফিল্ড (/etc/passwd)?", options: ["cut -f1", "cut -d: -f1", "awk passwd", "sed -f1"], correctIndex: 1, explanation: "cut -d: -f1", points: 10 },
      { id: "q2", question: "sed গ্লোবাল রিপ্লেস?", options: ["sed 's/a/b/'", "sed 's/a/b/g'", "sed 'g/a/b/'", "sed replace"], correctIndex: 1, explanation: "s/a/b/g", points: 10 },
      { id: "q3", question: "awk প্রথম কলাম?", options: ["awk '{print $0}'", "awk '{print $1}'", "awk -F1", "awk print"], correctIndex: 1, explanation: "$1", points: 10 },
    ],
  },
  {
    id: "quiz-09",
    title: "মডিউল ১১–১৩ কুইজ: systemd, ডিস্ক, cron",
    moduleId: "mod-13",
    timeLimitMinutes: 15,
    passingScore: 70,
    questions: [
      { id: "q1", question: "সার্ভিস বুটে অটো স্টার্ট?", options: ["systemctl start", "systemctl enable", "systemctl reload", "service on"], correctIndex: 1, explanation: "enable", points: 10 },
      { id: "q2", question: "সার্ভিস লগ ফলো?", options: ["journalctl -u x -f", "tail systemctl", "dmesg -u", "loginctl"], correctIndex: 0, explanation: "journalctl -f", points: 10 },
      { id: "q3", question: "প্রতিদিন রাত ২টায় cron?", options: ["0 2 * * *", "2 0 * * *", "0 * 2 * *", "* 2 * * *"], correctIndex: 0, explanation: "মিনিট=0 ঘণ্টা=2", points: 10 },
      { id: "q4", question: "স্থায়ী মাউন্ট কোন ফাইল?", options: ["/etc/passwd", "/etc/fstab", "/etc/mtab only", "/etc/mounts"], correctIndex: 1, explanation: "/etc/fstab", points: 10 },
      { id: "q5", question: "rsync সাধারণ আর্কাইভ মোড?", options: ["rsync -a", "rsync -delete only", "rsync -q", "rsync --tar"], correctIndex: 0, explanation: "-a archive", points: 10 },
    ],
  },
  {
    id: "quiz-10",
    title: "মডিউল ১৪–১৫ কুইজ: সিকিউরিটি ও ট্রাবলশুটিং",
    moduleId: "mod-15",
    timeLimitMinutes: 12,
    passingScore: 70,
    questions: [
      { id: "q1", question: "SSH-এ root লগইন বন্ধ?", options: ["RootLogin no", "PermitRootLogin no", "DenyRoot yes", "AllowUsers only"], correctIndex: 1, explanation: "PermitRootLogin no", points: 10 },
      { id: "q2", question: "ব্রুটফোর্স কমানোর টুল?", options: ["htop", "fail2ban", "cron", "rsync"], correctIndex: 1, explanation: "fail2ban", points: 10 },
      { id: "q3", question: "~/.ssh প্রাইভেট কী পারমিশন?", options: ["777", "644", "600", "755"], correctIndex: 2, explanation: "600", points: 10 },
      { id: "q4", question: "ডিস্ক ফুল কিনা দেখতে?", options: ["free -h", "df -h", "du only", "top"], correctIndex: 1, explanation: "df -h", points: 10 },
    ],
  },
  {
    id: "quiz-midterm",
    title: "মধ্যবর্তী পরীক্ষা (মডিউল ১–৮)",
    moduleId: "mod-08",
    timeLimitMinutes: 30,
    passingScore: 75,
    questions: [
      { id: "q1", question: "FHS অনুযায়ী কনফিগ কোথায়?", options: ["/var", "/etc", "/opt", "/usr"], correctIndex: 1, explanation: "/etc", points: 10 },
      { id: "q2", question: "stderr আলাদা ফাইলে?", options: [">", ">>", "2>", "|"], correctIndex: 2, explanation: "2>", points: 10 },
      { id: "q3", question: "chmod 644?", options: ["rwxr-xr-x", "rw-r--r--", "rwx------", "r--------"], correctIndex: 1, explanation: "rw-r--r--", points: 10 },
      { id: "q4", question: "পাসওয়ার্ড ফাইল (readable map)?", options: ["/etc/shadow", "/etc/passwd", "/etc/group", "/etc/sudo"], correctIndex: 1, explanation: "/etc/passwd (shadow is hashed secrets)", points: 10 },
      { id: "q5", question: "প্রসেস ট্রিতে দেখতে?", options: ["ps tree", "pstree", "top -t", "jobs -t"], correctIndex: 1, explanation: "pstree", points: 10 },
      { id: "q6", question: "প্যাকেজ পুরোপুরি মুছতে (config সহ)?", options: ["apt remove", "apt purge", "apt clean", "dpkg -r"], correctIndex: 1, explanation: "purge", points: 10 },
      { id: "q7", question: "SSH কী কপি রিমোটে?", options: ["ssh-keygen", "ssh-copy-id", "scp only", "rsync key"], correctIndex: 1, explanation: "ssh-copy-id", points: 10 },
      { id: "q8", question: "ডিফল্ট UFW incoming?", options: ["allow all", "deny (recommended)", "reject only", "limit"], correctIndex: 1, explanation: "default deny incoming recommended", points: 10 },
    ],
  },
  {
    id: "quiz-final",
    title: "ফাইনাল পরীক্ষা: Linux Hero Certificate",
    moduleId: "mod-16",
    timeLimitMinutes: 40,
    passingScore: 80,
    questions: [
      { id: "q1", question: "systemd unit enable মানে?", options: ["এখনই স্টার্ট", "বুটে অটো স্টার্ট", "রিলোড", "মাস্ক"], correctIndex: 1, explanation: "boot enable", points: 10 },
      { id: "q2", question: "cron: প্রতি রবিবার মধ্যরাত?", options: ["0 0 * * 0", "0 0 * * 7 only", "* * * * 0", "0 12 * * 0"], correctIndex: 0, explanation: "0 0 * * 0", points: 10 },
      { id: "q3", question: "fstab-এ স্থিতিশীল আইডেন্টিফায়ার?", options: ["সার্ভার নাম", "UUID", "IP", "MAC"], correctIndex: 1, explanation: "UUID", points: 10 },
      { id: "q4", question: "set -e স্ক্রিপ্টে কী করে?", options: ["ইকো অফ", "এররে এক্সিট", "ডিবাগ অন", "পাইপ ফেইল ইগনোর"], correctIndex: 1, explanation: "exit on error", points: 10 },
      { id: "q5", question: "Docker কন্টেইনার ব্যাকগ্রাউন্ড?", options: ["docker run -it", "docker run -d", "docker start -i", "docker exec -d only"], correctIndex: 1, explanation: "-d detached", points: 10 },
      { id: "q6", question: "SUID বিটের প্রভাব?", options: ["গ্রুপ পারমিশন", "owner পারমিশনে রান", "sticky delete", "umask"], correctIndex: 1, explanation: "run as file owner", points: 10 },
      { id: "q7", question: "লগ ফলো journalctl?", options: ["-u service -f", "-follow only without -u", "-x", "-b only"], correctIndex: 0, explanation: "-u and -f", points: 10 },
      { id: "q8", question: "rsync ডিলিট এক্সট্রা ফাইল ব্যাকআপে?", options: ["--delete", "--remove", "--force", "--clean"], correctIndex: 0, explanation: "--delete", points: 10 },
      { id: "q9", question: "world-writable ফাইল খুঁজতে?", options: ["find / -perm -0002", "ls -l | grep w", "chmod -find", "grep 777"], correctIndex: 0, explanation: "find -perm -0002", points: 10 },
      { id: "q10", question: "LVM অর্ডার?", options: ["LV→VG→PV", "PV→VG→LV", "VG→PV→LV", "PV→LV→VG"], correctIndex: 1, explanation: "PV VG LV", points: 10 },
    ],
  },
];

export const exercises: PracticeExercise[] = [
  {
    id: "ex-01",
    title: "ল্যাব: নেভিগেশন ও ফাইল তৈরি",
    description: "হোম থেকে প্রজেক্ট স্ট্রাকচার বানান।",
    moduleId: "mod-02",
    difficulty: "সহজ",
    pointsReward: 40,
    instructions: [
      "pwd এবং ls -la চালান",
      "mkdir -p ~/linux-labs/lab1/{src,docs,bin}",
      "cd ~/linux-labs/lab1 এবং touch src/main.txt docs/readme.md",
      "echo 'hello lab1' > src/main.txt",
      "cp src/main.txt src/main.bak && mv src/main.bak bin/",
      "tree ~/linux-labs বা find ~/linux-labs -print",
    ],
    expectedCommands: ["pwd", "mkdir -p", "touch", "echo", "cp", "mv", "find"],
    hints: ["mkdir -p নেস্টেড ফোল্ডার একসাথে বানায়", "cd ~ দিয়ে হোমে যান"],
  },
  {
    id: "ex-02",
    title: "ল্যাব: পাইপ ও গ্রেপ",
    description: "লগ সিমুলেশন ফাইলে সার্চ।",
    moduleId: "mod-03",
    difficulty: "সহজ",
    pointsReward: 45,
    instructions: [
      "printf 'INFO ok\\nERROR fail\\nINFO ok\\nERROR disk\\n' > /tmp/app.log",
      "grep ERROR /tmp/app.log",
      "grep -c ERROR /tmp/app.log",
      "cat /tmp/app.log | sort | uniq -c",
      "grep ERROR /tmp/app.log > /tmp/errors.txt && cat /tmp/errors.txt",
    ],
    expectedCommands: ["grep", "sort", "uniq", "redirect"],
    hints: ["grep -c কাউন্ট দেয়", "> দিয়ে ফাইলে সেভ"],
  },
  {
    id: "ex-03",
    title: "ল্যাব: find ও ডিলিট ড্রাই-রান",
    description: "পুরনো tmp ফাইল খুঁজে তালিকা।",
    moduleId: "mod-03",
    difficulty: "মাঝারি",
    pointsReward: 50,
    instructions: [
      "mkdir -p /tmp/findlab && touch /tmp/findlab/a.txt /tmp/findlab/b.tmp /tmp/findlab/c.tmp",
      "find /tmp/findlab -name '*.tmp'",
      "find /tmp/findlab -type f -name '*.tmp' -print",
      "ডিলিটের আগে শুধু প্রিন্ট — -delete ব্যবহার করার আগে নিশ্চিত হন",
    ],
    expectedCommands: ["find", "-name", "-type f"],
    hints: ["প্রথমে -print, পরে -delete"],
  },
  {
    id: "ex-04",
    title: "ল্যাব: পারমিশন সেটআপ",
    description: "স্ক্রিপ্ট 755, সিক্রেট ফাইল 600।",
    moduleId: "mod-04",
    difficulty: "সহজ",
    pointsReward: 50,
    instructions: [
      "echo '#!/bin/bash' > ~/linux-labs/hello.sh && echo 'echo Hello' >> ~/linux-labs/hello.sh",
      "chmod 755 ~/linux-labs/hello.sh && ~/linux-labs/hello.sh",
      "echo secret > ~/linux-labs/secret.txt && chmod 600 ~/linux-labs/secret.txt",
      "ls -l ~/linux-labs/",
    ],
    expectedCommands: ["chmod 755", "chmod 600", "ls -l"],
    hints: ["600 = rw-------"],
  },
  {
    id: "ex-05",
    title: "ল্যাব: ইউজার/গ্রুপ (VM-এ)",
    description: "টেস্ট ইউজার ও গ্রুপ তৈরি।",
    moduleId: "mod-05",
    difficulty: "মাঝারি",
    pointsReward: 60,
    instructions: [
      "sudo groupadd linuxclass",
      "sudo useradd -m -s /bin/bash -G linuxclass labuser",
      "sudo passwd labuser",
      "id labuser && groups labuser",
      "সম্পন্ন হলে sudo userdel -r labuser; sudo groupdel linuxclass (ক্লিনআপ)",
    ],
    expectedCommands: ["groupadd", "useradd", "id", "groups"],
    hints: ["-G supplementary group", "userdel -r হোম মুছে"],
  },
  {
    id: "ex-06",
    title: "ল্যাব: প্রসেস মনিটর",
    description: "CPU/মেমোরি টপ প্রসেস।",
    moduleId: "mod-06",
    difficulty: "সহজ",
    pointsReward: 45,
    instructions: [
      "ps aux --sort=-%cpu | head -5",
      "ps aux --sort=-%mem | head -5",
      "free -h && df -h | head",
      "uptime",
    ],
    expectedCommands: ["ps aux", "free", "df", "uptime"],
    hints: ["--sort=-%mem মেমোরি অনুযায়ী"],
  },
  {
    id: "ex-07",
    title: "ল্যাব: প্যাকেজ ইনস্টল",
    description: "htop/curl ইনস্টল ও যাচাই।",
    moduleId: "mod-07",
    difficulty: "সহজ",
    pointsReward: 40,
    instructions: [
      "sudo apt update",
      "sudo apt install -y htop curl",
      "which htop curl",
      "apt show htop | head -10",
    ],
    expectedCommands: ["apt update", "apt install", "which"],
    hints: ["আগে update"],
  },
  {
    id: "ex-08",
    title: "ল্যাব: নেটওয়ার্ক ডায়াগনস্টিকস",
    description: "IP, DNS, পোর্ট, HTTP হেডার।",
    moduleId: "mod-08",
    difficulty: "মাঝারি",
    pointsReward: 55,
    instructions: [
      "ip a | grep -A2 'inet '",
      "ping -c 3 8.8.8.8",
      "dig +short example.com",
      "ss -tuln | head",
      "curl -I https://example.com",
    ],
    expectedCommands: ["ip", "ping", "dig", "ss", "curl"],
    hints: ["ss -tuln লিসেনিং পোর্ট"],
  },
  {
    id: "ex-09",
    title: "ল্যাব: SSH কী (লোকাল)",
    description: "ed25519 কী জেনারেট ও পারমিশন।",
    moduleId: "mod-08",
    difficulty: "মাঝারি",
    pointsReward: 50,
    instructions: [
      "ssh-keygen -t ed25519 -f ~/.ssh/lab_ed25519 -N '' -C 'lab-key'",
      "chmod 700 ~/.ssh && chmod 600 ~/.ssh/lab_ed25519 && chmod 644 ~/.ssh/lab_ed25519.pub",
      "ls -la ~/.ssh/lab_ed25519*",
    ],
    expectedCommands: ["ssh-keygen", "chmod"],
    hints: ["প্রাইভেট কী 600"],
  },
  {
    id: "ex-10",
    title: "ল্যাব: প্রথম Bash স্ক্রিপ্ট",
    description: "sysinfo.sh লিখে রান।",
    moduleId: "mod-09",
    difficulty: "মাঝারি",
    pointsReward: 60,
    instructions: [
      "cat > ~/linux-labs/sysinfo.sh << 'EOF'\\n#!/bin/bash\\nset -euo pipefail\\necho \"Host: $(hostname)\"\\necho \"Date: $(date)\"\\nfree -h | head -2\\ndf -h / | tail -1\\nEOF",
      "chmod +x ~/linux-labs/sysinfo.sh",
      "./linux-labs/sysinfo.sh অথবা bash ~/linux-labs/sysinfo.sh",
    ],
    expectedCommands: ["shebang", "chmod +x", "hostname", "free", "df"],
    hints: ["set -euo pipefail সেফ ডিফল্ট"],
  },
  {
    id: "ex-11",
    title: "ল্যাব: for লুপ ব্যাচ",
    description: "একাধিক ফাইলে একই অপারেশন।",
    moduleId: "mod-09",
    difficulty: "মাঝারি",
    pointsReward: 55,
    instructions: [
      "mkdir -p ~/linux-labs/batch && touch ~/linux-labs/batch/{1..5}.txt",
      "for f in ~/linux-labs/batch/*.txt; do echo \"processed $(basename $f)\" >> \"$f\"; done",
      "cat ~/linux-labs/batch/1.txt",
    ],
    expectedCommands: ["for", "glob", "basename"],
    hints: ["\"$f\" কোট করুন"],
  },
  {
    id: "ex-12",
    title: "ল্যাব: cut/sort/awk",
    description: "/etc/passwd থেকে ইউজারনেম সর্ট।",
    moduleId: "mod-10",
    difficulty: "মাঝারি",
    pointsReward: 50,
    instructions: [
      "cut -d: -f1 /etc/passwd | sort | head",
      "awk -F: '{print $1}' /etc/passwd | sort | head",
      "wc -l /etc/passwd",
    ],
    expectedCommands: ["cut", "awk", "sort"],
    hints: ["-d: বা -F:"],
  },
  {
    id: "ex-13",
    title: "ল্যাব: systemctl স্ট্যাটাস",
    description: "একটি সার্ভিসের স্ট্যাটাস ও লগ।",
    moduleId: "mod-11",
    difficulty: "সহজ",
    pointsReward: 45,
    instructions: [
      "systemctl status ssh || systemctl status sshd",
      "systemctl is-enabled ssh || systemctl is-enabled sshd",
      "journalctl -u ssh -n 20 --no-pager || journalctl -u sshd -n 20 --no-pager",
    ],
    expectedCommands: ["systemctl", "journalctl"],
    hints: ["ডিস্ট্রোভেদে ssh vs sshd"],
  },
  {
    id: "ex-14",
    title: "ল্যাব: tar ব্যাকআপ + cron লাইন",
    description: "আর্কাইভ বানিয়ে crontab এন্ট্রি ডিজাইন।",
    moduleId: "mod-13",
    difficulty: "মাঝারি",
    pointsReward: 55,
    instructions: [
      "tar -czvf ~/linux-labs/home-docs-$(date +%F).tar.gz ~/linux-labs/lab1 2>/dev/null || tar -czvf ~/backup-lab.tar.gz ~/linux-labs",
      "tar -tzvf ~/backup-lab.tar.gz 2>/dev/null | head || tar -tzvf ~/linux-labs/home-docs-*.tar.gz | head",
      "crontab এন্ট্রি লিখুন (চালানো বাধ্যতামূলক নয়): 0 3 * * * tar -czf $HOME/nightly.tar.gz $HOME/linux-labs",
    ],
    expectedCommands: ["tar -czvf", "tar -tzvf"],
    hints: ["-c create -z gzip -v verbose -f file"],
  },
  {
    id: "ex-15",
    title: "ল্যাব: সিকিউরিটি চেকলিস্ট",
    description: "SSH ফোল্ডার পারমিশন ও আপডেট চেক।",
    moduleId: "mod-14",
    difficulty: "মাঝারি",
    pointsReward: 50,
    instructions: [
      "ls -ld ~/.ssh 2>/dev/null; ls -l ~/.ssh 2>/dev/null | head",
      "sudo apt update && apt list --upgradable 2>/dev/null | head",
      "ss -tuln | grep -E ':22|:2222' || true",
    ],
    expectedCommands: ["ls -l .ssh", "apt list --upgradable", "ss"],
    hints: [".ssh 700, private key 600"],
  },
  {
    id: "ex-16",
    title: "ল্যাব: ট্রাবলশুটিং সিমুলেশন",
    description: "ডিস্ক/মেমোরি/সার্ভিস চেক রুটিন।",
    moduleId: "mod-15",
    difficulty: "মাঝারি",
    pointsReward: 50,
    instructions: [
      "df -h",
      "free -h",
      "systemctl --failed",
      "journalctl -p err -b --no-pager | tail -20",
    ],
    expectedCommands: ["df", "free", "systemctl --failed", "journalctl"],
    hints: ["--failed ব্রোকেন সার্ভিস দেখায়"],
  },
  {
    id: "ex-17",
    title: "ল্যাব: Docker হ্যালো (ঐচ্ছিক)",
    description: "Docker ইনস্টল থাকলে hello-world।",
    moduleId: "mod-16",
    difficulty: "কঠিন",
    pointsReward: 70,
    instructions: [
      "docker --version || sudo apt install -y docker.io",
      "sudo systemctl start docker",
      "sudo docker run --rm hello-world",
      "sudo docker run --rm -p 8080:80 nginx  # Ctrl+C পরে; বা -d মোডে রান করে stop",
    ],
    expectedCommands: ["docker run", "hello-world"],
    hints: ["ইউজারকে docker গ্রুপে যোগ করলে sudo কম লাগে"],
  },
  {
    id: "ex-18",
    title: "ক্যাপস্টোন: মিনি অটোমেশন স্ক্রিপ্ট",
    description: "ব্যাকআপ+সিস্টেম রিপোর্ট এক স্ক্রিপ্টে।",
    moduleId: "mod-15",
    difficulty: "কঠিন",
    pointsReward: 80,
    instructions: [
      "স্ক্রিপ্ট ~/linux-labs/capstone.sh লিখুন যা: তারিখ, hostname, uptime, df -h, free -h প্রিন্ট করে report.txt-এ সেভ করে",
      "একই স্ক্রিপ্ট linux-labs ফোল্ডার tar.gz ব্যাকআপ নেয়",
      "chmod +x করে রান করুন",
      "(বোনাস) crontab -e তে সাপ্তাহিক এন্ট্রি যোগ করুন",
    ],
    expectedCommands: ["bash script", "tar", "redirect", "chmod"],
    hints: ["set -euo pipefail দিয়ে শুরু করুন"],
  },
];

export const badges: Badge[] = [
  { id: "badge-first-lesson", name: "প্রথম পদক্ষেপ", description: "প্রথম লেসন সম্পন্ন", icon: "🎯", requiredLessons: 1 },
  { id: "badge-10-lessons", name: "নিয়মিত শিক্ষার্থী", description: "১০টি লেসন সম্পন্ন", icon: "📖", requiredLessons: 10 },
  { id: "badge-25-lessons", name: "গভীর শিক্ষার্থী", description: "২৫টি লেসন সম্পন্ন", icon: "📚", requiredLessons: 25 },
  { id: "badge-all-lessons", name: "লিনাক্স হিরো", description: "সব লেসন সম্পন্ন", icon: "🦸", requiredLessons: 63 },
  { id: "badge-first-quiz", name: "প্রথম কুইজ", description: "১টি কুইজ পাস", icon: "✏️", requiredQuizzes: 1 },
  { id: "badge-quiz-master", name: "কুইজ মাস্টার", description: "৫টি কুইজ পাস", icon: "🏆", requiredQuizzes: 5 },
  { id: "badge-midterm", name: "মিডটার্ম পাস", description: "মধ্যবর্তী পরীক্ষা পাস", icon: "📋" },
  { id: "badge-final", name: "সার্টিফাইড হিরো", description: "ফাইনাল পরীক্ষা পাস", icon: "🏅" },
  { id: "badge-100-points", name: "শতক", description: "১০০ পয়েন্ট", icon: "💯", requiredPoints: 100 },
  { id: "badge-500-points", name: "পঞ্চশতক", description: "৫০০ পয়েন্ট", icon: "⭐", requiredPoints: 500 },
  { id: "badge-1500-points", name: "অভিজাত", description: "১৫০০ পয়েন্ট", icon: "🌟", requiredPoints: 1500 },
  { id: "badge-scripter", name: "স্ক্রিপ্টার", description: "শেল স্ক্রিপ্টিং প্র্যাকটিস", icon: "📜" },
  { id: "badge-network", name: "নেটওয়ার্ক নিনজা", description: "নেটওয়ার্কিং ল্যাব", icon: "🌐" },
  { id: "badge-secure", name: "সিকিউরিটি গার্ড", description: "সিকিউরিটি ল্যাব", icon: "🛡️" },
];

export const sampleLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "রাফি আহমেদ", points: 3200, level: "হিরো" },
  { rank: 2, name: "সুমাইয়া খান", points: 2800, level: "হিরো" },
  { rank: 3, name: "তানভীর হাসান", points: 2400, level: "বিশেষজ্ঞ" },
  { rank: 4, name: "নুসরাত জাহান", points: 1900, level: "বিশেষজ্ঞ" },
  { rank: 5, name: "আরিফ রহমান", points: 1500, level: "দক্ষ" },
  { rank: 6, name: "ফারহানা ইসলাম", points: 1100, level: "দক্ষ" },
  { rank: 7, name: "মাহমুদুল হাসান", points: 800, level: "মধ্যম" },
  { rank: 8, name: "সাদিয়া আফরিন", points: 550, level: "মধ্যম" },
  { rank: 9, name: "ইমরান হোসেন", points: 300, level: "শিক্ষানবিশ" },
  { rank: 10, name: "আপনি", points: 0, level: "নবীন" },
];

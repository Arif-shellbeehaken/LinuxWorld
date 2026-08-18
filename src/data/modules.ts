import { Module, Quiz, PracticeExercise, Badge, LeaderboardEntry } from "@/types";

/**
 * Complete Linux Zero to Hero Curriculum (Bangla)
 * 12 Modules covering everything from absolute beginner to confident Linux user/admin.
 */
export const modules: Module[] = [
  // ==================== MODULE 1 ====================
  {
    id: "mod-01",
    title: "লিনাক্স পরিচিতি ও ইনস্টলেশন",
    description: "লিনাক্স কী, ইতিহাস, ডিস্ট্রিবিউশন এবং নিরাপদভাবে ইনস্টল করা।",
    icon: "🐧",
    order: 1,
    totalPoints: 180,
    lessons: [
      {
        id: "les-01-01",
        moduleId: "mod-01",
        title: "লিনাক্স কী এবং কেন শিখবেন?",
        description: "লিনাক্সের মূল ধারণা, ওপেন সোর্স এবং ক্যারিয়ারের গুরুত্ব।",
        durationMinutes: 12,
        order: 1,
        pointsReward: 20,
        content: `# লিনাক্স কী এবং কেন শিখবেন?

লিনাক্স একটি **ওপেন সোর্স** অপারেটিং সিস্টেম কার্নেল যা লিনাস টরভাল্ডস ১৯৯১ সালে তৈরি করেন।

## কেন লিনাক্স শিখবেন?
- **সার্ভারের রাজা**: বিশ্বের বেশিরভাগ ওয়েব সার্ভার, ক্লাউড ও সুপারকম্পিউটার লিনাক্সে চলে।
- **DevOps ও Cloud**: Docker, Kubernetes, AWS, GCP — সব লিনাক্স ভিত্তিক।
- **সাইবার সিকিউরিটি**: পেনিট্রেশন টেস্টিং ও সিকিউরিটি টুলসের জন্য অপরিহার্য।
- **বিনামূল্যে ও কাস্টমাইজেবল**: সম্পূর্ণ নিয়ন্ত্রণ আপনার হাতে।
- **চাকরির বাজার**: সিস্টেম অ্যাডমিন, DevOps Engineer, SRE — সবাই লিনাক্স জানে।

## লিনাক্স vs উইন্ডোজ vs ম্যাক
| বিষয়          | লিনাক্স      | উইন্ডোজ   | ম্যাক     |
|----------------|--------------|-----------|-----------|
| মূল্য          | বিনামূল্যে   | পেইড      | পেইড      |
| সোর্স কোড      | ওপেন         | ক্লোজড    | ক্লোজড    |
| সার্ভার ব্যবহার| সর্বোচ্চ     | কম        | খুব কম    |
| কাস্টমাইজেশন   | অসীম         | সীমিত     | সীমিত     |

পরবর্তী লেসনে আমরা ডিস্ট্রিবিউশন সম্পর্কে জানব।`
      },
      {
        id: "les-01-02",
        moduleId: "mod-01",
        title: "লিনাক্স ডিস্ট্রিবিউশন (Distro)",
        description: "Ubuntu, Debian, Fedora, Arch, Kali ইত্যাদি বোঝা।",
        durationMinutes: 15,
        order: 2,
        pointsReward: 25,
        content: `# লিনাক্স ডিস্ট্রিবিউশন

একটি **ডিস্ট্রিবিউশন** = লিনাক্স কার্নেল + সফটওয়্যার প্যাকেজ + প্যাকেজ ম্যানেজার + ডিফল্ট কনফিগ।

## জনপ্রিয় ডিস্ট্রোসমূহ

### ১. Ubuntu
- নবীনদের জন্য সেরা
- Canonical সাপোর্টেড, LTS ভার্সন
- APT প্যাকেজ ম্যানেজার

### ২. Debian
- অত্যন্ত স্থিতিশীল
- Ubuntu-এর ভিত্তি

### ৩. Fedora
- Red Hat-এর কমিউনিটি ভার্সন
- নতুন টেকনোলজি আগে আসে

### ৪. Arch Linux
- রোলিং রিলিজ, সম্পূর্ণ কাস্টম
- নবীনদের জন্য কঠিন (learning curve বেশি)

### ৫. Kali Linux
- সাইবার সিকিউরিটি ও পেনিট্রেশন টেস্টিংয়ের জন্য

### ৬. Rocky / AlmaLinux
- RHEL ক্লোন — এন্টারপ্রাইজ সার্ভারের জন্য

**পরামর্শ**: শুরুতে **Ubuntu 24.04 LTS** ব্যবহার করুন।`
      },
      {
        id: "les-01-03",
        moduleId: "mod-01",
        title: "ইনস্টলেশন: VM, Dual Boot ও WSL",
        description: "VirtualBox, Dual Boot এবং WSL2 দিয়ে লিনাক্স চালু করা।",
        durationMinutes: 22,
        order: 3,
        pointsReward: 35,
        content: `# লিনাক্স ইনস্টলেশন

## ১. সবচেয়ে নিরাপদ: Virtual Machine
1. VirtualBox বা VMware Player ইনস্টল করুন
2. Ubuntu ISO ডাউনলোড করুন
3. নতুন VM: RAM ২-৪GB, Storage ২৫GB+, Network Bridged/NAT

## ২. Dual Boot
উইন্ডোজের পাশাপাশি ইনস্টল। **আগে ব্যাকআপ নিন**।

## ৩. WSL2 (Windows Subsystem for Linux)
\`\`\`bash
wsl --install
wsl --set-default-version 2
\`\`\`
উইন্ডোজেই পূর্ণ লিনাক্স এনভায়রনমেন্ট পাবেন।

## ৪. ক্লাউড (AWS EC2 / DigitalOcean)
সার্ভার লিনাক্স শেখার জন্য দুর্দান্ত।

ইনস্টল শেষে প্রথম আপডেট:
\`\`\`bash
sudo apt update && sudo apt upgrade -y
\`\`\``
      },
      {
        id: "les-01-04",
        moduleId: "mod-01",
        title: "লিনাক্স ফাইল সিস্টেম হাইয়ারার্কি",
        description: "/, /home, /etc, /var, /usr ইত্যাদি বোঝা।",
        durationMinutes: 18,
        order: 4,
        pointsReward: 30,
        content: `# লিনাক্স ফাইল সিস্টেম হাইয়ারার্কি (FHS)

লিনাক্সে সবকিছুই ফাইল। মূল ডিরেক্টরিগুলো:

| পাথ      | কাজ                          |
|----------|------------------------------|
| \`/\`      | রুট (সবকিছুর শুরু)           |
| \`/home\`  | ইউজারদের হোম                 |
| \`/etc\`   | সিস্টেম কনফিগারেশন           |
| \`/var\`   | লগ, ক্যাশ, ভ্যারিয়েবল ডেটা  |
| \`/usr\`   | ইউজার প্রোগ্রাম ও লাইব্রেরি  |
| \`/bin\`   | বেসিক কমান্ড                 |
| \`/sbin\`  | সিস্টেম অ্যাডমিন কমান্ড      |
| \`/tmp\`   | টেম্পোরারি ফাইল              |
| \`/opt\`   | অপশনাল সফটওয়্যার            |
| \`/dev\`   | ডিভাইস ফাইল                  |
| \`/proc\`  | প্রসেস ও কার্নেল তথ্য        |

\`\`\`bash
ls /
man hier   # FHS ম্যানুয়াল
\`\`\``
      },
    ],
  },

  // ==================== MODULE 2 ====================
  {
    id: "mod-02",
    title: "টার্মিনাল ও মৌলিক কমান্ড",
    description: "টার্মিনালে দক্ষতা — নেভিগেশন, ফাইল ম্যানেজমেন্ট, ভিউয়ার।",
    icon: "⌨️",
    order: 2,
    totalPoints: 280,
    lessons: [
      {
        id: "les-02-01",
        moduleId: "mod-02",
        title: "টার্মিনাল পরিচিতি ও নেভিগেশন",
        description: "pwd, ls, cd, clear, history",
        durationMinutes: 18,
        order: 1,
        pointsReward: 25,
        content: `# টার্মিনাল পরিচিতি

টার্মিনাল = লিনাক্সের সবচেয়ে শক্তিশালী টুল।

\`\`\`bash
pwd              # Print Working Directory
ls               # তালিকা
ls -la           # বিস্তারিত + লুকানো ফাইল
ls -lh           # human-readable সাইজ
cd /home         # ডিরেক্টরি পরিবর্তন
cd ..            # এক ধাপ উপরে
cd ~             # হোম
cd -             # আগের ডিরেক্টরিতে
clear            # স্ক্রিন পরিষ্কার (Ctrl+L)
history          # কমান্ড ইতিহাস
!!               # আগের কমান্ড আবার
!n               # history-এর n নম্বর কমান্ড
\`\`\`

**টিপস**: Tab = অটো-কমপ্লিট, ↑↓ = আগের কমান্ড।`
      },
      {
        id: "les-02-02",
        moduleId: "mod-02",
        title: "ফাইল ও ডিরেক্টরি ম্যানেজমেন্ট",
        description: "mkdir, touch, cp, mv, rm, rmdir",
        durationMinutes: 20,
        order: 2,
        pointsReward: 30,
        content: `# ফাইল ও ডিরেক্টরি ম্যানেজমেন্ট

\`\`\`bash
mkdir myfolder
mkdir -p a/b/c          # নেস্টেড
touch file.txt          # খালি ফাইল
cp file.txt backup.txt
cp -r folder1 folder2
mv old.txt new.txt      # মুভ/রিনেম
rm file.txt
rm -r folder            # রিকার্সিভ
rm -rf folder           # ফোর্স (সাবধানে!)
rmdir emptydir          # শুধু খালি ডিরেক্টরি
\`\`\`

⚠️ \`rm -rf /\` বা \`rm -rf /*\` সিস্টেম নষ্ট করতে পারে। কখনোই রুট থেকে এভাবে রান করবেন না।`
      },
      {
        id: "les-02-03",
        moduleId: "mod-02",
        title: "ফাইল দেখা ও এডিট করা",
        description: "cat, less, more, head, tail, nano, vim",
        durationMinutes: 22,
        order: 3,
        pointsReward: 35,
        content: `# ফাইল দেখা ও এডিট

\`\`\`bash
cat file.txt
less file.txt           # q দিয়ে বের হন
more file.txt
head -n 20 file.txt
tail -n 50 file.txt
tail -f /var/log/syslog # লাইভ লগ
\`\`\`

## এডিটর
**nano** (সহজ):
\`\`\`bash
nano file.txt
# Ctrl+O = সেভ, Ctrl+X = এক্সিট, Ctrl+W = সার্চ
\`\`\`

**vim** (শক্তিশালী):
\`\`\`bash
vim file.txt
# i = insert মোড, Esc = নর্মাল
# :w = সেভ, :q = এক্সিট, :wq = সেভ+এক্সিট, :q! = বিনা সেভে
\`\`\``
      },
      {
        id: "les-02-04",
        moduleId: "mod-02",
        title: "সার্চ ও ফিল্টার",
        description: "find, grep, locate, which, whereis",
        durationMinutes: 20,
        order: 4,
        pointsReward: 35,
        content: `# সার্চ ও ফিল্টার

\`\`\`bash
# ফাইল খোঁজা
find /home -name "*.txt"
find . -type d -name "logs"
find /var -size +100M

# টেক্সট সার্চ
grep "error" logfile.txt
grep -r "TODO" .
grep -i "linux" file.txt      # case-insensitive
grep -n "pattern" file        # লাইন নম্বরসহ

# অন্যান্য
locate filename               # দ্রুত (updatedb লাগে)
which python3
whereis ls
\`\`\``
      },
      {
        id: "les-02-05",
        moduleId: "mod-02",
        title: "রিডাইরেকশন, পাইপ ও ওয়াইল্ডকার্ড",
        description: ">, >>, <, |, *, ?, []",
        durationMinutes: 18,
        order: 5,
        pointsReward: 30,
        content: `# রিডাইরেকশন, পাইপ ও ওয়াইল্ডকার্ড

\`\`\`bash
# আউটপুট রিডাইরেক্ট
ls > list.txt               # ওভাররাইট
echo "hello" >> list.txt    # অ্যাপেন্ড
command 2> error.log        # stderr
command > out.txt 2>&1      # stdout+stderr

# পাইপ
ls -l | grep ".txt"
ps aux | grep nginx | grep -v grep
cat file | sort | uniq | wc -l

# ওয়াইল্ডকার্ড
ls *.txt
ls file?.txt                # একটি ক্যারেক্টার
ls file[123].txt
ls {a,b,c}*.log
\`\`\``
      },
    ],
  },

  // ==================== MODULE 3 ====================
  {
    id: "mod-03",
    title: "ফাইল পারমিশন ও অ্যাক্সেস কন্ট্রোল",
    description: "chmod, chown, umask, SUID/SGID, ACL",
    icon: "🔐",
    order: 3,
    totalPoints: 220,
    lessons: [
      {
        id: "les-03-01",
        moduleId: "mod-03",
        title: "ফাইল পারমিশন বোঝা (rwx)",
        description: "অক্টাল ও সিম্বলিক নোটেশন",
        durationMinutes: 18,
        order: 1,
        pointsReward: 30,
        content: `# ফাইল পারমিশন

\`ls -l\` আউটপুট উদাহরণ:
\`\`\`
-rwxr-xr-- 1 user group 4096 Jan 1 script.sh
\`\`\`

- ১ম ক্যারেক্টার: টাইপ (\`-\` ফাইল, \`d\` ডিরেক্টরি, \`l\` লিংক)
- পরের ৯টি: **owner / group / others**
  - r=4 (read), w=2 (write), x=1 (execute)

## অক্টাল
- \`755\` = rwxr-xr-x (স্ক্রিপ্ট)
- \`644\` = rw-r--r-- (সাধারণ ফাইল)
- \`700\` = rwx------ (প্রাইভেট)
- \`600\` = rw------- 

\`\`\`bash
chmod 755 script.sh
chmod u+x script.sh
chmod g-w file.txt
chmod -R 755 folder/
\`\`\``
      },
      {
        id: "les-03-02",
        moduleId: "mod-03",
        title: "মালিকানা পরিবর্তন (chown, chgrp)",
        description: "ফাইলের মালিক ও গ্রুপ পরিবর্তন",
        durationMinutes: 12,
        order: 2,
        pointsReward: 25,
        content: `# মালিকানা

\`\`\`bash
sudo chown user file.txt
sudo chown user:group file.txt
sudo chown -R user:group folder/
sudo chgrp developers project/
\`\`\`

\`ls -l\` দিয়ে মালিক ও গ্রুপ দেখা যায়।`
      },
      {
        id: "les-03-03",
        moduleId: "mod-03",
        title: "বিশেষ পারমিশন: SUID, SGID, Sticky Bit",
        description: "উন্নত পারমিশন বিট",
        durationMinutes: 16,
        order: 3,
        pointsReward: 35,
        content: `# বিশেষ পারমিশন

- **SUID (4)**: এক্সিকিউট করলে owner-এর পারমিশনে চলে (\`passwd\` কমান্ড)
- **SGID (2)**: গ্রুপ ইনহেরিট করে
- **Sticky Bit (1)**: শুধু মালিক ডিলিট করতে পারে (\`/tmp\`)

\`\`\`bash
chmod u+s file        # SUID
chmod g+s directory   # SGID
chmod +t /tmp         # Sticky
chmod 4755 file       # SUID + 755
\`\`\`

\`ls -l\` এ \`s\` বা \`t\` দেখা যায়।`
      },
      {
        id: "les-03-04",
        moduleId: "mod-03",
        title: "umask ও ডিফল্ট পারমিশন",
        description: "নতুন ফাইলের ডিফল্ট পারমিশন নিয়ন্ত্রণ",
        durationMinutes: 10,
        order: 4,
        pointsReward: 25,
        content: `# umask

umask নতুন ফাইল/ডিরেক্টরির ডিফল্ট পারমিশন থেকে বিয়োগ করে।

\`\`\`bash
umask           # বর্তমান মান দেখা
umask 022       # সাধারণ (file 644, dir 755)
umask 077       # আরও প্রাইভেট
\`\`\`

গণনা: 666 - umask = ফাইল পারমিশন, 777 - umask = ডিরেক্টরি।`
      },
    ],
  },

  // ==================== MODULE 4 ====================
  {
    id: "mod-04",
    title: "ইউজার ও গ্রুপ ম্যানেজমেন্ট",
    description: "useradd, usermod, passwd, group, sudo",
    icon: "👥",
    order: 4,
    totalPoints: 200,
    lessons: [
      {
        id: "les-04-01",
        moduleId: "mod-04",
        title: "ইউজার তৈরি ও ম্যানেজ করা",
        description: "useradd, usermod, userdel, passwd",
        durationMinutes: 18,
        order: 1,
        pointsReward: 30,
        content: `# ইউজার ম্যানেজমেন্ট

\`\`\`bash
sudo useradd -m -s /bin/bash newuser
sudo passwd newuser
sudo usermod -aG sudo newuser     # sudo গ্রুপে যোগ
sudo usermod -L newuser           # লক
sudo usermod -U newuser           # আনলক
sudo userdel -r newuser           # হোমসহ ডিলিট

id username
whoami
who
w
\`\`\`

গুরুত্বপূর্ণ ফাইল: \`/etc/passwd\`, \`/etc/shadow\`, \`/etc/group\``
      },
      {
        id: "les-04-02",
        moduleId: "mod-04",
        title: "গ্রুপ ম্যানেজমেন্ট",
        description: "groupadd, gpasswd, groups",
        durationMinutes: 12,
        order: 2,
        pointsReward: 25,
        content: `# গ্রুপ

\`\`\`bash
sudo groupadd developers
sudo usermod -aG developers username
sudo gpasswd -d username developers   # রিমুভ
groups username
id username
\`\`\``
      },
      {
        id: "les-04-03",
        moduleId: "mod-04",
        title: "sudo ও রুট অ্যাক্সেস",
        description: "sudoers, root, privilege escalation",
        durationMinutes: 16,
        order: 3,
        pointsReward: 35,
        content: `# sudo

\`\`\`bash
sudo command
sudo -i                 # রুট শেল
sudo -u otheruser cmd
sudo visudo             # /etc/sudoers এডিট (নিরাপদ)
\`\`\`

\`/etc/sudoers\` এ নিয়ম লিখতে \`visudo\` ব্যবহার করুন — সিনট্যাক্স ভুল হলে লক হয়ে যেতে পারে।

**নিরাপত্তা টিপ**: রুট হিসেবে প্রতিদিন কাজ করবেন না। প্রয়োজনে sudo ব্যবহার করুন।`
      },
    ],
  },

  // ==================== MODULE 5 ====================
  {
    id: "mod-05",
    title: "প্রসেস ও সিস্টেম মনিটরিং",
    description: "ps, top, htop, kill, nice, system resources",
    icon: "📊",
    order: 5,
    totalPoints: 210,
    lessons: [
      {
        id: "les-05-01",
        moduleId: "mod-05",
        title: "প্রসেস দেখা ও নিয়ন্ত্রণ",
        description: "ps, top, htop, kill, pkill",
        durationMinutes: 18,
        order: 1,
        pointsReward: 30,
        content: `# প্রসেস ম্যানেজমেন্ট

\`\`\`bash
ps aux
ps aux | grep nginx
ps -ef
top                     # রিয়েল-টাইম
htop                    # ইনস্টল: sudo apt install htop
kill PID
kill -9 PID             # SIGKILL (জোর)
kill -15 PID            # SIGTERM (নরম)
pkill processname
killall processname
\`\`\`

প্রসেস স্টেট: R (running), S (sleeping), Z (zombie), D (uninterruptible)`
      },
      {
        id: "les-05-02",
        moduleId: "mod-05",
        title: "রিসোর্স মনিটরিং",
        description: "free, df, du, uptime, vmstat",
        durationMinutes: 15,
        order: 2,
        pointsReward: 30,
        content: `# সিস্টেম রিসোর্স

\`\`\`bash
free -h                 # মেমোরি
df -h                   # ডিস্ক স্পেস
du -sh *                # ডিরেক্টরি সাইজ
du -h --max-depth=1
uptime
vmstat 1
iostat
\`\`\``
      },
      {
        id: "les-05-03",
        moduleId: "mod-05",
        title: "প্রাইওরিটি ও ব্যাকগ্রাউন্ড জব",
        description: "nice, renice, &, jobs, fg, bg, nohup",
        durationMinutes: 16,
        order: 3,
        pointsReward: 30,
        content: `# জব কন্ট্রোল ও প্রাইওরিটি

\`\`\`bash
command &               # ব্যাকগ্রাউন্ড
jobs
fg %1
bg %1
Ctrl+Z                  # সাসপেন্ড
nohup long_command &    # টার্মিনাল বন্ধ হলেও চলবে
nice -n 10 command      # কম প্রাইওরিটি
renice -n 5 -p PID
\`\`\`

nice ভ্যালু: -২০ (সর্বোচ্চ) থেকে +১৯ (সর্বনিম্ন)।`
      },
    ],
  },

  // ==================== MODULE 6 ====================
  {
    id: "mod-06",
    title: "প্যাকেজ ম্যানেজমেন্ট",
    description: "apt, dpkg, snap, flatpak, yum/dnf",
    icon: "📦",
    order: 6,
    totalPoints: 180,
    lessons: [
      {
        id: "les-06-01",
        moduleId: "mod-06",
        title: "APT ও dpkg (Debian/Ubuntu)",
        description: "প্যাকেজ ইনস্টল, আপডেট, রিমুভ",
        durationMinutes: 20,
        order: 1,
        pointsReward: 35,
        content: `# APT প্যাকেজ ম্যানেজার

\`\`\`bash
sudo apt update                 # রিপো লিস্ট আপডেট
sudo apt upgrade -y             # আপগ্রেড
sudo apt install nginx
sudo apt install -y htop curl
sudo apt remove package
sudo apt purge package          # কনফিগসহ
sudo apt autoremove
sudo apt search keyword
apt show package
apt list --installed

# dpkg (লোয়ার লেভেল)
dpkg -i package.deb
dpkg -l | grep nginx
dpkg -L nginx                   # কোন কোন ফাইল
\`\`\``
      },
      {
        id: "les-06-02",
        moduleId: "mod-06",
        title: "Snap, Flatpak ও অন্যান্য",
        description: "ইউনিভার্সাল প্যাকেজ ফরম্যাট",
        durationMinutes: 12,
        order: 2,
        pointsReward: 25,
        content: `# Snap ও Flatpak

\`\`\`bash
# Snap
sudo snap install code --classic
snap list
snap remove package

# Flatpak
sudo apt install flatpak
flatpak install flathub org.app
flatpak list
\`\`\`

RHEL/Fedora-তে: \`dnf\` / \`yum\``
      },
    ],
  },

  // ==================== MODULE 7 ====================
  {
    id: "mod-07",
    title: "নেটওয়ার্কিং বেসিক",
    description: "IP, ping, ss, netstat, curl, firewall, DNS",
    icon: "🌐",
    order: 7,
    totalPoints: 240,
    lessons: [
      {
        id: "les-07-01",
        moduleId: "mod-07",
        title: "নেটওয়ার্ক কমান্ড",
        description: "ip, ping, traceroute, dig, nslookup",
        durationMinutes: 18,
        order: 1,
        pointsReward: 30,
        content: `# নেটওয়ার্ক বেসিক

\`\`\`bash
ip a                        # IP অ্যাড্রেস
ip r                        # রাউটিং টেবিল
ping google.com
ping -c 4 8.8.8.8
traceroute google.com
dig google.com
nslookup google.com
host google.com
\`\`\``
      },
      {
        id: "les-07-02",
        moduleId: "mod-07",
        title: "পোর্ট ও কানেকশন",
        description: "ss, netstat, curl, wget",
        durationMinutes: 16,
        order: 2,
        pointsReward: 30,
        content: `# পোর্ট ও কানেকশন

\`\`\`bash
ss -tuln                    # লিসেনিং পোর্ট
ss -tp
netstat -tuln               # পুরনো
curl -I https://example.com
curl -o file.zip URL
wget URL
\`\`\``
      },
      {
        id: "les-07-03",
        moduleId: "mod-07",
        title: "ফায়ারওয়াল (ufw ও firewalld)",
        description: "বেসিক ফায়ারওয়াল নিয়ম",
        durationMinutes: 18,
        order: 3,
        pointsReward: 35,
        content: `# UFW (Ubuntu)

\`\`\`bash
sudo ufw status
sudo ufw enable
sudo ufw allow 22
sudo ufw allow 80/tcp
sudo ufw allow from 192.168.1.0/24
sudo ufw deny 23
sudo ufw delete allow 80
sudo ufw reload
\`\`\`

firewalld (RHEL/Fedora) আলাদা কমান্ড ব্যবহার করে।`
      },
      {
        id: "les-07-04",
        moduleId: "mod-07",
        title: "SSH বেসিক",
        description: "রিমোট অ্যাক্সেস ও কী-বেসড অথেন্টিকেশন",
        durationMinutes: 20,
        order: 4,
        pointsReward: 40,
        content: `# SSH

\`\`\`bash
ssh user@192.168.1.10
ssh -p 2222 user@host

# কী জেনারেট
ssh-keygen -t ed25519 -C "your@email.com"
ssh-copy-id user@host

# কনফিগ
nano ~/.ssh/config
\`\`\`

\`/etc/ssh/sshd_config\` এ পোর্ট, PasswordAuthentication ইত্যাদি সেট করা যায়।`
      },
    ],
  },

  // ==================== MODULE 8 ====================
  {
    id: "mod-08",
    title: "শেল স্ক্রিপ্টিং",
    description: "Bash স্ক্রিপ্ট — ভেরিয়েবল, লুপ, কন্ডিশন, ফাংশন",
    icon: "📜",
    order: 8,
    totalPoints: 320,
    lessons: [
      {
        id: "les-08-01",
        moduleId: "mod-08",
        title: "প্রথম Bash স্ক্রিপ্ট",
        description: "শেব্যাং, ভেরিয়েবল, ইকো, রিড",
        durationMinutes: 18,
        order: 1,
        pointsReward: 30,
        content: `# প্রথম স্ক্রিপ্ট

\`\`\`bash
#!/bin/bash
# কমেন্ট

NAME="বাংলাদেশ"
echo "হ্যালো, $NAME!"
echo "আজকের তারিখ: $(date)"

read -p "আপনার নাম: " USER_NAME
echo "স্বাগতম, $USER_NAME"

# এক্সিকিউট
chmod +x script.sh
./script.sh
\`\`\``
      },
      {
        id: "les-08-02",
        moduleId: "mod-08",
        title: "কন্ডিশন ও লজিক",
        description: "if, else, case, টেস্ট অপারেটর",
        durationMinutes: 20,
        order: 2,
        pointsReward: 35,
        content: `# কন্ডিশন

\`\`\`bash
if [ -f "file.txt" ]; then
  echo "ফাইল আছে"
elif [ -d "folder" ]; then
  echo "ফোল্ডার আছে"
else
  echo "কিছু নেই"
fi

# সংখ্যা তুলনা
if [ $a -eq $b ]; then ... fi
# -eq -ne -lt -le -gt -ge

# স্ট্রিং
if [ "$str" = "hello" ]; then ... fi
if [ -z "$str" ]; then ... fi   # খালি কিনা

case $choice in
  1) echo "এক" ;;
  2) echo "দুই" ;;
  *) echo "অন্য" ;;
esac
\`\`\``
      },
      {
        id: "les-08-03",
        moduleId: "mod-08",
        title: "লুপ",
        description: "for, while, until",
        durationMinutes: 16,
        order: 3,
        pointsReward: 30,
        content: `# লুপ

\`\`\`bash
for i in 1 2 3 4 5; do
  echo $i
done

for file in *.txt; do
  echo "প্রসেসিং $file"
done

for ((i=1; i<=10; i++)); do
  echo $i
done

while [ $count -lt 5 ]; do
  echo $count
  ((count++))
done
\`\`\``
      },
      {
        id: "les-08-04",
        moduleId: "mod-08",
        title: "ফাংশন, আর্গুমেন্ট ও ডিবাগ",
        description: "ফাংশন, $1 $#, set -x",
        durationMinutes: 18,
        order: 4,
        pointsReward: 35,
        content: `# ফাংশন ও আর্গুমেন্ট

\`\`\`bash
greet() {
  echo "হ্যালো, $1!"
}
greet "রাফি"

echo "স্ক্রিপ্ট নাম: $0"
echo "প্রথম আর্গুমেন্ট: $1"
echo "সব আর্গুমেন্ট: $@"
echo "সংখ্যা: $#"

# ডিবাগ
set -x          # ট্রেস অন
set -e          # এররে বের হয়ে যাও
bash -x script.sh
\`\`\``
      },
    ],
  },

  // ==================== MODULE 9 ====================
  {
    id: "mod-09",
    title: "সিস্টেমড ও সার্ভিস ম্যানেজমেন্ট",
    description: "systemctl, journalctl, সার্ভিস তৈরি",
    icon: "⚙️",
    order: 9,
    totalPoints: 180,
    lessons: [
      {
        id: "les-09-01",
        moduleId: "mod-09",
        title: "systemctl বেসিক",
        description: "সার্ভিস স্টার্ট, স্টপ, এনেবল",
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
sudo systemctl enable nginx     # বুটে অটো স্টার্ট
sudo systemctl disable nginx
systemctl is-active nginx
systemctl list-units --type=service
\`\`\``
      },
      {
        id: "les-09-02",
        moduleId: "mod-09",
        title: "লগ দেখা (journalctl)",
        description: "সিস্টেম লগ অ্যানালাইসিস",
        durationMinutes: 14,
        order: 2,
        pointsReward: 30,
        content: `# journalctl

\`\`\`bash
journalctl
journalctl -u nginx
journalctl -f                   # ফলো
journalctl --since "1 hour ago"
journalctl -p err
journalctl -b                   # এই বুট
\`\`\``
      },
      {
        id: "les-09-03",
        moduleId: "mod-09",
        title: "কাস্টম সার্ভিস তৈরি",
        description: "নিজের systemd unit ফাইল",
        durationMinutes: 18,
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
User=myuser
ExecStart=/usr/bin/python3 /opt/myapp/app.py
Restart=on-failure

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

  // ==================== MODULE 10 ====================
  {
    id: "mod-10",
    title: "ডিস্ক, স্টোরেজ ও LVM",
    description: "fdisk, lsblk, mount, df, LVM বেসিক",
    icon: "💾",
    order: 10,
    totalPoints: 200,
    lessons: [
      {
        id: "les-10-01",
        moduleId: "mod-10",
        title: "ডিস্ক ও পার্টিশন",
        description: "lsblk, fdisk, parted, mkfs",
        durationMinutes: 20,
        order: 1,
        pointsReward: 35,
        content: `# ডিস্ক ম্যানেজমেন্ট

\`\`\`bash
lsblk
sudo fdisk -l
sudo fdisk /dev/sdb             # পার্টিশন টেবিল
sudo mkfs.ext4 /dev/sdb1
sudo mkfs.xfs /dev/sdb1
\`\`\``
      },
      {
        id: "les-10-02",
        moduleId: "mod-10",
        title: "মাউন্ট ও fstab",
        description: "স্থায়ী মাউন্ট পয়েন্ট",
        durationMinutes: 16,
        order: 2,
        pointsReward: 30,
        content: `# মাউন্ট

\`\`\`bash
sudo mount /dev/sdb1 /mnt/data
sudo umount /mnt/data
df -h
\`\`\`

\`/etc/fstab\` এ স্থায়ী এন্ট্রি:
\`\`\`
/dev/sdb1  /mnt/data  ext4  defaults  0  2
\`\`\`
বা UUID ব্যবহার করুন (\`blkid\`)।`
      },
      {
        id: "les-10-03",
        moduleId: "mod-10",
        title: "LVM বেসিক",
        description: "Logical Volume Manager পরিচিতি",
        durationMinutes: 18,
        order: 3,
        pointsReward: 35,
        content: `# LVM

PV → VG → LV

\`\`\`bash
sudo pvcreate /dev/sdb1
sudo vgcreate myvg /dev/sdb1
sudo lvcreate -n mylv -L 10G myvg
sudo mkfs.ext4 /dev/myvg/mylv
sudo mount /dev/myvg/mylv /mnt/lvm
\`\`\`

এরপর সহজে রিসাইজ করা যায়।`
      },
    ],
  },

  // ==================== MODULE 11 ====================
  {
    id: "mod-11",
    title: "সিকিউরিটি বেসিক",
    description: "ফায়ারওয়াল, SSH হার্ডেনিং, fail2ban, আপডেট",
    icon: "🛡️",
    order: 11,
    totalPoints: 220,
    lessons: [
      {
        id: "les-11-01",
        moduleId: "mod-11",
        title: "সিস্টেম আপডেট ও প্যাচিং",
        description: "নিয়মিত আপডেটের গুরুত্ব",
        durationMinutes: 10,
        order: 1,
        pointsReward: 20,
        content: `# সিকিউরিটি আপডেট

\`\`\`bash
sudo apt update && sudo apt upgrade -y
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
\`\`\`

সবসময় লেটেস্ট সিকিউরিটি প্যাচ রাখুন।`
      },
      {
        id: "les-11-02",
        moduleId: "mod-11",
        title: "SSH হার্ডেনিং",
        description: "পাসওয়ার্ড অথ বন্ধ, কী অনলি, পোর্ট চেঞ্জ",
        durationMinutes: 18,
        order: 2,
        pointsReward: 40,
        content: `# SSH হার্ডেনিং

\`/etc/ssh/sshd_config\`:
\`\`\`
Port 2222
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
\`\`\`

\`\`\`bash
sudo systemctl restart sshd
\`\`\`

**আগে** কী-বেসড লগইন টেস্ট করে নিন, নাহলে লক হয়ে যেতে পারেন।`
      },
      {
        id: "les-11-03",
        moduleId: "mod-11",
        title: "fail2ban ও বেসিক ইন্ট্রুশন প্রিভেনশন",
        description: "ব্রুটফোর্স অ্যাটাক প্রতিরোধ",
        durationMinutes: 14,
        order: 3,
        pointsReward: 30,
        content: `# fail2ban

\`\`\`bash
sudo apt install fail2ban
sudo systemctl enable --now fail2ban
sudo fail2ban-client status
sudo fail2ban-client status sshd
\`\`\`

কনফিগ: \`/etc/fail2ban/jail.local\``
      },
    ],
  },

  // ==================== MODULE 12 ====================
  {
    id: "mod-12",
    title: "ট্রাবলশুটিং ও অ্যাডভান্সড টপিকস",
    description: "লগ অ্যানালাইসিস, বুট ইস্যু, ক্রোন, ব্যাকআপ",
    icon: "🔧",
    order: 12,
    totalPoints: 250,
    lessons: [
      {
        id: "les-12-01",
        moduleId: "mod-12",
        title: "ক্রোন জব (Cron)",
        description: "সিডিউলড টাস্ক",
        durationMinutes: 16,
        order: 1,
        pointsReward: 30,
        content: `# Cron

\`\`\`bash
crontab -e
crontab -l
\`\`\`

ফরম্যাট: \`মিনিট ঘণ্টা দিন মাস সপ্তাহ কমান্ড\`

\`\`\`
0 2 * * * /opt/backup.sh        # প্রতিদিন রাত ২টায়
*/5 * * * * /usr/bin/script.sh  # প্রতি ৫ মিনিট
0 0 * * 0 /weekly.sh            # প্রতি রবিবার
\`\`\`

সিস্টেম ক্রোন: \`/etc/cron.d/\`, \`/etc/cron.daily/\` ইত্যাদি।`
      },
      {
        id: "les-12-02",
        moduleId: "mod-12",
        title: "লগ অ্যানালাইসিস ও ট্রাবলশুটিং",
        description: "সাধারণ সমস্যা সমাধানের পদ্ধতি",
        durationMinutes: 18,
        order: 2,
        pointsReward: 35,
        content: `# ট্রাবলশুটিং চেকলিস্ট

1. \`journalctl -xe\` / \`dmesg\`
2. \`systemctl status service\`
3. \`df -h\` (ডিস্ক ফুল?)
4. \`free -h\` (মেমোরি?)
5. \`ss -tuln\` (পোর্ট লিসেন করছে?)
6. \`ping\` / \`ip a\` (নেটওয়ার্ক?)
7. \`/var/log/\` এর নিচে লগ ফাইল

\`\`\`bash
tail -f /var/log/syslog
journalctl -u nginx -f
\`\`\``
      },
      {
        id: "les-12-03",
        moduleId: "mod-12",
        title: "ব্যাকআপ স্ট্র্যাটেজি",
        description: "rsync, tar, সিম্পল ব্যাকআপ স্ক্রিপ্ট",
        durationMinutes: 16,
        order: 3,
        pointsReward: 30,
        content: `# ব্যাকআপ

\`\`\`bash
# tar
tar -czvf backup-$(date +%F).tar.gz /home/user

# rsync
rsync -avz --delete /source/ /backup/
rsync -avz -e ssh /data/ user@remote:/backup/

# সিম্পল স্ক্রিপ্ট + cron
\`\`\``
      },
      {
        id: "les-12-04",
        moduleId: "mod-12",
        title: "পরবর্তী ধাপ: DevOps ও ক্লাউড",
        description: "Docker, Ansible, ক্লাউডের দিকে যাত্রা",
        durationMinutes: 12,
        order: 4,
        pointsReward: 25,
        content: `# পরবর্তী ধাপ

আপনি এখন লিনাক্সের মজবুত ভিত্তি পেয়েছেন। পরবর্তীতে শিখতে পারেন:

1. **Docker & Containers**
2. **Kubernetes**
3. **Ansible** (কনফিগারেশন ম্যানেজমেন্ট)
4. **Terraform** (Infrastructure as Code)
5. **CI/CD** (GitHub Actions, Jenkins)
6. **ক্লাউড**: AWS / GCP / Azure Linux ইনস্ট্যান্স

অভিনন্দন! আপনি Linux Zero to Hero যাত্রা সম্পন্ন করেছেন। 🎉`
      },
    ],
  },
];

// ==================== QUIZZES ====================
export const quizzes: Quiz[] = [
  {
    id: "quiz-01",
    title: "মডিউল ১: লিনাক্স পরিচিতি",
    moduleId: "mod-01",
    timeLimitMinutes: 12,
    passingScore: 70,
    questions: [
      { id: "q1", question: "লিনাক্স কার্নেল কে তৈরি করেন?", options: ["বিল গেটস", "লিনাস টরভাল্ডস", "স্টিভ জবস", "রিচার্ড স্টলম্যান"], correctIndex: 1, explanation: "লিনাস টরভাল্ডস ১৯৯১ সালে।", points: 10 },
      { id: "q2", question: "নবীনদের জন্য কোন ডিস্ট্রো সবচেয়ে উপযোগী?", options: ["Arch", "Gentoo", "Ubuntu", "Slackware"], correctIndex: 2, explanation: "Ubuntu নবীন-বান্ধব।", points: 10 },
      { id: "q3", question: "WSL এর পূর্ণরূপ?", options: ["Windows System Linux", "Windows Subsystem for Linux", "Wide System Linux", "Web Server Linux"], correctIndex: 1, explanation: "Windows Subsystem for Linux।", points: 10 },
      { id: "q4", question: "/etc ডিরেক্টরিতে সাধারণত কী থাকে?", options: ["ইউজার হোম", "কনফিগারেশন ফাইল", "লগ ফাইল", "টেম্পোরারি ফাইল"], correctIndex: 1, explanation: "সিস্টেম কনফিগারেশন।", points: 10 },
      { id: "q5", question: "লিনাক্স কোন ধরনের সফটওয়্যার?", options: ["প্রোপ্রাইটারি", "ওপেন সোর্স", "শুধু ফ্রিওয়্যার", "ক্লোজড সোর্স"], correctIndex: 1, explanation: "সম্পূর্ণ ওপেন সোর্স।", points: 10 },
    ],
  },
  {
    id: "quiz-02",
    title: "মডিউল ২: টার্মিনাল কমান্ড",
    moduleId: "mod-02",
    timeLimitMinutes: 15,
    passingScore: 70,
    questions: [
      { id: "q1", question: "বর্তমান ডিরেক্টরি জানতে কোন কমান্ড?", options: ["ls", "cd", "pwd", "dir"], correctIndex: 2, explanation: "pwd = Print Working Directory", points: 10 },
      { id: "q2", question: "লুকানো ফাইলসহ বিস্তারিত তালিকা?", options: ["ls -a", "ls -l", "ls -la", "ls -h"], correctIndex: 2, explanation: "ls -la", points: 10 },
      { id: "q3", question: "ফোল্ডারসহ সব ডিলিট করতে?", options: ["rm -f", "rm -r", "rm -rf", "rmdir"], correctIndex: 2, explanation: "rm -rf (সাবধানে)", points: 10 },
      { id: "q4", question: "nano-তে সেভ করার শর্টকাট?", options: ["Ctrl+S", "Ctrl+O", "Ctrl+X", "Ctrl+W"], correctIndex: 1, explanation: "Ctrl+O", points: 10 },
      { id: "q5", question: "হোম ডিরেক্টরিতে যেতে?", options: ["cd /", "cd home", "cd ~", "cd .."], correctIndex: 2, explanation: "cd ~", points: 10 },
      { id: "q6", question: "পাইপ সিম্বল কোনটি?", options: [">", ">>", "|", "&"], correctIndex: 2, explanation: "| পাইপ", points: 10 },
    ],
  },
  {
    id: "quiz-03",
    title: "মডিউল ৩: পারমিশন",
    moduleId: "mod-03",
    timeLimitMinutes: 12,
    passingScore: 70,
    questions: [
      { id: "q1", question: "chmod 755 মানে কী?", options: ["rwxrwxrwx", "rwxr-xr-x", "rw-r--r--", "rwx------"], correctIndex: 1, explanation: "owner rwx, group/other r-x", points: 10 },
      { id: "q2", question: "r, w, x এর অক্টাল মান?", options: ["1,2,3", "4,2,1", "2,4,1", "4,1,2"], correctIndex: 1, explanation: "r=4, w=2, x=1", points: 10 },
      { id: "q3", question: "SUID বিট সেট করতে?", options: ["chmod +t", "chmod u+s", "chmod g+s", "chmod +x"], correctIndex: 1, explanation: "chmod u+s", points: 10 },
      { id: "q4", question: "ফাইলের মালিক পরিবর্তন?", options: ["chmod", "chown", "chgrp", "umask"], correctIndex: 1, explanation: "chown", points: 10 },
    ],
  },
  {
    id: "quiz-04",
    title: "মডিউল ৫: প্রসেস",
    moduleId: "mod-05",
    timeLimitMinutes: 10,
    passingScore: 70,
    questions: [
      { id: "q1", question: "সব প্রসেস দেখতে?", options: ["top", "ps aux", "kill", "jobs"], correctIndex: 1, explanation: "ps aux", points: 10 },
      { id: "q2", question: "প্রসেস জোর করে মারতে সিগন্যাল?", options: ["kill -15", "kill -9", "kill -1", "kill -2"], correctIndex: 1, explanation: "SIGKILL = -9", points: 10 },
      { id: "q3", question: "মেমোরি দেখতে কমান্ড?", options: ["df -h", "free -h", "du -h", "ls -h"], correctIndex: 1, explanation: "free -h", points: 10 },
    ],
  },
  {
    id: "quiz-05",
    title: "মডিউল ৭: নেটওয়ার্কিং",
    moduleId: "mod-07",
    timeLimitMinutes: 12,
    passingScore: 70,
    questions: [
      { id: "q1", question: "IP অ্যাড্রেস দেখতে আধুনিক কমান্ড?", options: ["ifconfig", "ip a", "hostname", "ping"], correctIndex: 1, explanation: "ip a", points: 10 },
      { id: "q2", question: "লিসেনিং পোর্ট দেখতে?", options: ["ping", "ss -tuln", "curl", "dig"], correctIndex: 1, explanation: "ss -tuln", points: 10 },
      { id: "q3", question: "UFW-তে পোর্ট ২২ খুলতে?", options: ["ufw open 22", "ufw allow 22", "ufw enable 22", "ufw start 22"], correctIndex: 1, explanation: "ufw allow 22", points: 10 },
      { id: "q4", question: "SSH কী জেনারেট?", options: ["ssh-copy-id", "ssh-keygen", "ssh-add", "ssh-agent"], correctIndex: 1, explanation: "ssh-keygen", points: 10 },
    ],
  },
  {
    id: "quiz-06",
    title: "মডিউল ৮: শেল স্ক্রিপ্টিং",
    moduleId: "mod-08",
    timeLimitMinutes: 12,
    passingScore: 70,
    questions: [
      { id: "q1", question: "স্ক্রিপ্টের প্রথম লাইনে সাধারণত কী থাকে?", options: ["#comment", "#!/bin/bash", "echo hello", "set -x"], correctIndex: 1, explanation: "Shebang", points: 10 },
      { id: "q2", question: "স্ক্রিপ্টকে এক্সিকিউটেবল করতে?", options: ["chmod 644", "chmod +x", "chown +x", "bash +x"], correctIndex: 1, explanation: "chmod +x", points: 10 },
      { id: "q3", question: "প্রথম কমান্ড-লাইন আর্গুমেন্ট কোন ভেরিয়েবল?", options: ["$0", "$1", "$#", "$@"], correctIndex: 1, explanation: "$1", points: 10 },
    ],
  },
  {
    id: "quiz-07",
    title: "ফাইনাল পরীক্ষা: Linux Hero",
    moduleId: "mod-12",
    timeLimitMinutes: 25,
    passingScore: 75,
    questions: [
      { id: "q1", question: "সিস্টেমড সার্ভিস এনেবল করতে?", options: ["service enable", "systemctl enable", "systemd start", "chkconfig on"], correctIndex: 1, explanation: "systemctl enable", points: 10 },
      { id: "q2", question: "ক্রোন ফরম্যাটে 'প্রতিদিন রাত ৩টায়'?", options: ["0 3 * * *", "3 0 * * *", "0 * 3 * *", "* 3 * * *"], correctIndex: 0, explanation: "মিনিট=0, ঘণ্টা=3", points: 10 },
      { id: "q3", question: "ডিস্ক স্পেস দেখতে?", options: ["free -h", "df -h", "du -h", "lsblk"], correctIndex: 1, explanation: "df -h", points: 10 },
      { id: "q4", question: "SSH-তে রুট লগইন বন্ধ করতে কোন ডিরেক্টিভ?", options: ["PermitRootLogin no", "RootLogin no", "DenyRoot yes", "AllowRoot no"], correctIndex: 0, explanation: "PermitRootLogin no", points: 10 },
      { id: "q5", question: "লুপব্যাক IP অ্যাড্রেস?", options: ["192.168.0.1", "127.0.0.1", "8.8.8.8", "10.0.0.1"], correctIndex: 1, explanation: "127.0.0.1", points: 10 },
      { id: "q6", question: "প্যাকেজ আপডেট লিস্ট রিফ্রেশ (Ubuntu)?", options: ["apt upgrade", "apt update", "apt install", "apt refresh"], correctIndex: 1, explanation: "apt update", points: 10 },
      { id: "q7", question: "ফাইল সিস্টেম টেবিল কোন ফাইলে থাকে?", options: ["/etc/passwd", "/etc/fstab", "/etc/hosts", "/etc/shadow"], correctIndex: 1, explanation: "/etc/fstab", points: 10 },
      { id: "q8", question: "প্রসেস প্রাইওরিটি কমানোর কমান্ড?", options: ["kill", "nice", "top", "ps"], correctIndex: 1, explanation: "nice / renice", points: 10 },
    ],
  },
];

// ==================== PRACTICE EXERCISES ====================
export const exercises: PracticeExercise[] = [
  {
    id: "ex-01",
    title: "টার্মিনাল নেভিগেশন প্র্যাকটিস",
    description: "মৌলিক নেভিগেশন ও ফাইল তৈরি।",
    moduleId: "mod-02",
    difficulty: "সহজ",
    pointsReward: 40,
    instructions: [
      "টার্মিনাল খুলুন এবং pwd চালান",
      "হোম ডিরেক্টরিতে যান (cd ~)",
      "linux-practice নামে ফোল্ডার তৈরি করুন",
      "সেই ফোল্ডারে ঢুকুন",
      "notes.txt ফাইল তৈরি করে কিছু লিখুন (nano)",
      "ls -la দিয়ে যাচাই করুন",
    ],
    expectedCommands: ["pwd", "cd ~", "mkdir linux-practice", "cd linux-practice", "touch notes.txt", "nano notes.txt", "ls -la"],
    hints: ["pwd দিয়ে শুরু করুন", "mkdir দিয়ে ফোল্ডার বানান", "nano notes.txt"],
  },
  {
    id: "ex-02",
    title: "ফাইল পারমিশন প্র্যাকটিস",
    description: "স্ক্রিপ্ট তৈরি করে এক্সিকিউটেবল করুন।",
    moduleId: "mod-03",
    difficulty: "সহজ",
    pointsReward: 50,
    instructions: [
      "hello.sh ফাইল তৈরি করুন",
      "#!/bin/bash এবং echo 'Hello Linux Hero!' লিখুন",
      "chmod +x বা chmod 755 দিন",
      "./hello.sh চালান",
      "ls -l দিয়ে পারমিশন দেখুন",
    ],
    expectedCommands: ["touch hello.sh", "nano hello.sh", "chmod +x hello.sh", "./hello.sh", "ls -l hello.sh"],
    hints: ["chmod +x hello.sh", "./ দিয়ে রান করতে হয়"],
  },
  {
    id: "ex-03",
    title: "ইউজার ও গ্রুপ প্র্যাকটিস",
    description: "নতুন ইউজার ও গ্রুপ তৈরি (VM-এ করুন)।",
    moduleId: "mod-04",
    difficulty: "মাঝারি",
    pointsReward: 60,
    instructions: [
      "sudo useradd -m -s /bin/bash testuser তৈরি করুন",
      "পাসওয়ার্ড সেট করুন",
      "developers গ্রুপ তৈরি করুন",
      "testuser কে developers গ্রুপে যোগ করুন",
      "id testuser দিয়ে যাচাই করুন",
    ],
    expectedCommands: ["sudo useradd -m -s /bin/bash testuser", "sudo passwd testuser", "sudo groupadd developers", "sudo usermod -aG developers testuser", "id testuser"],
    hints: ["-aG ফ্ল্যাগ গুরুত্বপূর্ণ", "id কমান্ড দিয়ে গ্রুপ দেখা যায়"],
  },
  {
    id: "ex-04",
    title: "প্রসেস মনিটরিং",
    description: "চলমান প্রসেস খুঁজে দেখা ও রিসোর্স চেক।",
    moduleId: "mod-05",
    difficulty: "সহজ",
    pointsReward: 45,
    instructions: [
      "ps aux | head চালান",
      "free -h দিয়ে মেমোরি দেখুন",
      "df -h দিয়ে ডিস্ক দেখুন",
      "top চালিয়ে q চাপুন",
      "একটি প্রসেসের PID খুঁজুন (যেমন bash)",
    ],
    expectedCommands: ["ps aux", "free -h", "df -h", "top"],
    hints: ["top থেকে বের হতে q চাপুন"],
  },
  {
    id: "ex-05",
    title: "প্যাকেজ ইনস্টল প্র্যাকটিস",
    description: "htop ইনস্টল ও যাচাই।",
    moduleId: "mod-06",
    difficulty: "সহজ",
    pointsReward: 40,
    instructions: [
      "sudo apt update চালান",
      "htop ইনস্টল করুন",
      "htop চালিয়ে দেখুন (q দিয়ে বের হন)",
      "which htop দিয়ে পাথ দেখুন",
      "apt show htop দিয়ে তথ্য দেখুন",
    ],
    expectedCommands: ["sudo apt update", "sudo apt install htop", "htop", "which htop"],
    hints: ["আগে update, তারপর install"],
  },
  {
    id: "ex-06",
    title: "নেটওয়ার্ক চেক",
    description: "IP, পিং, পোর্ট চেক।",
    moduleId: "mod-07",
    difficulty: "মাঝারি",
    pointsReward: 55,
    instructions: [
      "ip a দিয়ে নিজের IP দেখুন",
      "ping -c 4 8.8.8.8 চালান",
      "ss -tuln দিয়ে লিসেনিং পোর্ট দেখুন",
      "curl -I https://google.com চালান",
      "dig google.com চালান",
    ],
    expectedCommands: ["ip a", "ping -c 4 8.8.8.8", "ss -tuln", "curl -I https://google.com", "dig google.com"],
    hints: ["ping এ -c 4 দিয়ে ৪বার পিং হবে"],
  },
  {
    id: "ex-07",
    title: "প্রথম Bash স্ক্রিপ্ট",
    description: "নাম নিয়ে অভিবাদন জানানো স্ক্রিপ্ট।",
    moduleId: "mod-08",
    difficulty: "মাঝারি",
    pointsReward: 60,
    instructions: [
      "greet.sh তৈরি করুন",
      "Shebang যোগ করুন",
      "read দিয়ে নাম নিন",
      "echo দিয়ে অভিবাদন জানান",
      "এক্সিকিউটেবল করে রান করুন",
    ],
    expectedCommands: ["nano greet.sh", "chmod +x greet.sh", "./greet.sh"],
    hints: ["#!/bin/bash প্রথম লাইনে", "read -p ব্যবহার করুন"],
  },
  {
    id: "ex-08",
    title: "ক্রোন জব সেটআপ",
    description: "প্রতিদিন একটি লগ মেসেজ লেখার ক্রোন।",
    moduleId: "mod-12",
    difficulty: "মাঝারি",
    pointsReward: 50,
    instructions: [
      "crontab -e খুলুন",
      "প্রতিদিন রাত ১১:৩০-এ echo 'backup done' >> ~/cron.log যোগ করুন",
      "crontab -l দিয়ে যাচাই করুন",
      "তারিখ ফরম্যাট মনে রাখুন: মিনিট ঘণ্টা দিন মাস সপ্তাহ",
    ],
    expectedCommands: ["crontab -e", "crontab -l"],
    hints: ["30 23 * * * echo 'backup done' >> ~/cron.log"],
  },
  {
    id: "ex-09",
    title: "সিস্টেমড সার্ভিস স্ট্যাটাস",
    description: "একটি সার্ভিসের স্ট্যাটাস ও লগ দেখা।",
    moduleId: "mod-09",
    difficulty: "সহজ",
    pointsReward: 40,
    instructions: [
      "systemctl status ssh বা sshd দেখুন",
      "journalctl -u ssh -n 20 চালান",
      "systemctl is-enabled ssh চেক করুন",
      "list-units --type=service | head দেখুন",
    ],
    expectedCommands: ["systemctl status ssh", "journalctl -u ssh -n 20", "systemctl is-enabled ssh"],
    hints: ["কিছু সিস্টেমে সার্ভিস নাম sshd"],
  },
  {
    id: "ex-10",
    title: "ফাইনাল চ্যালেঞ্জ: মিনি অটোমেশন",
    description: "একটি স্ক্রিপ্ট যা সিস্টেম ইনফো সেভ করে।",
    moduleId: "mod-12",
    difficulty: "কঠিন",
    pointsReward: 80,
    instructions: [
      "sysinfo.sh তৈরি করুন",
      "তারিখ, hostname, uptime, free -h, df -h আউটপুট একটি ফাইলে সেভ করুন",
      "স্ক্রিপ্ট এক্সিকিউটেবল করুন",
      "রান করে আউটপুট ফাইল যাচাই করুন",
      "(বোনাস) ক্রোনে যোগ করুন",
    ],
    expectedCommands: ["nano sysinfo.sh", "chmod +x sysinfo.sh", "./sysinfo.sh"],
    hints: ["{ date; hostname; uptime; free -h; df -h; } > sysinfo.txt"],
  },
];

// ==================== BADGES ====================
export const badges: Badge[] = [
  { id: "badge-first-lesson", name: "প্রথম পদক্ষেপ", description: "প্রথম লেসন সম্পন্ন", icon: "🎯", requiredLessons: 1 },
  { id: "badge-5-lessons", name: "শিক্ষার্থী", description: "৫টি লেসন সম্পন্ন", icon: "📖", requiredLessons: 5 },
  { id: "badge-15-lessons", name: "নিয়মিত লার্নার", description: "১৫টি লেসন সম্পন্ন", icon: "📚", requiredLessons: 15 },
  { id: "badge-all-lessons", name: "লিনাক্স হিরো", description: "সব লেসন সম্পন্ন", icon: "🦸", requiredLessons: 42 },
  { id: "badge-quiz-master", name: "কুইজ মাস্টার", description: "কমপক্ষে ১টি কুইজ পাস", icon: "🏆", requiredQuizzes: 1 },
  { id: "badge-quiz-champion", name: "কুইজ চ্যাম্পিয়ন", description: "৫টি কুইজ পাস", icon: "🥇", requiredQuizzes: 5 },
  { id: "badge-100-points", name: "শতক", description: "১০০ পয়েন্ট", icon: "💯", requiredPoints: 100 },
  { id: "badge-500-points", name: "পঞ্চশতক", description: "৫০০ পয়েন্ট", icon: "⭐", requiredPoints: 500 },
  { id: "badge-1000-points", name: "হাজারী", description: "১০০০ পয়েন্ট", icon: "🌟", requiredPoints: 1000 },
  { id: "badge-terminal", name: "টার্মিনাল হিরো", description: "টার্মিনাল মডিউল সম্পন্ন", icon: "⌨️" },
  { id: "badge-scripter", name: "স্ক্রিপ্টার", description: "শেল স্ক্রিপ্টিং মডিউল সম্পন্ন", icon: "📜" },
  { id: "badge-network", name: "নেটওয়ার্ক নিনজা", description: "নেটওয়ার্কিং মডিউল সম্পন্ন", icon: "🌐" },
  { id: "badge-final", name: "জিরো টু হিরো", description: "ফাইনাল পরীক্ষা পাস", icon: "🏅" },
];

export const sampleLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "রাফি আহমেদ", points: 2450, level: "হিরো" },
  { rank: 2, name: "সুমাইয়া খান", points: 1980, level: "হিরো" },
  { rank: 3, name: "তানভীর হাসান", points: 1720, level: "বিশেষজ্ঞ" },
  { rank: 4, name: "নুসরাত জাহান", points: 1450, level: "বিশেষজ্ঞ" },
  { rank: 5, name: "আরিফ রহমান", points: 1180, level: "দক্ষ" },
  { rank: 6, name: "ফারহানা ইসলাম", points: 920, level: "দক্ষ" },
  { rank: 7, name: "মাহমুদুল হাসান", points: 780, level: "মধ্যম" },
  { rank: 8, name: "সাদিয়া আফরিন", points: 610, level: "মধ্যম" },
  { rank: 9, name: "ইমরান হোসেন", points: 420, level: "শিক্ষানবিশ" },
  { rank: 10, name: "আপনি", points: 0, level: "নবীন" },
];

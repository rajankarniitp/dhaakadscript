// DhaakadScript Logic

// Navigation - Main Sections
function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll('section').forEach(sec => {
    sec.classList.remove('active-section');
  });

  // Show target section
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add('active-section');
  }

  // Scroll to top
  window.scrollTo(0, 0);
}

// Navigation - Documentation Tabs
function openDocTab(tabId) {
  // Update Sidebar Active State
  document.querySelectorAll('.docs-nav-item').forEach(item => {
    item.classList.remove('active');
  });
  // Find the clicked item (this logic assumes the text matches or we pass element, 
  // but simpler to just find by onclick attribute or index. 
  // For now, let's just highlight the one that matches the call.)
  // A better way is to pass 'this' or use event delegation, but let's keep it simple:
  const sidebarItems = document.querySelectorAll('.docs-nav-item');
  const map = { 'intro': 0, 'start': 1, 'vars': 2, 'ops': 3, 'control': 4, 'loops': 5, 'funcs': 6, 'dsa': 7 };
  if (sidebarItems[map[tabId]]) {
    sidebarItems[map[tabId]].classList.add('active');
  }

  // Show Content
  document.querySelectorAll('.doc-section').forEach(sec => {
    sec.classList.remove('active');
  });
  const targetContent = document.getElementById('doc-' + tabId);
  if (targetContent) {
    targetContent.classList.add('active');
  }
}

// DSA Examples Library
const dsaExamples = {
  linear_search: `// Linear Search
kaam dhund_le(arr, target) {
  kitni_baar (i = 0; i < arr.length; i++) {
    agar (arr[i] == target) {
      wapas_de i;
    }
  }
  wapas_de -1;
}

thap_le nums = [3, 7, 11, 15];
thap_le idx = dhund_le(nums, 11);
bol("Index: " + idx);`,

  binary_search: `// Binary Search (Sorted Array)
kaam binary_dhund(arr, target) {
  thap_le left = 0;
  thap_le right = arr.length - 1;

  jab_tak (left <= right) {
    thap_le mid = Math.floor((left + right) / 2);

    agar (arr[mid] == target) {
      wapas_de mid;
    }
    aur_agar (arr[mid] < target) {
      left = mid + 1;
    }
    na_ta {
      right = mid - 1;
    }
  }

  wapas_de -1;
}

thap_le nums = [2, 4, 6, 8, 10];
bol("Index of 8 is: " + binary_dhund(nums, 8));`,

  bubble_sort: `// Bubble Sort
kaam bubble_sort(arr) {
  thap_le n = arr.length;

  kitni_baar (i = 0; i < n - 1; i++) {
    kitni_baar (j = 0; j < n - 1 - i; j++) {
      agar (arr[j] > arr[j + 1]) {
        thap_le temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  wapas_de arr;
}

thap_le a = [5, 1, 4, 2, 8];
bol("Sorted: " + bubble_sort(a));`,

  insertion_sort: `// Insertion Sort
kaam insertion_sort(arr) {
  thap_le n = arr.length;

  kitni_baar (i = 1; i < n; i++) {
    thap_le key = arr[i];
    thap_le j = i - 1;

    jab_tak (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }

  wapas_de arr;
}

thap_le a = [12, 11, 13, 5, 6];
bol("Sorted: " + insertion_sort(a));`,

  reverse_string: `// Reverse String
kaam ulta_string(s) {
  thap_le result = "";
  kitni_baar (i = s.length - 1; i >= 0; i--) {
    result = result + s[i];
  }
  wapas_de result;
}

bol(ulta_string("rajan"));`,

  palindrome: `// Palindrome Check
kaam palindrome_se(s) {
  thap_le left = 0;
  thap_le right = s.length - 1;

  jab_tak (left < right) {
    agar (s[left] != s[right]) {
      wapas_de galat;
    }
    left = left + 1;
    right = right - 1;
  }

  wapas_de sahi;
}

bol("Is 'madam' palindrome? " + palindrome_se("madam"));
bol("Is 'hello' palindrome? " + palindrome_se("hello"));`,

  factorial: `// Factorial (Recursion)
kaam fact(n) {
  agar (n == 0 || n == 1) {
    wapas_de 1;
  }
  wapas_de n * fact(n - 1);
}

bol("Factorial of 5: " + fact(5));`,

  fibonacci: `// Fibonacci (Recursion)
kaam fib(n) {
  agar (n <= 1) {
    wapas_de n;
  }
  wapas_de fib(n - 1) + fib(n - 2);
}

bol("6th Fibonacci number: " + fib(6));`,

  stack: `// Stack (LIFO)
kaam naya_stack() { wapas_de []; }
kaam dhakel(stack, value) { stack.push(value); }
kaam nikaal(stack) { 
  agar (stack.length == 0) { wapas_de null; }
  wapas_de stack.pop(); 
}

thap_le st = naya_stack();
dhakel(st, 10);
dhakel(st, 20);
bol("Popped: " + nikaal(st)); // 20`,

  queue: `// Queue (FIFO)
kaam nayi_queue() { wapas_de []; }
kaam line_me_laga(q, value) { q.push(value); }
kaam aage_se_nikaal(q) {
  agar (q.length == 0) { wapas_de null; }
  wapas_de q.shift();
}

thap_le q = nayi_queue();
line_me_laga(q, "A");
line_me_laga(q, "B");
bol("Dequeued: " + aage_se_nikaal(q)); // A`,

  linked_list: `// Linked List Demo
kaam Node(value) {
  wapas_de { val: value, next: null };
}

kaam insert_front(head, value) {
  thap_le naya = Node(value);
  naya.next = head;
  wapas_de naya;
}

kaam print_list(head) {
  thap_le curr = head;
  jab_tak (curr != null) {
    bol(curr.val);
    curr = curr.next;
  }
}

thap_le head = null;
head = insert_front(head, 30);
head = insert_front(head, 20);
head = insert_front(head, 10);
bol("Linked List:");
print_list(head);`,

  bst: `// BST Insert & Inorder
kaam TreeNode(value) {
  wapas_de { val: value, left: null, right: null };
}

kaam insert_bst(root, value) {
  agar (root == null) { wapas_de TreeNode(value); }
  agar (value < root.val) { root.left = insert_bst(root.left, value); }
  na_ta { root.right = insert_bst(root.right, value); }
  wapas_de root;
}

kaam inorder(root) {
  agar (root == null) { wapas_de; }
  inorder(root.left);
  bol(root.val);
  inorder(root.right);
}

thap_le root = null;
root = insert_bst(root, 5);
root = insert_bst(root, 2);
root = insert_bst(root, 8);
bol("Inorder Traversal:");
inorder(root);`,

  bfs: `// Graph BFS
thap_le graph = {
  0: [1, 2],
  1: [0, 3],
  2: [0, 3],
  3: [1, 2]
};

kaam bfs(graph, start) {
  thap_le visited = {};
  thap_le q = [];
  q.push(start);
  visited[start] = sahi;

  jab_tak (q.length > 0) {
    thap_le node = q.shift();
    bol("Visited: " + node);

    thap_le neighbors = graph[node] || [];
    kitni_baar (i = 0; i < neighbors.length; i++) {
      thap_le nxt = neighbors[i];
      agar (!visited[nxt]) {
        visited[nxt] = sahi;
        q.push(nxt);
      }
    }
  }
}

bol("BFS starting from 0:");
bfs(graph, 0);`
};

function loadExample() {
  const selector = document.getElementById('example-selector');
  const editor = document.getElementById('code-editor');
  const key = selector.value;

  if (key && dsaExamples[key]) {
    editor.value = dsaExamples[key];
  }
}

// Roasts & Messages
const successRoasts = [
  "✨ Bawli cheez! Code sahi se daud gya re.",
  "🚜 Tractor jaisa smooth chala tera program.",
  "🌾 Khet ki pakki fasal jaisa output aa gya.",
  "😎 Compiler bola: “Bhai, respect le le.”",
  "💪 Aise hi likhta raha, Silicon Valley bhi dekh lega ek din.",
  "🍵 Chai pakka le aa, ab tu officially developer ho gya.",
  "🎯 Bug aane se pehle hi darr ke bhaag gaye lagte se.",
  "🎉 Gaam wale bolenge: “Ye to IT ka chora ho gya bhai.”",
  "🔥 Logic aisa tight, teacher bhi bol de “first class se.”",
  "📈 Output dekh ke lag raha se interview direct clear ho jaye."
];

const noOutputRoasts = [
  "✨ Code to chal gya, par kuch print hi na karwaya. Output dimaag mein hi dekh raha se kya?",
  "🤐 System chup-chaap baith gya. Thoda sa “bol( )” bhi daal de re.",
  "👀 Compiler: \"Main ready tha, tu ne kuch bulaya hi na.\""
];

const errorTemplates = {
  generic: [
    "💥 Beech raste program ulat gya. Error: {msg}",
    "🐛 Aisa bug mara hai ki system hil gya. Dekh le: {msg}",
    "🚨 Program chillaya: “Bas kar paaji, aage mat chala!” – {msg}"
  ],
  syntax: [
    "📏 Syntax dekh ke teacher bhi behosh ho jaye. Error: {msg}",
    "😵 ‘;’ bhi zaroori hota se kabhi-kabhi. Dekh le zara: {msg}",
    "🧩 Code ka jigsaw puzzle adhoora chhod diya se. Yeh dekh: {msg}"
  ],
  reference: [
    "🔍 ‘{var}’ naam ka aadmi gaam mein bhi nahi mila. Pehle variable thap_le re.",
    "👻 Tu jis variable ko bula raha, wo to hawa mein ghoom raha se. Error: {msg}",
    "🙄 Compiler: “Bhai, ye {var} kahan register kara rakha tha?”"
  ],
  type: [
    "🔧 Number ko string se aise hi jod dega? Dimag ka type mismatch ho gya. {msg}",
    "🧮 Calculator bhi confuse ho gya: “Ye kya karwa raha se bhai?”",
    "🥲 Data type ko bhi thoda izzat de de, itni khichdi mat bana. {msg}"
  ]
};

function getRandomRoast(type, context = {}) {
  let templates = errorTemplates.generic;
  if (type === 'SyntaxError') templates = errorTemplates.syntax;
  if (type === 'ReferenceError') templates = errorTemplates.reference;
  if (type === 'TypeError') templates = errorTemplates.type;

  if (type === 'success') return successRoasts[Math.floor(Math.random() * successRoasts.length)];
  if (type === 'no_output') return noOutputRoasts[Math.floor(Math.random() * noOutputRoasts.length)];

  const template = templates[Math.floor(Math.random() * templates.length)];
  let msg = template.replace('{msg}', context.msg || 'Pata nahi kya hua');
  if (context.var) msg = msg.replace('{var}', context.var);
  return msg;
}

// Transpiler
function transpile(sourceCode) {
  // 1. Mask strings to avoid replacing keywords inside them
  const strings = [];
  let maskedCode = sourceCode.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
    strings.push(match);
    return `__STR_${strings.length - 1}__`;
  });

  // 1.5. Safety Check: Prevent assignment in conditions
  const dangerousKeywords = ['agar', 'aur_agar', 'jab_tak'];
  dangerousKeywords.forEach(kw => {
    let index = maskedCode.indexOf(kw);
    while (index !== -1) {
      // Ensure whole word match
      const prevChar = index > 0 ? maskedCode[index - 1] : ' ';
      const nextChar = maskedCode[index + kw.length];
      if (!/\w/.test(prevChar) && !/\w/.test(nextChar)) {
        // Find opening paren
        let openParen = maskedCode.indexOf('(', index);
        if (openParen !== -1) {
          // Find matching closing paren
          let closeParen = -1;
          let depth = 0;
          for (let i = openParen; i < maskedCode.length; i++) {
            if (maskedCode[i] === '(') depth++;
            else if (maskedCode[i] === ')') depth--;

            if (depth === 0) {
              closeParen = i;
              break;
            }
          }

          if (closeParen !== -1) {
            const condition = maskedCode.substring(openParen + 1, closeParen);
            // Remove valid operators
            const cleanCondition = condition.replace(/===|!==|==|!=|<=|>=|\+=|-=|\*=|\/=/g, '');
            if (cleanCondition.includes('=')) {
              throw new SyntaxError(`Oye Chaudhary! Condition mein '=' laga diya? '==' ya '===' use kar na. (Near: ${kw})`);
            }
          }
        }
      }
      index = maskedCode.indexOf(kw, index + 1);
    }
  });

  // 2. Keyword Replacements
  const keywords = [
    { haryanvi: 'thap_le', js: 'let' },
    { haryanvi: 'bol', js: 'console.log' },
    { haryanvi: 'agar', js: 'if' },
    { haryanvi: 'aur_agar', js: 'else if' },
    { haryanvi: 'na_ta', js: 'else' },
    { haryanvi: 'pehle_kar', js: 'do' },
    { haryanvi: 'jab_tak', js: 'while' },
    { haryanvi: 'kitni_baar', js: 'for' },
    { haryanvi: 'kaam', js: 'function' },
    { haryanvi: 'wapas_de', js: 'return' },
    { haryanvi: 'sahi', js: 'true' },
    { haryanvi: 'galat', js: 'false' }
  ];

  keywords.forEach(kw => {
    const regex = new RegExp(`\\b${kw.haryanvi}\\b`, 'g');
    maskedCode = maskedCode.replace(regex, kw.js);
  });

  // 3. Unmask strings
  let finalCode = maskedCode.replace(/__STR_(\d+)__/g, (match, index) => {
    return strings[parseInt(index)];
  });

  return finalCode;
}

// Execution
function runCode() {
  const editor = document.getElementById('code-editor');
  const outputConsole = document.getElementById('output-console');
  const sourceCode = editor.value;

  // Clear previous output
  outputConsole.innerHTML = '';

  // Show running state
  const runningMsg = document.createElement('div');
  runningMsg.style.color = '#888';
  runningMsg.textContent = '⏳ Chal raha hai...';
  outputConsole.appendChild(runningMsg);

  setTimeout(() => {
    outputConsole.removeChild(runningMsg);

    try {
      const jsCode = transpile(sourceCode);

      const logs = [];
      const customConsole = {
        log: (...args) => {
          const line = args.map(arg =>
            typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
          ).join(' ');
          logs.push(line);
        }
      };

      new Function('console', jsCode)(customConsole);

      if (logs.length === 0) {
        const div = document.createElement('div');
        div.style.color = '#888';
        div.style.fontStyle = 'italic';
        div.textContent = getRandomRoast('no_output');
        outputConsole.appendChild(div);
      } else {
        logs.forEach(log => {
          const div = document.createElement('div');
          div.style.marginBottom = '4px';
          div.style.borderBottom = '1px solid #333';
          div.textContent = "> " + log;
          outputConsole.appendChild(div);
        });

        const successDiv = document.createElement('div');
        successDiv.className = 'log-success';
        successDiv.textContent = getRandomRoast('success');
        outputConsole.appendChild(successDiv);
      }

    } catch (e) {
      const div = document.createElement('div');
      div.className = 'log-error';

      let varName = '';
      if (e.name === 'ReferenceError') {
        const match = e.message.match(/(\w+) is not defined/);
        if (match) varName = match[1];
      }

      const roast = getRandomRoast(e.name, { msg: e.message, var: varName });
      div.textContent = roast;
      outputConsole.appendChild(div);
    }
  }, 300);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Intro Animation Handling
  const overlay = document.getElementById('intro-overlay');
  if (overlay) {
    // Wait for animation to finish (3s + buffer)
    setTimeout(() => {
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 500); // Wait for fade out transition
    }, 3500);
  }

  const hash = window.location.hash.substring(1);
  if (hash && ['playground', 'docs', 'hero'].includes(hash)) {
    showSection(hash);
  }
});

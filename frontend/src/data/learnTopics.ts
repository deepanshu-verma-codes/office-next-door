import { LearnTopic } from "./types";

export const learnData: LearnTopic[] = [
  {
    "id": "react-virtualization",
    "title": "Virtualization (Windowing)",
    "tech": "React",
    "description": "Master the mechanics of Virtualization with interactive visualizations and interview tips.",
    "definition": "Virtualization, or windowing, is a performance optimization technique used to efficiently render massive lists of data. Instead of rendering thousands of DOM nodes at once—which would crash the browser—virtualization only renders the small subset of items currently visible in the user's viewport, recycling DOM nodes as the user scrolls.",
    "interviewAsk": "Can you explain what Virtualization (Windowing) is and why we use it?",
    "interviewAnswer": "Virtualization, or windowing, is a performance optimization technique used to efficiently render massive lists of data. Instead of rendering thousands of DOM nodes at once—which would crash the browser—virtualization only renders the small subset of items currently visible in the user's viewport, recycling DOM nodes as the user scrolls. This is extremely useful in production for optimizing performance, managing memory, and keeping our application running smoothly even with infinite feeds.",
    "syntax": "",
    "codeExample": "import { FixedSizeList as List } from 'react-window';\n\nconst Row = ({ index, style }) => (\n  <div style={style}>Row {index}</div>\n);\n\nconst VirtualizedList = () => (\n  <List\n    height={150}\n    itemCount={1000}\n    itemSize={35}\n    width={300}\n  >\n    {Row}\n  </List>\n);",
    "diagramType": "tree",
    "animationSteps": [
      {
        "title": "Large Data Array",
        "description": "The application receives an array of 10,000 items from the backend.",
        "diagramState": {
          "phase": "DATA_LOAD",
          "activeNodes": [
            "Item 1",
            "Item 2",
            "...",
            "Item 10000"
          ]
        }
      },
      {
        "title": "Viewport Calculation",
        "description": "The virtualizer calculates which items fit inside the 500px high viewport based on the scroll position.",
        "diagramState": {
          "phase": "CALCULATE",
          "activeNodes": [
            "Item 1 (Visible)",
            "Item 2 (Visible)"
          ],
          "browser": "Viewport height: 500px"
        }
      },
      {
        "title": "Render Visible Nodes",
        "description": "Only the visible nodes are mounted to the DOM, vastly reducing memory overhead.",
        "diagramState": {
          "phase": "RENDER",
          "activeNodes": [
            "Item 1 (DOM)",
            "Item 2 (DOM)"
          ],
          "browser": "Rendered: 2 Nodes"
        }
      }
    ]
  },
  {
    "id": "react-lazy-suspense",
    "title": "Lazy Loading & Suspense",
    "tech": "React",
    "description": "Master the mechanics of Lazy Loading & Suspense with interactive visualizations and interview tips.",
    "definition": "React.lazy() is a function that lets you render a dynamic import as a regular component, enabling code-splitting. Suspense is a component that lets you 'wait' for some code to load and declaratively specify a loading state (like a spinner) while waiting. Together, they dramatically reduce the initial bundle size of an application.",
    "interviewAsk": "Can you explain what Lazy Loading & Suspense is and why we use it?",
    "interviewAnswer": "React.lazy() is a function that lets you render a dynamic import as a regular component, enabling code-splitting. Suspense is a component that lets you 'wait' for some code to load and declaratively specify a loading state (like a spinner) while waiting. Together, they dramatically reduce the initial bundle size of an application. This is extremely useful in production for optimizing performance and speeding up the initial page load time.",
    "syntax": "const LazyComponent = React.lazy(() => import('./Component'));\n<Suspense fallback={<Spinner />}>\n  <LazyComponent />\n</Suspense>",
    "codeExample": "import React, { Suspense } from 'react';\n\nconst HeavyChart = React.lazy(() => import('./HeavyChart'));\n\nfunction Dashboard() {\n  return (\n    <div>\n      <h2>Dashboard</h2>\n      <Suspense fallback={<div>Loading chart...</div>}>\n        <HeavyChart />\n      </Suspense>\n    </div>\n  );\n}",
    "diagramType": "tree",
    "animationSteps": [
      {
        "title": "Initial Bundle Load",
        "description": "The user loads the app. Only the core bundle is downloaded. The heavy component is ignored.",
        "diagramState": {
          "phase": "LOAD",
          "activeNodes": [
            "Main App Bundle"
          ],
          "browser": "Fast Initial Load"
        }
      },
      {
        "title": "Encounter Lazy Component",
        "description": "React attempts to render the lazy component, triggering a separate network request to fetch its chunk.",
        "diagramState": {
          "phase": "FETCH",
          "activeNodes": [
            "Main App Bundle",
            "HeavyChart (WIP)"
          ],
          "browser": "Fetching Chunk..."
        }
      },
      {
        "title": "Suspense Fallback",
        "description": "While fetching, React suspends rendering and displays the Suspense fallback UI.",
        "diagramState": {
          "phase": "SUSPEND",
          "activeNodes": [
            "Main App Bundle",
            "Fallback Spinner"
          ],
          "browser": "Showing Spinner"
        }
      },
      {
        "title": "Chunk Loaded",
        "description": "The chunk arrives. React replaces the fallback with the fully rendered component.",
        "diagramState": {
          "phase": "RENDER",
          "activeNodes": [
            "Main App Bundle",
            "HeavyChart (DOM)"
          ],
          "browser": "Chart Visible"
        }
      }
    ]
  },
  {
    "id": "closures",
    "title": "Closures",
    "tech": "JavaScript",
    "description": "Master the mechanics of Closures with interactive visualizations and interview tips.",
    "definition": "A closure is a fundamental feature in JavaScript where an inner function retains access to its outer function's lexical scope (variables and parameters) even after the outer function has finished executing. This occurs because functions in JavaScript form closures around the data they were created with, essentially creating a persistent 'backpack' of private memory.",
    "interviewAsk": "Can you explain what Closures is and why we use it?",
    "interviewAnswer": "A closure is a fundamental feature in JavaScript where an inner function retains access to its outer function's lexical scope (variables and parameters) even after the outer function has finished executing. This occurs because functions in JavaScript form closures around the data they were created with, essentially creating a persistent 'backpack' of private memory. In practice, I use closures all the time to create private variables or preserve state in asynchronous callbacks without polluting the global scope.",
    "syntax": "",
    "codeExample": "const add = (a) => (b) => a + b;\nconst add5 = add(5);\nconsole.log(add5(2));",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Global Execution Context",
        "description": "The JS engine creates the global execution context and allocates memory for the outer function 'createCounter'.",
        "diagramState": {
          "env": "Global",
          "vars": {
            "createCounter": "fn()",
            "counter": "uninitialized"
          }
        }
      },
      {
        "title": "Invoke createCounter()",
        "description": "A new local execution context is pushed onto the call stack. Local memory is created for 'count'.",
        "diagramState": {
          "env": "createCounter()",
          "vars": {
            "count": 0
          },
          "closure": null
        }
      },
      {
        "title": "Return Inner Function",
        "description": "createCounter returns the inner function. It attaches a [[Environment]] reference (backpack) containing 'count'. The createCounter context is popped off the stack.",
        "diagramState": {
          "env": "Global",
          "vars": {
            "createCounter": "fn()",
            "counter": "fn()"
          }
        }
      },
      {
        "title": "Invoke counter()",
        "description": "The inner function is called. It looks for 'count' in local memory, doesn't find it, and looks into its Closure backpack.",
        "diagramState": {
          "env": "counter()",
          "vars": {},
          "closure": {
            "count": 0
          }
        }
      },
      {
        "title": "Update Closure Variable",
        "description": "The inner function increments 'count' inside the closure backpack to 1.",
        "diagramState": {
          "env": "counter()",
          "vars": {},
          "closure": {
            "count": 1
          }
        }
      }
    ]
  },
  {
    "id": "hoisting",
    "title": "Hoisting",
    "tech": "JavaScript",
    "description": "Master the mechanics of Hoisting with interactive visualizations and interview tips.",
    "definition": "Hoisting is JavaScript's default behavior of moving variable and function declarations to the top of their respective lexical environments during the compilation phase, before code execution. While 'var' declarations are hoisted and initialized with 'undefined', 'let' and 'const' are hoisted but remain uninitialized in the Temporal Dead Zone until their actual line of code is evaluated.",
    "interviewAsk": "Can you explain what Hoisting is and why we use it?",
    "interviewAnswer": "Hoisting is JavaScript's default behavior of moving variable and function declarations to the top of their respective lexical environments during the compilation phase, before code execution. While 'var' declarations are hoisted and initialized with 'undefined', 'let' and 'const' are hoisted but remain uninitialized in the Temporal Dead Zone until their actual line of code is evaluated. Because of this, I always enforce using 'let' and 'const' instead of 'var' to avoid unpredictable hoisting bugs, since they are safely kept in the Temporal Dead Zone.",
    "syntax": "",
    "codeExample": "console.log(x);\nvar x = 5;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Creation Phase (Memory Allocation)",
        "description": "Before executing code, the JS engine scans for variable and function declarations. 'var' is initialized to undefined. Functions are stored entirely.",
        "diagramState": {
          "env": "Global",
          "vars": {
            "x": "undefined",
            "foo": "fn()"
          }
        }
      },
      {
        "title": "Execution Phase: Line 1",
        "description": "console.log(x) is executed. It looks up 'x' in memory and finds 'undefined'. No error is thrown.",
        "diagramState": {
          "env": "Global",
          "vars": {
            "x": "undefined",
            "foo": "fn()"
          }
        }
      },
      {
        "title": "Execution Phase: Line 2",
        "description": "The assignment 'var x = 5' occurs. The value of 'x' in memory is updated from undefined to 5.",
        "diagramState": {
          "env": "Global",
          "vars": {
            "x": 5,
            "foo": "fn()"
          }
        }
      }
    ]
  },
  {
    "id": "event-loop",
    "title": "Event Loop",
    "tech": "JavaScript",
    "description": "Master the mechanics of Event Loop with interactive visualizations and interview tips.",
    "definition": "The Event Loop is a continuous background process that allows JavaScript—which is fundamentally single-threaded—to perform non-blocking asynchronous operations. It constantly monitors the Call Stack and the Callback/Microtask Queues. When the Call Stack is empty, it dequeues pending functions from the queues (prioritizing Microtasks like Promise callbacks) and pushes them onto the stack to be executed.",
    "interviewAsk": "Can you explain what Event Loop is and why we use it?",
    "interviewAnswer": "The Event Loop is a continuous background process that allows JavaScript—which is fundamentally single-threaded—to perform non-blocking asynchronous operations. It constantly monitors the Call Stack and the Callback/Microtask Queues. When the Call Stack is empty, it dequeues pending functions from the queues (prioritizing Microtasks like Promise callbacks) and pushes them onto the stack to be executed. Understanding this is critical in Node.js and the browser, as it allows us to handle heavy I/O operations like network requests or file reads without freezing the main UI thread.",
    "syntax": "",
    "codeExample": "setTimeout(() => console.log('Async'), 0);\nconsole.log('Sync');",
    "diagramType": "event-loop",
    "animationSteps": [
      {
        "title": "Synchronous Code Execution",
        "description": "console.log('Start') is pushed to the call stack, executed, and popped off.",
        "diagramState": {
          "stack": [
            "console.log('Start')"
          ],
          "webApis": [],
          "queue": []
        }
      },
      {
        "title": "Encountering setTimeout",
        "description": "setTimeout is pushed to the call stack. Since it's an asynchronous Web API, it is handed off to the browser.",
        "diagramState": {
          "stack": [
            "setTimeout(cb, 1000)"
          ],
          "webApis": [
            "Timer (1000ms)"
          ],
          "queue": []
        }
      },
      {
        "title": "Timer Running",
        "description": "The call stack is clear. The Web API handles the countdown in the background.",
        "diagramState": {
          "stack": [],
          "webApis": [
            "Timer (active)"
          ],
          "queue": []
        }
      },
      {
        "title": "Callback Queue",
        "description": "The timer finishes. The callback function 'cb' is pushed into the Callback (Task) Queue.",
        "diagramState": {
          "stack": [],
          "webApis": [],
          "queue": [
            "cb()"
          ]
        }
      },
      {
        "title": "Event Loop Tick",
        "description": "The Event Loop checks if the Call Stack is empty. Since it is, it dequeues 'cb()' from the Queue and pushes it to the Stack.",
        "diagramState": {
          "stack": [
            "cb()"
          ],
          "webApis": [],
          "queue": []
        }
      }
    ]
  },
  {
    "id": "promises",
    "title": "Promises",
    "tech": "JavaScript",
    "description": "Master the mechanics of Promises with interactive visualizations and interview tips.",
    "definition": "A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. It acts as a proxy for a value not necessarily known when the promise is created, and exists in one of three states: pending, fulfilled, or rejected, allowing you to chain operations cleanly using .then() and .catch().",
    "interviewAsk": "Can you explain what Promises is and why we use it?",
    "interviewAnswer": "A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. It acts as a proxy for a value not necessarily known when the promise is created, and exists in one of three states: pending, fulfilled, or rejected, allowing you to chain operations cleanly using .then() and .catch(). Promises are much cleaner than traditional callback chains. They help avoid 'callback hell' and make error handling much more predictable.",
    "syntax": "",
    "codeExample": "const p = new Promise((res, rej) => res('Done'));\np.then(console.log);",
    "diagramType": "event-loop",
    "animationSteps": [
      {
        "title": "Promise Instantiation",
        "description": "A Promise is created. It starts in a 'pending' state.",
        "diagramState": {
          "stack": [
            "new Promise()"
          ],
          "webApis": [],
          "queue": []
        }
      },
      {
        "title": "Microtask Queue",
        "description": "When the Promise resolves, its .then() callback is pushed to the Microtask Queue, which has higher priority than the Callback (Macrotask) Queue.",
        "diagramState": {
          "stack": [],
          "webApis": [],
          "queue": [
            "[Microtask] then(cb)"
          ]
        }
      },
      {
        "title": "Event Loop Prioritization",
        "description": "The Event Loop always empties the Microtask Queue completely before moving to the standard Callback Queue.",
        "diagramState": {
          "stack": [
            "then(cb)"
          ],
          "webApis": [],
          "queue": []
        }
      }
    ]
  },
  {
    "id": "async-await",
    "title": "Async/Await",
    "tech": "JavaScript",
    "description": "Master the mechanics of Async/Await with interactive visualizations and interview tips.",
    "definition": "Async/await is modern syntactic sugar built on top of Promises that allows asynchronous, promise-based behavior to be written in a cleaner, more readable synchronous style. The 'async' keyword ensures a function always returns a Promise, while the 'await' keyword pauses the local execution of the function until the awaited Promise settles, yielding control back to the main thread in the meantime.",
    "interviewAsk": "Can you explain what Async/Await is and why we use it?",
    "interviewAnswer": "Async/await is modern syntactic sugar built on top of Promises that allows asynchronous, promise-based behavior to be written in a cleaner, more readable synchronous style. The 'async' keyword ensures a function always returns a Promise, while the 'await' keyword pauses the local execution of the function until the awaited Promise settles, yielding control back to the main thread in the meantime. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "async function fetch() {\n  const data = await api();\nreturn data;\n}",
    "diagramType": "event-loop",
    "animationSteps": [
      {
        "title": "Call Async Function",
        "description": "The async function is pushed to the Call Stack and begins synchronous execution until it hits 'await'.",
        "diagramState": {
          "stack": [
            "fetchData()"
          ],
          "webApis": [],
          "queue": []
        }
      },
      {
        "title": "Await Pauses Execution",
        "description": "The 'await' keyword pauses the local execution of the function. The Promise is offloaded, and fetchData() is popped off the Call Stack, allowing other code to run.",
        "diagramState": {
          "stack": [],
          "webApis": [
            "fetch() Network Request"
          ],
          "queue": []
        }
      },
      {
        "title": "Network Response",
        "description": "The network request completes. The remainder of the async function is queued as a Microtask.",
        "diagramState": {
          "stack": [],
          "webApis": [],
          "queue": [
            "[Microtask] resume fetchData()"
          ]
        }
      },
      {
        "title": "Resume Execution",
        "description": "The Event Loop pushes the remainder of the function back onto the stack to finish executing.",
        "diagramState": {
          "stack": [
            "fetchData() (resumed)"
          ],
          "webApis": [],
          "queue": []
        }
      }
    ]
  },
  {
    "id": "prototypal-inheritance",
    "title": "Prototypal Inheritance",
    "tech": "JavaScript",
    "description": "Master the mechanics of Prototypal Inheritance with interactive visualizations and interview tips.",
    "definition": "Prototypal Inheritance is the mechanism by which JavaScript objects inherit properties and methods from other objects. Every JavaScript object has a hidden internal property called [[Prototype]] (often accessed via __proto__) that points to another object, forming a prototype chain that the JS engine automatically traverses during property lookups.",
    "interviewAsk": "Can you explain what Prototypal Inheritance is and why we use it?",
    "interviewAnswer": "Prototypal Inheritance is the mechanism by which JavaScript objects inherit properties and methods from other objects. Every JavaScript object has a hidden internal property called [[Prototype]] (often accessed via __proto__) that points to another object, forming a prototype chain that the JS engine automatically traverses during property lookups. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const obj = Object.create(null);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Object Creation",
        "description": "We create an object 'child' using Object.create(parent). 'child' has an empty local property list.",
        "diagramState": {
          "env": "Global",
          "vars": {
            "child": "{}"
          }
        }
      },
      {
        "title": "Property Lookup (Miss)",
        "description": "We try to access child.name. The engine checks 'child' directly and doesn't find it.",
        "diagramState": {
          "env": "Global",
          "vars": {
            "child": "{}"
          }
        }
      },
      {
        "title": "Prototype Chain Traversal",
        "description": "The engine traverses the __proto__ link (prototype chain) to the parent object, finds 'name', and returns it.",
        "diagramState": {
          "env": "Global",
          "vars": {
            "child": "{}"
          },
          "closure": {
            "parent.name": "'John'"
          }
        }
      }
    ]
  },
  {
    "id": "scope-chain",
    "title": "Scope Chain",
    "tech": "JavaScript",
    "description": "Master the mechanics of Scope Chain with interactive visualizations and interview tips.",
    "definition": "The Scope Chain is the mechanism JavaScript uses to resolve variable values during runtime. When a variable is referenced, the JavaScript engine first looks in the current local scope. If it is not found, it traverses outward to the lexically surrounding scopes one by one, all the way up to the Global scope, until the variable is resolved.",
    "interviewAsk": "Can you explain what Scope Chain is and why we use it?",
    "interviewAnswer": "The Scope Chain is the mechanism JavaScript uses to resolve variable values during runtime. When a variable is referenced, the JavaScript engine first looks in the current local scope. If it is not found, it traverses outward to the lexically surrounding scopes one by one, all the way up to the Global scope, until the variable is resolved. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "let a = 1;\nfunction f() {\n  console.log(a);\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Global Scope",
        "description": "Global execution context defines variable 'globalVar'.",
        "diagramState": {
          "env": "Global",
          "vars": {
            "globalVar": 1
          }
        }
      },
      {
        "title": "Outer Function Scope",
        "description": "outer() is called. It has its own local memory with 'outerVar'.",
        "diagramState": {
          "env": "outer()",
          "vars": {
            "outerVar": 2
          },
          "closure": {
            "[[OuterEnv]]": "Global"
          }
        }
      },
      {
        "title": "Inner Function Scope",
        "description": "inner() is called. It tries to access 'globalVar'. It checks local memory (miss), then [[OuterEnv]] (outer() - miss), then global (hit!).",
        "diagramState": {
          "env": "inner()",
          "vars": {
            "innerVar": 3
          },
          "closure": {
            "[[OuterEnv]]": "outer() -> Global"
          }
        }
      }
    ]
  },
  {
    "id": "map-and-set",
    "title": "Map and Set",
    "tech": "JavaScript",
    "description": "Master the mechanics of Map and Set with interactive visualizations and interview tips.",
    "definition": "Map and Set are robust ES6 data structures. A Map is a collection of keyed data items where keys can be of any type (including entire objects or functions), unlike standard objects which only allow string/symbol keys. A Set is a collection of strictly unique values of any type, highly optimized for checking existence and eliminating duplicates from arrays.",
    "interviewAsk": "Can you explain what Map and Set is and why we use it?",
    "interviewAnswer": "Map and Set are robust ES6 data structures. A Map is a collection of keyed data items where keys can be of any type (including entire objects or functions), unlike standard objects which only allow string/symbol keys. A Set is a collection of strictly unique values of any type, highly optimized for checking existence and eliminating duplicates from arrays. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const m = new Map();\nm.set('key', 'value');",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "generators",
    "title": "Generators",
    "tech": "JavaScript",
    "description": "Master the mechanics of Generators with interactive visualizations and interview tips.",
    "definition": "Generators is a concept where generators are functions that can be exited and later re-entered. Their context is saved across re-entrances.",
    "interviewAsk": "Can you explain what Generators is and why we use it?",
    "interviewAnswer": "Generators is a concept where generators are functions that can be exited and later re-entered. Their context is saved across re-entrances. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "function* gen() {\n  yield 1;\nyield 2;\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "call-apply-bind",
    "title": "Call, Apply, Bind",
    "tech": "JavaScript",
    "description": "Master the mechanics of Call, Apply, Bind with interactive visualizations and interview tips.",
    "definition": "Call, Apply, and Bind are built-in JavaScript methods that allow you to explicitly define the execution context (the 'this' keyword) of a function. 'Call' invokes the function with a given 'this' value and arguments provided individually. 'Apply' is identical to 'Call' but takes arguments as an array. 'Bind' does not execute the function immediately; instead, it returns a new function with the 'this' context permanently bound, which is highly useful for event listeners and callbacks.",
    "interviewAsk": "Can you explain what Call, Apply, Bind is and why we use it?",
    "interviewAnswer": "Call, Apply, and Bind are built-in JavaScript methods that allow you to explicitly define the execution context (the 'this' keyword) of a function. 'Call' invokes the function with a given 'this' value and arguments provided individually. 'Apply' is identical to 'Call' but takes arguments as an array. 'Bind' does not execute the function immediately; instead, it returns a new function with the 'this' context permanently bound, which is highly useful for event listeners and callbacks. I use 'call' and 'apply' when I need to borrow a method from another object immediately (apply just takes an array of arguments). I use 'bind' when passing a callback to something like setTimeout or React, to ensure the 'this' context isn't lost.",
    "syntax": "",
    "codeExample": "fn.call(obj, arg1);\nfn.apply(obj, [arg1]);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "the-this-keyword",
    "title": "The 'this' Keyword",
    "tech": "JavaScript",
    "description": "Master the mechanics of The 'this' Keyword with interactive visualizations and interview tips.",
    "definition": "The 'this' Keyword is a concept where the 'this' keyword refers to the object it belongs to, depending on how it is invoked.",
    "interviewAsk": "Can you explain what The 'this' Keyword is and why we use it?",
    "interviewAnswer": "The 'this' Keyword is a concept where the 'this' keyword refers to the object it belongs to, depending on how it is invoked. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const obj = {\n  func() {\n  console.log(this);\n}\n};",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "arrow-functions",
    "title": "Arrow Functions",
    "tech": "JavaScript",
    "description": "Master the mechanics of Arrow Functions with interactive visualizations and interview tips.",
    "definition": "Arrow Functions is a concept where arrow functions provide a concise syntax and lexically bind the 'this' value.",
    "interviewAsk": "Can you explain what Arrow Functions is and why we use it?",
    "interviewAnswer": "Arrow Functions is a concept where arrow functions provide a concise syntax and lexically bind the 'this' value. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const arr = [1,2].map(x => x*2);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "destructuring",
    "title": "Destructuring",
    "tech": "JavaScript",
    "description": "Master the mechanics of Destructuring with interactive visualizations and interview tips.",
    "definition": "Destructuring is a concept where destructuring assignment allows unpacking values from arrays or properties from objects into distinct variables.",
    "interviewAsk": "Can you explain what Destructuring is and why we use it?",
    "interviewAnswer": "Destructuring is a concept where destructuring assignment allows unpacking values from arrays or properties from objects into distinct variables. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const {\n  a, b\n} = obj;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "spread-and-rest",
    "title": "Spread and Rest",
    "tech": "JavaScript",
    "description": "Master the mechanics of Spread and Rest with interactive visualizations and interview tips.",
    "definition": "Spread and Rest is a concept where spread expands iterables into elements. Rest collects multiple elements into an array.",
    "interviewAsk": "Can you explain what Spread and Rest is and why we use it?",
    "interviewAnswer": "Spread and Rest is a concept where spread expands iterables into elements. Rest collects multiple elements into an array. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const newArr = [...oldArr, 4, 5];",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "template-literals",
    "title": "Template Literals",
    "tech": "JavaScript",
    "description": "Master the mechanics of Template Literals with interactive visualizations and interview tips.",
    "definition": "Template Literals is a concept where template literals allow embedded expressions and multi-line strings.",
    "interviewAsk": "Can you explain what Template Literals is and why we use it?",
    "interviewAnswer": "Template Literals is a concept where template literals allow embedded expressions and multi-line strings. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const str = `Hello ${name}`;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "es-modules",
    "title": "ES Modules",
    "tech": "JavaScript",
    "description": "Master the mechanics of ES Modules with interactive visualizations and interview tips.",
    "definition": "ES Modules is a concept where eS modules provide a standardized module system for JavaScript.",
    "interviewAsk": "Can you explain what ES Modules is and why we use it?",
    "interviewAnswer": "ES Modules is a concept where eS modules provide a standardized module system for JavaScript. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "import {\n  func\n} from './module.js';",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "classes-and-oop",
    "title": "Classes and OOP",
    "tech": "JavaScript",
    "description": "Master the mechanics of Classes and OOP with interactive visualizations and interview tips.",
    "definition": "Classes and OOP is a concept where classes are templates for creating objects, encapsulating data with code.",
    "interviewAsk": "Can you explain what Classes and OOP is and why we use it?",
    "interviewAnswer": "Classes and OOP is a concept where classes are templates for creating objects, encapsulating data with code. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "class User {\n  constructor(name) {\n  this.name = name;\n}\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "garbage-collection",
    "title": "Garbage Collection",
    "tech": "JavaScript",
    "description": "Master the mechanics of Garbage Collection with interactive visualizations and interview tips.",
    "definition": "Garbage Collection is a concept where automatic memory management that frees memory occupied by objects that are no longer reachable.",
    "interviewAsk": "Can you explain what Garbage Collection is and why we use it?",
    "interviewAnswer": "Garbage Collection is a concept where automatic memory management that frees memory occupied by objects that are no longer reachable. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "let obj = {a: 1};\nobj = null;\n// Memory freed",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "execution-context",
    "title": "Execution Context",
    "tech": "JavaScript",
    "description": "Master the mechanics of Execution Context with interactive visualizations and interview tips.",
    "definition": "Execution Context is a concept where the environment in which JS code is evaluated and executed.",
    "interviewAsk": "Can you explain what Execution Context is and why we use it?",
    "interviewAnswer": "Execution Context is a concept where the environment in which JS code is evaluated and executed. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "function a() {\n  /* New execution context created */\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "web-workers",
    "title": "Web Workers",
    "tech": "JavaScript",
    "description": "Master the mechanics of Web Workers with interactive visualizations and interview tips.",
    "definition": "Web Workers is a concept where web Workers allow running scripts in background threads.",
    "interviewAsk": "Can you explain what Web Workers is and why we use it?",
    "interviewAnswer": "Web Workers is a concept where web Workers allow running scripts in background threads. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const worker = new Worker('worker.js');",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "service-workers",
    "title": "Service Workers",
    "tech": "JavaScript",
    "description": "Master the mechanics of Service Workers with interactive visualizations and interview tips.",
    "definition": "Service Workers is a concept where service workers act as proxy servers sitting between web apps, the browser, and the network.",
    "interviewAsk": "Can you explain what Service Workers is and why we use it?",
    "interviewAnswer": "Service Workers is a concept where service workers act as proxy servers sitting between web apps, the browser, and the network. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "navigator.serviceWorker.register('/sw.js');",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "dom-manipulation-api",
    "title": "DOM Manipulation API",
    "tech": "JavaScript",
    "description": "Master the mechanics of DOM Manipulation API with interactive visualizations and interview tips.",
    "definition": "DOM Manipulation API is a concept where the Document Object Model connects web pages to scripts or programming languages.",
    "interviewAsk": "Can you explain what DOM Manipulation API is and why we use it?",
    "interviewAnswer": "DOM Manipulation API is a concept where the Document Object Model connects web pages to scripts or programming languages. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "document.getElementById('app').innerHTML = 'Hello';",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "event-delegation",
    "title": "Event Delegation",
    "tech": "JavaScript",
    "description": "Master the mechanics of Event Delegation with interactive visualizations and interview tips.",
    "definition": "Event Delegation is a concept where a pattern to handle events efficiently by attaching a single listener to a parent element.",
    "interviewAsk": "Can you explain what Event Delegation is and why we use it?",
    "interviewAnswer": "Event Delegation is a concept where a pattern to handle events efficiently by attaching a single listener to a parent element. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "document.body.addEventListener('click', e => {\n  if(e.target.matches('button')) {...}\n});",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "mutationobserver",
    "title": "MutationObserver",
    "tech": "JavaScript",
    "description": "Master the mechanics of MutationObserver with interactive visualizations and interview tips.",
    "definition": "MutationObserver is a concept where provides the ability to watch for changes being made to the DOM tree.",
    "interviewAsk": "Can you explain what MutationObserver is and why we use it?",
    "interviewAnswer": "MutationObserver is a concept where provides the ability to watch for changes being made to the DOM tree. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const observer = new MutationObserver(cb);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "weakmap-and-weakset",
    "title": "WeakMap and WeakSet",
    "tech": "JavaScript",
    "description": "Master the mechanics of WeakMap and WeakSet with interactive visualizations and interview tips.",
    "definition": "WeakMap and WeakSet is a concept where collections that allow garbage collection if there is no other reference to the key object.",
    "interviewAsk": "Can you explain what WeakMap and WeakSet is and why we use it?",
    "interviewAnswer": "WeakMap and WeakSet is a concept where collections that allow garbage collection if there is no other reference to the key object. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const wm = new WeakMap();\nwm.set(obj, 'data');",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "symbols",
    "title": "Symbols",
    "tech": "JavaScript",
    "description": "Master the mechanics of Symbols with interactive visualizations and interview tips.",
    "definition": "Symbol is a primitive data type that is guaranteed to be unique.",
    "interviewAsk": "Can you explain what Symbols is and why we use it?",
    "interviewAnswer": "Symbol is a primitive data type that is guaranteed to be unique. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const sym = Symbol('description');",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "iterables-and-iterators",
    "title": "Iterables and Iterators",
    "tech": "JavaScript",
    "description": "Master the mechanics of Iterables and Iterators with interactive visualizations and interview tips.",
    "definition": "Iterables and Iterators is a concept where iterables are objects that implement the Symbol.iterator method.",
    "interviewAsk": "Can you explain what Iterables and Iterators is and why we use it?",
    "interviewAnswer": "Iterables and Iterators is a concept where iterables are objects that implement the Symbol.iterator method. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "for (const val of [1,2,3]) {\n \n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "proxy-api",
    "title": "Proxy API",
    "tech": "JavaScript",
    "description": "Master the mechanics of Proxy API with interactive visualizations and interview tips.",
    "definition": "Proxy API is a concept where the Proxy object enables you to create a proxy for another object, intercepting operations.",
    "interviewAsk": "Can you explain what Proxy API is and why we use it?",
    "interviewAnswer": "Proxy API is a concept where the Proxy object enables you to create a proxy for another object, intercepting operations. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const p = new Proxy(target, handler);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "reflect-api",
    "title": "Reflect API",
    "tech": "JavaScript",
    "description": "Master the mechanics of Reflect API with interactive visualizations and interview tips.",
    "definition": "Reflect is a built-in object that provides methods for interceptable JavaScript operations.",
    "interviewAsk": "Can you explain what Reflect API is and why we use it?",
    "interviewAnswer": "Reflect is a built-in object that provides methods for interceptable JavaScript operations. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "Reflect.get(target, propKey);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "bigint",
    "title": "BigInt",
    "tech": "JavaScript",
    "description": "Master the mechanics of BigInt with interactive visualizations and interview tips.",
    "definition": "BigInt is a numeric primitive that can represent integers with arbitrary precision.",
    "interviewAsk": "Can you explain what BigInt is and why we use it?",
    "interviewAnswer": "BigInt is a numeric primitive that can represent integers with arbitrary precision. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const massive = 9007199254740991n;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "strict-mode",
    "title": "Strict Mode",
    "tech": "JavaScript",
    "description": "Master the mechanics of Strict Mode with interactive visualizations and interview tips.",
    "definition": "Strict Mode is a concept where strict mode opts into a restricted variant of JavaScript, throwing errors for bad syntax.",
    "interviewAsk": "Can you explain what Strict Mode is and why we use it?",
    "interviewAnswer": "Strict Mode is a concept where strict mode opts into a restricted variant of JavaScript, throwing errors for bad syntax. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "'use strict';",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "iife",
    "title": "IIFE",
    "tech": "JavaScript",
    "description": "Master the mechanics of IIFE with interactive visualizations and interview tips.",
    "definition": "Immediately Invoked Function Expression is a function that runs as soon as it is defined.",
    "interviewAsk": "Can you explain what IIFE is and why we use it?",
    "interviewAnswer": "Immediately Invoked Function Expression is a function that runs as soon as it is defined. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "(function() {\n  console.log('Run')\n})();",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "currying",
    "title": "Currying",
    "tech": "JavaScript",
    "description": "Master the mechanics of Currying with interactive visualizations and interview tips.",
    "definition": "Currying is a concept where currying is the technique of evaluating function with multiple arguments, into sequence of functions.",
    "interviewAsk": "Can you explain what Currying is and why we use it?",
    "interviewAnswer": "Currying is a concept where currying is the technique of evaluating function with multiple arguments, into sequence of functions. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const curry = a => b => c => a+b+c;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "memoization",
    "title": "Memoization",
    "tech": "JavaScript",
    "description": "Master the mechanics of Memoization with interactive visualizations and interview tips.",
    "definition": "Memoization is a concept where an optimization technique used to speed up computer programs by storing the results of expensive function calls.",
    "interviewAsk": "Can you explain what Memoization is and why we use it?",
    "interviewAnswer": "Memoization is a concept where an optimization technique used to speed up computer programs by storing the results of expensive function calls. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const cache = {};\nfunction fib(n) {\n  if(cache[n]) return cache[n];\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "pure-functions",
    "title": "Pure Functions",
    "tech": "JavaScript",
    "description": "Master the mechanics of Pure Functions with interactive visualizations and interview tips.",
    "definition": "Pure Functions is a concept where a function where the return value is only determined by its input values, without observable side effects.",
    "interviewAsk": "Can you explain what Pure Functions is and why we use it?",
    "interviewAnswer": "Pure Functions is a concept where a function where the return value is only determined by its input values, without observable side effects. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const add = (a, b) => a + b;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "higher-order-functions",
    "title": "Higher-Order Functions",
    "tech": "JavaScript",
    "description": "Master the mechanics of Higher-Order Functions with interactive visualizations and interview tips.",
    "definition": "Higher-Order Functions is a concept where functions that operate on other functions, either by taking them as arguments or by returning them.",
    "interviewAsk": "Can you explain what Higher-Order Functions is and why we use it?",
    "interviewAnswer": "Higher-Order Functions is a concept where functions that operate on other functions, either by taking them as arguments or by returning them. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const map = (fn, arr) => arr.map(fn);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "functional-programming",
    "title": "Functional Programming",
    "tech": "JavaScript",
    "description": "Master the mechanics of Functional Programming with interactive visualizations and interview tips.",
    "definition": "Functional Programming is a concept where a programming paradigm that treats computation as the evaluation of mathematical functions.",
    "interviewAsk": "Can you explain what Functional Programming is and why we use it?",
    "interviewAnswer": "Functional Programming is a concept where a programming paradigm that treats computation as the evaluation of mathematical functions. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const pipeline = compose(fn1, fn2);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "function-composition",
    "title": "Function Composition",
    "tech": "JavaScript",
    "description": "Master the mechanics of Function Composition with interactive visualizations and interview tips.",
    "definition": "Function Composition is a concept where the process of combining two or more functions to produce a new function.",
    "interviewAsk": "Can you explain what Function Composition is and why we use it?",
    "interviewAnswer": "Function Composition is a concept where the process of combining two or more functions to produce a new function. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const f = x => x + 1;\nconst g = x => x * 2;\nconst fg = x => f(g(x));",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "throttling",
    "title": "Throttling",
    "tech": "JavaScript",
    "description": "Master the mechanics of Throttling with interactive visualizations and interview tips.",
    "definition": "Throttling is a concept where a technique that limits the maximum number of times a function can be called over time.",
    "interviewAsk": "Can you explain what Throttling is and why we use it?",
    "interviewAnswer": "Throttling is a concept where a technique that limits the maximum number of times a function can be called over time. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "function throttle(fn, limit) {\n  /*...*/\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "debouncing",
    "title": "Debouncing",
    "tech": "JavaScript",
    "description": "Master the mechanics of Debouncing with interactive visualizations and interview tips.",
    "definition": "Debouncing is a concept where a technique that delays invoking a function until after some time has elapsed since the last call.",
    "interviewAsk": "Can you explain what Debouncing is and why we use it?",
    "interviewAnswer": "Debouncing is a concept where a technique that delays invoking a function until after some time has elapsed since the last call. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "function debounce(fn, delay) {\n  /*...*/\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "polyfills",
    "title": "Polyfills",
    "tech": "JavaScript",
    "description": "Master the mechanics of Polyfills with interactive visualizations and interview tips.",
    "definition": "Polyfills is a concept where a piece of code used to provide modern functionality on older browsers.",
    "interviewAsk": "Can you explain what Polyfills is and why we use it?",
    "interviewAnswer": "Polyfills is a concept where a piece of code used to provide modern functionality on older browsers. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "if (!Array.prototype.includes) {\n  Array.prototype.includes = function() {...}\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "transpilation",
    "title": "Transpilation",
    "tech": "JavaScript",
    "description": "Master the mechanics of Transpilation with interactive visualizations and interview tips.",
    "definition": "Transpilation is a concept where source-to-source compilation, translating modern JS code to older, compatible JS.",
    "interviewAsk": "Can you explain what Transpilation is and why we use it?",
    "interviewAnswer": "Transpilation is a concept where source-to-source compilation, translating modern JS code to older, compatible JS. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "// Babel transforms arrow functions to function expressions",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "type-coercion",
    "title": "Type Coercion",
    "tech": "JavaScript",
    "description": "Master the mechanics of Type Coercion with interactive visualizations and interview tips.",
    "definition": "Type Coercion is a concept where the automatic or implicit conversion of values from one data type to another.",
    "interviewAsk": "Can you explain what Type Coercion is and why we use it?",
    "interviewAnswer": "Type Coercion is a concept where the automatic or implicit conversion of values from one data type to another. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "console.log('5' + 5);\n// '55'",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "equality-algorithms",
    "title": "Equality Algorithms",
    "tech": "JavaScript",
    "description": "Master the mechanics of Equality Algorithms with interactive visualizations and interview tips.",
    "definition": "Equality Algorithms is a concept where the difference between strict equality (===) and loose equality (==).",
    "interviewAsk": "Can you explain what Equality Algorithms is and why we use it?",
    "interviewAnswer": "Equality Algorithms is a concept where the difference between strict equality (===) and loose equality (==). This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "console.log(1 == '1');\n// true",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "typed-arrays",
    "title": "Typed Arrays",
    "tech": "JavaScript",
    "description": "Master the mechanics of Typed Arrays with interactive visualizations and interview tips.",
    "definition": "Typed Arrays is a concept where typed arrays provide a mechanism for accessing raw binary data efficiently.",
    "interviewAsk": "Can you explain what Typed Arrays is and why we use it?",
    "interviewAnswer": "Typed Arrays is a concept where typed arrays provide a mechanism for accessing raw binary data efficiently. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const int32 = new Int32Array(2);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "sharedarraybuffer",
    "title": "SharedArrayBuffer",
    "tech": "JavaScript",
    "description": "Master the mechanics of SharedArrayBuffer with interactive visualizations and interview tips.",
    "definition": "SharedArrayBuffer is a concept where used to represent a generic, fixed-length raw binary data buffer that can be shared between Web Workers.",
    "interviewAsk": "Can you explain what SharedArrayBuffer is and why we use it?",
    "interviewAnswer": "SharedArrayBuffer is a concept where used to represent a generic, fixed-length raw binary data buffer that can be shared between Web Workers. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const sab = new SharedArrayBuffer(1024);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "atomics",
    "title": "Atomics",
    "tech": "JavaScript",
    "description": "Master the mechanics of Atomics with interactive visualizations and interview tips.",
    "definition": "Atomics is a concept where the Atomics object provides atomic operations as static methods, used with SharedArrayBuffer.",
    "interviewAsk": "Can you explain what Atomics is and why we use it?",
    "interviewAnswer": "Atomics is a concept where the Atomics object provides atomic operations as static methods, used with SharedArrayBuffer. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "Atomics.add(typedArray, index, value);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "intl-api",
    "title": "Intl API",
    "tech": "JavaScript",
    "description": "Master the mechanics of Intl API with interactive visualizations and interview tips.",
    "definition": "Intl API is a concept where the Intl object is the namespace for the ECMAScript Internationalization API.",
    "interviewAsk": "Can you explain what Intl API is and why we use it?",
    "interviewAnswer": "Intl API is a concept where the Intl object is the namespace for the ECMAScript Internationalization API. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "new Intl.NumberFormat('en-US').format(number);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "regular-expressions",
    "title": "Regular Expressions",
    "tech": "JavaScript",
    "description": "Master the mechanics of Regular Expressions with interactive visualizations and interview tips.",
    "definition": "Regular Expressions is a concept where patterns used to match character combinations in strings.",
    "interviewAsk": "Can you explain what Regular Expressions is and why we use it?",
    "interviewAnswer": "Regular Expressions is a concept where patterns used to match character combinations in strings. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const regex = /ab+c/i;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "webassembly",
    "title": "WebAssembly",
    "tech": "JavaScript",
    "description": "Master the mechanics of WebAssembly with interactive visualizations and interview tips.",
    "definition": "WebAssembly is a concept where a binary instruction format for a stack-based virtual machine, providing near-native performance.",
    "interviewAsk": "Can you explain what WebAssembly is and why we use it?",
    "interviewAnswer": "WebAssembly is a concept where a binary instruction format for a stack-based virtual machine, providing near-native performance. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "WebAssembly.instantiateStreaming(fetch('module.wasm'));",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "jsx-syntax",
    "title": "JSX Syntax",
    "tech": "React",
    "description": "Master the mechanics of JSX Syntax with interactive visualizations and interview tips.",
    "definition": "JSX is a syntax extension for JavaScript that looks similar to XML/HTML.",
    "interviewAsk": "Can you explain what JSX Syntax is and why we use it?",
    "interviewAnswer": "JSX is a syntax extension for JavaScript that looks similar to XML/HTML. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const el = <h1>Hello</h1>;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "virtual-dom",
    "title": "Virtual DOM",
    "tech": "React",
    "description": "Master the mechanics of Virtual DOM with interactive visualizations and interview tips.",
    "definition": "Virtual DOM is a concept where a programming concept where an ideal, 'virtual' representation of a UI is kept in memory and synced with the 'real' DOM.",
    "interviewAsk": "Can you explain what Virtual DOM is and why we use it?",
    "interviewAnswer": "Virtual DOM is a concept where a programming concept where an ideal, 'virtual' representation of a UI is kept in memory and synced with the 'real' DOM. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "// React builds an object tree representing the UI elements",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "functional-components",
    "title": "Functional Components",
    "tech": "React",
    "description": "Master the mechanics of Functional Components with interactive visualizations and interview tips.",
    "definition": "Functional Components is a concept where javaScript functions that return React elements.",
    "interviewAsk": "Can you explain what Functional Components is and why we use it?",
    "interviewAnswer": "Functional Components is a concept where javaScript functions that return React elements. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "function Welcome({\n  name\n}) {\n  return <h1>Hello, {name}</h1>;\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "props-and-prop-drilling",
    "title": "Props and Prop Drilling",
    "tech": "React",
    "description": "Master the mechanics of Props and Prop Drilling with interactive visualizations and interview tips.",
    "definition": "Props and Prop Drilling is a concept where props are inputs to a React component. Prop drilling is passing props deep down the component tree.",
    "interviewAsk": "Can you explain what Props and Prop Drilling is and why we use it?",
    "interviewAnswer": "Props and Prop Drilling is a concept where props are inputs to a React component. Prop drilling is passing props deep down the component tree. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "<Child data={data} />",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "usestate",
    "title": "useState",
    "tech": "React",
    "description": "Master the mechanics of useState with interactive visualizations and interview tips.",
    "definition": "useState is a concept where a Hook that lets you add React state to function components.",
    "interviewAsk": "Can you explain what useState is and why we use it?",
    "interviewAnswer": "useState is a concept where a Hook that lets you add React state to function components. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const [count, setCount] = useState(0);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "useeffect",
    "title": "useEffect",
    "tech": "React",
    "description": "Master the mechanics of useEffect with interactive visualizations and interview tips.",
    "definition": "useEffect is a concept where a Hook that lets you perform side effects in function components.",
    "interviewAsk": "Can you explain what useEffect is and why we use it?",
    "interviewAnswer": "useEffect is a concept where a Hook that lets you perform side effects in function components. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "useEffect(() => {\n  document.title = count;\n}, [count]);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "usecontext",
    "title": "useContext",
    "tech": "React",
    "description": "Master the mechanics of useContext with interactive visualizations and interview tips.",
    "definition": "useContext is a concept where a Hook that lets you subscribe to React context without introducing nesting.",
    "interviewAsk": "Can you explain what useContext is and why we use it?",
    "interviewAnswer": "useContext is a concept where a Hook that lets you subscribe to React context without introducing nesting. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const theme = useContext(ThemeContext);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "usereducer",
    "title": "useReducer",
    "tech": "React",
    "description": "Master the mechanics of useReducer with interactive visualizations and interview tips.",
    "definition": "useReducer is a concept where an alternative to useState for complex state logic.",
    "interviewAsk": "Can you explain what useReducer is and why we use it?",
    "interviewAnswer": "useReducer is a concept where an alternative to useState for complex state logic. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const [state, dispatch] = useReducer(reducer, initialState);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "usecallback",
    "title": "useCallback",
    "tech": "React",
    "description": "Master the mechanics of useCallback with interactive visualizations and interview tips.",
    "definition": "useCallback is a concept where returns a memoized callback function.",
    "interviewAsk": "Can you explain what useCallback is and why we use it?",
    "interviewAnswer": "useCallback is a concept where returns a memoized callback function. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const memoizedCb = useCallback(() => {\n  doSomething(a, b);\n}, [a, b]);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "usememo",
    "title": "useMemo",
    "tech": "React",
    "description": "Master the mechanics of useMemo with interactive visualizations and interview tips.",
    "definition": "useMemo is a concept where returns a memoized value.",
    "interviewAsk": "Can you explain what useMemo is and why we use it?",
    "interviewAnswer": "useMemo is a concept where returns a memoized value. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "useref",
    "title": "useRef",
    "tech": "React",
    "description": "Master the mechanics of useRef with interactive visualizations and interview tips.",
    "definition": "useRef is a concept where returns a mutable ref object whose .current property is initialized to the passed argument.",
    "interviewAsk": "Can you explain what useRef is and why we use it?",
    "interviewAnswer": "useRef is a concept where returns a mutable ref object whose .current property is initialized to the passed argument. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const inputEl = useRef(null);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "useimperativehandle",
    "title": "useImperativeHandle",
    "tech": "React",
    "description": "Master the mechanics of useImperativeHandle with interactive visualizations and interview tips.",
    "definition": "useImperativeHandle is a concept where customizes the instance value that is exposed to parent components when using ref.",
    "interviewAsk": "Can you explain what useImperativeHandle is and why we use it?",
    "interviewAnswer": "useImperativeHandle is a concept where customizes the instance value that is exposed to parent components when using ref. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "useImperativeHandle(ref, () => ({\n  focus: () => {\n  ref.current.focus();\n}\n}));",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "uselayouteffect",
    "title": "useLayoutEffect",
    "tech": "React",
    "description": "Master the mechanics of useLayoutEffect with interactive visualizations and interview tips.",
    "definition": "useLayoutEffect is a concept where fires synchronously after all DOM mutations.",
    "interviewAsk": "Can you explain what useLayoutEffect is and why we use it?",
    "interviewAnswer": "useLayoutEffect is a concept where fires synchronously after all DOM mutations. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "useLayoutEffect(() => {\n  // Measure DOM nodes\n}, []);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "custom-hooks",
    "title": "Custom Hooks",
    "tech": "React",
    "description": "Master the mechanics of Custom Hooks with interactive visualizations and interview tips.",
    "definition": "Custom Hooks is a concept where a JavaScript function whose name starts with 'use' and that may call other Hooks.",
    "interviewAsk": "Can you explain what Custom Hooks is and why we use it?",
    "interviewAnswer": "Custom Hooks is a concept where a JavaScript function whose name starts with 'use' and that may call other Hooks. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "function useWindowSize() {\n  /*...*/ return size;\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "error-boundaries",
    "title": "Error Boundaries",
    "tech": "React",
    "description": "Master the mechanics of Error Boundaries with interactive visualizations and interview tips.",
    "definition": "Error Boundaries is a concept where components that catch JavaScript errors anywhere in their child component tree.",
    "interviewAsk": "Can you explain what Error Boundaries is and why we use it?",
    "interviewAnswer": "Error Boundaries is a concept where components that catch JavaScript errors anywhere in their child component tree. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "class ErrorBoundary extends React.Component {\n  /*...*/\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "portals",
    "title": "Portals",
    "tech": "React",
    "description": "Master the mechanics of Portals with interactive visualizations and interview tips.",
    "definition": "Portals is a concept where provide a first-class way to render children into a DOM node outside the parent component.",
    "interviewAsk": "Can you explain what Portals is and why we use it?",
    "interviewAnswer": "Portals is a concept where provide a first-class way to render children into a DOM node outside the parent component. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "ReactDOM.createPortal(child, container)",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "fragments",
    "title": "Fragments",
    "tech": "React",
    "description": "Master the mechanics of Fragments with interactive visualizations and interview tips.",
    "definition": "Fragments is a concept where let you group a list of children without adding extra nodes to the DOM.",
    "interviewAsk": "Can you explain what Fragments is and why we use it?",
    "interviewAnswer": "Fragments is a concept where let you group a list of children without adding extra nodes to the DOM. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "<> <ChildA /> <ChildB /> </>",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "strict-mode",
    "title": "Strict Mode",
    "tech": "React",
    "description": "Master the mechanics of Strict Mode with interactive visualizations and interview tips.",
    "definition": "Strict Mode is a concept where a tool for highlighting potential problems in an application.",
    "interviewAsk": "Can you explain what Strict Mode is and why we use it?",
    "interviewAnswer": "Strict Mode is a concept where a tool for highlighting potential problems in an application. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "<React.StrictMode> <App /> </React.StrictMode>",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "suspense",
    "title": "Suspense",
    "tech": "React",
    "description": "Master the mechanics of Suspense with interactive visualizations and interview tips.",
    "definition": "Suspense is a concept where lets your components 'wait' for something before they can render.",
    "interviewAsk": "Can you explain what Suspense is and why we use it?",
    "interviewAnswer": "Suspense is a concept where lets your components 'wait' for something before they can render. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "<Suspense fallback={<Spinner />}> <Profile /> </Suspense>",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "concurrent-rendering",
    "title": "Concurrent Rendering",
    "tech": "React",
    "description": "Master the mechanics of Concurrent Rendering with interactive visualizations and interview tips.",
    "definition": "Concurrent Rendering is a concept where react can pause, abort, or yield rendering to ensure the UI stays responsive.",
    "interviewAsk": "Can you explain what Concurrent Rendering is and why we use it?",
    "interviewAnswer": "Concurrent Rendering is a concept where react can pause, abort, or yield rendering to ensure the UI stays responsive. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "// Handled automatically in React 18+",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "transitions",
    "title": "Transitions",
    "tech": "React",
    "description": "Master the mechanics of Transitions with interactive visualizations and interview tips.",
    "definition": "Transitions is a concept where mark state updates as non-urgent.",
    "interviewAsk": "Can you explain what Transitions is and why we use it?",
    "interviewAnswer": "Transitions is a concept where mark state updates as non-urgent. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const [isPending, startTransition] = useTransition();",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "usedeferredvalue",
    "title": "useDeferredValue",
    "tech": "React",
    "description": "Master the mechanics of useDeferredValue with interactive visualizations and interview tips.",
    "definition": "useDeferredValue is a concept where lets you defer re-rendering a non-urgent part of the tree.",
    "interviewAsk": "Can you explain what useDeferredValue is and why we use it?",
    "interviewAnswer": "useDeferredValue is a concept where lets you defer re-rendering a non-urgent part of the tree. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const deferredValue = useDeferredValue(value);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "server-components-rsc-",
    "title": "Server Components (RSC)",
    "tech": "React",
    "description": "Master the mechanics of Server Components (RSC) with interactive visualizations and interview tips.",
    "definition": "Server Components (RSC) is a concept where components that render exclusively on the server, sending zero JS to the client.",
    "interviewAsk": "Can you explain what Server Components (RSC) is and why we use it?",
    "interviewAnswer": "Server Components (RSC) is a concept where components that render exclusively on the server, sending zero JS to the client. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "// Next.js App Router default components",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "hydration",
    "title": "Hydration",
    "tech": "React",
    "description": "Master the mechanics of Hydration with interactive visualizations and interview tips.",
    "definition": "Hydration is a concept where the process of attaching event listeners to the server-rendered HTML.",
    "interviewAsk": "Can you explain what Hydration is and why we use it?",
    "interviewAnswer": "Hydration is a concept where the process of attaching event listeners to the server-rendered HTML. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "// hydrateRoot(document.getElementById('root'), <App />);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "next-js-app-router",
    "title": "Next.js App Router",
    "tech": "React",
    "description": "Master the mechanics of Next.js App Router with interactive visualizations and interview tips.",
    "definition": "Next.js App Router is a concept where a new paradigm in Next.js leveraging server components, nested layouts, and streaming.",
    "interviewAsk": "Can you explain what Next.js App Router is and why we use it?",
    "interviewAnswer": "Next.js App Router is a concept where a new paradigm in Next.js leveraging server components, nested layouts, and streaming. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "export default function Layout({\n  children\n}) {\n  return <main>{children}</main>;\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "higher-order-components",
    "title": "Higher Order Components",
    "tech": "React",
    "description": "Master the mechanics of Higher Order Components with interactive visualizations and interview tips.",
    "definition": "Higher Order Components is a concept where a function that takes a component and returns a new component.",
    "interviewAsk": "Can you explain what Higher Order Components is and why we use it?",
    "interviewAnswer": "Higher Order Components is a concept where a function that takes a component and returns a new component. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const EnhancedComponent = withData(BaseComponent);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "render-props-pattern",
    "title": "Render Props Pattern",
    "tech": "React",
    "description": "Master the mechanics of Render Props Pattern with interactive visualizations and interview tips.",
    "definition": "A technique for sharing code between React components using a prop whose value is a function.",
    "interviewAsk": "Can you explain what Render Props Pattern is and why we use it?",
    "interviewAnswer": "A technique for sharing code between React components using a prop whose value is a function. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "<DataProvider render={data => <h1>Hello {data.target}</h1>} />",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "controlled-components",
    "title": "Controlled Components",
    "tech": "React",
    "description": "Master the mechanics of Controlled Components with interactive visualizations and interview tips.",
    "definition": "Controlled Components is a concept where form data is handled by a React component.",
    "interviewAsk": "Can you explain what Controlled Components is and why we use it?",
    "interviewAnswer": "Controlled Components is a concept where form data is handled by a React component. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "<input value={state} onChange={e => setState(e.target.value)} />",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "uncontrolled-components",
    "title": "Uncontrolled Components",
    "tech": "React",
    "description": "Master the mechanics of Uncontrolled Components with interactive visualizations and interview tips.",
    "definition": "Uncontrolled Components is a concept where form data is handled by the DOM itself.",
    "interviewAsk": "Can you explain what Uncontrolled Components is and why we use it?",
    "interviewAnswer": "Uncontrolled Components is a concept where form data is handled by the DOM itself. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "<input ref={inputRef} type='text' />",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "synthetic-events",
    "title": "Synthetic Events",
    "tech": "React",
    "description": "Master the mechanics of Synthetic Events with interactive visualizations and interview tips.",
    "definition": "Synthetic Events is a concept where react's cross-browser wrapper around the browser's native event.",
    "interviewAsk": "Can you explain what Synthetic Events is and why we use it?",
    "interviewAnswer": "Synthetic Events is a concept where react's cross-browser wrapper around the browser's native event. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "function handleClick(e) {\n  e.preventDefault();\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "ref-forwarding",
    "title": "Ref Forwarding",
    "tech": "React",
    "description": "Master the mechanics of Ref Forwarding with interactive visualizations and interview tips.",
    "definition": "Ref Forwarding is a concept where an opt-in feature that lets some components take a ref they receive and pass it further down.",
    "interviewAsk": "Can you explain what Ref Forwarding is and why we use it?",
    "interviewAnswer": "Ref Forwarding is a concept where an opt-in feature that lets some components take a ref they receive and pass it further down. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const FancyButton = React.forwardRef((props, ref) => <button ref={ref}>{props.children}</button>);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "react-memo",
    "title": "React.memo",
    "tech": "React",
    "description": "Master the mechanics of React.memo with interactive visualizations and interview tips.",
    "definition": "React.memo is a concept where a higher order component that memoizes the rendered output of a functional component.",
    "interviewAsk": "Can you explain what React.memo is and why we use it?",
    "interviewAnswer": "React.memo is a concept where a higher order component that memoizes the rendered output of a functional component. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const MemoizedComponent = React.memo(MyComponent);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "purecomponent",
    "title": "PureComponent",
    "tech": "React",
    "description": "Master the mechanics of PureComponent with interactive visualizations and interview tips.",
    "definition": "PureComponent is a concept where a base class that implements shouldComponentUpdate with a shallow prop and state comparison.",
    "interviewAsk": "Can you explain what PureComponent is and why we use it?",
    "interviewAnswer": "PureComponent is a concept where a base class that implements shouldComponentUpdate with a shallow prop and state comparison. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "class MyComponent extends React.PureComponent {\n  /*...*/\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "react-fiber",
    "title": "React Fiber",
    "tech": "React",
    "description": "Master the mechanics of React Fiber with interactive visualizations and interview tips.",
    "definition": "React Fiber is a concept where react's core reconciliation algorithm, supporting interruptible rendering.",
    "interviewAsk": "Can you explain what React Fiber is and why we use it?",
    "interviewAnswer": "React Fiber is a concept where react's core reconciliation algorithm, supporting interruptible rendering. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "// Internal engine mechanics",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "reconciliation",
    "title": "Reconciliation",
    "tech": "React",
    "description": "Master the mechanics of Reconciliation with interactive visualizations and interview tips.",
    "definition": "Reconciliation is a concept where the algorithm React uses to diff one tree with another to determine which parts need to be changed.",
    "interviewAsk": "Can you explain what Reconciliation is and why we use it?",
    "interviewAnswer": "Reconciliation is a concept where the algorithm React uses to diff one tree with another to determine which parts need to be changed. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "// Virtual DOM diffing",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "automatic-batching",
    "title": "Automatic Batching",
    "tech": "React",
    "description": "Master the mechanics of Automatic Batching with interactive visualizations and interview tips.",
    "definition": "Automatic Batching is a concept where react groups multiple state updates into a single re-render for better performance.",
    "interviewAsk": "Can you explain what Automatic Batching is and why we use it?",
    "interviewAnswer": "Automatic Batching is a concept where react groups multiple state updates into a single re-render for better performance. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "setCount(c=>c+1);\nsetFlag(f=>!f);\n// One render",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "elements-vs-components",
    "title": "Elements vs Components",
    "tech": "React",
    "description": "Master the mechanics of Elements vs Components with interactive visualizations and interview tips.",
    "definition": "Elements vs Components is a concept where elements are plain objects describing what you want to see. Components are functions or classes that return elements.",
    "interviewAsk": "Can you explain what Elements vs Components is and why we use it?",
    "interviewAnswer": "Elements vs Components is a concept where elements are plain objects describing what you want to see. Components are functions or classes that return elements. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const el = <Component />;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "css-in-js",
    "title": "CSS-in-JS",
    "tech": "React",
    "description": "Master the mechanics of CSS-in-JS with interactive visualizations and interview tips.",
    "definition": "CSS-in-JS is a concept where styling approach where CSS is composed using JavaScript.",
    "interviewAsk": "Can you explain what CSS-in-JS is and why we use it?",
    "interviewAnswer": "CSS-in-JS is a concept where styling approach where CSS is composed using JavaScript. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const Button = styled.button`color: red;`;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "redux",
    "title": "Redux",
    "tech": "React",
    "description": "Master the mechanics of Redux with interactive visualizations and interview tips.",
    "definition": "Redux is a concept where a predictable state container for JavaScript apps.",
    "interviewAsk": "Can you explain what Redux is and why we use it?",
    "interviewAnswer": "Redux is a concept where a predictable state container for JavaScript apps. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const store = configureStore({\n  reducer\n});",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "zustand",
    "title": "Zustand",
    "tech": "React",
    "description": "Master the mechanics of Zustand with interactive visualizations and interview tips.",
    "definition": "Zustand is a concept where a small, fast and scalable barebones state-management solution.",
    "interviewAsk": "Can you explain what Zustand is and why we use it?",
    "interviewAnswer": "Zustand is a concept where a small, fast and scalable barebones state-management solution. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const useStore = create(set => ({\n  bears: 0, increasePopulation: () => set(state => ({\n  bears: state.bears + 1\n}))\n}))",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "tanstack-react-query",
    "title": "TanStack React Query",
    "tech": "React",
    "description": "Master the mechanics of TanStack React Query with interactive visualizations and interview tips.",
    "definition": "TanStack React Query is a concept where powerful asynchronous state management, server-state utilities.",
    "interviewAsk": "Can you explain what TanStack React Query is and why we use it?",
    "interviewAnswer": "TanStack React Query is a concept where powerful asynchronous state management, server-state utilities. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const {\n  data\n} = useQuery(['todos'], fetchTodos);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "react-router",
    "title": "React Router",
    "tech": "React",
    "description": "Master the mechanics of React Router with interactive visualizations and interview tips.",
    "definition": "React Router is a concept where declarative routing for React web applications.",
    "interviewAsk": "Can you explain what React Router is and why we use it?",
    "interviewAnswer": "React Router is a concept where declarative routing for React web applications. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "<Route path='/about' element={<About />} />",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "react-testing-library",
    "title": "React Testing Library",
    "tech": "React",
    "description": "Master the mechanics of React Testing Library with interactive visualizations and interview tips.",
    "definition": "React Testing Library is a concept where simple and complete React DOM testing utilities.",
    "interviewAsk": "Can you explain what React Testing Library is and why we use it?",
    "interviewAnswer": "React Testing Library is a concept where simple and complete React DOM testing utilities. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "render(<MyComponent />);\nfireEvent.click(screen.getByText('Click'));",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "snapshot-testing",
    "title": "Snapshot Testing",
    "tech": "React",
    "description": "Master the mechanics of Snapshot Testing with interactive visualizations and interview tips.",
    "definition": "Snapshot Testing is a concept where capturing a snapshot of the rendered UI and comparing it against future renders.",
    "interviewAsk": "Can you explain what Snapshot Testing is and why we use it?",
    "interviewAnswer": "Snapshot Testing is a concept where capturing a snapshot of the rendered UI and comparing it against future renders. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "expect(tree).toMatchSnapshot();",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "csr",
    "title": "CSR",
    "tech": "React",
    "description": "Master the mechanics of CSR with interactive visualizations and interview tips.",
    "definition": "CSR is a concept where client-Side Rendering: rendering content in the browser using JavaScript.",
    "interviewAsk": "Can you explain what CSR is and why we use it?",
    "interviewAnswer": "CSR is a concept where client-Side Rendering: rendering content in the browser using JavaScript. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "// Standard React CRA behavior",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "ssr",
    "title": "SSR",
    "tech": "React",
    "description": "Master the mechanics of SSR with interactive visualizations and interview tips.",
    "definition": "SSR is a concept where server-Side Rendering: generating HTML on the server on each request.",
    "interviewAsk": "Can you explain what SSR is and why we use it?",
    "interviewAnswer": "SSR is a concept where server-Side Rendering: generating HTML on the server on each request. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "export async function getServerSideProps() {\n  /*...*/\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "ssg",
    "title": "SSG",
    "tech": "React",
    "description": "Master the mechanics of SSG with interactive visualizations and interview tips.",
    "definition": "SSG is a concept where static Site Generation: generating HTML at build time.",
    "interviewAsk": "Can you explain what SSG is and why we use it?",
    "interviewAnswer": "SSG is a concept where static Site Generation: generating HTML at build time. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "export async function getStaticProps() {\n  /*...*/\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "streaming-ssr",
    "title": "Streaming SSR",
    "tech": "React",
    "description": "Master the mechanics of Streaming SSR with interactive visualizations and interview tips.",
    "definition": "Streaming SSR is a concept where sending HTML in chunks to the browser as it's generated on the server.",
    "interviewAsk": "Can you explain what Streaming SSR is and why we use it?",
    "interviewAnswer": "Streaming SSR is a concept where sending HTML in chunks to the browser as it's generated on the server. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "renderToPipeableStream(<App />).pipe(res);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "hydration-mismatches",
    "title": "Hydration Mismatches",
    "tech": "React",
    "description": "Master the mechanics of Hydration Mismatches with interactive visualizations and interview tips.",
    "definition": "Hydration Mismatches is a concept where errors occurring when the server-rendered HTML doesn't match the first client render.",
    "interviewAsk": "Can you explain what Hydration Mismatches is and why we use it?",
    "interviewAnswer": "Hydration Mismatches is a concept where errors occurring when the server-rendered HTML doesn't match the first client render. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "// Fix by ensuring deterministic rendering",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "accessibility-a11y-",
    "title": "Accessibility (a11y)",
    "tech": "React",
    "description": "Master the mechanics of Accessibility (a11y) with interactive visualizations and interview tips.",
    "definition": "Accessibility (a11y) is a concept where ensuring your React application is usable by everyone, including people with disabilities.",
    "interviewAsk": "Can you explain what Accessibility (a11y) is and why we use it?",
    "interviewAnswer": "Accessibility (a11y) is a concept where ensuring your React application is usable by everyone, including people with disabilities. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "<button aria-label='Close'>X</button>",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "type-inference",
    "title": "Type Inference",
    "tech": "TypeScript",
    "description": "Master the mechanics of Type Inference with interactive visualizations and interview tips.",
    "definition": "Type Inference is a concept where tS automatically deduces the type of a variable without explicit annotations.",
    "interviewAsk": "Can you explain what Type Inference is and why we use it?",
    "interviewAnswer": "Type Inference is a concept where tS automatically deduces the type of a variable without explicit annotations. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "let x = 3;\n// inferred as number",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "interfaces-vs-types",
    "title": "Interfaces vs Types",
    "tech": "TypeScript",
    "description": "Master the mechanics of Interfaces vs Types with interactive visualizations and interview tips.",
    "definition": "Interfaces vs Types is a concept where interfaces are mostly for declaring shapes of objects, types can be used for aliases, unions, and more.",
    "interviewAsk": "Can you explain what Interfaces vs Types is and why we use it?",
    "interviewAnswer": "Interfaces vs Types is a concept where interfaces are mostly for declaring shapes of objects, types can be used for aliases, unions, and more. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "interface User {} \ntype ID = string | number;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "enums",
    "title": "Enums",
    "tech": "TypeScript",
    "description": "Master the mechanics of Enums with interactive visualizations and interview tips.",
    "definition": "Enums is a concept where a way to define a set of named constants.",
    "interviewAsk": "Can you explain what Enums is and why we use it?",
    "interviewAnswer": "Enums is a concept where a way to define a set of named constants. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "enum Direction {\n  Up, Down, Left, Right\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "generics",
    "title": "Generics",
    "tech": "TypeScript",
    "description": "Master the mechanics of Generics with interactive visualizations and interview tips.",
    "definition": "Generics is a concept where a way to create reusable components that can work over a variety of types.",
    "interviewAsk": "Can you explain what Generics is and why we use it?",
    "interviewAnswer": "Generics is a concept where a way to create reusable components that can work over a variety of types. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "function identity<T>(arg: T): T {\n  return arg;\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "union-types",
    "title": "Union Types",
    "tech": "TypeScript",
    "description": "Master the mechanics of Union Types with interactive visualizations and interview tips.",
    "definition": "Union Types is a concept where a value that can be one of several types.",
    "interviewAsk": "Can you explain what Union Types is and why we use it?",
    "interviewAnswer": "Union Types is a concept where a value that can be one of several types. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "let id: string | number;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "intersection-types",
    "title": "Intersection Types",
    "tech": "TypeScript",
    "description": "Master the mechanics of Intersection Types with interactive visualizations and interview tips.",
    "definition": "Intersection Types is a concept where combines multiple types into one.",
    "interviewAsk": "Can you explain what Intersection Types is and why we use it?",
    "interviewAnswer": "Intersection Types is a concept where combines multiple types into one. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "type Combined = TypeA & TypeB;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "type-guards",
    "title": "Type Guards",
    "tech": "TypeScript",
    "description": "Master the mechanics of Type Guards with interactive visualizations and interview tips.",
    "definition": "Type Guards is a concept where expressions that perform a runtime check that guarantees the type in some scope.",
    "interviewAsk": "Can you explain what Type Guards is and why we use it?",
    "interviewAnswer": "Type Guards is a concept where expressions that perform a runtime check that guarantees the type in some scope. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "if (typeof padding === 'number') {\n  /*...*/\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "type-assertions",
    "title": "Type Assertions",
    "tech": "TypeScript",
    "description": "Master the mechanics of Type Assertions with interactive visualizations and interview tips.",
    "definition": "Type Assertions is a concept where telling the compiler to treat a value as a specific type.",
    "interviewAsk": "Can you explain what Type Assertions is and why we use it?",
    "interviewAnswer": "Type Assertions is a concept where telling the compiler to treat a value as a specific type. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const canvas = document.getElementById('c') as HTMLCanvasElement;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "any-vs-unknown",
    "title": "Any vs Unknown",
    "tech": "TypeScript",
    "description": "Master the mechanics of Any vs Unknown with interactive visualizations and interview tips.",
    "definition": "Any vs Unknown is a concept where any disables all type checking. Unknown forces you to do type checking before using the value.",
    "interviewAsk": "Can you explain what Any vs Unknown is and why we use it?",
    "interviewAnswer": "Any vs Unknown is a concept where any disables all type checking. Unknown forces you to do type checking before using the value. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "let a: any = 1;\nlet b: unknown = 1;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "never-vs-void",
    "title": "Never vs Void",
    "tech": "TypeScript",
    "description": "Master the mechanics of Never vs Void with interactive visualizations and interview tips.",
    "definition": "Never vs Void is a concept where void means a function returns nothing. Never means a function never returns (e.g. throws an error).",
    "interviewAsk": "Can you explain what Never vs Void is and why we use it?",
    "interviewAnswer": "Never vs Void is a concept where void means a function returns nothing. Never means a function never returns (e.g. throws an error). This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "function error(): never {\n  throw new Error();\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "tuple-types",
    "title": "Tuple Types",
    "tech": "TypeScript",
    "description": "Master the mechanics of Tuple Types with interactive visualizations and interview tips.",
    "definition": "Tuple Types is a concept where an array with a fixed number of elements whose types are known.",
    "interviewAsk": "Can you explain what Tuple Types is and why we use it?",
    "interviewAnswer": "Tuple Types is a concept where an array with a fixed number of elements whose types are known. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "let x: [string, number];",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "literal-types",
    "title": "Literal Types",
    "tech": "TypeScript",
    "description": "Master the mechanics of Literal Types with interactive visualizations and interview tips.",
    "definition": "Literal Types is a concept where a type that represents a specific value.",
    "interviewAsk": "Can you explain what Literal Types is and why we use it?",
    "interviewAnswer": "Literal Types is a concept where a type that represents a specific value. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "let alignment: 'left' | 'right' | 'center';",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "mapped-types",
    "title": "Mapped Types",
    "tech": "TypeScript",
    "description": "Master the mechanics of Mapped Types with interactive visualizations and interview tips.",
    "definition": "Mapped Types is a concept where a generic type which uses a union of PropertyKeys to iterate through keys to create a type.",
    "interviewAsk": "Can you explain what Mapped Types is and why we use it?",
    "interviewAnswer": "Mapped Types is a concept where a generic type which uses a union of PropertyKeys to iterate through keys to create a type. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "type Readonly<T> = {\n  readonly [P in keyof T]: T[P]\n};",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "conditional-types",
    "title": "Conditional Types",
    "tech": "TypeScript",
    "description": "Master the mechanics of Conditional Types with interactive visualizations and interview tips.",
    "definition": "Conditional Types is a concept where types that depend on a condition.",
    "interviewAsk": "Can you explain what Conditional Types is and why we use it?",
    "interviewAnswer": "Conditional Types is a concept where types that depend on a condition. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "T extends U ? X : Y",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "partial-and-required",
    "title": "Partial and Required",
    "tech": "TypeScript",
    "description": "Master the mechanics of Partial and Required with interactive visualizations and interview tips.",
    "definition": "Partial and Required is a concept where partial makes all properties optional. Required makes all properties required.",
    "interviewAsk": "Can you explain what Partial and Required is and why we use it?",
    "interviewAnswer": "Partial and Required is a concept where partial makes all properties optional. Required makes all properties required. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "type PartialUser = Partial<User>;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "readonly-and-record",
    "title": "Readonly and Record",
    "tech": "TypeScript",
    "description": "Master the mechanics of Readonly and Record with interactive visualizations and interview tips.",
    "definition": "Readonly and Record is a concept where readonly makes all properties immutable. Record constructs an object type whose property keys are Keys and whose property values are Type.",
    "interviewAsk": "Can you explain what Readonly and Record is and why we use it?",
    "interviewAnswer": "Readonly and Record is a concept where readonly makes all properties immutable. Record constructs an object type whose property keys are Keys and whose property values are Type. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "type Pages = Record<string, PageInfo>;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "pick-and-omit",
    "title": "Pick and Omit",
    "tech": "TypeScript",
    "description": "Master the mechanics of Pick and Omit with interactive visualizations and interview tips.",
    "definition": "Pick and Omit is a concept where pick constructs a type by picking the set of properties. Omit constructs a type by picking all properties and then removing Keys.",
    "interviewAsk": "Can you explain what Pick and Omit is and why we use it?",
    "interviewAnswer": "Pick and Omit is a concept where pick constructs a type by picking the set of properties. Omit constructs a type by picking all properties and then removing Keys. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "type UserPreview = Omit<User, 'password'>;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "exclude-and-extract",
    "title": "Exclude and Extract",
    "tech": "TypeScript",
    "description": "Master the mechanics of Exclude and Extract with interactive visualizations and interview tips.",
    "definition": "Exclude and Extract is a concept where exclude constructs a type by excluding from UnionType. Extract constructs a type by extracting from Type those types that are assignable to Union.",
    "interviewAsk": "Can you explain what Exclude and Extract is and why we use it?",
    "interviewAnswer": "Exclude and Extract is a concept where exclude constructs a type by excluding from UnionType. Extract constructs a type by extracting from Type those types that are assignable to Union. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "type T0 = Exclude<'a' | 'b' | 'c', 'a'>;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "nonnullable-and-returntype",
    "title": "NonNullable and ReturnType",
    "tech": "TypeScript",
    "description": "Master the mechanics of NonNullable and ReturnType with interactive visualizations and interview tips.",
    "definition": "NonNullable and ReturnType is a concept where nonNullable removes null and undefined. ReturnType constructs a type consisting of the return type of function Type.",
    "interviewAsk": "Can you explain what NonNullable and ReturnType is and why we use it?",
    "interviewAnswer": "NonNullable and ReturnType is a concept where nonNullable removes null and undefined. ReturnType constructs a type consisting of the return type of function Type. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "type T1 = ReturnType<typeof func>;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "parameters-utility",
    "title": "Parameters Utility",
    "tech": "TypeScript",
    "description": "Master the mechanics of Parameters Utility with interactive visualizations and interview tips.",
    "definition": "Parameters Utility is a concept where constructs a tuple type from the types used in the parameters of a function type.",
    "interviewAsk": "Can you explain what Parameters Utility is and why we use it?",
    "interviewAnswer": "Parameters Utility is a concept where constructs a tuple type from the types used in the parameters of a function type. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "type T2 = Parameters<typeof func>;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "indexed-access-types",
    "title": "Indexed Access Types",
    "tech": "TypeScript",
    "description": "Master the mechanics of Indexed Access Types with interactive visualizations and interview tips.",
    "definition": "Indexed Access Types is a concept where look up a specific property on another type.",
    "interviewAsk": "Can you explain what Indexed Access Types is and why we use it?",
    "interviewAnswer": "Indexed Access Types is a concept where look up a specific property on another type. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "type Age = Person['age'];",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "template-literal-types",
    "title": "Template Literal Types",
    "tech": "TypeScript",
    "description": "Master the mechanics of Template Literal Types with interactive visualizations and interview tips.",
    "definition": "Template Literal Types is a concept where string literal types that can expand into many strings via unions.",
    "interviewAsk": "Can you explain what Template Literal Types is and why we use it?",
    "interviewAnswer": "Template Literal Types is a concept where string literal types that can expand into many strings via unions. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "type Event = `${'on' | 'before'}${'Click' | 'Hover'}`;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "keyof-operator",
    "title": "Keyof Operator",
    "tech": "TypeScript",
    "description": "Master the mechanics of Keyof Operator with interactive visualizations and interview tips.",
    "definition": "Keyof Operator is a concept where yields the union of known, public property names of a given type.",
    "interviewAsk": "Can you explain what Keyof Operator is and why we use it?",
    "interviewAnswer": "Keyof Operator is a concept where yields the union of known, public property names of a given type. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "type K = keyof Person;\n// 'name' | 'age'",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "typeof-operator",
    "title": "Typeof Operator",
    "tech": "TypeScript",
    "description": "Master the mechanics of Typeof Operator with interactive visualizations and interview tips.",
    "definition": "Typeof Operator is a concept where yields the type of a value at rest.",
    "interviewAsk": "Can you explain what Typeof Operator is and why we use it?",
    "interviewAnswer": "Typeof Operator is a concept where yields the type of a value at rest. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "let n = typeof myVar;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "the-in-operator",
    "title": "The 'in' Operator",
    "tech": "TypeScript",
    "description": "Master the mechanics of The 'in' Operator with interactive visualizations and interview tips.",
    "definition": "The 'in' Operator is a concept where narrows types based on whether an object has a specific property.",
    "interviewAsk": "Can you explain what The 'in' Operator is and why we use it?",
    "interviewAnswer": "The 'in' Operator is a concept where narrows types based on whether an object has a specific property. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "if ('swim' in animal) {\n  animal.swim();\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "declaration-merging",
    "title": "Declaration Merging",
    "tech": "TypeScript",
    "description": "Master the mechanics of Declaration Merging with interactive visualizations and interview tips.",
    "definition": "Declaration Merging is a concept where the compiler merges two separate declarations declared with the same name into a single definition.",
    "interviewAsk": "Can you explain what Declaration Merging is and why we use it?",
    "interviewAnswer": "Declaration Merging is a concept where the compiler merges two separate declarations declared with the same name into a single definition. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "interface Box {\n  height: number;\n} interface Box {\n  width: number;\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "namespaces",
    "title": "Namespaces",
    "tech": "TypeScript",
    "description": "Master the mechanics of Namespaces with interactive visualizations and interview tips.",
    "definition": "Namespaces is a concept where a TS-specific way to organize code, previously called 'internal modules'.",
    "interviewAsk": "Can you explain what Namespaces is and why we use it?",
    "interviewAnswer": "Namespaces is a concept where a TS-specific way to organize code, previously called 'internal modules'. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "namespace Validation {\n  export const rule = ...\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "module-resolution",
    "title": "Module Resolution",
    "tech": "TypeScript",
    "description": "Master the mechanics of Module Resolution with interactive visualizations and interview tips.",
    "definition": "Module Resolution is a concept where the process the compiler uses to figure out what an import refers to.",
    "interviewAsk": "Can you explain what Module Resolution is and why we use it?",
    "interviewAnswer": "Module Resolution is a concept where the process the compiler uses to figure out what an import refers to. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "// Node vs Classic resolution strategies",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "ambient-declarations",
    "title": "Ambient Declarations",
    "tech": "TypeScript",
    "description": "Master the mechanics of Ambient Declarations with interactive visualizations and interview tips.",
    "definition": "Ambient Declarations is a concept where declarations that don't define an implementation, only a type signature.",
    "interviewAsk": "Can you explain what Ambient Declarations is and why we use it?",
    "interviewAnswer": "Ambient Declarations is a concept where declarations that don't define an implementation, only a type signature. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "declare module 'foo' {\n  export const bar: number;\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "tsconfig-options",
    "title": "TSConfig Options",
    "tech": "TypeScript",
    "description": "Master the mechanics of TSConfig Options with interactive visualizations and interview tips.",
    "definition": "TSConfig Options is a concept where the tsconfig.json file specifies the root files and the compiler options required to compile the project.",
    "interviewAsk": "Can you explain what TSConfig Options is and why we use it?",
    "interviewAnswer": "TSConfig Options is a concept where the tsconfig.json file specifies the root files and the compiler options required to compile the project. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "{\n  'compilerOptions': {\n  'strict': true\n}\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "strict-mode-flags",
    "title": "Strict Mode Flags",
    "tech": "TypeScript",
    "description": "Master the mechanics of Strict Mode Flags with interactive visualizations and interview tips.",
    "definition": "Strict Mode Flags is a concept where a group of flags that enable a broad range of type checking behavior.",
    "interviewAsk": "Can you explain what Strict Mode Flags is and why we use it?",
    "interviewAnswer": "Strict Mode Flags is a concept where a group of flags that enable a broad range of type checking behavior. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "strictNullChecks, noImplicitAny, etc.",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "decorators",
    "title": "Decorators",
    "tech": "TypeScript",
    "description": "Master the mechanics of Decorators with interactive visualizations and interview tips.",
    "definition": "Decorators is a concept where a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter.",
    "interviewAsk": "Can you explain what Decorators is and why we use it?",
    "interviewAnswer": "Decorators is a concept where a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "@sealed class BugReport {}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "mixins",
    "title": "Mixins",
    "tech": "TypeScript",
    "description": "Master the mechanics of Mixins with interactive visualizations and interview tips.",
    "definition": "Mixins is a concept where a pattern that relies on generics with class inheritance to extend a base class.",
    "interviewAsk": "Can you explain what Mixins is and why we use it?",
    "interviewAnswer": "Mixins is a concept where a pattern that relies on generics with class inheritance to extend a base class. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "function Timestamped<TBase extends Constructor>(Base: TBase) {\n  return class extends Base {\n  timestamp = Date.now();\n};\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "class-fields",
    "title": "Class Fields",
    "tech": "TypeScript",
    "description": "Master the mechanics of Class Fields with interactive visualizations and interview tips.",
    "definition": "Class Fields is a concept where public, private, and protected modifiers in classes.",
    "interviewAsk": "Can you explain what Class Fields is and why we use it?",
    "interviewAnswer": "Class Fields is a concept where public, private, and protected modifiers in classes. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "class Person {\n  private name: string;\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "abstract-classes",
    "title": "Abstract Classes",
    "tech": "TypeScript",
    "description": "Master the mechanics of Abstract Classes with interactive visualizations and interview tips.",
    "definition": "Abstract Classes is a concept where base classes from which other classes may be derived. They may not be instantiated directly.",
    "interviewAsk": "Can you explain what Abstract Classes is and why we use it?",
    "interviewAnswer": "Abstract Classes is a concept where base classes from which other classes may be derived. They may not be instantiated directly. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "abstract class Animal {\n  abstract makeSound(): void;\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "private-methods",
    "title": "Private Methods",
    "tech": "TypeScript",
    "description": "Master the mechanics of Private Methods with interactive visualizations and interview tips.",
    "definition": "Private Methods is a concept where methods that cannot be accessed from outside of its containing class.",
    "interviewAsk": "Can you explain what Private Methods is and why we use it?",
    "interviewAnswer": "Private Methods is a concept where methods that cannot be accessed from outside of its containing class. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "class A {\n  #privateMethod() {}\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "readonly-properties",
    "title": "Readonly Properties",
    "tech": "TypeScript",
    "description": "Master the mechanics of Readonly Properties with interactive visualizations and interview tips.",
    "definition": "Readonly Properties is a concept where properties that can only be modified in the constructor.",
    "interviewAsk": "Can you explain what Readonly Properties is and why we use it?",
    "interviewAnswer": "Readonly Properties is a concept where properties that can only be modified in the constructor. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "class A {\n  readonly name: string;\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "opaque-types",
    "title": "Opaque Types",
    "tech": "TypeScript",
    "description": "Master the mechanics of Opaque Types with interactive visualizations and interview tips.",
    "definition": "Opaque Types is a concept where types that hide their internal representation, providing type safety without runtime overhead.",
    "interviewAsk": "Can you explain what Opaque Types is and why we use it?",
    "interviewAnswer": "Opaque Types is a concept where types that hide their internal representation, providing type safety without runtime overhead. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "declare const tag: unique symbol;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "nominal-typing",
    "title": "Nominal Typing",
    "tech": "TypeScript",
    "description": "Master the mechanics of Nominal Typing with interactive visualizations and interview tips.",
    "definition": "Nominal Typing is a concept where tS is structurally typed, but nominal typing can be simulated using branding.",
    "interviewAsk": "Can you explain what Nominal Typing is and why we use it?",
    "interviewAnswer": "Nominal Typing is a concept where tS is structurally typed, but nominal typing can be simulated using branding. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "type UserID = string & {\n  readonly brand: unique symbol\n};",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "branded-types",
    "title": "Branded Types",
    "tech": "TypeScript",
    "description": "Master the mechanics of Branded Types with interactive visualizations and interview tips.",
    "definition": "Branded Types is a concept where a technique to simulate nominal typing in TS.",
    "interviewAsk": "Can you explain what Branded Types is and why we use it?",
    "interviewAnswer": "Branded Types is a concept where a technique to simulate nominal typing in TS. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "type EUR = number & {\n  _currency: 'EUR'\n};",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "variadic-tuple-types",
    "title": "Variadic Tuple Types",
    "tech": "TypeScript",
    "description": "Master the mechanics of Variadic Tuple Types with interactive visualizations and interview tips.",
    "definition": "Variadic Tuple Types is a concept where tuple types can contain rest elements with generic types.",
    "interviewAsk": "Can you explain what Variadic Tuple Types is and why we use it?",
    "interviewAnswer": "Variadic Tuple Types is a concept where tuple types can contain rest elements with generic types. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "function concat<T extends unknown[], U extends unknown[]>(arr1: [...T], arr2: [...U]): [...T, ...U] {\n  /*...*/\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "recursive-types",
    "title": "Recursive Types",
    "tech": "TypeScript",
    "description": "Master the mechanics of Recursive Types with interactive visualizations and interview tips.",
    "definition": "Recursive Types is a concept where types that reference themselves.",
    "interviewAsk": "Can you explain what Recursive Types is and why we use it?",
    "interviewAnswer": "Recursive Types is a concept where types that reference themselves. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "type Json = string | number | boolean | null | Json[] | {\n  [key: string]: Json\n};",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "satisfies-operator",
    "title": "satisfies Operator",
    "tech": "TypeScript",
    "description": "Master the mechanics of satisfies Operator with interactive visualizations and interview tips.",
    "definition": "satisfies Operator is a concept where validates that the type of an expression matches some type, without changing the resulting type of that expression.",
    "interviewAsk": "Can you explain what satisfies Operator is and why we use it?",
    "interviewAnswer": "satisfies Operator is a concept where validates that the type of an expression matches some type, without changing the resulting type of that expression. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const palette = {\n  red: [255, 0, 0]\n} satisfies Record<string, [number, number, number]>;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "awaited-type",
    "title": "Awaited Type",
    "tech": "TypeScript",
    "description": "Master the mechanics of Awaited Type with interactive visualizations and interview tips.",
    "definition": "Awaited Type is a concept where unwraps Promises recursively.",
    "interviewAsk": "Can you explain what Awaited Type is and why we use it?",
    "interviewAnswer": "Awaited Type is a concept where unwraps Promises recursively. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "type A = Awaited<Promise<string>>;\n// string",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "type-variance",
    "title": "Type Variance",
    "tech": "TypeScript",
    "description": "Master the mechanics of Type Variance with interactive visualizations and interview tips.",
    "definition": "Type Variance is a concept where covariance, Contravariance, and Bivariance rules in TypeScript.",
    "interviewAsk": "Can you explain what Type Variance is and why we use it?",
    "interviewAnswer": "Type Variance is a concept where covariance, Contravariance, and Bivariance rules in TypeScript. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "// Strict function types enabled",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "global-augmentation",
    "title": "Global Augmentation",
    "tech": "TypeScript",
    "description": "Master the mechanics of Global Augmentation with interactive visualizations and interview tips.",
    "definition": "Global Augmentation is a concept where adding declarations to the global scope from within a module.",
    "interviewAsk": "Can you explain what Global Augmentation is and why we use it?",
    "interviewAnswer": "Global Augmentation is a concept where adding declarations to the global scope from within a module. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "declare global {\n  interface Window {\n  myLib: any;\n}\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "module-augmentation",
    "title": "Module Augmentation",
    "tech": "TypeScript",
    "description": "Master the mechanics of Module Augmentation with interactive visualizations and interview tips.",
    "definition": "Module Augmentation is a concept where adding new members to existing modules.",
    "interviewAsk": "Can you explain what Module Augmentation is and why we use it?",
    "interviewAnswer": "Module Augmentation is a concept where adding new members to existing modules. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "declare module 'observable' {\n  interface Observable<T> {\n  map<U>(f: (x: T) => U): Observable<U>;\n}\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "project-references",
    "title": "Project References",
    "tech": "TypeScript",
    "description": "Master the mechanics of Project References with interactive visualizations and interview tips.",
    "definition": "Project References is a concept where a way to structure your TS programs into smaller pieces.",
    "interviewAsk": "Can you explain what Project References is and why we use it?",
    "interviewAnswer": "Project References is a concept where a way to structure your TS programs into smaller pieces. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "// tsconfig: 'references': [{\n  'path': '../src'\n}]",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "tsc-compiler-api",
    "title": "tsc Compiler API",
    "tech": "TypeScript",
    "description": "Master the mechanics of tsc Compiler API with interactive visualizations and interview tips.",
    "definition": "tsc Compiler API is a concept where using the TS compiler programmatically.",
    "interviewAsk": "Can you explain what tsc Compiler API is and why we use it?",
    "interviewAnswer": "tsc Compiler API is a concept where using the TS compiler programmatically. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "import * as ts from 'typescript';",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "ts-with-babel",
    "title": "TS with Babel",
    "tech": "TypeScript",
    "description": "Master the mechanics of TS with Babel with interactive visualizations and interview tips.",
    "definition": "TS with Babel is a concept where using Babel to transpile TS code instead of tsc.",
    "interviewAsk": "Can you explain what TS with Babel is and why we use it?",
    "interviewAnswer": "TS with Babel is a concept where using Babel to transpile TS code instead of tsc. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "// @babel/preset-typescript",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "v8-engine-basics",
    "title": "V8 Engine Basics",
    "tech": "Node.js",
    "description": "Master the mechanics of V8 Engine Basics with interactive visualizations and interview tips.",
    "definition": "V8 Engine Basics is a concept where google's open source high-performance JavaScript and WebAssembly engine.",
    "interviewAsk": "Can you explain what V8 Engine Basics is and why we use it?",
    "interviewAnswer": "V8 Engine Basics is a concept where google's open source high-performance JavaScript and WebAssembly engine. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "// Compiles JS directly to machine code",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "libuv",
    "title": "libuv",
    "tech": "Node.js",
    "description": "Master the mechanics of libuv with interactive visualizations and interview tips.",
    "definition": "libuv is a concept where a multi-platform support library with a focus on asynchronous I/O.",
    "interviewAsk": "Can you explain what libuv is and why we use it?",
    "interviewAnswer": "libuv is a concept where a multi-platform support library with a focus on asynchronous I/O. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "// Powers Node's event loop and worker pool",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "event-loop-phases",
    "title": "Event Loop Phases",
    "tech": "Node.js",
    "description": "Master the mechanics of Event Loop Phases with interactive visualizations and interview tips.",
    "definition": "Event Loop Phases is a concept where timers -> Pending Callbacks -> Idle/Prepare -> Poll -> Check -> Close Callbacks.",
    "interviewAsk": "Can you explain what Event Loop Phases is and why we use it?",
    "interviewAnswer": "Event Loop Phases is a concept where timers -> Pending Callbacks -> Idle/Prepare -> Poll -> Check -> Close Callbacks. Understanding this is critical in Node.js and the browser, as it allows us to handle heavy I/O operations like network requests or file reads without freezing the main UI thread.",
    "syntax": "",
    "codeExample": "// Loop order execution",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "microtasks",
    "title": "Microtasks",
    "tech": "Node.js",
    "description": "Master the mechanics of Microtasks with interactive visualizations and interview tips.",
    "definition": "Microtasks is a concept where tasks that execute immediately after the currently executing script and before any macrotasks.",
    "interviewAsk": "Can you explain what Microtasks is and why we use it?",
    "interviewAnswer": "Microtasks is a concept where tasks that execute immediately after the currently executing script and before any macrotasks. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "Promise.resolve().then(() => console.log('Microtask'));",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "process-nexttick",
    "title": "process.nextTick",
    "tech": "Node.js",
    "description": "Master the mechanics of process.nextTick with interactive visualizations and interview tips.",
    "definition": "process.nextTick is a concept where defers the execution of an action till the next pass around the event loop, acting as a microtask.",
    "interviewAsk": "Can you explain what process.nextTick is and why we use it?",
    "interviewAnswer": "process.nextTick is a concept where defers the execution of an action till the next pass around the event loop, acting as a microtask. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "process.nextTick(() => console.log('nextTick'));",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "setimmediate",
    "title": "setImmediate",
    "tech": "Node.js",
    "description": "Master the mechanics of setImmediate with interactive visualizations and interview tips.",
    "definition": "setImmediate is a concept where executes code at the end of the current event loop cycle (Check phase).",
    "interviewAsk": "Can you explain what setImmediate is and why we use it?",
    "interviewAnswer": "setImmediate is a concept where executes code at the end of the current event loop cycle (Check phase). This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "setImmediate(() => console.log('Immediate'));",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "callbacks",
    "title": "Callbacks",
    "tech": "Node.js",
    "description": "Master the mechanics of Callbacks with interactive visualizations and interview tips.",
    "definition": "Callbacks is a concept where functions passed as arguments to be executed later, traditionally the core of Node async code.",
    "interviewAsk": "Can you explain what Callbacks is and why we use it?",
    "interviewAnswer": "Callbacks is a concept where functions passed as arguments to be executed later, traditionally the core of Node async code. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "fs.readFile('file', (err, data) => {\n  /*...*/\n});",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "eventemitter",
    "title": "EventEmitter",
    "tech": "Node.js",
    "description": "Master the mechanics of EventEmitter with interactive visualizations and interview tips.",
    "definition": "EventEmitter is a concept where the core class in Node that facilitates event-driven programming.",
    "interviewAsk": "Can you explain what EventEmitter is and why we use it?",
    "interviewAnswer": "EventEmitter is a concept where the core class in Node that facilitates event-driven programming. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const ee = new EventEmitter();\nee.on('event', cb);\nee.emit('event');",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "readable-streams",
    "title": "Readable Streams",
    "tech": "Node.js",
    "description": "Master the mechanics of Readable Streams with interactive visualizations and interview tips.",
    "definition": "Readable Streams is a concept where abstractions for a source from which data is consumed.",
    "interviewAsk": "Can you explain what Readable Streams is and why we use it?",
    "interviewAnswer": "Readable Streams is a concept where abstractions for a source from which data is consumed. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const rs = fs.createReadStream('file.txt');\nrs.on('data', chunk => {});",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "writable-streams",
    "title": "Writable Streams",
    "tech": "Node.js",
    "description": "Master the mechanics of Writable Streams with interactive visualizations and interview tips.",
    "definition": "Writable Streams is a concept where abstractions for a destination to which data is written.",
    "interviewAsk": "Can you explain what Writable Streams is and why we use it?",
    "interviewAnswer": "Writable Streams is a concept where abstractions for a destination to which data is written. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const ws = fs.createWriteStream('file.txt');\nws.write('Hello');",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "duplex-transform",
    "title": "Duplex/Transform",
    "tech": "Node.js",
    "description": "Master the mechanics of Duplex/Transform with interactive visualizations and interview tips.",
    "definition": "Duplex/Transform is a concept where streams that are both Readable and Writable.",
    "interviewAsk": "Can you explain what Duplex/Transform is and why we use it?",
    "interviewAnswer": "Duplex/Transform is a concept where streams that are both Readable and Writable. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const zlib = require('zlib');\nconst gzip = zlib.createGzip();",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "buffer",
    "title": "Buffer",
    "tech": "Node.js",
    "description": "Master the mechanics of Buffer with interactive visualizations and interview tips.",
    "definition": "Buffer is a concept where a subclass of Uint8Array used to work with binary data.",
    "interviewAsk": "Can you explain what Buffer is and why we use it?",
    "interviewAnswer": "Buffer is a concept where a subclass of Uint8Array used to work with binary data. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const buf = Buffer.from('Hello', 'utf8');",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "file-system-fs-",
    "title": "File System (fs)",
    "tech": "Node.js",
    "description": "Master the mechanics of File System (fs) with interactive visualizations and interview tips.",
    "definition": "File System (fs) is a concept where module to interact with the file system.",
    "interviewAsk": "Can you explain what File System (fs) is and why we use it?",
    "interviewAnswer": "File System (fs) is a concept where module to interact with the file system. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const data = await fs.promises.readFile('config.json');",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "path-module",
    "title": "Path Module",
    "tech": "Node.js",
    "description": "Master the mechanics of Path Module with interactive visualizations and interview tips.",
    "definition": "Path Module is a concept where provides utilities for working with file and directory paths.",
    "interviewAsk": "Can you explain what Path Module is and why we use it?",
    "interviewAnswer": "Path Module is a concept where provides utilities for working with file and directory paths. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const fullPath = path.join(__dirname, 'file.txt');",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "http-https",
    "title": "HTTP/HTTPS",
    "tech": "Node.js",
    "description": "Master the mechanics of HTTP/HTTPS with interactive visualizations and interview tips.",
    "definition": "HTTP/HTTPS is a concept where core modules to create web servers and make HTTP requests.",
    "interviewAsk": "Can you explain what HTTP/HTTPS is and why we use it?",
    "interviewAnswer": "HTTP/HTTPS is a concept where core modules to create web servers and make HTTP requests. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const server = http.createServer((req, res) => res.end('OK'));",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "tcp-servers",
    "title": "TCP Servers",
    "tech": "Node.js",
    "description": "Master the mechanics of TCP Servers with interactive visualizations and interview tips.",
    "definition": "TCP Servers is a concept where using the net module for asynchronous network API.",
    "interviewAsk": "Can you explain what TCP Servers is and why we use it?",
    "interviewAnswer": "TCP Servers is a concept where using the net module for asynchronous network API. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const server = net.createServer(socket => socket.write('Hello'));",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "udp-datagrams",
    "title": "UDP Datagrams",
    "tech": "Node.js",
    "description": "Master the mechanics of UDP Datagrams with interactive visualizations and interview tips.",
    "definition": "UDP Datagrams is a concept where using the dgram module for UDP datagram sockets.",
    "interviewAsk": "Can you explain what UDP Datagrams is and why we use it?",
    "interviewAnswer": "UDP Datagrams is a concept where using the dgram module for UDP datagram sockets. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const server = dgram.createSocket('udp4');",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "child-processes",
    "title": "Child Processes",
    "tech": "Node.js",
    "description": "Master the mechanics of Child Processes with interactive visualizations and interview tips.",
    "definition": "Child Processes is a concept where module provides the ability to spawn subprocesses.",
    "interviewAsk": "Can you explain what Child Processes is and why we use it?",
    "interviewAnswer": "Child Processes is a concept where module provides the ability to spawn subprocesses. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const ls = spawn('ls', ['-lh', '/usr']);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "cluster-module",
    "title": "Cluster Module",
    "tech": "Node.js",
    "description": "Master the mechanics of Cluster Module with interactive visualizations and interview tips.",
    "definition": "Cluster Module is a concept where allows easy creation of child processes that all share server ports.",
    "interviewAsk": "Can you explain what Cluster Module is and why we use it?",
    "interviewAnswer": "Cluster Module is a concept where allows easy creation of child processes that all share server ports. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "if (cluster.isPrimary) {\n  cluster.fork();\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "worker-threads",
    "title": "Worker Threads",
    "tech": "Node.js",
    "description": "Master the mechanics of Worker Threads with interactive visualizations and interview tips.",
    "definition": "Worker Threads is a concept where useful for performing CPU-intensive JavaScript operations.",
    "interviewAsk": "Can you explain what Worker Threads is and why we use it?",
    "interviewAnswer": "Worker Threads is a concept where useful for performing CPU-intensive JavaScript operations. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const worker = new Worker('./worker.js');",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "os-module",
    "title": "OS Module",
    "tech": "Node.js",
    "description": "Master the mechanics of OS Module with interactive visualizations and interview tips.",
    "definition": "OS Module is a concept where provides operating system-related utility methods and properties.",
    "interviewAsk": "Can you explain what OS Module is and why we use it?",
    "interviewAnswer": "OS Module is a concept where provides operating system-related utility methods and properties. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const cpus = os.cpus();",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "crypto-module",
    "title": "Crypto Module",
    "tech": "Node.js",
    "description": "Master the mechanics of Crypto Module with interactive visualizations and interview tips.",
    "definition": "Crypto Module is a concept where provides cryptographic functionality.",
    "interviewAsk": "Can you explain what Crypto Module is and why we use it?",
    "interviewAnswer": "Crypto Module is a concept where provides cryptographic functionality. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const hash = crypto.createHash('sha256').update(msg).digest('hex');",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "zlib",
    "title": "Zlib",
    "tech": "Node.js",
    "description": "Master the mechanics of Zlib with interactive visualizations and interview tips.",
    "definition": "Zlib is a concept where provides compression functionality implemented using Gzip, Deflate/Inflate, and Brotli.",
    "interviewAsk": "Can you explain what Zlib is and why we use it?",
    "interviewAnswer": "Zlib is a concept where provides compression functionality implemented using Gzip, Deflate/Inflate, and Brotli. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "fs.createReadStream('in.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('out.gz'));",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "dns-resolution",
    "title": "DNS Resolution",
    "tech": "Node.js",
    "description": "Master the mechanics of DNS Resolution with interactive visualizations and interview tips.",
    "definition": "DNS Resolution is a concept where module enables name resolution.",
    "interviewAsk": "Can you explain what DNS Resolution is and why we use it?",
    "interviewAnswer": "DNS Resolution is a concept where module enables name resolution. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "dns.lookup('example.com', (err, address) => {});",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "url-module",
    "title": "URL Module",
    "tech": "Node.js",
    "description": "Master the mechanics of URL Module with interactive visualizations and interview tips.",
    "definition": "URL Module is a concept where provides utilities for URL resolution and parsing.",
    "interviewAsk": "Can you explain what URL Module is and why we use it?",
    "interviewAnswer": "URL Module is a concept where provides utilities for URL resolution and parsing. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const myURL = new URL('https://example.org/?a=b');",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "util-module",
    "title": "Util Module",
    "tech": "Node.js",
    "description": "Master the mechanics of Util Module with interactive visualizations and interview tips.",
    "definition": "Util Module is a concept where provides utility functions for developers.",
    "interviewAsk": "Can you explain what Util Module is and why we use it?",
    "interviewAnswer": "Util Module is a concept where provides utility functions for developers. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const stat = util.promisify(fs.stat);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "globals",
    "title": "Globals",
    "tech": "Node.js",
    "description": "Master the mechanics of Globals with interactive visualizations and interview tips.",
    "definition": "Globals is a concept where objects available in all modules.",
    "interviewAsk": "Can you explain what Globals is and why we use it?",
    "interviewAnswer": "Globals is a concept where objects available in all modules. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "console.log(process.pid, __dirname, __filename);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "commonjs-vs-es",
    "title": "CommonJS vs ES",
    "tech": "Node.js",
    "description": "Master the mechanics of CommonJS vs ES with interactive visualizations and interview tips.",
    "definition": "CommonJS vs ES is a concept where node's original require() vs modern import syntax.",
    "interviewAsk": "Can you explain what CommonJS vs ES is and why we use it?",
    "interviewAnswer": "CommonJS vs ES is a concept where node's original require() vs modern import syntax. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "// module.exports vs export const",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "package-json",
    "title": "Package.json",
    "tech": "Node.js",
    "description": "Master the mechanics of Package.json with interactive visualizations and interview tips.",
    "definition": "Package.json is a concept where the core manifesto file of any Node.js project.",
    "interviewAsk": "Can you explain what Package.json is and why we use it?",
    "interviewAnswer": "Package.json is a concept where the core manifesto file of any Node.js project. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "// {\n  \"name\": \"my-app\", \"scripts\": {\n  \"start\": \"node app.js\"\n}\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "npm-scripts",
    "title": "npm Scripts",
    "tech": "Node.js",
    "description": "Master the mechanics of npm Scripts with interactive visualizations and interview tips.",
    "definition": "npm Scripts is a concept where custom command line scripts defined in package.json.",
    "interviewAsk": "Can you explain what npm Scripts is and why we use it?",
    "interviewAnswer": "npm Scripts is a concept where custom command line scripts defined in package.json. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "npm run build",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "semver",
    "title": "SemVer",
    "tech": "Node.js",
    "description": "Master the mechanics of SemVer with interactive visualizations and interview tips.",
    "definition": "SemVer is a concept where semantic Versioning rules for npm packages (MAJOR.MINOR.PATCH).",
    "interviewAsk": "Can you explain what SemVer is and why we use it?",
    "interviewAnswer": "SemVer is a concept where semantic Versioning rules for npm packages (MAJOR.MINOR.PATCH). This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "\"dependencies\": {\n  \"react\": \"^18.2.0\"\n}",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "package-lock-json",
    "title": "Package-lock.json",
    "tech": "Node.js",
    "description": "Master the mechanics of Package-lock.json with interactive visualizations and interview tips.",
    "definition": "Package-lock.json is a concept where automatically generated file that describes the exact tree that was generated by npm.",
    "interviewAsk": "Can you explain what Package-lock.json is and why we use it?",
    "interviewAnswer": "Package-lock.json is a concept where automatically generated file that describes the exact tree that was generated by npm. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "// locks dependencies to exact versions",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "node-modules",
    "title": "Node_Modules",
    "tech": "Node.js",
    "description": "Master the mechanics of Node_Modules with interactive visualizations and interview tips.",
    "definition": "Node_Modules is a concept where how Node resolves dependencies recursively.",
    "interviewAsk": "Can you explain what Node_Modules is and why we use it?",
    "interviewAnswer": "Node_Modules is a concept where how Node resolves dependencies recursively. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "// Searches local node_modules, then up the tree",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "memory-leaks",
    "title": "Memory Leaks",
    "tech": "Node.js",
    "description": "Master the mechanics of Memory Leaks with interactive visualizations and interview tips.",
    "definition": "Memory Leaks is a concept where when memory that is no longer needed is not released.",
    "interviewAsk": "Can you explain what Memory Leaks is and why we use it?",
    "interviewAnswer": "Memory Leaks is a concept where when memory that is no longer needed is not released. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "// Global variables, uncleared intervals, closure leaks",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "heap-snapshots",
    "title": "Heap Snapshots",
    "tech": "Node.js",
    "description": "Master the mechanics of Heap Snapshots with interactive visualizations and interview tips.",
    "definition": "Heap Snapshots is a concept where taking a snapshot of the V8 engine's memory heap.",
    "interviewAsk": "Can you explain what Heap Snapshots is and why we use it?",
    "interviewAnswer": "Heap Snapshots is a concept where taking a snapshot of the V8 engine's memory heap. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const v8 = require('v8');\nv8.writeHeapSnapshot();",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "gc-tracing",
    "title": "GC Tracing",
    "tech": "Node.js",
    "description": "Master the mechanics of GC Tracing with interactive visualizations and interview tips.",
    "definition": "GC Tracing is a concept where tracking Garbage Collection runs.",
    "interviewAsk": "Can you explain what GC Tracing is and why we use it?",
    "interviewAnswer": "GC Tracing is a concept where tracking Garbage Collection runs. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "node --trace-gc index.js",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "node-profiling",
    "title": "Node Profiling",
    "tech": "Node.js",
    "description": "Master the mechanics of Node Profiling with interactive visualizations and interview tips.",
    "definition": "Node Profiling is a concept where analyzing CPU and memory usage.",
    "interviewAsk": "Can you explain what Node Profiling is and why we use it?",
    "interviewAnswer": "Node Profiling is a concept where analyzing CPU and memory usage. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "node --prof app.js",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "debugging",
    "title": "Debugging",
    "tech": "Node.js",
    "description": "Master the mechanics of Debugging with interactive visualizations and interview tips.",
    "definition": "Debugging is a concept where attaching a debugger to Node.",
    "interviewAsk": "Can you explain what Debugging is and why we use it?",
    "interviewAnswer": "Debugging is a concept where attaching a debugger to Node. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "node --inspect app.js",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "environment-vars",
    "title": "Environment Vars",
    "tech": "Node.js",
    "description": "Master the mechanics of Environment Vars with interactive visualizations and interview tips.",
    "definition": "Environment Vars is a concept where global configuration variables.",
    "interviewAsk": "Can you explain what Environment Vars is and why we use it?",
    "interviewAnswer": "Environment Vars is a concept where global configuration variables. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const port = process.env.PORT || 3000;",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "dotenv",
    "title": "Dotenv",
    "tech": "Node.js",
    "description": "Master the mechanics of Dotenv with interactive visualizations and interview tips.",
    "definition": "Dotenv is a concept where zero-dependency module that loads environment variables from a .env file.",
    "interviewAsk": "Can you explain what Dotenv is and why we use it?",
    "interviewAnswer": "Dotenv is a concept where zero-dependency module that loads environment variables from a .env file. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "require('dotenv').config();",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "express-middleware",
    "title": "Express Middleware",
    "tech": "Node.js",
    "description": "Master the mechanics of Express Middleware with interactive visualizations and interview tips.",
    "definition": "Express Middleware is a concept where functions that have access to the request and response object in Express.",
    "interviewAsk": "Can you explain what Express Middleware is and why we use it?",
    "interviewAnswer": "Express Middleware is a concept where functions that have access to the request and response object in Express. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "app.use((req, res, next) => {\n  next();\n});",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "express-routing",
    "title": "Express Routing",
    "tech": "Node.js",
    "description": "Master the mechanics of Express Routing with interactive visualizations and interview tips.",
    "definition": "Express Routing is a concept where defining endpoints for client requests.",
    "interviewAsk": "Can you explain what Express Routing is and why we use it?",
    "interviewAnswer": "Express Routing is a concept where defining endpoints for client requests. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "router.get('/users', controller.getUsers);",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "jwt-auth",
    "title": "JWT Auth",
    "tech": "Node.js",
    "description": "Master the mechanics of JWT Auth with interactive visualizations and interview tips.",
    "definition": "JWT Auth is a concept where jSON Web Tokens for stateless authentication.",
    "interviewAsk": "Can you explain what JWT Auth is and why we use it?",
    "interviewAnswer": "JWT Auth is a concept where jSON Web Tokens for stateless authentication. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const token = jwt.sign({\n  id\n}, 'secret');",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "rate-limiting",
    "title": "Rate Limiting",
    "tech": "Node.js",
    "description": "Master the mechanics of Rate Limiting with interactive visualizations and interview tips.",
    "definition": "Rate Limiting is a concept where controlling the rate of requests sent to a server.",
    "interviewAsk": "Can you explain what Rate Limiting is and why we use it?",
    "interviewAnswer": "Rate Limiting is a concept where controlling the rate of requests sent to a server. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const limiter = rateLimit({\n  windowMs: 15*60*1000, max: 100\n});",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "redis-caching",
    "title": "Redis Caching",
    "tech": "Node.js",
    "description": "Master the mechanics of Redis Caching with interactive visualizations and interview tips.",
    "definition": "Redis Caching is a concept where using Redis for fast, in-memory data caching.",
    "interviewAsk": "Can you explain what Redis Caching is and why we use it?",
    "interviewAnswer": "Redis Caching is a concept where using Redis for fast, in-memory data caching. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "await redisClient.set('key', 'value');",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "database-drivers",
    "title": "Database Drivers",
    "tech": "Node.js",
    "description": "Master the mechanics of Database Drivers with interactive visualizations and interview tips.",
    "definition": "Database Drivers is a concept where connecting Node to external databases.",
    "interviewAsk": "Can you explain what Database Drivers is and why we use it?",
    "interviewAnswer": "Database Drivers is a concept where connecting Node to external databases. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "await mongoose.connect('mongodb://localhost/test');",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "websockets",
    "title": "WebSockets",
    "tech": "Node.js",
    "description": "Master the mechanics of WebSockets with interactive visualizations and interview tips.",
    "definition": "WebSockets is a concept where providing full-duplex communication channels over a single TCP connection.",
    "interviewAsk": "Can you explain what WebSockets is and why we use it?",
    "interviewAnswer": "WebSockets is a concept where providing full-duplex communication channels over a single TCP connection. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const wss = new WebSocket.Server({\n  port: 8080\n});",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "graphql-server",
    "title": "GraphQL Server",
    "tech": "Node.js",
    "description": "Master the mechanics of GraphQL Server with interactive visualizations and interview tips.",
    "definition": "GraphQL Server is a concept where a query language for your API.",
    "interviewAsk": "Can you explain what GraphQL Server is and why we use it?",
    "interviewAnswer": "GraphQL Server is a concept where a query language for your API. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "const server = new ApolloServer({\n  typeDefs, resolvers\n});",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "serverless",
    "title": "Serverless",
    "tech": "Node.js",
    "description": "Master the mechanics of Serverless with interactive visualizations and interview tips.",
    "definition": "Serverless is a concept where running Node.js functions in ephemeral environments like AWS Lambda.",
    "interviewAsk": "Can you explain what Serverless is and why we use it?",
    "interviewAnswer": "Serverless is a concept where running Node.js functions in ephemeral environments like AWS Lambda. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "exports.handler = async (event) => {\n  return {\n  statusCode: 200\n};\n};",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  },
  {
    "id": "pm2",
    "title": "PM2",
    "tech": "Node.js",
    "description": "Master the mechanics of PM2 with interactive visualizations and interview tips.",
    "definition": "PM2 is a concept where production process manager for Node.js.",
    "interviewAsk": "Can you explain what PM2 is and why we use it?",
    "interviewAnswer": "PM2 is a concept where production process manager for Node.js. This is extremely useful in production for optimizing performance, managing scope, and keeping our architecture clean.",
    "syntax": "",
    "codeExample": "pm2 start app.js -i max",
    "diagramType": "memory",
    "animationSteps": [
      {
        "title": "Compilation & Parsing",
        "description": "The engine parses the code, checks for syntax errors, and builds the Abstract Syntax Tree (AST).",
        "diagramState": {
          "env": "Engine",
          "vars": {
            "status": "Parsing Code..."
          }
        }
      },
      {
        "title": "Execution Context Creation",
        "description": "Code begins execution line by line. Variables and functions are allocated in active memory.",
        "diagramState": {
          "env": "Global Context",
          "vars": {
            "execution": "Active",
            "heap": "Allocated"
          }
        }
      },
      {
        "title": "Garbage Collection Sweep",
        "description": "Execution finishes. The Garbage Collector sweeps through memory to clean up unreferenced objects.",
        "diagramState": {
          "env": "Garbage Collector",
          "vars": {
            "sweep": "Complete"
          },
          "closure": {
            "memory": "Freed"
          }
        }
      }
    ]
  }
];

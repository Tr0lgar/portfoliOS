/**
 * Terminal Window
 */

export function createTerminalContent() {
    return `<div class="terminal-container" id="terminal-container"></div>`;
}

export function initTerminal(windowEl) {
    const container = windowEl.querySelector('#terminal-container');
    if (!container) return;

    const terminal = new Terminal(container, terminalCommands);

    // Cleanup
    return () => {
        terminal.destroy();
    };
}

class Terminal {
    constructor(container, commands) {
        this.container = container;
        this.commands = commands;
        this.history = [];
        this.historyIndex = -1;
        this.commandHistory = [];
        this.init();
    }

    init() {
        this.terminalEl = document.createElement("div");
        this.terminalEl.className = "terminal";

        this.outputEl = document.createElement("div");
        this.outputEl.className = "terminal-output";

        this.inputContainer = document.createElement("div");
        this.inputContainer.className = "terminal-input-container";

        this.promptLabel = document.createElement("span");
        this.promptLabel.textContent = "visitor@portfoliOS:~$ ";

        this.inputEl = document.createElement("input");
        this.inputEl.type = "text";
        this.inputEl.className = "terminal-prompt";
        this.inputEl.autocomplete = "off";
        this.inputEl.spellcheck = false;

        this.inputContainer.appendChild(this.promptLabel);
        this.inputContainer.appendChild(this.inputEl);
        this.terminalEl.appendChild(this.outputEl);
        this.terminalEl.appendChild(this.inputContainer);
        this.container.appendChild(this.terminalEl);

        this.bindEvents();

        requestAnimationFrame(() => {
            this.inputEl.focus();
        });
    }

    bindEvents() {
        this.handleKeyDown = (e) => {
            if (e.key === "Enter") {
                const command = this.inputEl.value.trim();
                if (command) {
                    this.commandHistory.push(command);
                    this.historyIndex = this.commandHistory.length;
                }
                this.inputEl.value = "";
                this.log(`> ${command}`);
                this.executeCommand(command);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    this.inputEl.value = this.commandHistory[this.historyIndex] || '';
                }
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                if (this.historyIndex < this.commandHistory.length - 1) {
                    this.historyIndex++;
                    this.inputEl.value = this.commandHistory[this.historyIndex] || '';
                } else {
                    this.historyIndex = this.commandHistory.length;
                    this.inputEl.value = '';
                }
            }
        };

        this.handleClick = () => {
            this.inputEl.focus();
        };

        this.inputEl.addEventListener("keydown", this.handleKeyDown);
        this.terminalEl.addEventListener("click", this.handleClick);
    }

    log(msg) {
        const line = document.createElement("div");
        line.textContent = msg;
        this.outputEl.appendChild(line);
        this.outputEl.scrollTop = this.outputEl.scrollHeight;
    }

    clear() {
        this.outputEl.innerHTML = "";
    }

    executeCommand(input) {
        const args = input.split(" ");
        const command = args[0];

        if (command in this.commands) {
            this.commands[command](this, args);
        } else if (command) {
            this.log(`Command '${command}' not found. Type "help" for available commands.`);
        }
    }

    destroy() {
        if (this.inputEl) {
            this.inputEl.removeEventListener("keydown", this.handleKeyDown);
        }
        if (this.terminalEl) {
            this.terminalEl.removeEventListener("click", this.handleClick);
        }
    }
}

const terminalCommands = {
    help(terminal) {
        terminal.log("Available commands:");
        terminal.log("  help       - Show this help message");
        terminal.log("  clear      - Clear terminal output");
        terminal.log("  echo <msg> - Print a message");
        terminal.log("  about      - Information about portfoliOS");
    },

    clear(terminal) {
        terminal.clear();
    },

    echo(terminal, args) {
        const message = args.slice(1).join(" ");
        terminal.log(message || "");
    },

    about(terminal) {
        terminal.log("portfoliOS - An interactive portfolio experience");
        terminal.log("Built with vanilla JavaScript, HTML, and CSS");
        terminal.log("GitHub: https://github.com/Tr0lgar/portfoliOS");
    }
};
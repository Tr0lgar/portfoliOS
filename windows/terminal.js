export function createTerminalContent() {
    return `<div id="terminal-container"></div>`;
}

export class Terminal {
    constructor(container, commands) {
        this.container = container;
        this.commands = commands;
        this.history = [];
        this.createTerminal();
        this.bindEvents();
    }

    createTerminal() {
        // Structure
        this.terminalElement = document.createElement("div");
        this.terminalElement.className = "terminal";

        this.outputElement = document.createElement("div");
        this.outputElement.className = "terminal-output";

        this.inputContainer = document.createElement("div");
        this.inputContainer.className = "terminal-input-container";

        this.promptLabel = document.createElement("span");
        this.promptLabel.textContent = "visitor@portfoliOS:~$ ";

        this.inputElement = document.createElement("input");
        this.inputElement.type = "text";
        this.inputElement.className = "terminal-prompt";
        this.inputElement.autofocus = true;
        this.inputElement.focus();

        this.inputContainer.appendChild(this.promptLabel);
        this.inputContainer.appendChild(this.inputElement);

        this.terminalElement.appendChild(this.outputElement);
        this.terminalElement.appendChild(this.inputContainer);

        this.container.appendChild(this.terminalElement);
        requestAnimationFrame(() => {
            this.inputElement.focus();
        });
    }

    bindEvents() {
        // Keyboard input
        this.inputElement.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const command = this.inputElement.value.trim();
                this.inputElement.value = "";
                this.log(`> ${command}`);
                this.executeCommand(command);
            }
        });

        // Auto-focus on click
        this.terminalElement.addEventListener("click", (e) => {
            this.inputElement.focus();
        });
    }

    log(msg) {
        // Add line in the terminal
        const line = document.createElement("div");
        line.textContent = msg;
        this.outputElement.appendChild(line);
        this.outputElement.scrollTop = this.outputElement.scrollHeight;
        this.history.push(msg);
    }

    clear() {
        // Clear the terminal
        this.outputElement.innerHTML = "";
        this.history = [];
    }

    executeCommand(input) {
        const args = input.split(" ");
        const command = args[0];

        if (command in this.commands) {
            this.commands[command](this, args);
        } else {
            this.log(`Commande '${command}' non reconnue. Tapez "help" pour la liste des commandes.`);
        }
    }
}

export const terminalCommands = {
    help: function(terminal, args) {
        terminal.log("Commandes disponibles : " + Object.keys(terminalCommands).join(", "));
    },
    clear: function(terminal, args) {
        terminal.clear();
    },
    echo: function(terminal, args) {
        const message = args.slice(1).join(" ");
        terminal.log(message);
    },
    // Add more commands here
};
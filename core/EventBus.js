/**
 * EventBus - Centralized event management
 * Singleton pattern for decoupled communication
 */

export class EventBus {
    static instance = null;

    constructor() {
        if (EventBus.instance) {
            return EventBus.instance;
        }
        this.events = new Map();
        EventBus.instance = this;
    }

    static getInstance() {
        if (!EventBus.instance) {
            EventBus.instance = new EventBus();
        }
        return EventBus.instance;
    }

    on(eventName, callback) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        this.events.get(eventName).push(callback);
    }

    off(eventName, callback) {
        if (!this.events.has(eventName)) return;

        const callbacks = this.events.get(eventName);
        const index = callbacks.indexOf(callback);
        if (index > -1) {
            callbacks.splice(index, 1);
        }
    }

    emit(eventName, data) {
        if (!this.events.has(eventName)) return;

        this.events.get(eventName).forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error(`Error in event handler for ${eventName}:`, error);
            }
        });
    }

    clear() {
        this.events.clear();
    }
}
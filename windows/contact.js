/**
 * Contact Window
 */

export function createContactContent() {
    return `
        <form class="contact-form">
            <input type="email" placeholder="Your email" required>
            <textarea placeholder="Work in progress" rows="6" required></textarea>
            <button type="button" onclick="window.open('https://youtu.be/vXYVfk7agqU', '_blank')">
                Send
            </button>
        </form>
    `;
}
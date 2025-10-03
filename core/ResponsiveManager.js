/**
 * ResponsiveManager - Handles responsive behavior and layout switching
 */

export class ResponsiveManager {
    constructor() {
        this.isMobile = false;
        this.breakpoints = {
            mobile: 768,
            tablet: 1024
        };
        this.init();
    }

    init() {
        this.checkViewport();
        window.addEventListener('resize', () => this.checkViewport());
    }

    checkViewport() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth < this.breakpoints.mobile;

        if (wasMobile !== this.isMobile) {
            document.body.classList.toggle('mobile-layout', this.isMobile);
            document.dispatchEvent(new CustomEvent('viewport:change', {
                detail: { isMobile: this.isMobile }
            }));
        }
    }

    isTouch() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
}
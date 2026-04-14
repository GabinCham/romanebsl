/**
 * Configuration globale du projet
 */

export const CONFIG = {
    // Séquence d'images (Pencil animation - images locales)
    sequence: {
        frameCount: 47,
        imagePath: (index) => {
            const frameNumber = (index + 1).toString().padStart(4, '0');
            return `assets/images/pencil_sequence/${frameNumber}.png`;
        },
        
        canvas: {
            width: 1440,
            height: 960
        }
    },
    
    // GSAP ScrollTrigger
    scrollTrigger: {
        scrub: 1,              // Lissage (0 = direct, 1 = smooth)
        anticipatePin: 1,    // Anticipe le pinning pour éviter les jumps
        markers: false       // true = debug
    },
    
    // Animation timings (en % du scroll)
    timings: {
        heroReveal: { start: 0, end: 0.3 },
        sequenceText: { start: 0.2, end: 0.4 },
        afterSequence: { start: 0.8, end: 1 }
    }
};

export default CONFIG;

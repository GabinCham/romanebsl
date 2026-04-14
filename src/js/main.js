/**
 * Point d'entrée principal
 * Initialise tous les modules et lance l'application
 */

import { CONFIG } from './config.js';
import { ScrollSequence } from './scrollSequence.js';
import { AnimationManager } from './animations.js';
import { Loader } from './loader.js';

/**
 * Classe principale de l'application
 */
class App {
    constructor() {
        this.loader = new Loader('loading');
        this.sequence = null;
        this.animations = null;
    }

    /**
     * Initialise l'application
     */
    async init() {
        try {
            // 1. Initialiser la séquence d'images sur le hero
            this.sequence = new ScrollSequence(CONFIG.sequence);
            await this.sequence.init('heroCanvas');

            // 2. Masquer le loader
            this.loader.hide();

            // 3. Dessiner la première frame
            this.sequence.drawFrame(0);

            // 4. Initialiser les animations GSAP
            this.initAnimations();

            // 5. Initialiser l'animation scroll sur le hero
            this.initHeroScrollAnimation();

            // 6. Initialiser la palette de couleurs
            this.initColorPalette();

            // 7. Gestion du resize
            this.handleResize();

            console.log('✅ Application initialisée avec succès');

        } catch (error) {
            console.error('❌ Erreur lors de l\'initialisation:', error);
            this.loader.setText('Erreur de chargement');
        }
    }

    /**
     * Initialise toutes les animations GSAP
     */
    initAnimations() {
        this.animations = new AnimationManager(
            window.gsap,
            window.ScrollTrigger,
            CONFIG
        );

        // Animation ROMANE/BSL sort vers le haut à 40% du scroll
        this.animations.createHeroAnimations();

        // Animation Bento Gallery effet scrubbing
        this.animations.createBentoAnimations();

        // Animations de la section après hero
        this.animations.createAfterSequenceAnimations();

        // Animation du logo dans la section Contact
        this.animations.createContactAnimations();
    }

    /**
     * Initialise la palette de couleurs interactive
     */
    initColorPalette() {
        const hero = document.getElementById('hero');
        const heroTitle = document.getElementById('heroTitle');
        const heroSubtitle = document.getElementById('heroSubtitle');
        const colorDuos = document.querySelectorAll('.color-duo');

        colorDuos.forEach(duo => {
            duo.addEventListener('click', () => {
                const bgColor = duo.dataset.bg;
                const textColor = duo.dataset.text;

                // Applique les couleurs avec transition
                hero.style.backgroundColor = bgColor;
                heroTitle.style.color = textColor;
                heroSubtitle.style.color = textColor;
            });
        });
    }

    /**
     * Gère le redimensionnement de la fenêtre
     */
    handleResize() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Redessiner la frame actuelle du hero
                const triggers = window.ScrollTrigger.getAll();
                const heroTrigger = triggers.find(t => t.vars.trigger === '#hero');
                
                if (heroTrigger && this.sequence) {
                    const frameIndex = Math.floor(
                        heroTrigger.progress * (this.sequence.frameCount - 1)
                    );
                    this.sequence.drawFrame(frameIndex);
                }
            }, 100);
        });
    }

    /**
     * Animation scroll sur le hero
     */
    initHeroScrollAnimation() {
        const { frameCount } = this.sequence;
        
        window.gsap.to({}, {
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom bottom',
                scrub: CONFIG.scrollTrigger.scrub,
                anticipatePin: CONFIG.scrollTrigger.anticipatePin,
                onUpdate: (self) => {
                    const frameIndex = Math.floor(self.progress * (frameCount - 1));
                    this.sequence.drawFrame(frameIndex);
                }
            }
        });
    }

    /**
     * Nettoie l'application (pour HMR ou destruction)
     */
    destroy() {
        if (this.animations) {
            this.animations.destroy();
        }
    }
}

// Démarrage de l'application quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const app = new App();
        app.init();
    });
} else {
    const app = new App();
    app.init();
}

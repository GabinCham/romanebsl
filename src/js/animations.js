/**
 * Gestionnaire des animations GSAP ScrollTrigger
 */

export class AnimationManager {
    constructor(gsap, scrollTrigger, config) {
        this.gsap = gsap;
        this.scrollTrigger = scrollTrigger;
        this.config = config;
        this.gsap.registerPlugin(this.scrollTrigger);
    }

    /**
     * Animation de la séquence au scroll
     */
    createSequenceAnimation(sequenceInstance) {
        const { frameCount } = sequenceInstance;
        
        return this.gsap.to({}, {
            scrollTrigger: {
                trigger: '#sequence',
                start: 'top top',
                end: 'bottom bottom',
                scrub: this.config.scrollTrigger.scrub,
                anticipatePin: this.config.scrollTrigger.anticipatePin,
                pin: '.canvas-container',
                onUpdate: (self) => {
                    const frameIndex = Math.floor(self.progress * (frameCount - 1));
                    sequenceInstance.drawFrame(frameIndex);
                }
            }
        });
    }

    /**
     * Animations du hero - ROMANE part à 30%, textes apparaissent 25-50%, section projets arrive à 60%
     */
    createHeroAnimations() {
        // ROMANE + BSL + palette partent vers le haut (0% à 30%)
        this.gsap.to('.hero-ui', {
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: '30% top',
                scrub: this.config.scrollTrigger.scrub,
                markers: this.config.scrollTrigger.markers
            },
            y: '-100vh',
            opacity: 0,
            ease: 'power2.in'
        });
        
        // Les textes révélés apparaissent (20% à 40%)
        this.gsap.to('.hero-reveal-text', {
            scrollTrigger: {
                trigger: '#hero',
                start: '20% top',
                end: '40% top',
                scrub: this.config.scrollTrigger.scrub,
                markers: this.config.scrollTrigger.markers
            },
            opacity: 1,
            ease: 'power2.out'
        });
        
        // Titres et descriptions apparaissent avec stagger (25% à 45%)
        this.gsap.to('.reveal-title', {
            scrollTrigger: {
                trigger: '#hero',
                start: '25% top',
                end: '45% top',
                scrub: this.config.scrollTrigger.scrub,
                markers: this.config.scrollTrigger.markers
            },
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: 'power2.out'
        });
        
        this.gsap.to('.reveal-desc', {
            scrollTrigger: {
                trigger: '#hero',
                start: '28% top',
                end: '48% top',
                scrub: this.config.scrollTrigger.scrub,
                markers: this.config.scrollTrigger.markers
            },
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: 'power2.out'
        });
        
        // Les textes révélés disparaissent (50% à 70%)
        this.gsap.to('.hero-reveal-text', {
            scrollTrigger: {
                trigger: '#hero',
                start: '50% top',
                end: '70% top',
                scrub: this.config.scrollTrigger.scrub,
                markers: this.config.scrollTrigger.markers
            },
            opacity: 0,
            y: '-50px',
            ease: 'power2.in'
        });
    }

    /**
     * Animations Bento Gallery - effet zoom centrale au scroll
     */
    createBentoAnimations() {
        // Animation de la grille Bento - zoom sur l'image centrale
        const tl = this.gsap.timeline({
            scrollTrigger: {
                trigger: '.bento-container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: this.config.scrollTrigger.scrub,
                pin: '.bento-grid-scrub',
                markers: this.config.scrollTrigger.markers
            }
        });
        
        // Images latérales s'écartent
        tl.to(['.bento-cell.top-left', '.bento-cell.top-center', '.bento-cell.top-right', '.bento-cell.middle-left', '.bento-cell.middle-right', '.bento-cell.bottom-left', '.bento-cell.bottom-center', '.bento-cell.bottom-right'], {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            stagger: 0.1
        }, 0);
        
        // Image centrale zoome pour remplir l'écran
        tl.to('.bento-cell.center', {
            scale: 3,
            borderRadius: 0,
            duration: 1
        }, 0);
        
        // Texte apparaît après le zoom
        tl.from('.bento-text', {
            y: 100,
            opacity: 0,
            duration: 0.5
        }, 0.8);
    }

    /**
     * Animations de la section Projets
     */
    createAfterSequenceAnimations() {
        // Animation du header Projets
        this.gsap.to('.projects-header', {
            scrollTrigger: {
                trigger: '.projects-section',
                start: 'top 80%',
                end: 'top 40%',
                scrub: this.config.scrollTrigger.scrub,
                markers: this.config.scrollTrigger.markers
            },
            opacity: 1,
            y: 0,
            ease: 'power2.out'
        });

        // Animation des showcases projets un par un
        this.gsap.to('.project-showcase', {
            scrollTrigger: {
                trigger: '.projects-section',
                start: 'top 60%',
                end: 'bottom 40%',
                scrub: this.config.scrollTrigger.scrub,
                markers: this.config.scrollTrigger.markers
            },
            opacity: 1,
            y: 0,
            stagger: 0.15,
            ease: 'power2.out'
        });
    }

    /**
     * Animation du logo dans la section Contact
     */
    createContactAnimations() {
        // Logo qui apparaît du bas de la page et reste en place
        this.gsap.to('.logo-svg', {
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 80%',
                end: 'center center',
                scrub: this.config.scrollTrigger.scrub
            },
            y: 0,
            ease: 'power2.out'
        });
    }

    /**
     * Nettoie toutes les ScrollTriggers
     */
    destroy() {
        this.scrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
}

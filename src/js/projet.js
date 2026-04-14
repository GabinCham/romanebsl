/**
 * Animations pour la page projet
 */

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Animation d'entrée du hero
    gsap.to('.project-hero-content', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power2.out'
    });

    gsap.to('.project-hero-image', {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.4,
        ease: 'power2.out'
    });

    // Animation des sections au scroll
    gsap.utils.toArray('.project-text').forEach((text) => {
        gsap.to(text, {
            scrollTrigger: {
                trigger: text,
                start: 'top 80%',
                end: 'top 50%',
                scrub: 1
            },
            opacity: 1,
            y: 0,
            ease: 'power2.out'
        });
    });

    gsap.utils.toArray('.project-image-large').forEach((img) => {
        gsap.to(img, {
            scrollTrigger: {
                trigger: img,
                start: 'top 80%',
                end: 'top 50%',
                scrub: 1
            },
            opacity: 1,
            y: 0,
            ease: 'power2.out'
        });
    });

    // Animation de la galerie avec stagger
    gsap.to('.gallery-item', {
        scrollTrigger: {
            trigger: '.project-gallery',
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1
        },
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // Animation du projet suivant
    gsap.from('.next-project-link', {
        scrollTrigger: {
            trigger: '.next-project',
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1
        },
        opacity: 0,
        y: 30,
        ease: 'power2.out'
    });
});

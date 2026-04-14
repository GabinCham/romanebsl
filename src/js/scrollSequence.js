/**
 * Gestionnaire de séquence d'images scroll-scrubbed
 * Charge une séquence d'images et les affiche sur canvas selon le scroll
 */

export class ScrollSequence {
    constructor(config) {
        this.config = config;
        this.images = [];
        this.loadedCount = 0;
        this.canvas = null;
        this.ctx = null;
        this.isReady = false;
    }

    /**
     * Initialise le canvas et charge les images
     */
    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error(`Canvas #${canvasId} non trouvé`);
            return Promise.reject();
        }

        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.config.canvas.width;
        this.canvas.height = this.config.canvas.height;

        return this.preloadImages();
    }

    /**
     * Précharge toutes les images de la séquence
     */
    preloadImages() {
        return new Promise((resolve) => {
            const { frameCount, imagePath } = this.config;
            
            if (frameCount === 0) {
                resolve();
                return;
            }

            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                img.src = imagePath(i);
                
                img.onload = () => this.handleImageLoad(resolve, frameCount);
                img.onerror = () => {
                    console.warn(`Erreur chargement image ${i}`);
                    this.handleImageLoad(resolve, frameCount);
                };
                
                this.images.push(img);
            }
        });
    }

    handleImageLoad(resolve, total) {
        this.loadedCount++;
        if (this.loadedCount === total) {
            this.isReady = true;
            resolve();
        }
    }

    /**
     * Dessine une frame spécifique sur le canvas
     */
    drawFrame(index) {
        if (!this.isReady || !this.ctx) return;

        const clampedIndex = Math.min(Math.max(0, index), this.images.length - 1);
        const img = this.images[clampedIndex];

        if (!img || !img.complete) return;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Calcul pour object-fit: contain
        const scale = Math.min(
            this.canvas.width / img.width,
            this.canvas.height / img.height
        );
        
        const x = (this.canvas.width - img.width * scale) / 2;
        const y = (this.canvas.height - img.height * scale) / 2;

        this.ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }

    /**
     * Retourne le nombre total de frames
     */
    get frameCount() {
        return this.images.length;
    }
}

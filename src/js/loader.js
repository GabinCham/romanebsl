/**
 * Gestionnaire de l'écran de chargement
 */

export class Loader {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        this.isHidden = false;
    }

    /**
     * Masque l'écran de chargement avec une transition
     */
    hide() {
        if (!this.element || this.isHidden) return;
        
        this.element.classList.add('hidden');
        this.isHidden = true;

        // Supprime du DOM après la transition
        setTimeout(() => {
            if (this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        }, 500);
    }

    /**
     * Met à jour le texte de chargement
     */
    setText(text) {
        if (!this.element) return;
        
        const textElement = this.element.querySelector('.loading-text');
        if (textElement) {
            textElement.textContent = text;
        }
    }

    /**
     * Met à jour la progression (pour une barre de progression future)
     */
    setProgress(current, total) {
        const percentage = Math.round((current / total) * 100);
        this.setText(`Chargement... ${percentage}%`);
    }
}

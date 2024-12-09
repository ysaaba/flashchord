// VexChords - A JavaScript library for rendering guitar chord diagrams
// https://github.com/0xfe/vexchords
// MIT License

class Chord {
    constructor(container, config = {}) {
        this.container = container;
        this.config = {
            numStrings: 6,
            numFrets: 5,
            width: config.width || 100,
            height: config.height || 120,
            strokeWidth: config.strokeWidth || 1,
            showTuning: config.showTuning || false,
            stringSpacing: config.stringSpacing || 16,
            fretSpacing: config.fretSpacing || 16,
            stringWidth: config.stringWidth || 1,
            fretWidth: config.fretWidth || 1,
            fontFamily: config.fontFamily || 'Arial',
            fontSize: config.fontSize || 12,
            defaultColor: config.defaultColor || '#666'
        };
    }

    draw(chord) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', this.config.width);
        svg.setAttribute('height', this.config.height);
        svg.style.backgroundColor = 'white';

        // Calculate positions
        const xStart = 20;
        const yStart = 20;
        const width = this.config.width - 40;
        const height = this.config.height - 40;

        // Draw strings
        for (let i = 0; i < this.config.numStrings; i++) {
            const x = xStart + (i * (width / (this.config.numStrings - 1)));
            this.drawLine(svg, x, yStart, x, yStart + height);
        }

        // Draw frets
        for (let i = 0; i <= this.config.numFrets; i++) {
            const y = yStart + (i * (height / this.config.numFrets));
            this.drawLine(svg, xStart, y, xStart + width, y);
        }

        // Draw dots for finger positions
        chord.frets.forEach((fret, stringIndex) => {
            if (fret === -1) {
                // Draw X for muted string
                this.drawX(svg, xStart + (stringIndex * (width / (this.config.numStrings - 1))), yStart - 10);
            } else if (fret === 0) {
                // Draw O for open string
                this.drawO(svg, xStart + (stringIndex * (width / (this.config.numStrings - 1))), yStart - 10);
            } else {
                // Draw dot for fretted position
                const x = xStart + (stringIndex * (width / (this.config.numStrings - 1)));
                const y = yStart + ((fret - 0.5) * (height / this.config.numFrets));
                this.drawDot(svg, x, y);
            }
        });

        this.container.appendChild(svg);
    }

    drawLine(svg, x1, y1, x2, y2) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', this.config.defaultColor);
        line.setAttribute('stroke-width', this.config.stringWidth);
        svg.appendChild(line);
    }

    drawDot(svg, x, y) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', 5);
        circle.setAttribute('fill', this.config.defaultColor);
        svg.appendChild(circle);
    }

    drawX(svg, x, y) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x - 4);
        text.setAttribute('y', y);
        text.setAttribute('font-family', this.config.fontFamily);
        text.setAttribute('font-size', this.config.fontSize);
        text.setAttribute('fill', this.config.defaultColor);
        text.textContent = 'x';
        svg.appendChild(text);
    }

    drawO(svg, x, y) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x - 4);
        text.setAttribute('y', y);
        text.setAttribute('font-family', this.config.fontFamily);
        text.setAttribute('font-size', this.config.fontSize);
        text.setAttribute('fill', this.config.defaultColor);
        text.textContent = 'o';
        svg.appendChild(text);
    }
} 
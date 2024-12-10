// VexChords - A JavaScript library for rendering guitar chord diagrams.
// Copyright Mohit Muthanna Cheppudira 2020 <mohit@muthanna.com>
// https://github.com/0xfe/vexchords

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.vexchords = {}));
}(this, (function (exports) {
  'use strict';

  class ChordBox {
    constructor(sel, params = {}) {
      this.sel = sel;
      this.params = {
        width: params.width || 100,
        height: params.height || 120,
        numStrings: params.numStrings || 6,
        numFrets: params.numFrets || 5,
        showTuning: params.showTuning || false,
        defaultColor: params.defaultColor || '#666',
        bgColor: params.bgColor || '#FFF',
        strokeColor: params.strokeColor || '#666',
        textColor: params.textColor || '#666',
        stringColor: params.stringColor || '#666',
        fretColor: params.fretColor || '#666',
        labelColor: params.labelColor || '#666',
        fontFamily: params.fontFamily || 'Arial',
        fontSize: params.fontSize || 12,
        fontWeight: params.fontWeight || 'normal',
        fontStyle: params.fontStyle || 'normal',
        labelWeight: params.labelWeight || 'normal',
        strokeWidth: params.strokeWidth || 0.5,
        circleFillStyleColor: params.circleFillStyleColor || '#000',
        circleRadius: params.circleRadius || 5,
        dotText: params.dotText || {
          fontSize: Math.max((params.fontSize || 12) * 1.5, 16),
          fontWeight: 'bold',
          fontFamily: 'Arial'
        }
      };

      // Create canvas with high DPI support
      const dpr = window.devicePixelRatio || 1;
      this.canvas = document.createElement('canvas');
      
      // Set display size
      this.canvas.style.width = this.params.width + 'px';
      this.canvas.style.height = this.params.height + 'px';
      
      // Set actual size in memory
      this.canvas.width = this.params.width * dpr;
      this.canvas.height = this.params.height * dpr;
      
      // Get context and scale
      this.ctx = this.canvas.getContext('2d');
      this.ctx.scale(dpr, dpr);

      // Clear the canvas
      this.ctx.fillStyle = this.params.bgColor;
      this.ctx.fillRect(0, 0, this.params.width, this.params.height);

      const container = typeof this.sel === 'string' 
        ? document.querySelector(this.sel)
        : this.sel;

      if (container) {
        container.appendChild(this.canvas);
      }
    }

    draw(chord) {
      const ctx = this.ctx;
      const p = this.params;

      // Clear canvas
      ctx.fillStyle = p.bgColor;
      ctx.fillRect(0, 0, p.width, p.height);

      // Calculate spacing with more room for tuning labels
      const spacing = {
        string: (p.width * 0.75) / (p.numStrings - 1),
        fret: (p.height * 0.65) / p.numFrets,
        xstart: p.width * 0.15,
        ystart: p.height * 0.2
      };

      // Draw strings
      ctx.beginPath();
      ctx.strokeStyle = p.stringColor;
      ctx.lineWidth = p.stringWidth;
      for (let i = 0; i < p.numStrings; i++) {
        const x = spacing.xstart + (spacing.string * i);
        ctx.moveTo(x, spacing.ystart);
        ctx.lineTo(x, spacing.ystart + (spacing.fret * p.numFrets));
      }
      ctx.stroke();

      // Draw frets
      ctx.beginPath();
      ctx.strokeStyle = p.fretColor;
      ctx.lineWidth = p.fretWidth;
      for (let i = 0; i <= p.numFrets; i++) {
        const y = spacing.ystart + (spacing.fret * i);
        ctx.moveTo(spacing.xstart, y);
        ctx.lineTo(spacing.xstart + (spacing.string * (p.numStrings - 1)), y);
      }
      ctx.stroke();

      // Draw position number if specified
      if (chord.position && chord.position > 0) {
        ctx.font = `${p.fontSize}px ${p.fontFamily}`;
        ctx.fillStyle = p.textColor;
        ctx.textAlign = 'right';
        ctx.fillText(chord.position.toString(), spacing.xstart - 5, spacing.ystart + (p.fontSize / 2));
      }

      // Draw barres
      if (chord.barres) {
        ctx.beginPath();
        ctx.strokeStyle = p.strokeColor;
        ctx.lineWidth = p.circleRadius * 1.5;
        ctx.lineCap = 'round';
        
        chord.barres.forEach(barre => {
          const fromString = p.numStrings - barre.fromString;
          const toString = p.numStrings - barre.toString;
          const x1 = spacing.xstart + (spacing.string * fromString);
          const x2 = spacing.xstart + (spacing.string * toString);
          const y = spacing.ystart + (spacing.fret * (barre.fret - 0.5));
          
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
        });
        ctx.stroke();
      }

      // Draw chord dots
      chord.chord.forEach(dot => {
        const string = p.numStrings - dot[0];
        const fret = dot[1];
        const x = spacing.xstart + (spacing.string * string);

        if (fret === 'x') {
          // Draw X for muted string
          ctx.font = `${p.fontSize * 1.5}px ${p.fontFamily}`;
          ctx.fillStyle = p.textColor;
          ctx.textAlign = 'center';
          ctx.fillText('×', x, spacing.ystart - (p.fontSize * 0.5));
        } else if (fret === 0) {
          // Draw O for open string
          ctx.beginPath();
          ctx.arc(x, spacing.ystart - (p.fontSize * 0.5), p.circleRadius * 0.8, 0, 2 * Math.PI);
          ctx.strokeStyle = p.strokeColor;
          ctx.lineWidth = p.strokeWidth;
          ctx.stroke();
        } else {
          // Draw filled circle for fretted note
          const y = spacing.ystart + (spacing.fret * (fret - 0.5));
          ctx.beginPath();
          ctx.arc(x, y, p.circleRadius * 1.4, 0, 2 * Math.PI);
          ctx.fillStyle = p.circleFillStyleColor;
          ctx.fill();

          // Draw finger number if specified
          if (dot[2]) {
            ctx.font = `${p.dotText.fontWeight} ${p.dotText.fontSize}px ${p.dotText.fontFamily}`;
            ctx.fillStyle = '#FFF';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(dot[2].toString(), x, y);
          }
        }
      });

      // Draw tuning labels
      if (p.showTuning && chord.tuning) {
        ctx.font = `${p.fontSize}px ${p.fontFamily}`;
        ctx.fillStyle = p.textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        
        for (let i = 0; i < p.numStrings; i++) {
          const x = spacing.xstart + (spacing.string * i);
          const y = p.height * 0.98;
          ctx.fillText(chord.tuning[5-i], x, y);
        }
      }
    }
  }

  // Export the ChordBox class and a helper draw function
  exports.ChordBox = ChordBox;
  exports.draw = function(sel, chord, options) {
    new ChordBox(sel, options).draw(chord);
  };

})));
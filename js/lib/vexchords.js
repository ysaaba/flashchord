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
        showTuning: params.showTuning || false,
        defaultColor: params.defaultColor || '#666',
        bgColor: params.bgColor || '#fff',
        strokeColor: params.strokeColor || '#666',
        textColor: params.textColor || '#666',
        stringColor: params.stringColor || '#666',
        fretColor: params.fretColor || '#666',
        labelColor: params.labelColor || '#666',
        fontFamily: params.fontFamily || 'Arial',
        fontSize: params.fontSize || 12,
        fontWeight: params.fontWeight || 'normal',
        fontStyle: params.fontStyle || 'normal',
        stringWidth: params.stringWidth || 1,
        fretWidth: params.fretWidth || 1,
        strokeWidth: params.strokeWidth || 1
      };

      this.canvas = document.createElement('canvas');
      this.canvas.width = this.params.width;
      this.canvas.height = this.params.height;
      this.ctx = this.canvas.getContext('2d');
      
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

      // Set up coordinates
      const stringSpacing = p.width / 7;
      const fretSpacing = (p.height - p.fontSize - 10) / 6;
      const xStart = stringSpacing;
      const yStart = p.fontSize + 10;

      // Draw strings
      ctx.beginPath();
      ctx.lineWidth = p.stringWidth;
      ctx.strokeStyle = p.stringColor;
      for (let i = 0; i < 6; i++) {
        const x = xStart + (i * stringSpacing);
        ctx.moveTo(x, yStart);
        ctx.lineTo(x, p.height - 10);
      }
      ctx.stroke();

      // Draw frets
      ctx.beginPath();
      ctx.lineWidth = p.fretWidth;
      ctx.strokeStyle = p.fretColor;
      for (let i = 0; i < 6; i++) {
        const y = yStart + (i * fretSpacing);
        ctx.moveTo(xStart, y);
        ctx.lineTo(p.width - stringSpacing, y);
      }
      ctx.stroke();

      // Draw position and barres
      if (chord.position && chord.position > 0) {
        ctx.font = `${p.fontSize}px ${p.fontFamily}`;
        ctx.fillStyle = p.textColor;
        ctx.fillText(chord.position, 2, yStart + fretSpacing);
      }

      if (chord.barres) {
        chord.barres.forEach(barre => {
          const y = yStart + ((barre.fret - 1 + 0.5) * fretSpacing);
          const fromString = 6 - barre.fromString;
          const toString = 6 - barre.toString;
          const x1 = xStart + (fromString * stringSpacing);
          const x2 = xStart + (toString * stringSpacing);
          
          ctx.beginPath();
          ctx.lineWidth = p.strokeWidth * 3;
          ctx.strokeStyle = p.strokeColor;
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.stroke();
        });
      }

      // Draw fingerings
      chord.chord.forEach(([string, fret, finger]) => {
        const x = xStart + ((6 - string) * stringSpacing);
        
        if (fret === 'x') {
          ctx.font = `${p.fontSize * 1.5}px ${p.fontFamily}`;
          ctx.fillStyle = p.textColor;
          ctx.fillText('×', x - 5, yStart - 5);
        } else if (fret === 0) {
          ctx.beginPath();
          ctx.lineWidth = p.strokeWidth;
          ctx.strokeStyle = p.strokeColor;
          ctx.arc(x, yStart - 5, 4, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          const y = yStart + ((fret - 1 + 0.5) * fretSpacing);
          
          ctx.beginPath();
          ctx.fillStyle = p.defaultColor;
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();

          if (finger) {
            ctx.font = `${p.fontSize}px ${p.fontFamily}`;
            ctx.fillStyle = '#fff';
            ctx.fillText(finger, x - 3, y + 4);
          }
        }
      });
    }
  }

  exports.ChordBox = ChordBox;
  exports.draw = function(sel, chord, options) {
    new ChordBox(sel, options).draw(chord);
  };

})));
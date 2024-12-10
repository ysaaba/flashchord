/**
 * VexChords v1.2.0
 * Copyright (c) 2023 Mohit Muthanna Cheppudira 
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Vex = global.Vex || {}));
}(this, (function (exports) { 'use strict';

  function drawChord(sel, chord_data, params) {
    var default_params = {
      width: 100,
      height: 120,
      strokeColor: '#666',
      bgColor: '#fff',
      labelColor: '#666',
      fontFamily: 'Arial',
      fontSize: 12,
      fontWeight: '',
      fontStyle: '',
      labelWeight: '',
      stringWidth: 1,
      fretWidth: 1,
      fretCount: 4,
      showTuning: true,
      defaultColor: '#666'
    };

    var params = Object.assign({}, default_params, params);
    var elem = document.querySelector(sel);
    if (!elem) return;

    var canvas = document.createElement('canvas');
    canvas.width = params.width * 2; // For retina displays
    canvas.height = params.height * 2;
    canvas.style.width = params.width + 'px';
    canvas.style.height = params.height + 'px';
    elem.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    ctx.scale(2, 2); // For retina displays
    ctx.fillStyle = params.bgColor;
    ctx.fillRect(0, 0, params.width, params.height);

    var stringCount = 6;
    var fretCount = params.fretCount;
    var stringSpacing = (params.width * 0.75) / (stringCount - 1);
    var fretSpacing = (params.height * 0.75) / fretCount;
    var stringStart = params.width * 0.125;
    var fretStart = params.height * 0.15;

    // Draw strings
    ctx.beginPath();
    ctx.lineWidth = params.stringWidth;
    ctx.strokeStyle = params.stringColor || params.defaultColor;
    for (var i = 0; i < stringCount; i++) {
      var x = stringStart + (i * stringSpacing);
      ctx.moveTo(x, fretStart);
      ctx.lineTo(x, fretStart + (fretCount * fretSpacing));
    }
    ctx.stroke();

    // Draw frets
    ctx.beginPath();
    ctx.lineWidth = params.fretWidth;
    ctx.strokeStyle = params.fretColor || params.defaultColor;
    for (var i = 0; i <= fretCount; i++) {
      var y = fretStart + (i * fretSpacing);
      ctx.moveTo(stringStart, y);
      ctx.lineTo(stringStart + ((stringCount - 1) * stringSpacing), y);
    }
    ctx.stroke();

    // Draw position markers
    if (chord_data.position && chord_data.position > 1) {
      ctx.font = params.fontSize + 'px ' + params.fontFamily;
      ctx.fillStyle = params.labelColor || params.defaultColor;
      ctx.textAlign = 'right';
      ctx.fillText(chord_data.position, stringStart - 6, fretStart + fretSpacing - 2);
    }

    // Draw tuning
    if (params.showTuning && chord_data.tuning) {
      ctx.font = (params.fontSize * 0.8) + 'px ' + params.fontFamily;
      ctx.fillStyle = params.labelColor || params.defaultColor;
      ctx.textAlign = 'center';
      for (var i = 0; i < Math.min(stringCount, chord_data.tuning.length); i++) {
        var x = stringStart + (i * stringSpacing);
        ctx.fillText(chord_data.tuning[i], x, params.height - 2);
      }
    }

    // Draw chord
    if (chord_data.chord) {
      var dotRadius = params.width / 32;
      chord_data.chord.forEach(function(dot) {
        var string = dot[0] - 1;
        var fret = dot[1];
        var x = stringStart + (string * stringSpacing);

        if (fret === 'x' || fret === 0) {
          ctx.font = 'bold ' + params.fontSize + 'px ' + params.fontFamily;
          ctx.fillStyle = params.strokeColor || params.defaultColor;
          ctx.textAlign = 'center';
          ctx.fillText(fret === 'x' ? '×' : 'o', x, fretStart - 3);
        } else {
          var y = fretStart + ((fret - 0.5) * fretSpacing);
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = params.strokeColor || params.defaultColor;
          ctx.fill();
        }
      });
    }

    // Draw barres
    if (chord_data.barres) {
      chord_data.barres.forEach(function(barre) {
        var startString = barre.fromString - 1;
        var endString = barre.toString - 1;
        var fret = barre.fret;
        var y = fretStart + ((fret - 0.5) * fretSpacing);
        var startX = stringStart + (startString * stringSpacing);
        var endX = stringStart + (endString * stringSpacing);
        
        ctx.beginPath();
        ctx.lineWidth = dotRadius * 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = params.strokeColor || params.defaultColor;
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.stroke();
      });
    }
  }

  exports.Chords = { draw: drawChord };

})));
// Function to draw chord diagram
function drawChordDiagram(chordName, elementId) {
    if (typeof vexchords === 'undefined') {
        console.error('VexChords library not loaded');
        return;
    }
    
    const container = document.getElementById(elementId);
    if (!container) return;
    
    // Clear previous diagram
    container.innerHTML = '';
    
    // Get chord data
    const chordData = getChordData(chordName);
    if (!chordData) return;
    
    const isNextChord = elementId.includes('next');
    
    // Create new chord box with exact options matching the demo
    const chord = new vexchords.ChordBox(container, {
        width: isNextChord ? 100 : 200,
        height: isNextChord ? 120 : 220,
        circleRadius: isNextChord ? 3 : 5,
        numStrings: 6,
        numFrets: 5,
        showTuning: true,
        defaultColor: '#666',
        bgColor: 'transparent',
        strokeColor: '#666',
        textColor: '#666',
        stringColor: '#666',
        fretColor: '#666',
        labelColor: '#666',
        fretWidth: 1.5,
        stringWidth: 1.5,
        fontFamily: 'Arial',
        fontSize: isNextChord ? 12 : 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        labelWeight: 'normal',
        topPadding: 20,
        bottomPadding: 20,
        dotText: {
            fontSize: isNextChord ? 9 : 13,
            fontWeight: 'normal',
            fontFamily: 'Arial'
        },
        tuning: ['E', 'A', 'D', 'G', 'B', 'E']
    });

    // Prepare chord data to match demo format
    const drawData = {
        chord: chordData.chord.map(([string, fret, label]) => {
            // Ensure proper formatting of chord dots
            if (fret === 'x' || fret === 0) {
                return [string, fret];
            }
            // If there's a label, make sure it's a string and trim it
            return [string, fret, label ? label.toString().trim() : ''];
        }),
        position: chordData.position || 0,
        barres: chordData.barres || [],
        tuning: ['E', 'A', 'D', 'G', 'B', 'E']
    };

    // Draw the chord
    chord.draw(drawData);

    // Add container styling to match demo
    container.style.cssText = `
        display: inline-block;
        padding: 10px;
        text-align: center;
        vertical-align: top;
        min-width: ${isNextChord ? '100px' : '200px'};
    `;
}

// Function to get chord data
function getChordData(chordName) {
    // Remove any HTML tags and extensions in parentheses
    chordName = chordName.replace(/<[^>]*>/g, '').replace(/\([^)]*\)/g, '');
    
    // Parse the chord name to get root and quality
    const match = chordName.match(/^([A-G][♯♭]?)(.*)$/);
    if (!match) return null;
    
    const [_, root, quality] = match;
    
    // Map of specific chord shapes
    const specificChords = {
        'C': {  // C Major
            chord: [[1, 0], [2, 1, '1'], [3, 0], [4, 2, '2'], [5, 3, '3'], [6, 'x']],
            position: 0,
            barres: []
        },
        'D': {  // D Major
            chord: [[1, 2, '2'], [2, 3, '3'], [3, 2, '1'], [4, 0, 'D'], [5, 'x'], [6, 'x']],
            position: 0,
            barres: []
        },
        'E': {  // E Major
            chord: [[1, 0, 'E'], [2, 0], [3, 1, '1'], [4, 2, '3'], [5, 2, '2'], [6, 0, 'E']],
            position: 0,
            barres: []
        },
        'G': {  // G Major
            chord: [[1, 3, '4'], [2, 3, '3'], [3, 0, 'G'], [4, 0], [5, 2, '1'], [6, 3, '2']],
            position: 0,
            barres: []
        },
        'A': {  // A Major
            chord: [[1, 0], [2, 2, '3'], [3, 2, '2'], [4, 2, '1'], [5, 0, 'A'], [6, 'x']],
            position: 0,
            barres: []
        },
        'Dm': {  // D Minor
            chord: [[1, 1, '1'], [2, 3, '3'], [3, 2, '2'], [4, 0, 'D'], [5, 'x'], [6, 'x']],
            position: 0,
            barres: []
        },
        'Em': {  // E Minor
            chord: [[1, 0], [2, 0], [3, 0], [4, 2, '3'], [5, 2, '2'], [6, 0, 'E']],
            position: 0,
            barres: []
        },
        'Am': {  // A Minor
            chord: [[1, 0], [2, 1, '1'], [3, 2, '3'], [4, 2, '2'], [5, 0, 'A'], [6, 'x']],
            position: 0,
            barres: []
        },
        'C7': {  // C7
            chord: [[1, 0], [2, 1, '1'], [3, 3, '3'], [4, 2, '2'], [5, 3, '4'], [6, 'x']],
            position: 0,
            barres: []
        },
        'D7': {  // D7
            chord: [[1, 2, '3'], [2, 1, '1'], [3, 2, '2'], [4, 0, 'D'], [5, 'x'], [6, 'x']],
            position: 0,
            barres: []
        },
        'E7': {  // E7
            chord: [[1, 0], [2, 3, '4'], [3, 1, '1'], [4, 0], [5, 2, '2'], [6, 0, 'E']],
            position: 0,
            barres: []
        },
        'G7': {  // G7
            chord: [
                [1, 1, '1'],
                [2, 0],
                [3, 0],
                [4, 0],
                [5, 2, '2'],
                [6, 3, '3']
            ],
            position: 0,
            barres: []
        },
        'A7': {  // A7
            chord: [[1, 0], [2, 2, '3'], [3, 0], [4, 2, '2'], [5, 0, 'A'], [6, 'x']],
            position: 0,
            barres: []
        },
        'Dm7': {  // Dm7
            chord: [[1, 1, '1'], [2, 1, '1'], [3, 2, '2'], [4, 0], [5, 'x'], [6, 'x']],
            position: 0,
            barres: []
        },
        'Em7': {  // Em7
            chord: [[1, 0], [2, 3, '3'], [3, 0], [4, 2, '2'], [5, 2, '1'], [6, 0]],
            position: 0,
            barres: []
        },
        'Am7': {  // Am7
            chord: [[1, 0], [2, 1, '1'], [3, 0], [4, 2, '2'], [5, 0], [6, 'x']],
            position: 0,
            barres: []
        },
        // E-shape barre chords
        'F': {  // F Major (E-shape)
            chord: [
                [1, 1, '1'],
                [2, 1, '1'],
                [3, 2, '2'],
                [4, 3, '3'],
                [5, 3, '4'],
                [6, 1, '1']
            ],
            position: 1,
            barres: [{fromString: 6, toString: 1, fret: 1}]
        },
        'Fm': {  // F Minor (Em-shape)
            chord: [[4, 3], [5, 3]],
            position: 1,
            barres: [{
                fromString: 6,
                toString: 1,
                fret: 1
            }]
        },
        'F7': {  // F7 (E7-shape)
            chord: [[2, 4], [3, 2], [5, 3]],
            position: 1,
            barres: [{
                fromString: 6,
                toString: 1,
                fret: 1
            }]
        },
        'Fm7': {  // Fm7 (Em7-shape)
            chord: [[2, 4], [5, 3]],
            position: 1,
            barres: [{
                fromString: 6,
                toString: 1,
                fret: 1
            }]
        },
        'Fmaj7': {  // FMaj7
            chord: [[1, 'x'], [2, 1], [3, 2], [4, 2], [5, 'x'], [6, 1]],
            position: 1
        },
        'Fdim': {  // Fdim
            chord: [[1, 'x'], [3, 2], [5, 'x'], [6, 2]],
            position: 1,
            barres: [{
                fromString: 4,
                toString: 2,
                fret: 1
            }]
        },
        'Fm7b5': {  // Fm7b5
            chord: [[1, 'x'], [2, 1], [3, 2], [4, 2], [5, 'x'], [6, 2]],
            position: 1
        },

        // A-shape barre chords
        'Bb': {  // Bb Major (A-shape)
            chord: [[2, 3], [3, 3], [4, 3], [6, 'x']],
            position: 1,
            barres: [{
                fromString: 5,
                toString: 1,
                fret: 1
            }]
        },
        'Bbm': {  // Bb Minor (Am-shape)
            chord: [[2, 2], [3, 3], [4, 3], [6, 'x']],
            position: 1,
            barres: [{
                fromString: 5,
                toString: 1,
                fret: 1
            }]
        },
        'Bb7': {  // Bb7 (A7-shape)
            chord: [[2, 3], [4, 3], [6, 'x']],
            position: 1,
            barres: [{
                fromString: 5,
                toString: 1,
                fret: 1
            }]
        },
        'Bbm7': {  // Bbm7 (Am7-shape)
            chord: [[2, 2], [4, 3], [6, 'x']],
            position: 1,
            barres: [{
                fromString: 5,
                toString: 1,
                fret: 1
            }]
        },
        'C6': {  // C6
            chord: [[1, 0], [2, 1, '1'], [3, 2, '2'], [4, 2, '3'], [5, 'x'], [6, 'x']],
            position: 0,
            barres: []
        },
        'Csus2': {  // Csus2
            chord: [[1, 0], [2, 3, '3'], [3, 0], [4, 3, '2'], [5, 3, '1'], [6, 'x']],
            position: 0,
            barres: []
        },
        'Csus4': {  // Csus4
            chord: [[1, 3, '3'], [2, 1, '1'], [3, 0], [4, 3, '4'], [5, 3, '2'], [6, 'x']],
            position: 0,
            barres: []
        },
        'C9': {  // C9
            chord: [[1, 3, '4'], [2, 1, '1'], [3, 2, '2'], [4, 2, '3'], [5, 3, '5'], [6, 'x']],
            position: 0,
            barres: []
        },
        'Cm9': {  // Cm9
            chord: [[1, 3, '3'], [2, 3, '4'], [3, 0], [4, 3, '2'], [5, 3, '1'], [6, 'x']],
            position: 0,
            barres: []
        },
        'F6': {  // F6 (E-shape)
            chord: [[1, 0], [2, 3], [3, 2], [4, 2], [5, 'x'], [6, 1]],
            position: 1,
            barres: [{
                fromString: 6,
                toString: 1,
                fret: 1
            }]
        },
        'Fsus2': {  // Fsus2 (E-shape)
            chord: [[3, 3], [4, 3], [5, 1]],
            position: 1,
            barres: [{
                fromString: 6,
                toString: 1,
                fret: 1
            }]
        },
        'Fsus4': {  // Fsus4 (E-shape)
            chord: [[3, 3], [4, 3], [5, 4]],
            position: 1,
            barres: [{
                fromString: 6,
                toString: 1,
                fret: 1
            }]
        },
        'F9': {  // F9 (E-shape)
            chord: [[1, 3], [2, 1], [3, 2], [4, 1], [5, 1], [6, 1]],
            position: 1
        },
        'Fm9': {  // Fm9 (Em-shape)
            chord: [[1, 3], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1]],
            position: 1
        },
        'F+': {  // F augmented
            chord: [[1, 'x'], [2, 3], [3, 2], [4, 1], [5, 'x'], [6, 1]],
            position: 1
        },
        'Bb6': {  // Bb6 (A-shape)
            chord: [[1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 'x']],
            position: 1,
            barres: [{
                fromString: 5,
                toString: 1,
                fret: 1
            }]
        },
        'Bbsus2': {  // Bbsus2 (A-shape)
            chord: [[1, 1], [2, 1], [3, 3], [4, 3], [5, 1], [6, 'x']],
            position: 1,
            barres: [{
                fromString: 5,
                toString: 1,
                fret: 1
            }]
        },
        'Bbsus4': {  // Bbsus4 (A-shape)
            chord: [[1, 1], [2, 1], [3, 3], [4, 3], [5, 4], [6, 'x']],
            position: 1,
            barres: [{
                fromString: 5,
                toString: 1,
                fret: 1
            }]
        },
        'Bb9': {  // Bb9 (A-shape)
            chord: [[1, 'x'], [2, 2], [3, 2], [4, 1], [5, 2], [6, 'x']],
            position: 1
        },
        'Bbm9': {  // Bbm9 (Am-shape)
            chord: [[1, 'x'], [2, 1], [3, 2], [4, 1], [5, 2], [6, 'x']],
            position: 1
        },
        'Bb+': {  // Bb augmented (A-shape)
            chord: [[1, 'x'], [2, 3], [3, 3], [4, 2], [5, 'x'], [6, 'x']],
            position: 1
        },
        'Bbmaj7': {  // Bbmaj7 (A-shape)
            chord: [[2, 3], [3, 2], [4, 3], [6, 'x']],
            position: 1,
            barres: [{
                fromString: 5,
                toString: 1,
                fret: 1
            }]
        },
        'Bb13': {  // Bb13 (A-shape)
            chord: [[1, 4], [2, 4], [3, 2], [4, 4], [5, 2], [6, 'x']],
            position: 1
        },
        'Bb7b9': {  // Bb7b9 (A-shape)
            chord: [[1, 'x'], [2, 1], [3, 2], [4, 1], [5, 2], [6, 'x']],
            position: 1
        },
        'Bb7#9': {  // Bb7#9 (A-shape)
            chord: [[1, 'x'], [2, 3], [3, 2], [4, 1], [5, 2], [6, 'x']],
            position: 1
        },
        'Bbm7b5': {  // Bbm7b5 (Am7b5-shape)
            chord: [[2, 2], [4, 2], [6, 'x']],
            position: 1,
            barres: [{
                fromString: 5,
                toString: 3,
                fret: 1
            }]
        },
        'Bbdim7': {  // Bbdim7
            chord: [[1, 'x'], [2, 1], [3, 2], [4, 1], [5, 2], [6, 'x']],
            position: 1
        },
        'C11': {  // C11
            chord: [[1, 0], [2, 1, '1'], [3, 1, '2'], [4, 2, '3'], [5, 3, '4'], [6, 'x']],
            position: 0,
            barres: []
        },
        'Cm11': {  // Cm11
            chord: [[1, 3, '3'], [2, 3, '4'], [3, 3, '2'], [4, 3, '1'], [5, 'x'], [6, 'x']],
            position: 0,
            barres: []
        },
        'C13': {  // C13
            chord: [[1, 2, '2'], [2, 3, '4'], [3, 2, '1'], [4, 3, '3'], [5, 'x'], [6, 'x']],
            position: 0,
            barres: []
        },
        'C6/9': {  // C6/9
            chord: [[1, 0], [2, 2, '2'], [3, 2, '3'], [4, 2, '4'], [5, 3, '1'], [6, 'x']],
            position: 0,
            barres: []
        },
        'C7sus4': {  // C7sus4
            chord: [[1, 0], [2, 1, '1'], [3, 3, '3'], [4, 3, '4'], [5, 3, '2'], [6, 'x']],
            position: 0,
            barres: []
        },
        'C7b5': {  // C7b5
            chord: [[1, 0], [2, 1, '1'], [3, 2, '2'], [4, 2, '3'], [5, 2, '4'], [6, 'x']],
            position: 0,
            barres: []
        },
        'C7#5': {  // C7#5 (C7aug)
            chord: [[1, 0], [2, 1, '1'], [3, 2, '2'], [4, 2, '3'], [5, 4, '4'], [6, 'x']],
            position: 0,
            barres: []
        },
        'C7b9': {  // C7b9
            chord: [[1, 1, '1'], [2, 1, '2'], [3, 3, '4'], [4, 2, '3'], [5, 'x'], [6, 'x']],
            position: 0,
            barres: []
        },
        'C7#9': {  // C7#9
            chord: [[1, 3, '4'], [2, 1, '1'], [3, 3, '3'], [4, 2, '2'], [5, 'x'], [6, 'x']],
            position: 0,
            barres: []
        },
        'Cadd9': {  // Cadd9
            chord: [[1, 3, '4'], [2, 1, '1'], [3, 0], [4, 2, '2'], [5, 3, '3'], [6, 'x']],
            position: 0,
            barres: []
        },
        'Cm(add9)': {  // Cm(add9)
            chord: [[1, 3, '3'], [2, 3, '4'], [3, 0], [4, 3, '2'], [5, 3, '1'], [6, 'x']],
            position: 0,
            barres: []
        },
        'Cmaj9': {  // Cmaj9
            chord: [[1, 0], [2, 2, '2'], [3, 0], [4, 2, '3'], [5, 3, '4'], [6, 'x']],
            position: 0,
            barres: []
        },
        'C5': {  // C5 (power chord)
            chord: [[1, 'x'], [2, 'x'], [3, 5, '3'], [4, 5, '2'], [5, 3, '1'], [6, 'x']],
            position: 0,
            barres: []
        },
        'C+': {  // C augmented
            chord: [[1, 'x'], [2, 1, '1'], [3, 1, '1'], [4, 2, '2'], [5, 3, '3'], [6, 'x']],
            position: 0,
            barres: []
        },
        'Cdim': {  // C diminished
            chord: [[1, 'x'], [2, 1, '1'], [3, 'x'], [4, 1, '2'], [5, 0], [6, 'x']],
            position: 0,
            barres: []
        },
        'Cmaj7': {  // C major 7
            chord: [[1, 0], [2, 0], [3, 0], [4, 2, '2'], [5, 3, '3'], [6, 'x']],
            position: 0,
            barres: []
        },
        'Cdim7': {  // C diminished 7
            chord: [[1, 'x'], [2, 1, '1'], [3, 2, '3'], [4, 1, '2'], [5, 2, '4'], [6, 'x']],
            position: 0,
            barres: []
        },
        'G9': {  // G9
            chord: [[1, 1, '1'], [2, 0], [3, 0], [4, 0], [5, 0], [6, 3, '3']],
            position: 0,
            barres: []
        }
    };

    // Position offsets for different roots
    const POSITIONS = {
        'E': {  // E-shape positions
            'F': 1, 'F#': 2, 'Gb': 2, 'G': 3, 'G#': 4, 'Ab': 4,
            'A': 5, 'A#': 6, 'Bb': 6, 'B': 7, 'C': 8, 'C#': 9,
            'Db': 9, 'D': 10, 'D#': 11, 'Eb': 11, 'E': 12
        },
        'A': {  // A-shape positions
            'A': 12, 'A#': 1, 'Bb': 1, 'B': 2, 'C': 3, 'C#': 4,
            'Db': 4, 'D': 5, 'D#': 6, 'Eb': 6, 'E': 7, 'F': 8,
            'F#': 9, 'Gb': 9, 'G': 10, 'G#': 11, 'Ab': 11
        }
    };

    // Try to get the specific chord first
    const chordKey = root + quality;
    if (specificChords[chordKey]) {
        return specificChords[chordKey];
    }

    // If no specific chord found, determine if it should be E-shape or A-shape
    let baseShape;
    let position;

    if (POSITIONS.E[root]) {
        // Use E-shape
        baseShape = quality === 'm' ? specificChords['Fm'] :
                   quality === '7' ? specificChords['F7'] :
                   quality === 'm7' ? specificChords['Fm7'] :
                   quality === 'maj7' ? specificChords['Fmaj7'] :
                   quality === 'dim' ? specificChords['Fdim'] :
                   quality === 'm7b5' ? specificChords['Fm7b5'] :
                   quality === '6' ? specificChords['F6'] :
                   quality === 'sus2' ? specificChords['Fsus2'] :
                   quality === 'sus4' ? specificChords['Fsus4'] :
                   quality === '9' ? specificChords['F9'] :
                   quality === 'm9' ? specificChords['Fm9'] :
                   quality === '+' ? specificChords['F+'] :
                   quality === '11' ? specificChords['F11'] :
                   quality === 'm11' ? specificChords['Fm11'] :
                   quality === '13' ? specificChords['F13'] :
                   quality === '6/9' ? specificChords['F6/9'] :
                   quality === '7sus4' ? specificChords['F7sus4'] :
                   quality === '7b5' ? specificChords['F7b5'] :
                   quality === '7#5' ? specificChords['F7#5'] :
                   quality === '7b9' ? specificChords['F7b9'] :
                   quality === '7#9' ? specificChords['F7#9'] :
                   quality === 'add9' ? specificChords['Fadd9'] :
                   quality === 'm(add9)' ? specificChords['Fm(add9)'] :
                   quality === 'maj9' ? specificChords['Fmaj9'] :
                   quality === '5' ? specificChords['F5'] :
                   specificChords['F'];  // Default to major
        position = POSITIONS.E[root];
    } else {
        // Use A-shape with similar pattern
        baseShape = quality === 'm' ? specificChords['Bbm'] :
                   quality === '7' ? specificChords['Bb7'] :
                   quality === 'm7' ? specificChords['Bbm7'] :
                   quality === '6' ? specificChords['Bb6'] :
                   quality === 'sus2' ? specificChords['Bbsus2'] :
                   quality === 'sus4' ? specificChords['Bbsus4'] :
                   quality === '9' ? specificChords['Bb9'] :
                   quality === 'm9' ? specificChords['Bbm9'] :
                   quality === '+' ? specificChords['Bb+'] :
                   quality === '11' ? specificChords['Bb11'] :
                   quality === 'm11' ? specificChords['Bbm11'] :
                   quality === '13' ? specificChords['Bb13'] :
                   quality === '6/9' ? specificChords['Bb6/9'] :
                   quality === '7sus4' ? specificChords['Bb7sus4'] :
                   quality === '7b5' ? specificChords['Bb7b5'] :
                   quality === '7#5' ? specificChords['Bb7#5'] :
                   quality === '7b9' ? specificChords['Bb7b9'] :
                   quality === '7#9' ? specificChords['Bb7#9'] :
                   quality === 'add9' ? specificChords['Bbadd9'] :
                   quality === 'm(add9)' ? specificChords['Bbm(add9)'] :
                   quality === 'maj9' ? specificChords['Bbmaj9'] :
                   quality === '5' ? specificChords['Bb5'] :
                   specificChords['Bb'];  // Default to major
        position = POSITIONS.A[root];
    }

    // Create new chord with adjusted position
    return {
        chord: baseShape.chord,
        position: position,
        barres: baseShape.barres
    };
}

// Function to get semitone offset from C
function getRootOffset(root) {
    const offsets = {
        'C': 0, 'C♯': 1, 'D♭': 1, 'D': 2, 'D♯': 3, 'E♭': 3,
        'E': 4, 'F': 5, 'F♯': 6, 'G♭': 6, 'G': 7, 'G♯': 8,
        'A♭': 8, 'A': 9, 'A♯': 10, 'B♭': 10, 'B': 11
    };
    return offsets[root] || 0;
}

// Function to transpose a chord shape
function transposeShape(shape, offset) {
    const newShape = JSON.parse(JSON.stringify(shape)); // Deep clone
    
    // Adjust position
    newShape.position = shape.position + offset;
    
    // Adjust position for playability
    if (newShape.position > 12) {
        newShape.position = newShape.position - 12;
    }
    
    // Make sure to preserve fingering labels when transposing
    newShape.chord = shape.chord.map(([string, fret, label]) => {
        if (fret === 'x' || fret === 0) return [string, fret];
        return [string, fret, label]; // Preserve the fingering label
    });
    
    return newShape;
} 
// Mapping of chord types to their fingerings
const chordDiagrams = {
    // Major chords
    'C': [[1, 'x'], [2, 3], [3, 2], [4, 0], [5, 1], [6, 0]],
    'C6': [[1, 'x'], [2, 3], [3, 2], [4, 2], [5, 1], [6, 0]],
    'Cmaj7': [[1, 'x'], [2, 3], [3, 2], [4, 0], [5, 0], [6, 0]],
    'C6/9': [[1, 'x'], [2, 3], [3, 2], [4, 2], [5, 3], [6, 0]],
    
    // Minor chords
    'Cm': [[1, 'x'], [2, 3], [3, 5], [4, 5], [5, 3], [6, 'x']],
    'Cm6': [[1, 'x'], [2, 3], [3, 5], [4, 5], [5, 5], [6, 'x']],
    'Cm7': [[1, 'x'], [2, 3], [3, 5], [4, 3], [5, 3], [6, 'x']],
    'Cm9': [[1, 'x'], [2, 3], [3, 5], [4, 3], [5, 3], [6, 3]],
    'Cm11': [[1, 'x'], [2, 3], [3, 3], [4, 3], [5, 3], [6, 1]],
    
    // Dominant chords
    'C7': [[1, 'x'], [2, 3], [3, 2], [4, 3], [5, 1], [6, 0]],
    'C9': [[1, 'x'], [2, 3], [3, 2], [4, 3], [5, 3], [6, 'x']],
    'C11': [[1, 'x'], [2, 3], [3, 3], [4, 3], [5, 3], [6, 'x']],
    'C13': [[1, 'x'], [2, 3], [3, 2], [4, 3], [5, 3], [6, 3]],
    
    // Diminished & Augmented
    'C°': [[1, 'x'], [2, 3], [3, 4], [4, 2], [5, 'x'], [6, 'x']],
    'C°7': [[1, 'x'], [2, 3], [3, 4], [4, 2], [5, 4], [6, 'x']],
    'Cm7♭5': [[1, 'x'], [2, 3], [3, 4], [4, 3], [5, 4], [6, 'x']],
    'C+': [[1, 'x'], [2, 3], [3, 2], [4, 1], [5, 1], [6, 'x']],
    
    // Sus chords
    'Csus2': [[1, 'x'], [2, 3], [3, 0], [4, 0], [5, 1], [6, 3]],
    'Csus4': [[1, 'x'], [2, 3], [3, 3], [4, 0], [5, 1], [6, 3]]
};

// Function to get diagram for a given chord
function getChordDiagram(chordName) {
    // Remove any HTML tags and extensions in parentheses
    chordName = chordName.replace(/<[^>]*>/g, '').replace(/\([^)]*\)/g, '');
    
    // Parse the chord name to get root and quality
    const match = chordName.match(/^([A-G][♯♭]?)(.*)$/);
    if (!match) return null;
    
    const [_, root, quality] = match;
    
    // Transpose the basic C chord diagram to the target root
    const baseDiagram = chordDiagrams[`C${quality || ''}`];
    if (!baseDiagram) {
        // If no exact match, try to find a simpler version
        if (quality.includes('7♭5')) return getChordDiagram(root + 'm7♭5');
        if (quality.includes('°7')) return getChordDiagram(root + '°7');
        if (quality.includes('°')) return getChordDiagram(root + '°');
        if (quality.includes('m')) return getChordDiagram(root + 'm');
        if (quality.includes('7')) return getChordDiagram(root + '7');
        return getChordDiagram(root); // fallback to major
    }
    
    const semitones = getSemitonesFromC(root);
    return transposeDiagram(baseDiagram, semitones);
}

// Function to transpose a diagram by number of semitones
function transposeDiagram(diagram, semitones) {
    return diagram.map(([string, fret]) => {
        if (fret === 'x') return [string, 'x'];
        return [string, fret + semitones];
    });
}

// Function to get number of semitones from C to target note
function getSemitonesFromC(note) {
    const semitones = {
        'C': 0, 'C♯': 1, 'D♭': 1, 'D': 2, 'D♯': 3, 'E♭': 3,
        'E': 4, 'F': 5, 'F♯': 6, 'G♭': 6, 'G': 7, 'G♯': 8,
        'A♭': 8, 'A': 9, 'A♯': 10, 'B♭': 10, 'B': 11
    };
    return semitones[note] || 0;
}

// Function to draw chord diagram
function drawChordDiagram(chordName, elementId, options = {}) {
    if (typeof Vex === 'undefined' || !Vex.Chords) {
        console.error('VexChords library not loaded');
        return;
    }
    
    const diagram = getChordDiagram(chordName);
    if (!diagram) return;
    
    // Clear previous diagram
    const container = document.getElementById(elementId);
    if (container) {
        container.innerHTML = '';
    }
    
    const defaultOptions = {
        width: elementId.includes('next') ? 100 : 200,
        height: elementId.includes('next') ? 120 : 240,
        showTuning: true,
        defaultColor: '#666',
        stringWidth: 1,
        fretWidth: 1,
        fontFamily: 'Arial',
        fontSize: elementId.includes('next') ? 12 : 16,
        fretCount: 5,
        strokeColor: '#666',
        stringColor: '#666',
        fretColor: '#666',
        labelColor: '#666'
    };
    
    try {
        Vex.Chords.draw(`#${elementId}`, {
            chord: diagram,
            position: 1,
            tuning: ['E', 'A', 'D', 'G', 'B', 'E']
        }, { ...defaultOptions, ...options });
    } catch (e) {
        console.error('Error drawing chord diagram:', e);
    }
} 
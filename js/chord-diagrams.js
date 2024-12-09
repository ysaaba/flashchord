// Chord diagram definitions
const chordDiagrams = {
    // Major chords
    'C': [[0, 1, 0, 2, 3, -1], [0, 1, 0, 2, 3, -1]],
    'G': [[3, 0, 0, 0, 2, 3], [3, 0, 0, 0, 2, 3]],
    'D': [[2, 3, 2, 0, -1, -1], [2, 3, 2, 0, -1, -1]],
    'A': [[0, 0, 2, 2, 2, 0], [0, 0, 2, 2, 2, 0]],
    'E': [[0, 2, 2, 1, 0, 0], [0, 2, 2, 1, 0, 0]],
    'F': [[1, 3, 3, 2, 1, 1], [1, 3, 3, 2, 1, 1]],
    'B': [[2, 4, 4, 4, 2, 2], [2, 4, 4, 4, 2, 2]],

    // Minor chords
    'Am': [[0, 0, 2, 2, 1, 0], [0, 0, 2, 2, 1, 0]],
    'Em': [[0, 2, 2, 0, 0, 0], [0, 2, 2, 0, 0, 0]],
    'Dm': [[1, 3, 2, 0, -1, -1], [1, 3, 2, 0, -1, -1]],
    'Bm': [[2, 4, 4, 4, 2, 2], [2, 4, 4, 4, 2, 2]],
    'F#m': [[2, 4, 4, 2, 2, 2], [2, 4, 4, 2, 2, 2]],
    'Gm': [[3, 5, 5, 3, 3, 3], [3, 5, 5, 3, 3, 3]],
    'Cm': [[3, 5, 5, 3, 3, 3], [3, 5, 5, 3, 3, 3]],

    // Dominant 7th chords
    'G7': [[3, 2, 0, 0, 0, 1], [3, 2, 0, 0, 0, 1]],
    'C7': [[0, 3, 2, 3, 1, 0], [0, 3, 2, 3, 1, 0]],
    'D7': [[2, 0, 2, 0, 2, 2], [2, 0, 2, 0, 2, 2]],
    'A7': [[0, 0, 2, 0, 2, 0], [0, 0, 2, 0, 2, 0]],
    'E7': [[0, 2, 0, 1, 0, 0], [0, 2, 0, 1, 0, 0]],
    'F7': [[1, 3, 1, 2, 1, 1], [1, 3, 1, 2, 1, 1]],
    'B7': [[2, 1, 2, 0, 2, 0], [2, 1, 2, 0, 2, 0]],

    // Major 7th chords
    'Cmaj7': [[0, 3, 2, 0, 0, 0], [0, 3, 2, 0, 0, 0]],
    'Gmaj7': [[3, 2, 0, 0, 0, 2], [3, 2, 0, 0, 0, 2]],
    'Dmaj7': [[2, 2, 2, 0, -1, -1], [2, 2, 2, 0, -1, -1]],
    'Amaj7': [[0, 0, 2, 1, 2, 0], [0, 0, 2, 1, 2, 0]],
    'Emaj7': [[0, 2, 1, 1, 0, 0], [0, 2, 1, 1, 0, 0]],
    'Fmaj7': [[1, 3, 2, 2, 1, 1], [1, 3, 2, 2, 1, 1]],
    'Bmaj7': [[2, 4, 3, 4, 2, 2], [2, 4, 3, 4, 2, 2]],

    // Minor 7th chords
    'Am7': [[0, 0, 2, 0, 1, 0], [0, 0, 2, 0, 1, 0]],
    'Em7': [[0, 2, 0, 0, 0, 0], [0, 2, 0, 0, 0, 0]],
    'Dm7': [[1, 3, 2, 0, 1, 1], [1, 3, 2, 0, 1, 1]],
    'Bm7': [[2, 4, 2, 4, 2, 2], [2, 4, 2, 4, 2, 2]],
    'F#m7': [[2, 4, 2, 2, 2, 2], [2, 4, 2, 2, 2, 2]],
    'Gm7': [[3, 5, 3, 3, 3, 3], [3, 5, 3, 3, 3, 3]],
    'Cm7': [[3, 5, 3, 3, 3, 3], [3, 5, 3, 3, 3, 3]],

    // Diminished chords
    'Cdim': [[3, 4, 5, 3, -1, -1], [3, 4, 5, 3, -1, -1]],
    'Gdim': [[3, 4, 5, 3, -1, -1], [3, 4, 5, 3, -1, -1]],
    'Ddim': [[1, 2, 3, 1, -1, -1], [1, 2, 3, 1, -1, -1]],
    'Adim': [[2, 3, 4, 2, -1, -1], [2, 3, 4, 2, -1, -1]],
    'Edim': [[1, 2, 3, 1, -1, -1], [1, 2, 3, 1, -1, -1]],
    'Fdim': [[1, 2, 3, 1, -1, -1], [1, 2, 3, 1, -1, -1]],
    'Bdim': [[2, 3, 4, 2, -1, -1], [2, 3, 4, 2, -1, -1]],

    // Augmented chords
    'Caug': [[0, 3, 2, 1, 1, -1], [0, 3, 2, 1, 1, -1]],
    'Gaug': [[3, 2, 1, 0, 0, 3], [3, 2, 1, 0, 0, 3]],
    'Daug': [[3, 2, 1, 0, -1, -1], [3, 2, 1, 0, -1, -1]],
    'Aaug': [[0, 3, 2, 1, -1, -1], [0, 3, 2, 1, -1, -1]],
    'Eaug': [[0, 3, 2, 1, 0, 0], [0, 3, 2, 1, 0, 0]],
    'Faug': [[1, 4, 3, 2, 2, -1], [1, 4, 3, 2, 2, -1]],
    'Baug': [[0, 3, 2, 1, -1, -1], [0, 3, 2, 1, -1, -1]],

    // Sus4 chords
    'Csus4': [[0, 3, 3, 0, 1, 3], [0, 3, 3, 0, 1, 3]],
    'Gsus4': [[3, 3, 0, 0, 1, 3], [3, 3, 0, 0, 1, 3]],
    'Dsus4': [[2, 3, 2, 0, -1, -1], [2, 3, 2, 0, -1, -1]],
    'Asus4': [[0, 0, 2, 2, 3, 0], [0, 0, 2, 2, 3, 0]],
    'Esus4': [[0, 2, 2, 2, 0, 0], [0, 2, 2, 2, 0, 0]],
    'Fsus4': [[1, 3, 3, 3, 1, 1], [1, 3, 3, 3, 1, 1]],
    'Bsus4': [[2, 4, 4, 4, 2, 2], [2, 4, 4, 4, 2, 2]]
};

// Function to render chord diagram
function renderChordDiagram(chordName, elementId) {
    console.log('Rendering chord diagram:', chordName, 'in element:', elementId);
    
    // Check if element exists
    const element = document.getElementById(elementId);
    if (!element) {
        console.error('Element not found:', elementId);
        return;
    }

    // Basic configuration that works reliably
    const config = {
        width: 150,
        height: 200,
        stringSpacing: 20,
        fretSpacing: 25,
        defaultColor: '#666',
        fontSize: 14
    };

    // Clear previous diagram
    element.innerHTML = '';

    // Parse the chord name to handle extensions and modifiers
    let baseName = chordName;
    // Remove HTML tags (like <sup> and <sub>)
    baseName = baseName.replace(/<[^>]*>/g, '');
    // Remove slash chord part
    baseName = baseName.split('/')[0];
    // Handle special symbols
    baseName = baseName.replace('°', 'dim').replace('+', 'aug');
    
    console.log('Looking up diagram for:', baseName);

    // Get the chord diagram data
    let diagramData = chordDiagrams[baseName];
    
    // If we don't have a specific diagram for this chord, try to find a simpler version
    if (!diagramData) {
        console.log('No diagram found for', baseName, ', trying to simplify');
        // Remove extensions (7, maj7, etc.)
        const simpleChord = baseName.replace(/7|maj7|min7|m7|dim7|aug7|sus4/, '');
        diagramData = chordDiagrams[simpleChord];
        console.log('Simplified to:', simpleChord, 'diagram found:', !!diagramData);
        
        // If still no diagram, default to C major
        if (!diagramData) {
            console.log('No diagram found for simplified chord, defaulting to C major');
            diagramData = chordDiagrams['C'];
        }
    }

    try {
        // Create the chord diagram
        console.log('Creating chord with config:', config);
        const chord = new Chord(element, config);
        
        // Add a class to show the container is active
        element.classList.add('has-diagram');
        
        // Draw the chord diagram
        chord.draw({
            frets: diagramData[0]
        });
        console.log('Chord diagram rendered successfully');
    } catch (error) {
        console.error('Error rendering chord diagram:', error);
        console.error('Error details:', error.message);
        console.error('Stack trace:', error.stack);
        
        // Add error message to the element
        element.innerHTML = `<div style="color: red; font-size: 12px;">Error: Could not render chord diagram</div>`;
    }
} 
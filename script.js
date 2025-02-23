let synth;
let soundfontURL = "https://hlr216.github.io/SynPhonic-website/Sax.sf2"; // Update filename if necessary

// Initialize FluidSynth
async function initSynth() {
    try {
        synth = await FluidSynth.load(soundfontURL); // Load the SoundFont
        console.log("FluidSynth initialized successfully!");
    } catch (error) {
        console.error("Failed to initialize FluidSynth:", error);
    }
}

// Function to play a note when a button is clicked
function playNote(note) {
    if (!synth) {
        console.error("Synth not initialized yet!");
        return;
    }

    let midiNote = noteToMIDI(note);
    synth.noteOn(0, midiNote, 100); // Channel 0, MIDI note, velocity 100
    console.log(`Playing: ${note} (MIDI: ${midiNote})`);
}

// Map note names to MIDI numbers
function noteToMIDI(note) {
    const noteMapping = {
        "C4": 60, "C#4": 61, "D4": 62, "D#4": 63,
        "E4": 64, "F4": 65, "F#4": 66, "G4": 67,
        "G#4": 68, "A4": 69, "A#4": 70, "B4": 71
    };
    return noteMapping[note] || 60;
}

// Attach event listeners once the page loads
document.addEventListener("DOMContentLoaded", () => {
    initSynth(); // Initialize the synthesizer

    document.querySelectorAll(".note-btn").forEach(button => {
        button.addEventListener("click", () => {
            playNote(button.dataset.note);
        });
    });
});

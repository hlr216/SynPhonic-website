let synth;
let soundfontURL = "https://yourusername.github.io/SynPhonic-website/your-soundfont.sf2"; // Update with correct path

// Load FluidSynth
async function initSynth() {
    synth = await FluidSynth.load(soundfontURL);
    console.log("FluidSynth initialized!");
}

// Function to play a note
function playNote(note) {
    if (synth) {
        let midiNote = noteToMIDI(note);
        synth.noteOn(0, midiNote, 100); // Channel 0, MIDI note, velocity 100
        console.log("Playing:", note);
    } else {
        console.error("Synth not initialized!");
    }
}

// Map note names to MIDI numbers
function noteToMIDI(note) {
    const noteMapping = {
        "C4": 60, "C#4": 61, "D4": 62, "D#4": 63,
        "E4": 64, "F4": 65, "F#4": 66, "G4": 67,
        "G#4": 68, "A4": 69, "A#4": 70, "B4": 71
    };
    return noteMapping[note] || 60; // Default to C4 if note not found
}

// Attach event listeners to buttons
document.addEventListener("DOMContentLoaded", () => {
    initSynth();
    document.querySelectorAll(".note-btn").forEach(button => {
        button.addEventListener("click", () => {
            playNote(button.dataset.note);
        });
    });
});

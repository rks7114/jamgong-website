// Web Audio API Supercomputing Facility Ambient Hum Simulator
// Generates a deep, high-fidelity ambient hum with slight rhythmic airflow filter sweeps.

class SupercomputingHumEngine {
  private audioCtx: AudioContext | null = null;
  private primaryOsc: OscillatorNode | null = null;
  private secondaryOsc: OscillatorNode | null = null;
  private noiseNode: AudioWorkletNode | ScriptProcessorNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private gainNode: GainNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private initialized = false;

  public isPlaying = false;

  constructor() {
    // Lazy initialization to comply with browser autoplay policies
  }

  public init() {
    if (this.initialized) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
      
      // Gain node for global master volume control
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
      this.gainNode.connect(this.audioCtx.destination);

      // 1. Primary Deep Sub-bass Hum (60 Hz representing pure server grid frequency)
      this.primaryOsc = this.audioCtx.createOscillator();
      this.primaryOsc.type = 'sine';
      this.primaryOsc.frequency.setValueAtTime(60, this.audioCtx.currentTime);

      const primaryGain = this.audioCtx.createGain();
      primaryGain.gain.setValueAtTime(0.04, this.audioCtx.currentTime); // very subtle
      this.primaryOsc.connect(primaryGain);
      primaryGain.connect(this.gainNode);

      // 2. Secondary Harmonic Grid Hum (120 Hz representing electric transformer hum)
      this.secondaryOsc = this.audioCtx.createOscillator();
      this.secondaryOsc.type = 'triangle'; // triangle gives some slight rich harmonics
      this.secondaryOsc.frequency.setValueAtTime(120, this.audioCtx.currentTime);

      const secondaryGain = this.audioCtx.createGain();
      secondaryGain.gain.setValueAtTime(0.015, this.audioCtx.currentTime); 
      this.secondaryOsc.connect(secondaryGain);
      secondaryGain.connect(this.gainNode);

      // 3. Airflow Simulator using a White Noise Generator + Lowpass Filter with active sweep
      // Using ScriptProcessorNode for maximum compatibility, fall back easily
      const bufferSize = 2 * this.audioCtx.sampleRate;
      const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoiseSource = this.audioCtx.createBufferSource();
      whiteNoiseSource.buffer = noiseBuffer;
      whiteNoiseSource.loop = true;

      // Low pass filter to replicate deep muffled air conditioning / datacenter ventilation fans
      this.filterNode = this.audioCtx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(180, this.audioCtx.currentTime);
      this.filterNode.Q.setValueAtTime(1.5, this.audioCtx.currentTime);

      const noiseGain = this.audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.02, this.audioCtx.currentTime);

      whiteNoiseSource.connect(this.filterNode);
      this.filterNode.connect(noiseGain);
      noiseGain.connect(this.gainNode);

      // 4. LFO (Low Frequency Oscillator) to modulate the filter cutoff and simulate dynamic computational load waves
      this.lfo = this.audioCtx.createOscillator();
      this.lfo.type = 'sine';
      this.lfo.frequency.setValueAtTime(0.12, this.audioCtx.currentTime); // ultra low rate (approx 8 seconds sweep)

      this.lfoGain = this.audioCtx.createGain();
      this.lfoGain.gain.setValueAtTime(45, this.audioCtx.currentTime); // sweeps cutoff frequency up and down by 45Hz

      this.lfo.connect(this.lfoGain);
      if (this.filterNode) {
        this.lfoGain.connect(this.filterNode.frequency);
      }

      // Start all sound generator nodes
      this.primaryOsc.start();
      this.secondaryOsc.start();
      whiteNoiseSource.start();
      this.lfo.start();

      this.initialized = true;
    } catch (e) {
      console.warn('Failed to initialize Web Audio API engine', e);
    }
  }

  public async start() {
    this.init();

    if (!this.audioCtx || !this.gainNode) return;

    if (this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }

    // Smooth ramp-in to prevent sharp clicks
    const now = this.audioCtx.currentTime;
    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
    this.gainNode.gain.linearRampToValueAtTime(1.0, now + 1.2);
    this.isPlaying = true;
  }

  public stop() {
    if (!this.audioCtx || !this.gainNode) return;

    // Smooth ramp-out to silence
    const now = this.audioCtx.currentTime;
    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
    this.gainNode.gain.linearRampToValueAtTime(0, now + 0.8);
    this.isPlaying = false;
  }
}

export const audioHumEngine = new SupercomputingHumEngine();

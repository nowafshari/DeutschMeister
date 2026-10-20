import confetti from 'canvas-confetti';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private speechRate: number = 0.9;
  private cachedGermanVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    // AudioContext will be initialized on first user interaction
    if (typeof window !== 'undefined') {
      window.speechSynthesis?.addEventListener('voiceschanged', () => {
        this.initGermanVoice();
      });
      this.initGermanVoice();
    }
  }

  private initGermanVoice() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const voices = window.speechSynthesis.getVoices();
    this.cachedGermanVoice = 
      voices.find(v => v.lang === 'de-DE' || v.lang === 'de_DE') ||
      voices.find(v => v.lang.startsWith('de')) ||
      voices.find(v => v.name.toLowerCase().includes('german') || v.name.toLowerCase().includes('deutsch')) ||
      null;
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public setSpeechRate(rate: number) {
    this.speechRate = rate;
  }

  public speak(text: string, customRate?: number): Promise<void> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel(); // Stop any pending speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = customRate ?? this.speechRate;
      utterance.pitch = 1.0;

      if (!this.cachedGermanVoice) {
        this.initGermanVoice();
      }
      if (this.cachedGermanVoice) {
        utterance.voice = this.cachedGermanVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      window.speechSynthesis.speak(utterance);
    });
  }

  public playSuccessSound() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.08);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + index * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + index * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + index * 0.08);
      osc.stop(ctx.currentTime + index * 0.08 + 0.25);
    });
  }

  public playErrorSound() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(130, ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.25);
  }

  public playClickSound() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  }

  public playLevelUpSound() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    // Fanfare: C4, G4, C5, E5, G5, C6
    const melody = [261.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    melody.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

      gain.gain.setValueAtTime(0.01, ctx.currentTime + idx * 0.1);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + idx * 0.1 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.1 + (idx === melody.length - 1 ? 0.6 : 0.2));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.1);
      osc.stop(ctx.currentTime + idx * 0.1 + 0.6);
    });

    this.triggerConfetti();
  }

  public playStreakSound() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    [440, 554.37, 659.25, 880].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);

      gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.07 + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.07);
      osc.stop(ctx.currentTime + idx * 0.07 + 0.2);
    });
  }

  public triggerConfetti() {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6'],
      });
    } catch {
      // ignore
    }
  }
}

export const soundEngine = new SoundEngine();

// Web Audio API synthesized Temple Bell & Sacred Chime
// Does not depend on external MP3s - works 100% offline & without network latency

export const playTempleBell = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;
    
    // Fundamental frequencies for a rich bronze temple bell (Ghanta)
    const frequencies = [587.33, 880, 1174.66, 1760, 2349.32]; // D5, A5, D6, A6, D7
    const gains = [0.6, 0.4, 0.25, 0.15, 0.08];

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Slightly detune to create acoustic shimmering interference like real bronze
      osc.frequency.setValueAtTime(freq + (idx * 1.5), now);
      osc.type = idx === 0 ? 'sine' : 'triangle';

      gain.gain.setValueAtTime(gains[idx], now);
      // Bell strike has immediate attack, long lingering acoustic decay
      gain.gain.exponentialRampToValueAtTime(0.0001, now + (3.0 + idx * 0.4));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 4.5);
    });
  } catch (err) {
    console.warn('Audio chime notice:', err);
  }
};

export const playDiyaGlowSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.3); // G5 gentle uplift

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.9);
  } catch (e) {
    // Ignore audio context if restricted
  }
};

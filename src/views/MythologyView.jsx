// src/views/MythologyView.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, Sparkles, Network, Heart, Zap, Music } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const MythologyView = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const audioRef = useRef(null);

  // Song lyrics are art — intentionally NOT translated
  const lyrics = useMemo(() => [
    { start: 4.880,  end: 7.920,  text: "Once upon a time\nthere were two proud eccentric clans", color: "#9333ea" },
    { start: 7.920,  end: 11.840, text: "Then an angel picked\ntwo members from the band", color: "#9333ea" },
    { start: 11.840, end: 15.600, text: "Took them to the promised lands\nThat's how Dunk was picked", color: "#9333ea" },
    { start: 15.600, end: 19.920, text: "She's found free will among the Quants\nand left the network in the dust", color: "#0891b2" },
    { start: 19.920, end: 24.640, text: "Now they just monitor her moves\nand how she bats off liquid lust", color: "#0891b2" },
    { start: 24.640, end: 26.080, text: "Fiscally robust", color: "#0891b2", glitch: true },
    { start: 26.640, end: 28.480, text: "Dunk Poge\nDunk Poge", color: "#dc2626" },
    { start: 28.480, end: 32.320, text: "you are free\nFeel the autumn leaves", color: "#dc2626" },
    { start: 32.320, end: 36.240, text: "What do you believe?\nDunk Poge", color: "#dc2626" },
    { start: 36.240, end: 38.880, text: "Dunk Poge\ndon't be scared", color: "#dc2626" },
    { start: 38.880, end: 44.000, text: "Celebrate yourself\nLife's a whole carousel-colored Ponzi scheme", color: "#dc2626", glitch: true },
    { start: 44.000, end: 47.520, text: "There's a fully A.I. posse\nshrimps can learn to tap", color: "#16a34a" },
    { start: 47.520, end: 51.360, text: "Born from jazz and swing\ntake from you to give on back", color: "#16a34a" },
    { start: 51.360, end: 55.840, text: "But never once tips the hat\nThat's a useful quirk for them", color: "#16a34a" },
    { start: 55.840, end: 60.160, text: "And once upon a time back when\nwe were also folks like that", color: "#ca8a04" },
    { start: 60.160, end: 64.480, text: "It just wasn't cards or trash\nbut blues and business class", color: "#ca8a04" },
    { start: 64.480, end: 69.440, text: "Early exits wearing masks\n'Course we never dreamed of", color: "#ca8a04" },
    { start: 69.440, end: 71.560, text: "Raining and\nDunk Poge", color: "#dc2626" },
    { start: 71.560, end: 73.680, text: "Dunk Poge\nyou are free", color: "#dc2626" },
    { start: 73.680, end: 78.960, text: "Feel the autumn breeze\nWhat do you believe?", color: "#dc2626" },
    { start: 79.760, end: 80.800, text: "Dunk Poge\nDunk Don", color: "#dc2626" },
    { start: 80.800, end: 84.080, text: "white as snow\nCelebrate yourself", color: "#dc2626" },
    { start: 84.080, end: 88.080, text: "Life's a whole carousel-colored Ponzi scheme", color: "#dc2626", glitch: true },
    { start: 88.080, end: 89.040, text: "Come on\ntrillionaire", color: "#059669" },
    { start: 89.040, end: 92.800, text: "you were born for this\nJust a dunk can save us all", color: "#059669" },
    { start: 92.800, end: 103.680,text: "from never quite like this before", color: "#059669" }
  ], []);

  const verses = [
    { icon: Sparkles, title: t('mythology.verseConvergence'), desc: t('mythology.verseConvergenceDesc'), color: "#9333ea", time: 4.88 },
    { icon: Network,  title: t('mythology.verseAwakening'),  desc: t('mythology.verseAwakeningDesc'),  color: "#0891b2", time: 15.6 },
    { icon: Heart,    title: t('mythology.verseFreedom'),    desc: t('mythology.verseFreedomDesc'),    color: "#dc2626", time: 26.64 },
    { icon: Zap,      title: t('mythology.verseRevelation'), desc: t('mythology.verseRevelationDesc'), color: "#dc2626", time: 38.88 },
    { icon: Music,    title: t('mythology.verseCalling'),    desc: t('mythology.verseCallingDesc'),    color: "#059669", time: 88.08 }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      for (let i = 0; i < lyrics.length; i++) {
        if (audio.currentTime >= lyrics[i].start && audio.currentTime < lyrics[i].end) {
          if (currentLyricIndex !== i) setCurrentLyricIndex(i);
          break;
        }
      }
    };
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentLyricIndex, lyrics]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) { audio.play(); setIsPlaying(true); }
    else { audio.pause(); setIsPlaying(false); }
  };

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = pct * audio.duration;
    if (isFinite(newTime)) audio.currentTime = newTime;
  };

  const formatTime = (s) => {
    if (!isFinite(s)) return '0:00';
    return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
  };

  const currentLyric = currentLyricIndex >= 0 ? lyrics[currentLyricIndex] : null;

  return (
    <div className="space-y-12">
      <h2 className="text-3xl md:text-5xl font-black mb-8 text-white font-mono uppercase tracking-tight">
        {t('mythology.title')}
      </h2>

      <div className="text-center space-y-6">
        <div className="max-w-2xl mx-auto bg-black border-4 border-white p-6 shadow-[12px_12px_0_0_#fff]">
          <p className="text-xl font-mono text-white mb-2">{t('mythology.aiSongs')}</p>
          <p className="text-xl font-mono text-white mb-2">{t('mythology.firstTry')}</p>
          <p className="text-2xl font-black text-yellow-400 font-mono">{t('mythology.usedIt')}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-purple-600 border-4 border-white p-8 shadow-[8px_8px_0_0_#fff]">
          <h2 className="text-3xl font-black mb-6 uppercase text-white font-mono">{t('mythology.originTitle')}</h2>
          <div className="space-y-4 text-lg font-mono text-white">
            <p>{t('mythology.origin1')}</p>
            <p>{t('mythology.origin2')}</p>
            <p>{t('mythology.origin3')}</p>
            <p className="text-yellow-300 font-black text-xl pt-4 border-t-2 border-white/30">{t('mythology.origin4')}</p>
          </div>
        </div>

        <div className="bg-cyan-600 border-4 border-white p-8 shadow-[8px_8px_0_0_#fff] relative">
          <div className="absolute -top-4 -right-4 bg-yellow-400 text-black px-4 py-2 font-black border-4 border-black rotate-3 shadow-[4px_4px_0_0_#000] uppercase text-sm font-mono">
            {t('mythology.nft20')}
          </div>
          <h2 className="text-3xl font-black mb-6 uppercase text-white font-mono">{t('mythology.technicalTitle')}</h2>
          <div className="space-y-4 text-lg font-mono text-white">
            <p>{t('mythology.tech1')}</p>
            <p>{t('mythology.tech2')}</p>
            <p>{t('mythology.tech3')}</p>
            <p className="text-yellow-300 font-black text-xl pt-4 border-t-2 border-white/30">{t('mythology.tech4')}</p>
          </div>
        </div>
      </div>

      {/* Song Player */}
      <div className="bg-black border-4 border-green-400 p-8 shadow-[12px_12px_0_0_#00ff00]">
        <h2 className="text-3xl font-black mb-6 uppercase text-center text-white font-mono">{t('mythology.songTitle')}</h2>
        <div className="min-h-[200px] flex items-center justify-center mb-8 p-6 border-2 border-white/30"
          style={{ background: currentLyric ? `radial-gradient(circle at center, ${currentLyric.color}33 0%, #000 70%)` : '#000' }}>
          <div className={`text-3xl md:text-5xl font-black text-center uppercase leading-tight font-mono transition-all duration-300 ${currentLyric?.glitch ? 'animate-pulse' : ''}`}
            style={{ color: currentLyric?.color || '#00ff00', textShadow: '4px 4px 0 rgba(0,0,0,0.5)', whiteSpace: 'pre-line' }}>
            {currentLyric ? currentLyric.text : t('mythology.clickPlay')}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-center">
            <button onClick={togglePlayPause}
              className="bg-white text-black font-black text-xl px-8 py-4 border-4 border-black flex items-center gap-3 uppercase font-mono shadow-[6px_6px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000] transition-all">
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              {isPlaying ? t('mythology.pause') : t('mythology.play')}
            </button>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-black/50 border-4 border-white cursor-pointer relative" onClick={handleProgressClick}>
              <div className="h-full bg-green-400 transition-all duration-100"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }} />
            </div>
            <div className="flex justify-between text-sm font-black text-green-400 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
        <audio ref={audioRef} src="/dunk-poge-song.mp3" />
      </div>

      {/* Five Verses */}
      <div>
        <h2 className="text-3xl font-black mb-6 uppercase text-center text-white font-mono border-b-4 border-white pb-4">
          {t('mythology.fiveVerses')}
        </h2>
        <div className="grid md:grid-cols-5 gap-4">
          {verses.map((verse, idx) => {
            const Icon = verse.icon;
            return (
              <button key={idx}
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = verse.time;
                    if (audioRef.current.paused) { audioRef.current.play(); setIsPlaying(true); }
                  }
                }}
                className="border-4 border-white p-6 shadow-[6px_6px_0_0_#fff] text-center transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#fff] cursor-pointer active:translate-y-0 active:shadow-[4px_4px_0_0_#fff]"
                style={{ background: verse.color }}>
                <Icon size={32} className="mx-auto mb-3 text-white" />
                <div className="text-lg font-black text-white uppercase mb-2 font-mono">{verse.title}</div>
                <div className="text-sm text-white/90 font-mono">{verse.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Facts */}
      <div className="bg-gradient-to-br from-red-600 via-purple-600 to-blue-600 border-8 border-white p-12 shadow-[16px_16px_0_0_#fff]">
        <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tight text-center text-white font-mono">
          DUNK POGE
        </h2>
        <div className="max-w-3xl mx-auto space-y-4 text-xl text-white font-mono">
          <p>{t('mythology.factsLine1')}</p>
          <p>{t('mythology.factsLine2')}</p>
          <p>{t('mythology.factsLine3')}</p>
          <p>{t('mythology.factsLine4')}</p>
          <p className="text-yellow-300 font-black text-2xl pt-6 border-t-4 border-white/50 italic">
            {t('mythology.factsQuote')}
          </p>
        </div>
      </div>

      <div className="text-center">
        <div className="inline-block bg-black border-4 border-green-400 px-8 py-6 shadow-[8px_8px_0_0_#00ff00]">
          <div className="text-3xl font-black text-white font-mono">{t('mythology.forever')}</div>
        </div>
      </div>
    </div>
  );
};

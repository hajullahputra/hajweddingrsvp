"use client";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const VIDEO_ID   = "DlQLybLvvAk";
const SONG_TITLE = "Kau Tercipta";
const SONG_ARTIST = "Lah Ahmad";

export default function MusicPlayer() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const playerRef     = useRef<any>(null);
  const hasPlayedRef  = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ready,   setReady]   = useState(false);

  useEffect(() => {
    const initPlayer = () => {
      if (!containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          loop: 1,
          playlist: VIDEO_ID,
          rel: 0,
        },
        events: {
          onReady: (e: any) => {
            setReady(true);
            e.target.playVideo();
          },
          onStateChange: (e: any) => {
            const isPlaying = e.data === window.YT.PlayerState.PLAYING;
            if (isPlaying) hasPlayedRef.current = true;
            setPlaying(isPlaying);
          },
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      if (!document.getElementById("yt-iframe-api")) {
        const tag = document.createElement("script");
        tag.id  = "yt-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => { playerRef.current?.destroy(); };
  }, []);

  // Fallback: play on first user interaction if browser blocked autoplay
  useEffect(() => {
    if (!ready) return;
    const tryPlay = () => {
      if (!hasPlayedRef.current && playerRef.current) {
        playerRef.current.playVideo();
        hasPlayedRef.current = true;
      }
      document.removeEventListener("click",      tryPlay);
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("keydown",    tryPlay);
    };
    document.addEventListener("click",      tryPlay);
    document.addEventListener("touchstart", tryPlay);
    document.addEventListener("keydown",    tryPlay);
    return () => {
      document.removeEventListener("click",      tryPlay);
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("keydown",    tryPlay);
    };
  }, [ready]);

  const toggle = () => {
    if (!ready || !playerRef.current) return;
    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  return (
    <>
      {/* Hidden YouTube player — off-screen */}
      <div style={{ position: "fixed", top: -999, left: -999, width: 1, height: 1, overflow: "hidden", pointerEvents: "none" }}>
        <div ref={containerRef} />
      </div>

      {/* Floating control button */}
      <button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        style={{
          position: "fixed",
          bottom: 70,
          left: 20,
          zIndex: 60,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "rgba(253,248,243,.95)",
          border: "1px solid var(--gold-light)",
          boxShadow: "0 2px 12px rgba(44,41,38,.12)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          cursor: ready ? "pointer" : "default",
          backdropFilter: "blur(8px)",
          transition: "transform .15s ease",
          opacity: ready ? 1 : 0.45,
          padding: 0,
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="2" y="2" width="4" height="10" rx="1" fill="var(--gold)"/>
            <rect x="8" y="2" width="4" height="10" rx="1" fill="var(--gold)"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 2 L12 7 L3 12 Z" fill="var(--gold)"/>
          </svg>
        )}

        {/* Animated equaliser bars when playing */}
        {playing && (
          <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 7 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 2, borderRadius: 1, background: "var(--gold)",
                height: i === 1 ? 7 : 4,
                animation: `musicBar .7s ease-in-out ${i * 0.15}s infinite alternate`,
              }} />
            ))}
          </div>
        )}
      </button>

      {/* Song info tooltip — visible while playing */}
      <div style={{
        position: "fixed",
        bottom: 122,
        left: 14,
        zIndex: 60,
        background: "rgba(253,248,243,.95)",
        border: "1px solid var(--border)",
        borderRadius: 8,
        padding: "6px 10px",
        pointerEvents: "none",
        opacity: playing ? 1 : 0,
        transition: "opacity .3s ease",
        backdropFilter: "blur(8px)",
        boxShadow: "0 2px 10px rgba(44,41,38,.1)",
      }}>
        <p style={{ fontSize: 10, color: "var(--charcoal)", fontWeight: 400, whiteSpace: "nowrap" }}>
          {SONG_TITLE}
        </p>
        <p style={{ fontSize: 9, color: "var(--warm-gray)", letterSpacing: ".06em" }}>
          {SONG_ARTIST}
        </p>
      </div>

      <style>{`
        @keyframes musicBar {
          from { transform: scaleY(0.35); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </>
  );
}

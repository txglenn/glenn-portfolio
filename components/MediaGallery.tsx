"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── PHOTO GALLERY ─────────────────────────────────────────────────────────────
// Add image paths to this array. Put photos in /public/media/gallery/
const PHOTOS: { src: string; alt: string }[] = [
  // { src: "/media/gallery/photo1.jpg", alt: "River surfing on the San Marcos" },
  // { src: "/media/gallery/photo2.jpg", alt: "Wakeboarding on the lake" },
  // { src: "/media/gallery/photo3.jpg", alt: "Personal training at THRC" },
  // { src: "/media/gallery/photo4.jpg", alt: "Texas Water Safari training" },
  // { src: "/media/gallery/photo5.jpg", alt: "Hill Country zipline guiding" },
];

// ── VIDEO SHOWCASE ────────────────────────────────────────────────────────────
// Add local video paths (/public/media/videos/clip.mp4) or YouTube embed IDs.
// For YouTube: set type: "youtube" and src to the video ID (e.g. "dQw4w9WgXcQ")
// For local:   set type: "local"   and src to the /public path
const VIDEOS: { src: string; type: "local" | "youtube"; title: string }[] = [
  // { type: "local",   src: "/media/videos/surf-clip.mp4",    title: "River Surf Session" },
  // { type: "youtube", src: "YOUTUBE_VIDEO_ID_HERE",           title: "Wake Team Competition" },
  // { type: "local",   src: "/media/videos/training-clip.mp4", title: "Training Highlight" },
];

// Auto-advance interval for photo carousel (ms)
const PHOTO_INTERVAL = 4500;

function PhotoCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + PHOTOS.length) % PHOTOS.length);
  }, []);

  useEffect(() => {
    if (PHOTOS.length <= 1) return;
    timerRef.current = setInterval(() => advance(1), PHOTO_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [advance]);

  const resetTimer = (dir: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    advance(dir);
    timerRef.current = setInterval(() => advance(1), PHOTO_INTERVAL);
  };

  if (PHOTOS.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-sm text-gray-600">
        Add photos to <code className="mx-1 text-accent/70">public/media/gallery/</code> and
        register them in <code className="mx-1 text-accent/70">MediaGallery.tsx</code>
      </div>
    );
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "60%" : "-60%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? "-60%" : "60%", opacity: 0 }),
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-black/40" style={{ aspectRatio: "16/9" }}>
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.img
          key={index}
          src={PHOTOS[index].src}
          alt={PHOTOS[index].alt}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* Prev / Next */}
      {PHOTOS.length > 1 && (
        <>
          <button
            onClick={() => resetTimer(-1)}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
          >
            ‹
          </button>
          <button
            onClick={() => resetTimer(1)}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
          >
            ›
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                aria-label={`Go to photo ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-5 bg-white" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-8 pt-6">
        <p className="text-sm text-white/80">{PHOTOS[index].alt}</p>
      </div>
    </div>
  );
}

function VideoShowcase() {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const goTo = useCallback((i: number) => {
    setCurrent(i % VIDEOS.length);
  }, []);

  // Auto-advance when local video ends
  const handleEnded = useCallback(() => {
    goTo(current + 1);
  }, [current, goTo]);

  if (VIDEOS.length === 0) {
    return (
      <div className="flex h-56 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-sm text-gray-600">
        Add videos to <code className="mx-1 text-accent/70">public/media/videos/</code> and
        register them in <code className="mx-1 text-accent/70">MediaGallery.tsx</code>
      </div>
    );
  }

  const clip = VIDEOS[current];

  return (
    <div>
      {/* Video player */}
      <div className="overflow-hidden rounded-2xl bg-black" style={{ aspectRatio: "16/9" }}>
        {clip.type === "local" ? (
          <video
            ref={videoRef}
            key={clip.src}
            src={clip.src}
            onEnded={handleEnded}
            autoPlay
            controls
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <iframe
            key={clip.src}
            src={`https://www.youtube.com/embed/${clip.src}?autoplay=1&enablejsapi=1`}
            title={clip.title}
            allow="autoplay; fullscreen"
            allowFullScreen
            className="h-full w-full border-0"
          />
        )}
      </div>

      {/* Playlist strip */}
      {VIDEOS.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {VIDEOS.map((v, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                i === current
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-white/[0.1] text-gray-500 hover:border-accent/40 hover:text-gray-300"
              }`}
            >
              {v.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MediaGallery() {
  return (
    <section id="media" className="px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            In Action
          </p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Photos & Videos
          </h2>
        </motion.div>

        <div className="flex flex-col gap-14">
          {/* Photo carousel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">
              Gallery
            </h3>
            <PhotoCarousel />
          </motion.div>

          {/* Video showcase */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">
              Videos
            </h3>
            <VideoShowcase />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

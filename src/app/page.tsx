"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const taglines = [
  "Satyaku kudarmakan, darmaku kubaktikan",
  "Dimana bumi dipijak, disitu langit dijunjung",
];



function TypingText() {
  const [text, setText] = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTagline = `"${taglines[taglineIndex]}"`;
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentTagline.substring(0, text.length + 1);
        setText(nextText);

        if (nextText === currentTagline) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        const nextText = currentTagline.substring(0, text.length - 1);
        setText(nextText);

        if (nextText === "") {
          setIsDeleting(false);
          setTaglineIndex((prev) => (prev + 1) % taglines.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, taglineIndex]);

  return (
    <span className="min-h-[1.5em]">
      {text}
      <span className="ml-0.5 inline-block w-[3px] animate-pulse font-bold">|</span>
    </span>
  );
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => setHeroImages(data.images))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (heroImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages]);

  return (
    <div className="min-h-screen bg-white text-stone-900">
      {/* Header */}
      <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl">
        <div className="flex items-center justify-between rounded-full border border-stone-200 bg-white/90 px-1 py-2 shadow-lg backdrop-blur-md sm:px-1.5">
          <Link href="#top" className="flex items-center gap-2">
            <Image
              src="/assets/logo-diporani.png"
              alt="Logo DIPORANI"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="text-sm font-extrabold tracking-wider text-stone-900">
              DIPORANI
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="#tentang"
              className="rounded-full px-4 py-2 text-sm font-bold text-stone-700 transition-colors hover:bg-amber-100 hover:text-amber-900"
            >
              Tentang
            </Link>
            <Link
              href="#kontak"
              className="rounded-full px-4 py-2 text-sm font-bold text-stone-700 transition-colors hover:bg-amber-100 hover:text-amber-900"
            >
              Kontak
            </Link>
          </nav>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6l-12 12" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
        {open && (
          <nav className="mt-2 flex flex-col gap-1 rounded-2xl border border-stone-200 bg-white/95 p-2 shadow-lg backdrop-blur-md md:hidden">
            <Link
              href="#tentang"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-bold text-stone-700 hover:bg-amber-100"
            >
              Tentang
            </Link>
            <Link
              href="#kontak"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-bold text-stone-700 hover:bg-amber-100"
            >
              Kontak
            </Link>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
          {/* Background Image Slideshow */}
          {heroImages.length > 0 ? (
            heroImages.map((img, index) => (
              <div
                key={img}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
                style={{
                  backgroundImage: `url('${img}')`,
                  opacity: index === currentImage ? 1 : 0,
                }}
              />
            ))
          ) : (
            <div className="absolute inset-0 bg-stone-800" />
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-20 text-center sm:px-6">
            <Image
              src="/assets/logo-diporani.png"
              alt="Logo DIPORANI"
              width={120}
              height={120}
              className="mx-auto mb-6 h-24 w-24 object-contain sm:h-28 sm:w-28"
            />
            <h1 className="text-5xl font-black tracking-widest text-white sm:text-7xl md:text-8xl">
              DIPORANI
            </h1>
            <p className="mt-3 text-lg font-medium text-amber-100 sm:text-xl">
              Pramuka Penegak SMAN 1 Kasihan
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-amber-100/90 sm:text-lg">
              <TypingText />
            </p>
            {/* <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="#tentang"
                className="rounded-md bg-amber-700 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-amber-800"
              >
                Hubungi Kami
              </Link>
              <Link
                href="#kontak"
                className="rounded-md border-2 border-white/60 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                Lihat Kontak
              </Link>
            </div> */}
          </div>
        </section>

        {/* About Us */}
        <section id="tentang" className="mx-auto max-w-5xl px-4 py-20 sm:px-6 min-h-screen flex flex-col justify-center">
          <h2 className="text-center text-3xl font-bold text-amber-900 sm:text-4xl">
            Tentang Diporani
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-amber-700" />

          <div className="mx-auto mt-10 max-w-4xl text-base leading-relaxed text-stone-700 sm:text-lg text-justify">
            <p>
              Diporani adalah satuan pramuka di{" "}
              <strong className="font-semibold text-amber-900">SMAN 1 Kasihan</strong>{" "}
              dengan nomor gugus depan{" "}
              <strong className="font-semibold text-amber-900">03.089 - 03.090</strong>{" "}
              yang bergerak di bidang pendidikan karakter dan kepemimpinan. Organisasi ini
              dibentuk pada tahun{" "}
              <strong className="font-semibold text-amber-900">1978</strong> dengan tujuan
              memberikan wadah bagi siswa untuk mengembangkan keterampilan, kemandirian, dan
              rasa tanggung jawab. Kami rutin mengadakan latihan setiap{" "}
              <strong className="font-semibold text-amber-900">Jumat</strong> yang mencakup
              berbagai kegiatan seperti tali-temali, navigasi, pertolongan pertama, dan
              kegiatan sosial. Anggota Diporani berasal dari berbagai tingkat, mulai dari{" "}
              <strong className="font-semibold text-amber-900">Penegak</strong> hingga{" "}
              <strong className="font-semibold text-amber-900">Penegak Laksana</strong>.
              Kami percaya bahwa pendidikan kepramukaan bukan hanya tentang keterampilan
              teknis, tetapi juga tentang membentuk karakter yang disiplin, saling
              menghormati, dan peduli terhadap sesama.
            </p>
          </div>
        </section>

        {/* Kontak */}
        <section id="kontak" className="border-t border-stone-200 bg-stone-900 text-white min-h-screen flex flex-col justify-center">
          <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
            <h2 className="text-center text-3xl font-bold sm:text-4xl">Kontak</h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-amber-500" />

            <div className="mx-auto mt-10 max-w-2xl space-y-6 text-center">
              <div>
                <p className="text-sm uppercase tracking-wider text-stone-400">Email</p>
                <a
                  href="mailto:diporanitirto@gmail.com"
                  className="mt-1 block text-lg text-amber-300 underline-offset-4 hover:underline"
                >
                  diporanitirto@gmail.com
                </a>
              </div>

              <div>
                <p className="text-sm uppercase tracking-wider text-stone-400">Instagram</p>
                <a
                  href="https://www.instagram.com/diporani.tirto/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-lg text-amber-300 underline-offset-4 hover:underline"
                >
                  @diporani.tirto
                </a>
              </div>

              <div>
                <p className="text-sm uppercase tracking-wider text-stone-400">Lokasi</p>
                <p className="mt-1 text-lg text-stone-300">
                  Jl. Bugisan Selatan, Kec. Kasihan, Kab. Bantul, Prov. D.I. Yogyakarta
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-stone-900 py-6">
        <p className="text-center text-xs text-stone-500">
          &copy; {new Date().getFullYear()} DIPORANI, Pramuka Penegak SMAN 1 Kasihan
        </p>
      </footer>
    </div>
  );
}

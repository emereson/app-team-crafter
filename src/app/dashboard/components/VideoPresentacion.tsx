"use client";
import { Modal, ModalContent } from "@heroui/react";
import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import Image from "next/image";
import { useVideoStore } from "@/stores/videoPresentacion.store";

interface Props {
  onOpenChange: (i: boolean) => void;
  isOpen: boolean;
}

export default function VideoPresentacion({ onOpenChange, isOpen }: Props) {
  const setWatched = useVideoStore((s) => s.setWatched);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePlayVideo = async () => {
    if (isAnimating || isPlaying) return;

    try {
      setWatched();
      setIsAnimating(true);
      setTimeout(() => {
        setIsPlaying(true);
        setIsAnimating(false);
      }, 500);
    } catch (error) {
      console.error("Error al reproducir video:", error);
      setIsAnimating(false);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="xl"
      placement="center"
    >
      <ModalContent className={`w-full p-1  bg-[#FC68B9]`}>
        <article
          className="w-full max-w-[800px]  relative rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer shadow-xl shadow-pink-200"
          onClick={handlePlayVideo}
        >
          <div
            className={`w-full transition-all duration-500 ease-in-out ${
              isAnimating
                ? "opacity-0 scale-110 transform"
                : isPlaying
                ? "opacity-0 scale-110 transform pointer-events-none"
                : "opacity-100 scale-100"
            }`}
          >
            <VideoPlayer
              hlsUrl="https://vz-96e543ae-f21.b-cdn.net/6d25523f-e92d-426f-9554-5feefe04d959/playlist.m3u8"
              mode="poster"
            />
          </div>

          <button
            className={`w-14 absolute z-10 transition-all duration-300 ease-in-out transform hover:scale-110 ${
              isAnimating
                ? "opacity-0 scale-150"
                : isPlaying
                ? "opacity-0 scale-150 pointer-events-none"
                : "opacity-100 scale-100"
            }`}
            onClick={handlePlayVideo}
            disabled={isAnimating || isPlaying}
          >
            <Image
              src={"/icons/playVideo.svg"}
              alt="reproducir"
              width={100}
              height={100}
            />
          </button>

          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              isPlaying
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {isPlaying && (
              <VideoPlayer hlsUrl="https://vz-96e543ae-f21.b-cdn.net/6d25523f-e92d-426f-9554-5feefe04d959/playlist.m3u8" />
            )}
          </div>

          {isAnimating && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFB4DF]"></div>
            </div>
          )}
        </article>
      </ModalContent>
    </Modal>
  );
}

import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  hlsUrl: string;
  autoPlay?: boolean;
}

export default function VideoPlayer({
  hlsUrl,
  autoPlay = true,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current || !hlsUrl) return;

    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });

      hls.loadSource(hlsUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) {
          video.play().catch((error) => {
            console.log("Auto-play prevented:", error);
          });
        }
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          console.error("HLS Error:", data);
        }
      });

      // Cleanup
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari native HLS support
      video.src = hlsUrl;

      video.addEventListener("loadedmetadata", () => {
        if (autoPlay) {
          video.play().catch((error) => {
            console.log("Auto-play prevented:", error);
          });
        }
      });
    }
  }, [hlsUrl, autoPlay]);

  return (
    <video
      ref={videoRef}
      controls
      className="w-full h-full object-contain rounded-2xl"
      playsInline
      preload="metadata"
    />
  );
}

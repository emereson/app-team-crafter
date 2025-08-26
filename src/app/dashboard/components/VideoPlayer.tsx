import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  hlsUrl: string;
  autoPlay?: boolean;
  showControls?: boolean;
  mode?: "video" | "poster"; // "video" = normal, "poster" = solo playsInline
}

export default function VideoPlayer({
  hlsUrl,
  autoPlay = true,
  showControls = true,
  mode = "video",
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
        if (mode === "video" && autoPlay) {
          video
            .play()
            .catch((error) => console.log("Auto-play prevented:", error));
        }
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) console.error("HLS Error:", data);
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsUrl;
      video.addEventListener("loadedmetadata", () => {
        if (mode === "video" && autoPlay) {
          video
            .play()
            .catch((error) => console.log("Auto-play prevented:", error));
        }
      });
    }
  }, [hlsUrl, autoPlay, mode]);

  return (
    <video
      ref={videoRef}
      controls={mode === "video" ? showControls : false}
      className="w-full h-auto object-contain rounded-2xl"
      playsInline
      preload="metadata"
    />
  );
}

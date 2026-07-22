"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Volume2, Play, Pause, SkipForward, SkipBack } from "lucide-react";

interface Step {
  stepNumber: number;
  text: string;
  imageUrl: string;
  audioUrl?: string;
}

interface TutorialStepsProps {
  title: string;
  steps: Step[];
}

export default function TutorialSteps({ title, steps }: TutorialStepsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Khởi tạo Media Session API để điều khiển âm thanh dưới nền
  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: `Bước ${steps[currentStep].stepNumber}`,
        artist: title,
        album: "Hướng dẫn công nghệ",
        artwork: [
          {
            src: "https://placehold.co/512x512/1d4ed8/ffffff?text=Audio",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      });

      navigator.mediaSession.setActionHandler("play", () => {
        audioRef.current?.play();
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        audioRef.current?.pause();
      });
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        handlePrev();
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        handleNext();
      });
    }
  }, [currentStep, title, steps]);

  useEffect(() => {
    // Khi đổi bước, nếu đang phát thì phát luôn âm thanh của bước mới
    if (audioRef.current) {
      audioRef.current.src = steps[currentStep].audioUrl || "";
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
    
    // Tự động cuộn trang tới bước hiện tại
    const element = document.getElementById(`step-${currentStep}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentStep]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Đảm bảo source đúng trước khi phát
      if (audioRef.current.src !== steps[currentStep].audioUrl) {
         audioRef.current.src = steps[currentStep].audioUrl || "";
      }
      audioRef.current.play().catch(e => console.error(e));
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setIsPlaying(true); // Tự động phát khi chuyển bước
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setIsPlaying(true);
    }
  };

  return (
    <section>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b-4 border-primary-200 pb-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Hướng dẫn Từng Bước
        </h2>

        {/* Nút điều khiển âm thanh lớn */}
        <div className="bg-primary-50 p-4 rounded-3xl border-2 border-primary-200 flex items-center gap-4">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="p-4 rounded-full bg-white text-primary-700 disabled:opacity-50 active:scale-95 transition-transform border border-primary-100 shadow-sm"
          >
            <SkipBack className="w-8 h-8" />
          </button>
          
          <button
            onClick={togglePlay}
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-primary-700 text-white font-bold text-2xl active:scale-95 transition-transform shadow-md"
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Volume2 className="w-8 h-8" />}
            {isPlaying ? "Tạm dừng" : "Nghe hướng dẫn"}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="p-4 rounded-full bg-white text-primary-700 disabled:opacity-50 active:scale-95 transition-transform border border-primary-100 shadow-sm"
          >
            <SkipForward className="w-8 h-8" />
          </button>
        </div>
      </div>

      <audio 
        ref={audioRef} 
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="space-y-12">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          return (
            <div
              id={`step-${index}`}
              key={step.stepNumber}
              className={`rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 transition-all duration-500 border-2 ${
                isActive 
                  ? "bg-blue-50 shadow-lg border-primary-500 scale-[1.02]" 
                  : "bg-white shadow-sm border-gray-100 opacity-70"
              }`}
              onClick={() => {
                setCurrentStep(index);
                // setIsPlaying(false);
              }}
            >
              {/* Phần Hình Ảnh */}
              <div className="w-full md:w-1/2 rounded-2xl overflow-hidden border-2 border-gray-200 flex-shrink-0 bg-white">
                <Image
                  src={step.imageUrl}
                  alt={`Bước ${step.stepNumber}`}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  unoptimized
                />
              </div>

              {/* Phần Chữ */}
              <div className="w-full md:w-1/2 flex flex-col justify-center cursor-pointer">
                <div className="flex items-center gap-4 mb-6">
                  <span className={`inline-block font-bold text-2xl py-2 px-6 rounded-full ${
                    isActive ? "bg-primary-600 text-white shadow-md" : "bg-gray-200 text-gray-700"
                  }`}>
                    Bước {step.stepNumber}
                  </span>
                  {isActive && isPlaying && (
                    <span className="text-primary-600 animate-pulse flex items-center gap-2 text-xl font-bold">
                      <Volume2 className="w-6 h-6" /> Đang đọc...
                    </span>
                  )}
                </div>
                <p className={`text-2xl md:text-3xl font-medium leading-relaxed ${
                  isActive ? "text-gray-900" : "text-gray-500"
                }`}>
                  {step.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

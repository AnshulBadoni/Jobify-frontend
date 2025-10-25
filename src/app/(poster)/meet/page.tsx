"use client";
import { useState, useEffect, useRef } from "react";
import {
    Mic,
    MicOff,
    Video,
    VideoOff,
    PhoneOff,
    Send,
    SkipForward,
    MessageSquare,
} from "lucide-react";
// import { vids } from "../../../../collections";

export default function Interview() {
    const [micOn, setMicOn] = useState(false);
    const [videoOn, setVideoOn] = useState(false);
    const [showQA, setShowQA] = useState(true);

    const [questions, setQuestions] = useState<string[]>([
        "Tell me about yourself.",
        "Why are you interested in this role?",
        "Describe a challenging project you worked on.",
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<{ q: string; a: string }[]>([]);
    const [input, setInput] = useState("");

    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        streamRef.current = new MediaStream();
        if (videoRef.current) videoRef.current.srcObject = streamRef.current;
    }, []);

    useEffect(() => {
        async function handleMic() {
            if (micOn) {
                const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const track = audioStream.getAudioTracks()[0];
                streamRef.current?.addTrack(track);
            } else {
                streamRef.current?.getAudioTracks().forEach((t) => {
                    t.stop();
                    streamRef.current?.removeTrack(t);
                });
            }
        }
        handleMic();
    }, [micOn]);

    useEffect(() => {
        async function handleVideo() {
            if (videoOn) {
                const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
                const track = videoStream.getVideoTracks()[0];
                streamRef.current?.addTrack(track);
                if (videoRef.current) videoRef.current.srcObject = streamRef.current;
            } else {
                streamRef.current?.getVideoTracks().forEach((t) => {
                    t.stop();
                    streamRef.current?.removeTrack(t);
                });
            }
        }
        handleVideo();
    }, [videoOn]);

    const handleAnswer = () => {
        if (!input.trim()) return;
        const q = questions[currentIndex];
        setAnswers((prev) => [...prev, { q, a: input }]);
        setInput("");
        if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
    };

    const skipQuestion = () => {
        if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
    };

    return (
        <div className="max-h-[92vh] h-[88vh] flex flex-col text-gray-900 dark:text-gray-100">
            <div className="flex flex-1 gap-3 overflow-hidden transition-all duration-300">
                {/* Video Grid */}
                <div
                    className={`grid ${showQA ? "grid-cols-1" : "grid-cols-2"} gap-3 transition-all duration-500 flex-shrink-0 ${showQA ? "md:w-1/2 w-full" : "w-full"
                        }`}
                >
                    {/* Candidate */}
                    <div className="flex-1 bg-gradient-to-br from-blue-200 to-white dark:from-blue-900 dark:to-gray-900 rounded-xl relative flex items-center justify-center overflow-hidden shadow-md transition-all duration-300">
                        {videoOn && streamRef.current ? (
                            <video
                                ref={videoRef}
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                playsInline
                            />
                        ) : (
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6zoRR_FPG7f2knECoYTgOuETejMYPg71vg&s"
                                alt="Candidate"
                                className="size-36 object-cover rounded-full border-4 border-gray-500 dark:border-gray-200"
                            />
                            // <video src={vids[Math.floor(Math.random() * vids.length)]} autoPlay muted loop className="rounded-2xl p-2" />
                        )}
                        <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
                            Candidate
                        </div>
                    </div>

                    {/* AI Interviewer */}
                    <div className="flex-1 bg-gradient-to-br from-purple-200 to-white dark:from-purple-900 dark:to-gray-900 rounded-xl relative flex items-center justify-center overflow-hidden shadow-md transition-all duration-300">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6zoRR_FPG7f2knECoYTgOuETejMYPg71vg&s"
                            alt="AI Interviewer"
                            className="size-36 rounded-full object-cover border-4 border-gray-800 dark:border-gray-200"
                        />
                        <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
                            AI Interviewer
                        </div>
                    </div>
                </div>

                {/* Q&A Panel */}
                <div
                    className={`flex-1 rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur p-5 flex flex-col shadow-lg transition-all duration-500 ${showQA ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"
                        }`}
                >
                    {showQA && (
                        <>
                            <h2 className="font-bold text-xl mb-4">Interview Questions</h2>
                            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                                {answers.map((item, i) => (
                                    <div key={i} className="space-y-1">
                                        <div className="bg-gray-200 dark:bg-gray-800 p-3 rounded">
                                            <span className="font-medium">Q:</span> {item.q}
                                        </div>
                                        <div className="bg-blue-500 text-white p-3 rounded-lg self-end ml-auto w-fit">
                                            {item.a}
                                        </div>
                                    </div>
                                ))}
                                {currentIndex < questions.length && (
                                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg border border-gray-300 dark:border-gray-600 animate-pulse">
                                        <span className="font-medium">Q:</span> {questions[currentIndex]}
                                    </div>
                                )}
                            </div>
                            {currentIndex < questions.length && (
                                <div className="mt-4 flex gap-2">
                                    <input
                                        className="flex-1 rounded-lg px-3 py-2 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none"
                                        placeholder="Type your answer..."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleAnswer()}
                                    />
                                    <button
                                        onClick={handleAnswer}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center gap-1 transition"
                                    >
                                        <Send size={18} /> Submit
                                    </button>
                                    <button
                                        onClick={skipQuestion}
                                        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 rounded-lg text-gray-900 dark:text-gray-100 flex items-center gap-1 transition"
                                    >
                                        <SkipForward size={18} /> Skip
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Bottom Controls */}
            <footer className="flex justify-center items-center p-4 space-x-4 shadow-inner rounded-2xl bg-gray-100 dark:bg-neutral-900 mt-3">
                <button
                    onClick={() => setMicOn(!micOn)}
                    className={`p-4 rounded-full transition ${micOn
                        ? "bg-gray-50 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                        : "bg-red-600 hover:bg-red-700 text-white"
                        }`}
                    title={micOn ? "Mute Mic" : "Unmute Mic"}
                >
                    {micOn ? <Mic size={22} /> : <MicOff size={22} />}
                </button>

                <button
                    onClick={() => setVideoOn(!videoOn)}
                    className={`p-4 rounded-full transition ${videoOn
                        ? "bg-gray-50 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                        : "bg-red-600 hover:bg-red-700 text-white"
                        }`}
                    title={videoOn ? "Turn off Camera" : "Turn on Camera"}
                >
                    {videoOn ? <Video size={22} /> : <VideoOff size={22} />}
                </button>

                {/* Toggle Q&A */}
                <button
                    onClick={() => setShowQA(!showQA)}
                    className="p-4 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    title={showQA ? "Hide Q&A" : "Show Q&A"}
                >
                    <MessageSquare size={22} />
                </button>

                <button className="p-4 px-8 flex rounded-full bg-red-600 hover:bg-red-700 transition text-white font-medium">
                    <PhoneOff className="mr-2" size={22} /> End Interview
                </button>
            </footer>
        </div>
    );
}

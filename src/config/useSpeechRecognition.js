import { useEffect, useRef, useState } from "react";

const useSpeechRecognition = () => {
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      console.log("voice",result)
      setTranscript(result);
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (!listening && recognitionRef.current) {
      setTranscript("");
      recognitionRef.current.start();
    }
  };

  return { transcript, listening, startListening };
};

export default useSpeechRecognition;
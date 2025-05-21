"use client";

import { useState, useRef } from "react";

export default function Transcriber() {
  // trancript holds the resulting text from the backend
  const [transcript, setTranscript] = useState("");
  // recording is a boolean that shows if user is recording audio or not
  const [recording, setRecording] = useState(false);
  // mediaRecorderRef is the object that handles actual audio recording
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  // audioChunks holds the actual splices of audio, then combines them into one as a Blob (funny name)
  const audioChunks = useRef<Blob[]>([]);
  // loading is a boolean used to show the user on the site if the backend is done with transcription
  const [loading, setLoading] = useState(false);
  // streamRef holds the live mic input stream so we have the ability to stop using it when the user is done recording
  const streamRef = useRef<MediaStream | null>(null);
  const [summary, setSummary] = useState("");

  // begin recording user audio by turning on mic and setting up variables and objects to handle the input
  const startRecording = async () => {
    // stream requests permission to use mic, returns a MediaStream which is just your mic input
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // saves the mic input so we can stop it later
    streamRef.current = stream;
    // create MediaRecorder object to handle the incoming audio, clears old chunks of audio
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunks.current = [];

    // event occurs when enough audio is recorded to be stored as an audioChunk
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    // call when input is done
    mediaRecorderRef.current.onstop = async () => {
      // display to user that transciption is in progress
      setLoading(true);
      // create audio file as a Blob object using audioChunks, then turn into a FormData object to be sent to backend
      const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
      const formData = new FormData();
      formData.append("file", audioBlob, "audio.wav");

      // attempt to send audio file to backend with POST, put backend response into transcript result variable
      try {
        const res = await fetch("http://localhost:8000/transcribe", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        setTranscript(data.text);
        setSummary(data.summary);
      } catch (err) {
        setTranscript("Transcription failed.");
      } finally {
        setLoading(false);
      }

    };

    // start recording (when user first clicks start recording)
    mediaRecorderRef.current.start();
    setRecording(true);
  };

  // call when user stops recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      // stops recording and triggers onstop function above
      mediaRecorderRef.current.stop();
    }
    // fully turns off mic use
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setRecording(false);
  };

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file, file.name);

    try {
      const res = await fetch("http://localhost:8000/transcribe", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setTranscript(data.text);
      setSummary(data.summary);
    } catch {
      setTranscript("Transcription failed.")
    } finally {
      setLoading(false);
    }
  }

  return (

    <div className="p-6 space-y-4">
      <div className="flex justify-center items-center">
        <label className="text-center bg-blue-500 text-white w-60  py-2 rounded cursor-pointer hover:bg-green-400">
          Choose File
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
            }}
            className="hidden"
          />
        </label>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={recording ? stopRecording : startRecording}
          className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-green-400 mb-2 mt-2"
        >

          {recording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="text-black border rounded p-4 bg-gray-100 w-full min-h-[150px]">
          {loading ? (
            <p>Transcribing...</p>
          ) : (
            <p>
              <strong>Transcript:</strong> {transcript}
            </p>
          )}
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="text-black border rounded p-4 bg-gray-100 w-full min-h-[150px]">
          {loading ? (
            <p>Summarizing...</p>
          ) : (
            <p>
              <strong>Summary:</strong> {summary}
            </p>
          )}
        </div>
      </div>

    </div>
  );
}

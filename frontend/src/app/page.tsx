import Transcriber from "./components/Transcriber";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">CollabAgent MVP</h1>
      <Transcriber />
    </main>
  );
}
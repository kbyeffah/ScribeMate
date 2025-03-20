import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { HeroHighlightDemo } from "../components/HeroHighlightDemo";

const Home: NextPage = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (input.length <= 100) setError(false); // Changed < to <= for clarity
  }, [input]);

  const submit = async () => {
    if (input.length > 100) {
      setError(true);
      return;
    }
    if (!input.trim()) { // Added check for empty/whitespace input
      setApiError("Please enter a topic to generate copy.");
      return;
    }

    setLoading(true);
    setSuggestion("");
    setApiError("");

    try {
      const res = await fetch("/api/marketing-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.error || "Something went wrong");
      }

      const { copy } = await res.json(); // Changed "result" to "copy"
      setSuggestion(copy);
    } catch (error: any) {
      console.error("API Error:", error.message);
      setApiError("Failed to generate marketing copy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (suggestion) {
      navigator.clipboard.writeText(suggestion);
      // Optional: Add feedback (e.g., toast notification) here
      console.log("Copied to clipboard:", suggestion);
    }
  };

  return (
    <div className="relative min-h-screen">
      <Head>
        <title>Marketing Copy Generator</title>
        <meta name="description" content="AI-generated marketing copy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute inset-0 z-0">
        <HeroHighlightDemo />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-10 flex flex-col justify-end min-h-screen">
        <div className="bg-white bg-opacity-80 shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-center text-purple-800">
            Start Here
          </h2>
          <div className="mb-4">
            <label htmlFor="input" className="block mb-2 font-bold text-gray-700">
              Enter your topic:
            </label>
            <textarea
              id="input"
              rows={3}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-purple-500"
              placeholder="Enter your topic here (e.g., Fresh Coffee)"
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">
                Character limit exceeded, please enter less text.
              </p>
            )}
            <div className="text-right mt-2 text-gray-500 text-sm">
              <span>{input.length}</span>/100
            </div>
          </div>

          <button
            type="button"
            onClick={submit}
            className="w-full px-4 py-2 font-bold text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:shadow-outline disabled:bg-purple-300"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <MoonLoader size={20} color="white" />
                <span className="ml-2">Generating...</span>
              </div>
            ) : (
              "Generate"
            )}
          </button>

          {apiError && (
            <p className="text-red-500 text-sm mt-4">{apiError}</p>
          )}

          {suggestion && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-2 text-purple-800">
                Your marketing copy:
              </h3>
              <div className="bg-purple-100 rounded-lg p-4 max-h-40 overflow-y-auto">
                <p className="text-gray-800">{suggestion}</p>
              </div>
              <button
                type="button"
                onClick={copyToClipboard}
                className="mt-4 px-4 py-2 font-bold text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:shadow-outline"
              >
                Copy Text
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
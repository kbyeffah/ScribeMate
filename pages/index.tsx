import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { HeroHighlightDemo } from "../components/HeroHighlightDemo";
import { Moon, Sun } from "lucide-react";

const Home: NextPage = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [darkMode, setDarkMode] = useState(false); // Default to false (light mode)

  useEffect(() => {
    if (input.length <= 100) setError(false);
  }, [input]);

  const submit = async () => {
    if (input.length > 100) {
      setError(true);
      return;
    }
    if (!input.trim()) {
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

      const { copy } = await res.json();
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
      console.log("Copied to clipboard:", suggestion);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`relative min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Head>
        <title>Marketing Copy Generator</title>
        <meta name="description" content="AI-generated marketing copy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute inset-0 z-0">
        <HeroHighlightDemo />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto p-6 md:p-8 flex flex-col min-h-screen">
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-navy-50 dark:bg-navy-800 text-navy-700 dark:text-navy-200 hover:bg-navy-100 dark:hover:bg-navy-700 transition-colors duration-300 shadow-md"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-navy-800 dark:text-navy-200 leading-tight font-sans">
              Unlock the Power of Words
            </h1>
            <p className="text-xl md:text-2xl text-navy-600 dark:text-navy-300 mt-3 font-light">
              An AI-powered Marketing Copy Generator
            </p>
          </div>

          <div className="w-full bg-gradient-to-br from-white to-navy-50 dark:from-gray-900 dark:to-navy-900 bg-opacity-95 dark:bg-opacity-95 shadow-xl rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-navy-800 dark:text-navy-200 font-sans">
              Generate Your Copy
            </h2>

            <div className="space-y-8">
              <div>
                <label htmlFor="input" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                  Enter Your Topic
                </label>
                <textarea
                  id="input"
                  rows={4}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full px-5 py-4 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-navy-200 dark:border-navy-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md resize-none"
                  placeholder="eg: Premium Coffee Beans"
                />
                <div className="flex justify-between mt-3 text-sm">
                  <span className={error ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}>
                    {error && "Max 100 characters"}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {input.length}/100
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={submit}
                disabled={loading}
                className="w-full px-6 py-4 font-semibold text-white bg-gradient-to-r from-navy-600 to-navy-700 dark:from-navy-500 dark:to-navy-600 rounded-2xl hover:from-navy-700 hover:to-navy-800 dark:hover:from-navy-600 dark:hover:to-navy-700 focus:outline-none focus:ring-4 focus:ring-navy-300 dark:focus:ring-navy-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <MoonLoader size={20} color="white" />
                    <span className="ml-2">Generating...</span>
                  </div>
                ) : (
                  "Generate Copy"
                )}
              </button>

              {apiError && (
                <p className="text-red-500 dark:text-red-400 text-sm text-center">{apiError}</p>
              )}

              {suggestion && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-navy-800 dark:text-navy-200">
                    Your Marketing Copy
                  </h3>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 max-h-52 overflow-y-auto text-gray-800 dark:text-gray-200 border border-navy-200 dark:border-navy-700 shadow-inner">
                    <p>{suggestion}</p>
                  </div>
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="w-full px-6 py-3 font-semibold text-navy-600 dark:text-navy-300 bg-navy-50 dark:bg-navy-800 rounded-2xl hover:bg-navy-100 dark:hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-all duration-300 shadow-md"
                  >
                    Copy to Clipboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
// File: src/app/page.tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Twitter, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const TweetGenerator = () => {
  const [sentence, setSentence] = useState("");
  const [character, setCharacter] = useState("");
  const [tweet, setTweet] = useState("");
  const [loading, setLoading] = useState(false);

  const generateTweet = async () => {
    setLoading(true);
    setTweet("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sentence, character }),
      });
      const data = await res.json();
      if (data.tweet) setTweet(data.tweet);
    } catch (err) {
      console.error("Error generating tweet:", err);
      setTweet("Failed to generate tweet. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 flex items-center justify-center px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 space-y-6 border border-gray-700 text-white"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-extrabold text-center text-white drop-shadow-lg tracking-wide"
        >
          <Twitter className="inline-block w-10 h-10 mr-2 mb-1 text-cyan-400 animate-pulse" />
          AI Tweet Generator
        </motion.h1>

        <motion.div variants={itemVariants} className="space-y-4">
          <Input
            placeholder="Enter your sentence"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            className={cn(
              "bg-gray-800 text-white border-gray-600",
              "placeholder:text-gray-400 focus:ring-cyan-500 focus:border-cyan-500",
              "shadow-inner shadow-cyan-800/10"
            )}
          />
          <Input
            placeholder="Enter a character (e.g., pirate, Shakespeare)"
            value={character}
            onChange={(e) => setCharacter(e.target.value)}
            className={cn(
              "bg-gray-800 text-white border-gray-600",
              "placeholder:text-gray-400 focus:ring-violet-500 focus:border-violet-500",
              "shadow-inner shadow-violet-800/10"
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            onClick={generateTweet}
            disabled={loading || !sentence || !character}
            className={cn(
              "w-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 text-white font-semibold py-3 rounded-full",
              "hover:from-cyan-600 hover:to-purple-600 transition-all duration-300",
              "shadow-xl hover:shadow-2xl transform hover:scale-105",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "flex items-center justify-center gap-2"
            )}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 animate-pulse" />
                Generate Tweet
              </>
            )}
          </Button>
        </motion.div>

        <AnimatePresence>
          {tweet && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gray-800/80 p-4 rounded-xl border border-gray-600 shadow-xl text-white"
            >
              <Textarea
                readOnly
                value={tweet}
                className={cn(
                  "resize-none w-full text-white bg-transparent border-none",
                  "font-mono text-sm sm:text-base",
                  "min-h-[80px] sm:min-h-[100px]"
                )}
                placeholder="Generated tweet will appear here..."
              />
              <Button
                onClick={() => navigator.clipboard.writeText(tweet)}
                className={cn(
                  "absolute top-3 right-3 bg-cyan-600 hover:bg-cyan-700 text-white",
                  "rounded-full p-2 transition-colors",
                  "shadow-md hover:scale-110 transform"
                )}
                title="Copy to clipboard"
              >
                <Copy size={20} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TweetGenerator;

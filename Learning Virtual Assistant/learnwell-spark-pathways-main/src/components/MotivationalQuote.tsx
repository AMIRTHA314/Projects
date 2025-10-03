
import { useState, useEffect } from 'react';

const quotes = [
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
  "The beautiful thing about learning is that no one can take it away from you.",
  "Believe you can and you're halfway there.",
  "The only way to do great work is to love what you do.",
  "Don't let yesterday take up too much of today.",
  "Learning is a treasure that will follow its owner everywhere.",
  "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
  "The roots of education are bitter, but the fruit is sweet.",
  "The mind is not a vessel to be filled but a fire to be kindled."
];

export const MotivationalQuote = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="py-3 px-4 bg-soft-purple/10 rounded-xl text-center animate-fade-in">
      <p className="text-sm italic text-foreground/80">{quote}</p>
    </div>
  );
};

export default MotivationalQuote;

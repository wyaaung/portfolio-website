'use client';

import { Check, Copy } from 'lucide-react';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { useRef, useState } from 'react';

const Pre = ({ children }: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => {
  const textInput = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const onEnter = () => {
    setHovered(true);
  };
  const onExit = () => {
    setHovered(false);
    setCopied(false);
  };
  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(textInput.current?.textContent as string);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: This is a code block container, not a form fieldset
    <div
      ref={textInput}
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
      className="relative"
      role="group"
    >
      {hovered && (
        <button
          aria-label="Copy code"
          type="button"
          className={`absolute top-2 right-2 h-8 w-8 rounded border-2 bg-gray-700 p-1 dark:bg-gray-800 ${
            copied ? 'border-sky-400 focus:border-sky-400 focus:outline-none' : 'border-gray-300'
          }`}
          onClick={onCopy}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      )}
      <pre>{children}</pre>
    </div>
  );
};

export default Pre;

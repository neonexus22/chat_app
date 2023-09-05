"use client";
import { Loader2 } from "lucide-react";
import React, { FC, useRef, useState } from "react";
import TextAreaAutosize from "react-textarea-autosize";
import { Button } from "./ui/button";

interface ChatInputProps {
  chatPartner: User;
}

const ChatInput: FC<ChatInputProps> = ({ chatPartner }) => {
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const sendMessage = () => {};

  return (
    <div className="border-t broder-gray-200 px-4 pt-4 mb-2 sm:mb:0">
      <div className="relative flex-1 overflow-hidden rounded-xl shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
        <TextAreaAutosize
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message: ${chatPartner.name}`}
          className="block w-full resize-none border-0 bg-transparent text-gray-900 
            placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:leading-6
          "
        />
        <div
          onClick={() => textareaRef.current?.focus()}
          className="py-2"
          area-hidden="true"
        >
          <div className="py-px">
            <div className="h-9"></div>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
          <div className="flex-shrink-0">
            <Button
              className="bg-black text-white rounded-xl hover:text-black hover:border hover:border-black"
              disabled={isLoading}
              onClick={sendMessage}
              type="submit"
            >
              {isLoading ? <Loader2 className="w-4 h-4" /> : null}
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;

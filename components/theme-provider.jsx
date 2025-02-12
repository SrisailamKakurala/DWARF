"use client"

import React, {useState} from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { MessagesContext } from "@/context/MessagesContext";

export function ThemeProvider({
  children,
  ...props
}) {

  const [messages, setMessages] = useState('');

  return (
    <MessagesContext.Provider value={{messages, setMessages}}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </MessagesContext.Provider>
  );
}

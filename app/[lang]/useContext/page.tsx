"use client";
import React, { Children, createContext, useContext, useState } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<Theme | null>(null);

export default function MyApp() {
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <ThemeContext.Provider value={theme}>
      <Form>{}</Form>
      <label>
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={(e) => {
            setTheme(e.target.checked ? "dark" : "light");
          }}
        />
        Use dark mode
      </label>
    </ThemeContext.Provider>
  );
}

function Form({ children }: { children: React.ReactNode }) {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const theme = useContext(ThemeContext)!;
  const className = `panel-${theme}`;

  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

function Button({ children }: { children: React.ReactNode }) {
  const theme = useContext(ThemeContext)!;
  const className = `button-${theme}`;

  return <button className={className}>{children}</button>;
}

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, Home, Briefcase, FileText, Newspaper, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 hover:bg-accent rounded-lg transition-colors flex items-center gap-2 text-muted-foreground"
      >
        <Search className="w-4 h-4" />
        <span className="text-xs font-medium border border-muted px-1.5 py-0.5 rounded bg-muted/50 hidden sm:inline">
          ⌘K
        </span>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm"
      >
        <div className="w-full max-w-xl bg-card border rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
          <Command.Input
            placeholder="Type a command or search..."
            className="w-full px-4 py-3 bg-transparent border-b outline-none text-base"
          />
          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="text-xs font-medium text-muted-foreground px-2 py-1">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/"))}
                className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-accent cursor-pointer text-sm"
              >
                <Home className="w-4 h-4" /> Home
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/work"))}
                className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-accent cursor-pointer text-sm"
              >
                <Briefcase className="w-4 h-4" /> Work
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/blog"))}
                className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-accent cursor-pointer text-sm"
              >
                <Newspaper className="w-4 h-4" /> Blog
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/resume"))}
                className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-accent cursor-pointer text-sm"
              >
                <FileText className="w-4 h-4" /> Resume
              </Command.Item>
            </Command.Group>

            <Command.Separator className="h-px bg-border my-2" />

            <Command.Group heading="Theme" className="text-xs font-medium text-muted-foreground px-2 py-1">
              <Command.Item
                onSelect={() => runCommand(() => setTheme("light"))}
                className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-accent cursor-pointer text-sm"
              >
                <Sun className="w-4 h-4" /> Light Mode
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setTheme("dark"))}
                className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-accent cursor-pointer text-sm"
              >
                <Moon className="w-4 h-4" /> Dark Mode
              </Command.Item>
            </Command.Group>
          </Command.List>
        </div>
      </Command.Dialog>
    </>
  );
}

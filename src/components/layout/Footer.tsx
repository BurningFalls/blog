import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="mx-auto max-w-3xl px-4 py-6 flex items-center justify-between text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} BurningFalls</p>
        <Link
          href="https://github.com/burningfalls"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          GitHub
        </Link>
      </div>
    </footer>
  );
}

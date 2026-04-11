import { GitHubIcon, LinkedInIcon } from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="max-w-270 mx-auto px-6 h-16 flex items-center justify-between">
        <p className="text-sm text-ink-muted">
          &copy; {new Date().getFullYear()} Fabian Rigterink
        </p>
        <div className="flex gap-5 text-sm text-ink-muted">
          <a
            href="https://github.com/fabianrigterink"
            className="flex items-center gap-1.5 hover:text-ink transition-colors"
          >
            <GitHubIcon className="w-4 h-4 shrink-0" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/fabianrigterink/"
            className="flex items-center gap-1.5 hover:text-ink transition-colors"
          >
            <LinkedInIcon className="w-4 h-4 shrink-0" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

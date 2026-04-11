import { GitHubIcon, LinkedInIcon } from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="border-t border-border-light py-6">
      <div className="max-w-[1080px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink-muted">
        <p>&copy; {new Date().getFullYear()} Fabian Rigterink | Made with ❤️ in San Francisco, CA</p>
        <div className="flex gap-6">
          <a href="https://github.com/fabianrigterink" className="flex items-center gap-1.5 hover:text-ink transition-colors underline underline-offset-2">
            <GitHubIcon className="w-4 h-4 shrink-0" />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/fabianrigterink/" className="flex items-center gap-1.5 hover:text-ink transition-colors underline underline-offset-2">
            <LinkedInIcon className="w-4 h-4 shrink-0" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

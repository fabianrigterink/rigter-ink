import { GitHubIcon, LinkedInIcon } from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="max-w-270 mx-auto px-6 h-16 flex items-center justify-between">
        <p className="text-sm text-ink-muted flex items-center gap-1.5">
          <span>&copy; {new Date().getFullYear()} Fabian Rigterink</span>
          <span>·</span>
          <span>Made with</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="love"
            role="img"
          >
            <defs>
              <radialGradient id="footer-heart-grad" cx="4" cy="20" r="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FED576" />
                <stop offset="20%" stopColor="#F47133" />
                <stop offset="50%" stopColor="#BC3081" />
                <stop offset="100%" stopColor="#4F5BD5" />
              </radialGradient>
            </defs>
            <path
              fill="url(#footer-heart-grad)"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          <span>in San Francisco, CA</span>
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

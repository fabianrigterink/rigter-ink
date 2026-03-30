export default function Footer() {
  return (
    <footer className="border-t border-border-light py-12 mt-20">
      <div className="max-w-[1080px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink-muted">
        <p>&copy; {new Date().getFullYear()} Fabian Rigterink</p>
        <div className="flex gap-6">
          <a href="https://github.com/frigterink" className="hover:text-ink transition-colors">GitHub</a>
          <a href="https://linkedin.com/in/frigterink" className="hover:text-ink transition-colors">LinkedIn</a>
          <a href="/rss.xml" className="hover:text-ink transition-colors">RSS</a>
        </div>
      </div>
    </footer>
  );
}

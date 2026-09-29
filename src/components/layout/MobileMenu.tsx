import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";

type Link = { label: string; href: string };

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function MobileMenu({ links }: { links: Link[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (toggleRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const onNavigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const current = window.location.pathname.replace(/\/$/, "") || "/";
    if (current === href) {
      event.preventDefault();
      setOpen(false);
    }
  };

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>
      {open &&
        createPortal(
          <>
            <button
              type="button"
              className="mobile-backdrop"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <nav ref={panelRef} id={panelId} className="mobile-panel" aria-label="Mobile">
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={(event) => onNavigate(event, link.href)}>
                  {link.label}
                </a>
              ))}
              <a href="/contact" onClick={(event) => onNavigate(event, "/contact")}>
                Talk to us
              </a>
            </nav>
          </>,
          document.body,
        )}
    </>
  );
}

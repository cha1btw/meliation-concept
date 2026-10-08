/*
  The brand device: a large serif M with the wordmark running down beside it,
  placed over the top edge of a photo (see .monogram in globals.css).
  Purely decorative, the real logo and name live in the header.
*/
export function Monogram({ tagline, className = "" }: { tagline: string; className?: string }) {
  return (
    <div className={`monogram ${className}`} aria-hidden="true">
      <span className="monogram-side">
        MELIATION
        <small>{tagline}</small>
      </span>
      <span className="monogram-m">M</span>
    </div>
  );
}

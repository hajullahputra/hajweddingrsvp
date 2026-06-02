// Swap to "/logo.png" once you drop your real logo into /public
const LOGO_SRC = "/logo.png";

export default function FooterSection() {
  return (
    <footer
      className="section text-center"
      style={{ position: "relative", overflow: "hidden", borderRadius: 32, margin: "-8px 16px 16px", paddingTop: 24 }}
    >
      {/* Logo */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
        <img
          src={LOGO_SRC}
          alt="Wedding logo"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          style={{ width: 64, height: 64, objectFit: "contain" }}
        />
      </div>

      {/* Hashtag */}
      <p
        className="font-script"
        style={{ fontSize: 20, color: "var(--charcoal)", lineHeight: 1.2 }}
      >
        #PrinceforSyahirah
      </p>

      {/* Credit */}
      <p style={{
        fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase",
        color: "var(--warm-gray)", opacity: .6, marginTop: 20,
      }}>
        Created with love by — Hajullah &amp; Syahirah
      </p>
    </footer>
  );
}

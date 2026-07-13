import { useState } from "react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  }

  return (
    <section className="newsletter">
      <p className="section-label">STAY IN THE LOOP</p>
      <h2>Join the INBARE Community</h2>
      <p className="nl-sub">
        Be the first to know about new drops, exclusive deals, and behind-the-scenes.
      </p>

      {submitted ? (
        <p className="nl-success">You're in. Welcome to INBARE. ✓</p>
      ) : (
        <form className="nl-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email address"
          />
          <button type="submit">SUBSCRIBE</button>
        </form>
      )}
    </section>
  );
}

export default Newsletter;

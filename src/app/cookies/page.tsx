import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Hanstrix Technologies",
  description:
    "Details on how Hanstrix Technologies uses cookies and similar technologies across our website.",
  robots: { index: true, follow: true },
};

const UPDATED = "2025-09-17"; // update whenever this page changes

export default function CookiePolicyPage() {
  return (
    <main className="relative text-white">
      <section className="px-6 lg:px-20 py-12 md:py-16">
        <div className="xl:mx-auto xl:max-w-[900px]">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient-neon">
            Cookie Policy
          </h1>
          <p className="mt-2 text-white/70 text-sm">Last updated: {UPDATED}</p>

          <div className="mt-8 space-y-8 leading-relaxed text-white/90">
            <section>
              <h2 className="text-xl font-semibold text-white">1) What are cookies?</h2>
              <p className="mt-2">
                Cookies are small text files stored on your device by your
                browser. They are commonly used to remember preferences, enable
                functionality, and analyze website usage.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">2) Current usage</h2>
              <p className="mt-2">
                Hanstrix Technologies currently{" "}
                <span className="font-semibold text-white">does not</span> set
                cookies for analytics, advertising, or profiling. Our animations
                and effects (such as Vanta.js backgrounds or Framer Motion)
                operate without cookies.
              </p>
              <p className="mt-2">
                However, our hosting provider (e.g., Vercel/AWS) may generate
                basic server logs for security and performance, which are not
                cookies and do not track users across sites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">3) Third-party services</h2>
              <p className="mt-2">
                If we load assets (such as fonts, icons, or libraries) from
                third-party CDNs, those providers may receive your IP address
                and user-agent. This does not involve cookies we control, but we
                aim to use reputable vendors and minimize tracking.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">4) Future updates</h2>
              <p className="mt-2">
                If we later introduce analytics or features that require
                non-essential cookies, this page will be updated to describe
                them. Where required by law, we will also display a cookie
                consent banner that allows you to opt in or out.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">5) Managing cookies</h2>
              <p className="mt-2">
                You can control or delete cookies through your browser settings.
                Instructions vary by browser (e.g., Chrome, Firefox, Safari,
                Edge). Please note that disabling cookies may affect certain
                features if they are introduced in the future.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">6) Contact</h2>
              <p className="mt-2">
                If you have any questions about this Cookie Policy, contact us
                at{" "}
                <a
                  className="underline decoration-cyan-400/70"
                  href="mailto:privacy@hanstrix.com"
                >
                  info@hanstrix.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

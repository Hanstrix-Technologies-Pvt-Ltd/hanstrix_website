// app/api/contact/route.ts
"use server";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/** ===== Brand / contact ===== */
const COMPANY_NAME = "Hanstrix Technologies";
const SITE_URL = "https://hanstrix.com";
const TEAM_INBOX = "info@hanstrix.com";          // where your team receives
const SUPPORT_PHONE_LABEL = "+91 98765 43210";
const SUPPORT_PHONE_TEL   = SUPPORT_PHONE_LABEL.replace(/[^\d+]/g, ""); // -> +919876543210

/** ===== SMTP sender (use a different address to avoid “Me”) =====
 * Prefer creating mailbox: notifications@hanstrix.com (Zoho app password)
 * Or add alias in Zoho and allow 'Send Mail As'.
 */
const FROM_EMAIL = "contact@hanstrix.com"; // <- NOT the same as TEAM_INBOX

/** ===== Zoho SMTP (India) ===== */
const SMTP_HOST = "smtp.zoho.in";
const SMTP_PORT = 465;
const SMTP_SECURE = true;
const SMTP_USER = FROM_EMAIL;             // login as the sender mailbox
const SMTP_PASS = "UFMUMCUjesg7"; // replace with your Zoho app password

type Payload = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

type FieldErrors = Record<string, string>;
function validate(p: Partial<Payload>): { ok: boolean; errors?: FieldErrors } {
  const errors: FieldErrors = {};
  if (!p.name || p.name.trim().length < 2) errors.name = "Name is required";
  if (!p.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) errors.email = "Valid email required";
  if (!p.subject || p.subject.trim().length < 2) errors.subject = "Subject required";
  if (!p.message || p.message.trim().length < 5) errors.message = "Message too short";
  return { ok: Object.keys(errors).length === 0, errors };
}

/* ---------- email utils & templates ---------- */

const UI = {
  bg: "#0b1220",
  card: "#0f172a",
  text: "#e5e7eb",
  sub: "#a5b4fc",
  link: "#22d3ee",
  border: "#1f2937",
  accent: "#67e8f9",
};

const pre = (t: string) =>
  `<div style="display:none!important;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;visibility:hidden;">${t}</div>`;

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (m) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[m]!));
const nl2br = (s: string) => s.replace(/\n/g, "<br/>");
const firstName = (n: string) => (n || "").trim().split(/\s+/)[0] || "there";

const wrap = (title: string, preheader: string, inner: string) => `<!doctype html>
<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${title}</title>
<style>
  body{margin:0;background:${UI.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Inter,Arial,'Helvetica Neue',sans-serif}
  a{color:${UI.link};text-decoration:none}
  .container{padding:24px 12px}
  .card{max-width:600px;margin:0 auto;background:${UI.card};border:1px solid ${UI.border};border-radius:14px;overflow:hidden}
  .header{padding:18px 24px;border-bottom:1px solid ${UI.border};display:flex;align-items:center;gap:12px}
  .brand{font-weight:800;color:${UI.accent};font-size:18px}
  .pad{padding:24px}
  .title{font-size:22px;font-weight:800;color:${UI.accent};margin:0 0 6px 0}
  .muted{color:${UI.sub};font-size:14px}
  .row{display:flex;gap:12px;padding:12px 0;border-bottom:1px solid ${UI.border}}
  .row:last-child{border-bottom:none}
  .label{width:120px;color:#94a3b8;font-size:14px}
  .value{color:${UI.text};font-size:15px;word-break:break-word}
  .cta{padding:22px;text-align:center;border-top:1px solid ${UI.border};background:rgba(255,255,255,.02)}
  .btn{display:inline-block;background:linear-gradient(90deg,#06b6d4,#8b5cf6);color:#fff;font-weight:700;padding:12px 18px;border-radius:999px}
  .footer{color:#9ca3af;font-size:12px;text-align:center;margin-top:16px}
</style>
</head>
<body>
${pre(preheader)}
<div class="container">
  <div class="card">
    <div class="header">
      <!-- If you have a logo URL, put an <img> here -->
      <div class="brand">${COMPANY_NAME}</div>
    </div>
    ${inner}
  </div>
  <div class="footer">© ${new Date().getFullYear()} ${COMPANY_NAME} • <a href="${SITE_URL}">${SITE_URL.replace(/^https?:\/\//,"")}</a></div>
</div>
</body></html>`;

function adminHtml(p: Payload) {
  const preheader = `New contact from ${p.name} — ${p.subject}`;
  const inner = `
  <div class="pad">
    <h1 class="title">New Message</h1>
    <div class="muted">You received a new message from your website contact form.</div>

    <div class="row"><div class="label">Name</div><div class="value">${escapeHtml(p.name)}</div></div>
    <div class="row"><div class="label">Email</div><div class="value"><a href="mailto:${p.email}">${p.email}</a></div></div>
    <div class="row"><div class="label">Phone</div><div class="value">${p.phone ? `<a href="tel:${p.phone}">${p.phone}</a>` : "—"}</div></div>
    <div class="row"><div class="label">Subject</div><div class="value">${escapeHtml(p.subject)}</div></div>
    <div class="row"><div class="label">Message</div><div class="value">${nl2br(escapeHtml(p.message))}</div></div>
  </div>
  <div class="cta">
    <a class="btn" href="mailto:${encodeURIComponent(p.email)}?subject=${encodeURIComponent("Re: "+p.subject)}">Reply to ${escapeHtml(p.name)}</a>
    <div class="muted" style="margin-top:10px">Or call <a href="tel:${SUPPORT_PHONE_TEL}">${SUPPORT_PHONE_LABEL}</a></div>
  </div>`;
  return wrap(`${COMPANY_NAME} — New Message`, preheader, inner);
}

function userHtml(p: Payload) {
  const preheader = `Thanks ${firstName(p.name)} — we received your message`;
  const inner = `
  <div class="pad">
    <h1 class="title">Thanks for Contacting Us</h1>
    <div class="muted">Hi ${escapeHtml(firstName(p.name))}, we’ve received your message.</div>

    <div class="row"><div class="label">Subject</div><div class="value">${escapeHtml(p.subject)}</div></div>
    <div class="row"><div class="label">Your message</div><div class="value">${nl2br(escapeHtml(p.message))}</div></div>

    <div class="muted" style="margin-top:14px">
      Need something urgent? Reply to this email or call us at
      <a href="tel:${SUPPORT_PHONE_TEL}">${SUPPORT_PHONE_LABEL}</a>.  
      You can also email <a href="mailto:${TEAM_INBOX}">${TEAM_INBOX}</a>.
    </div>
  </div>
  <div class="cta">
    <a class="btn " href="${SITE_URL}" style="display:inline-block;color:#ffffff !important;text-decoration:none !important;">Visit ${COMPANY_NAME}</a>
  </div>`;
  return wrap(`Thanks for contacting ${COMPANY_NAME}`, preheader, inner);
}

function adminText(p: Payload) {
  return `${COMPANY_NAME} — New Contact
Name: ${p.name}
Email: ${p.email}
Phone: ${p.phone || "-"}
Subject: ${p.subject}
Message:
${p.message}

Reply: ${p.email}
Call: ${SUPPORT_PHONE_TEL}
`;
}
function userText(p: Payload) {
  return `Thanks for contacting ${COMPANY_NAME}, ${p.name}!

Subject: ${p.subject}
Your message:
${p.message}

We’ll get back to you shortly. Reply to this email or call ${SUPPORT_PHONE_TEL}.
${SITE_URL}
`;
}

/* ---------- handler ---------- */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const payload: Payload = {
      name: String(body.name || ""),
      email: String(body.email || ""),
      phone: String(body.phone || ""),
      subject: String(body.subject || ""),
      message: String(body.message || ""),
    };

    const v = validate(payload);
    if (!v.ok) {
      return NextResponse.json({ message: "Validation failed", errors: v.errors }, { status: 400 });
    }

    // 1) to your team inbox (FROM is notifications@… to avoid "Me")
    await transporter.sendMail({
      from: `"${payload.name} via Hanstrix" <contact@hanstrix.com>`,
      to: TEAM_INBOX,
      replyTo: payload.email, // reply answers the visitor
      subject: `New Message — ${payload.subject}`.slice(0, 180),
      html: adminHtml(payload),
      text: adminText(payload),
    });

    // 2) auto-reply to the visitor
    await transporter.sendMail({
      from: `${COMPANY_NAME} <${TEAM_INBOX}>`,
      to: payload.email,
      replyTo: TEAM_INBOX, // if they reply, it goes to your inbox
      subject: `Thanks for contacting ${COMPANY_NAME}`,
      html: userHtml(payload),
      text: userText(payload),
    });

    return NextResponse.json({ message: "Message sent successfully." });
  } catch (e) {
    console.error("contact API error", e);
    return NextResponse.json({ message: "Failed to send message." }, { status: 500 });
  }
}

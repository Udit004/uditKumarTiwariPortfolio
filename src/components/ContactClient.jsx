"use client"
import React, { useState, useCallback, memo, Fragment } from "react";
import Image from "next/image";
import {
  Mail,
  User,
  MessageSquare,
  Send,
  Linkedin,
  Github,
  Instagram,
  Lightbulb,
  Users,
  Rocket,
  Headphones,
  Sparkles,
  Lock,
  Tag,
  Check,
} from "lucide-react";

// Icon lookup so data arrays can stay plain/serializable
const iconMap = {
  Mail,
  Linkedin,
  Github,
  Instagram,
  Lightbulb,
  Users,
  Rocket,
  Headphones,
  MessageSquare,
  Check,
};

/* ------------------------------------------------------------------ */
/*  Left column — intro copy                                          */
/* ------------------------------------------------------------------ */
const IntroHeader = memo(() => (
  <div>
    <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 mb-6">
      <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
      <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
        Let&apos;s Talk
      </span>
    </div>

    <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-tight text-white mb-3">
      Let&apos;s{" "}
      <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
        Connect
      </span>
    </h2>
    <div className="h-1 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-6" />

    <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-md">
      Have a project in mind or just want to say hello? I&apos;m always open
      to discussing new ideas, collaborations, or opportunities.
    </p>
  </div>
));
IntroHeader.displayName = "IntroHeader";

/* ------------------------------------------------------------------ */
/*  Left column — feature grid with center illustration               */
/* ------------------------------------------------------------------ */
const FEATURES = [
  {
    icon: "Lightbulb",
    title: "New Ideas",
    subtitle: "Let's brainstorm",
    className: "text-purple-300 bg-purple-500/10 border-purple-500/30",
  },
  {
    icon: "Users",
    title: "Collaboration",
    subtitle: "Let's build together",
    className: "text-blue-300 bg-blue-500/10 border-blue-500/30",
  },
  {
    icon: "Rocket",
    title: "Opportunities",
    subtitle: "Let's grow together",
    className: "text-pink-300 bg-pink-500/10 border-pink-500/30",
  },
  {
    icon: "Headphones",
    title: "Support",
    subtitle: "I'm here to help",
    className: "text-purple-300 bg-purple-500/10 border-purple-500/30",
  },
];

const FeatureItem = memo(({ icon, title, subtitle, className }) => {
  const Icon = iconMap[icon];
  return (
    <div className="flex items-center gap-3">
      <div
        className={`shrink-0 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border ${className}`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm sm:text-base font-semibold text-white leading-tight">
          {title}
        </p>
        <p className="text-xs sm:text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
});
FeatureItem.displayName = "FeatureItem";

const FeatureShowcase = memo(() => (
  <div className="relative overflow-hidden  p-6 sm:p-10">
    {/* faint dot-grid texture */}
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.15]"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    />

    {/* decorative connector arcs, purely ornamental */}
    {/* <svg
      className="pointer-events-none absolute inset-0 hidden sm:block"
      viewBox="0 0 400 260"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M200,130 Q140,90 75,55"
        stroke="#a855f7"
        strokeOpacity="0.25"
        strokeWidth="1.5"
        strokeDasharray="3 6"
      />
      <path
        d="M200,130 Q260,90 325,55"
        stroke="#60a5fa"
        strokeOpacity="0.25"
        strokeWidth="1.5"
        strokeDasharray="3 6"
      />
      <path
        d="M200,130 Q140,170 75,205"
        stroke="#f472b6"
        strokeOpacity="0.25"
        strokeWidth="1.5"
        strokeDasharray="3 6"
      />
      <path
        d="M200,130 Q260,170 325,205"
        stroke="#a855f7"
        strokeOpacity="0.25"
        strokeWidth="1.5"
        strokeDasharray="3 6"
      />
    </svg> */}

    <div className="relative grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 sm:gap-y-14">
      {FEATURES.map((f) => (
        <FeatureItem key={f.title} {...f} />
      ))}
    </div>

    {/* center illustration — swap the src below for your own asset */}
    <div className="pointer-events-none absolute inset-0 hidden items-center justify-center sm:flex">
      <div className="relative h-46 w-36 lg:h-204 lg:w-224">
        {/* <div className="absolute inset-0 rounded-full bg-purple-500/25 blur-3xl" /> */}
        <Image
          src="/assets/contact/contact-envelope.png"
          alt="Envelope illustration"
          fill
          sizes="676px"
          className="object-contain drop-shadow-[0_0_35px_rgba(168,85,247,0.45)] -z-10"
        />
      </div>
    </div>
  </div>
));
FeatureShowcase.displayName = "FeatureShowcase";

/* ------------------------------------------------------------------ */
/*  Left column — social links                                        */
/* ------------------------------------------------------------------ */
const SocialDivider = memo(() => (
  <div className="my-8 sm:my-10 flex items-center gap-3">
    <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />
    <span className="h-1 w-1 rounded-full bg-purple-400" />
    <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gray-300">
      Connect With Me
    </span>
    <span className="h-1 w-1 rounded-full bg-purple-400" />
    <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
  </div>
));
SocialDivider.displayName = "SocialDivider";

const SocialGrid = memo(({ contactIcons }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
    {contactIcons.map((item) => {
      const Icon = iconMap[item.icon];
      return (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.05]"
        >
          <div
            className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}
          >
            <Icon className="h-5 w-5 text-white" />
          </div>
          <p className="text-sm font-semibold text-white">{item.label}</p>
          <p className="text-xs text-gray-500">{item.subtitle}</p>
        </a>
      );
    })}
  </div>
));
SocialGrid.displayName = "SocialGrid";

/* ------------------------------------------------------------------ */
/*  Right column — message form                                       */
/* ------------------------------------------------------------------ */
const FormField = memo(
  ({ id, name, type = "text", icon: Icon, placeholder, value, onChange, textarea }) => {
    const sharedClasses =
      "w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm sm:text-base text-white placeholder-gray-500 transition-all duration-300 hover:border-white/20 focus:border-purple-500/60 focus:outline-none focus:ring-2 focus:ring-purple-500/40";

    return (
      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-gray-500" />
        {textarea ? (
          <textarea
            id={id}
            name={name}
            required
            rows={4}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${sharedClasses} resize-none pt-3.5`}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            required
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={sharedClasses}
          />
        )}
      </div>
    );
  }
);
FormField.displayName = "FormField";

const STEPS = [
  {
    number: "01",
    icon: "MessageSquare",
    title: "Your Message",
    subtitle: "Share your ideas",
    filled: false,
  },
  {
    number: "02",
    icon: "Mail",
    title: "In My Inbox",
    subtitle: "I'll review it",
    filled: false,
  },
  {
    number: "03",
    icon: "Check",
    title: "Let's Collaborate",
    subtitle: "We'll make it happen",
    filled: true,
  },
];

const ProcessSteps = memo(() => (
  <div className="mt-8 sm:mt-10 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
    {STEPS.map((step, i) => {
      const Icon = iconMap[step.icon];
      return (
        <Fragment key={step.number}>
          <div className="flex max-w-[10.5rem] flex-col gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                  step.filled
                    ? "border-transparent bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30"
                    : "border-white/20 text-gray-300"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold text-purple-400">
                {step.number}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{step.title}</p>
              <p className="text-xs text-gray-500">{step.subtitle}</p>
            </div>
          </div>
          {i < STEPS.length - 1 && (
            <div className="hidden flex-1 border-t border-dashed border-white/15 mt-5 sm:block" />
          )}
        </Fragment>
      );
    })}
  </div>
));
ProcessSteps.displayName = "ProcessSteps";

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
const ContactClient = ({ contactIcons }) => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false });
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatus({ loading: false, success: true, error: false });
      setFormData({ user_name: "", user_email: "", subject: "", message: "" });
    } catch (error) {
      setStatus({ loading: false, success: false, error: true });
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 items-start">
      {/* Left column */}
      <div className="flex flex-col">
        <IntroHeader />
        <div className="mt-8 sm:mt-10">
          <FeatureShowcase />
        </div>
        <SocialDivider />
        <SocialGrid contactIcons={contactIcons} />
      </div>

      {/* Right column */}
      <div className="flex flex-col">
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 shadow-2xl shadow-black/40">
          <div className="mb-6 sm:mb-8 flex items-center gap-4">
            <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-purple-400/40 bg-gradient-to-br from-purple-500/20 to-blue-500/20">
              <Send className="h-6 w-6 sm:h-7 sm:w-7 text-purple-300" />
              <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-purple-400" />
              <span className="absolute -bottom-0.5 -left-0.5 h-1 w-1 rounded-full bg-blue-400" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Send a Message
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                I&apos;d love to{" "}
                <span className="text-blue-400">hear from you!</span>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              id="user_name"
              name="user_name"
              icon={User}
              placeholder="Your Name"
              value={formData.user_name}
              onChange={handleChange}
            />
            <FormField
              id="user_email"
              name="user_email"
              type="email"
              icon={Mail}
              placeholder="Your Email"
              value={formData.user_email}
              onChange={handleChange}
            />
            <FormField
              id="subject"
              name="subject"
              icon={Tag}
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
            />
            <FormField
              id="message"
              name="message"
              icon={MessageSquare}
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              textarea
            />

            {status.success && (
              <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 sm:p-4 text-green-300">
                <div className="flex items-center text-sm sm:text-base">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-400" />
                  Message sent successfully! I&apos;ll get back to you soon.
                </div>
              </div>
            )}
            {status.error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 sm:p-4 text-red-300">
                <div className="flex items-center text-sm sm:text-base">
                  <span className="mr-2 h-2 w-2 rounded-full bg-red-400" />
                  Failed to send message. Please try again later.
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={status.loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-3.5 sm:py-4 font-semibold text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-[1.01] hover:from-purple-500 hover:to-blue-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {status.loading ? (
                <>
                  <span className="h-4 w-4 sm:h-5 sm:w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Send Message</span>
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 opacity-80" />
                </>
              )}
            </button>

            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-gray-500">
              <Lock className="h-3.5 w-3.5" />
              Your information is safe with me. I respect your{" "}
              <a href="#" className="text-blue-400 hover:underline">
                privacy
              </a>
              .
            </p>
          </form>
        </div>

        <ProcessSteps />
      </div>
    </div>
  );
};

export default ContactClient;
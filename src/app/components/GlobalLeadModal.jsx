"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  memo,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   CONFIG                                   */
/* -------------------------------------------------------------------------- */

const colors = {
  black: "#0a0a0a",
  panel: "#111111",
  white: "#f5f0e8",
  grey: "#1a1a1a",
  mid: "#2e2e2e",
  muted: "#8b8b8b",
  accent: "#df3c3c",
};

const fonts = {
  display: "'Bebas Neue', sans-serif",
  body: "'DM Sans', sans-serif",
  mono: "'DM Mono', monospace",
};

/* -------------------------------------------------------------------------- */
/*                              GOOGLE APPS SCRIPT                            */
/* -------------------------------------------------------------------------- */

/*
  1. Create Google Apps Script
  2. Deploy as Web App
  3. Replace below URL

  Apps Script Example:

  function doPost(e) {
    const sheet = SpreadsheetApp.openById("YOUR_SHEET_ID").getSheetByName("Sheet1");

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.mobile,
      data.page,
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }
*/

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby5Am1PT4Gg4SQSOXOMvHiSXI2GWJa7tPqyE7If2xP_ARTlS_bAAmXeTETp_-T2Pm5q/exec";

/* -------------------------------------------------------------------------- */
/*                                VALIDATIONS                                 */
/* -------------------------------------------------------------------------- */

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePhone = (phone) =>
  /^[6-9]\d{9}$/.test(phone.replace(/\s+/g, ""));

/* -------------------------------------------------------------------------- */
/*                              INPUT COMPONENT                               */
/* -------------------------------------------------------------------------- */

const InputField = memo(
  ({
    label,
    type = "text",
    value,
    onChange,
    error,
    placeholder,
    autoFocus,
  }) => {
    return (
      <div className="space-y-2">
        <label
          className="block text-[11px] uppercase tracking-[0.22em] text-neutral-500"
          style={{ fontFamily: fonts.mono }}
        >
          {label}
        </label>

        <input
          autoFocus={autoFocus}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={label}
          className={`
            w-full rounded-xl border bg-[#141414]
            px-4 py-3 text-[15px]
            text-[#f5f0e8]
            outline-none transition-all duration-300
            placeholder:text-neutral-600
            focus:border-[#df3c3c]
            focus:ring-1 focus:ring-[#df3c3c]
            ${
              error
                ? "border-red-500"
                : "border-[#2a2a2a] hover:border-[#3a3a3a]"
            }
          `}
          style={{
            fontFamily: fonts.body,
          }}
        />

        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[12px] text-red-400"
              style={{ fontFamily: fonts.body }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

InputField.displayName = "InputField";

/* -------------------------------------------------------------------------- */
/*                                MAIN MODAL                                  */
/* -------------------------------------------------------------------------- */

export default function GlobalLeadModal({
  isOpen,
  onClose,
  title = "START YOUR NEXT MOVE",
  subtitle = "Connect with our team and unlock tailored solutions for your business.",
}) {
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
  });

  /* ------------------------------------------------------------------------ */
  /*                               MOUNT CHECK                                */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ------------------------------------------------------------------------ */
  /*                           PREVENT BODY SCROLL                            */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ------------------------------------------------------------------------ */
  /*                               ESC HANDLER                                */
  /* ------------------------------------------------------------------------ */

  const handleEsc = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, handleEsc]);

  /* ------------------------------------------------------------------------ */
  /*                              FOCUS CONTROL                               */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  /* ------------------------------------------------------------------------ */
  /*                             OUTSIDE CLICK                                */
  /* ------------------------------------------------------------------------ */

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  /* ------------------------------------------------------------------------ */
  /*                             INPUT HANDLERS                               */
  /* ------------------------------------------------------------------------ */

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  /* ------------------------------------------------------------------------ */
  /*                                VALIDATION                                */
  /* ------------------------------------------------------------------------ */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!validatePhone(formData.mobile)) {
      newErrors.mobile = "Enter a valid mobile number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ------------------------------------------------------------------------ */
  /*                                SUBMISSION                                */
  /* ------------------------------------------------------------------------ */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setStatus({
        loading: true,
        success: false,
        error: false,
      });

      const payload = {
        ...formData,
        timestamp: new Date().toISOString(),
        page: window.location.href,
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      setStatus({
        loading: false,
        success: true,
        error: false,
      });

      setFormData({
        name: "",
        email: "",
        mobile: "",
      });

      setTimeout(() => {
        onClose();
      }, 2200);
    } catch (err) {
      console.error(err);

      setStatus({
        loading: false,
        success: false,
        error: true,
      });
    }
  };

  /* ------------------------------------------------------------------------ */
  /*                                  RETURN                                  */
  /* ------------------------------------------------------------------------ */

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          aria-modal="true"
          role="dialog"
          aria-labelledby="lead-modal-title"
          aria-describedby="lead-modal-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={handleBackdropClick}
          className="
            fixed inset-0 z-[999999]
            flex items-center justify-center
            bg-black/75 backdrop-blur-md
            px-4 py-6
          "
        >
          {/* MODAL */}
          <motion.div
            ref={modalRef}
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 24,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 18,
            }}
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative w-full max-w-xl overflow-hidden
              rounded-3xl border border-[#232323]
              bg-[#101010]
              shadow-[0_20px_80px_rgba(0,0,0,0.7)]
            "
          >
            {/* TOP ACCENT */}
            <div className="h-[2px] w-full bg-[#df3c3c]" />

            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="
                absolute right-4 top-4 z-20
                flex h-10 w-10 items-center justify-center
                rounded-full border border-[#2a2a2a]
                bg-[#151515]
                text-neutral-400
                transition-all duration-300
                hover:border-[#df3c3c]
                hover:text-white
                focus:outline-none
                focus:ring-2 focus:ring-[#df3c3c]
              "
            >
              <X size={18} />
            </button>

            {/* CONTENT */}
            <div className="p-6 sm:p-8 md:p-10">
              {/* META */}
              <div className="mb-5 flex items-center gap-3">
                <div className="h-[1px] w-10 bg-[#df3c3c]" />

                <span
                  className="text-[11px] uppercase tracking-[0.28em] text-neutral-500"
                  style={{ fontFamily: fonts.mono }}
                >
                  Global Enquiry Access
                </span>
              </div>

              {/* TITLE */}
              <h2
                id="lead-modal-title"
                className="
                  max-w-lg
                  text-4xl leading-[0.9]
                  text-[#f5f0e8]
                  sm:text-5xl
                "
                style={{
                  fontFamily: fonts.display,
                  letterSpacing: "0.02em",
                }}
              >
                {title}
              </h2>

              {/* DESCRIPTION */}
              <p
                id="lead-modal-description"
                className="
                  mt-4 max-w-md
                  text-sm leading-relaxed
                  text-neutral-400
                  sm:text-[15px]
                "
                style={{
                  fontFamily: fonts.body,
                }}
              >
                {subtitle}
              </p>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                <div ref={firstInputRef}>
                  <InputField
                    autoFocus
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      updateField("name", e.target.value)
                    }
                    error={errors.name}
                    placeholder="John Doe"
                  />
                </div>

                <InputField
                  type="email"
                  label="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    updateField("email", e.target.value)
                  }
                  error={errors.email}
                  placeholder="john@example.com"
                />

                <InputField
                  type="tel"
                  label="Mobile Number"
                  value={formData.mobile}
                  onChange={(e) =>
                    updateField("mobile", e.target.value)
                  }
                  error={errors.mobile}
                  placeholder="+91 9876543210"
                />

                {/* STATUS */}
                <AnimatePresence mode="wait">
                  {status.success && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="
                        flex items-center gap-2 rounded-xl
                        border border-emerald-500/20
                        bg-emerald-500/10 px-4 py-3
                        text-sm text-emerald-300
                      "
                    >
                      <CheckCircle2 size={16} />
                      Request submitted successfully.
                    </motion.div>
                  )}

                  {status.error && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="
                        flex items-center gap-2 rounded-xl
                        border border-red-500/20
                        bg-red-500/10 px-4 py-3
                        text-sm text-red-300
                      "
                    >
                      <AlertCircle size={16} />
                      Something went wrong. Please try again.
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CTA */}
                <button
                  type="submit"
                  disabled={status.loading}
                  className="
                    group relative mt-2
                    flex h-14 w-full items-center justify-center
                    overflow-hidden rounded-2xl
                    bg-[#df3c3c]
                    px-6
                    text-sm font-medium uppercase
                    tracking-[0.18em]
                    text-white
                    transition-all duration-300
                    hover:opacity-90
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                  style={{
                    fontFamily: fonts.body,
                  }}
                >
                  {status.loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Submitting
                    </span>
                  ) : (
                    "Submit Request"
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* -------------------------------------------------------------------------- */
/*                              EXAMPLE USAGE                                 */
/* -------------------------------------------------------------------------- */

/*

"use client";

import React, { useState } from "react";
import GlobalLeadModal from "@/components/GlobalLeadModal";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 bg-red-500 rounded-xl text-white"
      >
        Open Modal
      </button>

      <GlobalLeadModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

*/

/* -------------------------------------------------------------------------- */
/*                               FONT IMPORT                                  */
/* -------------------------------------------------------------------------- */

/*

Add this inside app/layout.jsx or app/layout.tsx

<style jsx global>{`
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
`}</style>

*/
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  MailOpen,
  AlertCircle,
  AlertTriangle,
  Loader2,
  Inbox,
  RefreshCw,
  Send,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { getAuthApiBaseUrl } from "@/lib/api/config";
import { authClient } from "@/lib/auth-client";

type VerificationStatus =
  | "loading"
  | "verified"
  | "already-verified"
  | "expired"
  | "invalid-link"
  | "not-verified"
  | "no-session"
  | "error";

export function VerifyEmailStatus() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [email, setEmail] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const token = searchParams.get("token");
  const sent = searchParams.get("sent") === "1";
  const verified = searchParams.get("verified") === "1";
  const errorCode = searchParams.get("error");
  const emailFromQuery = searchParams.get("email");
  const authApiBaseURL = getAuthApiBaseUrl();

  const checkVerificationStatus = useCallback(async () => {
    setStatus("loading");
    setErrorMessage(null);

    try {
      const { data: sessionData, error } = await authClient.getSession();

      if (error || !sessionData?.user) {
        setEmail(null);
        setStatus("no-session");
        return;
      }

      setEmail(sessionData.user.email);
      setStatus(sessionData.user.emailVerified ? "verified" : "not-verified");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Could not check email verification status.",
      );
    }
  }, []);

  // Email to resend to: session email takes priority, else the one carried in the URL.
  const resendEmail = email ?? emailFromQuery;

  const resendVerification = useCallback(async () => {
    if (!resendEmail || isResending || resendCooldown > 0) return;

    setIsResending(true);
    try {
      const callbackURL = `${window.location.origin}/verify-email?verified=1`;
      const { error } = await authClient.sendVerificationEmail({
        email: resendEmail,
        callbackURL,
      });

      if (error) {
        throw new Error(error.message || "Could not resend verification email.");
      }

      toast.success("Verification email sent", {
        description: `We sent a fresh link to ${resendEmail}. Check your inbox and spam folder.`,
      });
      setResendCooldown(30);
    } catch (error) {
      const rawMessage =
        error instanceof Error
          ? error.message
          : "Could not resend verification email.";
      const resendTestingRestriction =
        "You can only send testing emails to your own email address";
      const message = rawMessage.includes(resendTestingRestriction)
        ? "Resend is in testing mode. You can only send verification emails to your verified recipient email. Verify a domain in Resend to send to any address."
        : rawMessage;

      toast.error("Couldn't resend email", { description: message });
    } finally {
      setIsResending(false);
    }
  }, [resendEmail, isResending, resendCooldown]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  useEffect(() => {
    if (errorCode === "TOKEN_EXPIRED") {
      setStatus("expired");
      return;
    }

    if (errorCode) {
      setStatus("invalid-link");
      return;
    }

    if (token) {
      void (async () => {
        try {
          // POST the token to Better Auth's built-in verification endpoint
          const callbackURL = `${window.location.origin}/verify-email?verified=1`;
          const response = await fetch(`${authApiBaseURL}/verify-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, callbackURL }),
            credentials: "include",
          });
          if (response.redirected) {
            window.location.assign(response.url);
            return;
          }
          const result = await response.json();
          if (result?.error === "TOKEN_EXPIRED") {
            setStatus("expired");
            return;
          }
          if (result?.error) {
            setStatus("invalid-link");
            return;
          }
          setStatus("verified");
        } catch (error) {
          setStatus("error");
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Could not verify your email link.",
          );
        }
      })();
      return;
    }

    if (verified) {
      setStatus("verified");
      setEmail(emailFromQuery);
      return;
    }

    if (sent) {
      setStatus("not-verified");
      setEmail(emailFromQuery);
      return;
    }

    void checkVerificationStatus();
  }, [
    authApiBaseURL,
    checkVerificationStatus,
    emailFromQuery,
    errorCode,
    sent,
    token,
    verified,
  ]);

  return (
    <div className="space-y-5">
      <StatusPanel status={status} email={email} sent={sent} errorMessage={errorMessage} />

      <div className="flex flex-col gap-3">
        {status === "verified" ? (
          <Button asChild className="w-full text-[13.5px] font-medium shadow-sm">
            <Link href="/login">Continue to sign in</Link>
          </Button>
        ) : (
          <>
            {resendEmail && (
              <Button
                type="button"
                className="w-full text-[13.5px] font-medium shadow-sm"
                onClick={() => void resendVerification()}
                disabled={isResending || resendCooldown > 0}
              >
                {isResending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : resendCooldown > 0 ? (
                  `Resend available in ${resendCooldown}s`
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Resend verification email
                  </>
                )}
              </Button>
            )}

            <Button
              type="button"
              variant="outline"
              className="w-full text-[13.5px] font-medium"
              onClick={() => void checkVerificationStatus()}
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Checking…
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Refresh status
                </>
              )}
            </Button>
          </>
        )}

        <p className="text-center text-[12.5px] text-muted-foreground">
          Wrong email or didn&apos;t receive it?{" "}
          <Link
            href="/signup"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Back to sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

type StatusPanelProps = {
  status: VerificationStatus;
  email: string | null;
  sent: boolean;
  errorMessage: string | null;
};

function StatusPanel({ status, email, sent, errorMessage }: StatusPanelProps) {
  const config = useMemo(() => getStatusConfig(status, sent), [status, sent]);

  if (!config) return null;

  return (
    <div
      className={`flex gap-3 border p-4 ${config.borderClass} ${config.bgClass}`}
      role={config.role}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center ${config.iconBgClass} ${config.iconColorClass}`}
      >
        {config.icon}
      </span>
      <div className="flex-1 space-y-1">
        <p className={`text-[13.5px] font-semibold ${config.titleColorClass}`}>
          {config.title}
        </p>
        <p className={`text-[13px] leading-relaxed ${config.bodyColorClass}`}>
          {config.body}
        </p>
        {email && status !== "no-session" && status !== "error" && status !== "loading" && (
          <p
            className={`pt-1 font-mono text-[12px] tracking-tight ${config.bodyColorClass}`}
          >
            {email}
          </p>
        )}
        {status === "error" && errorMessage && (
          <p className={`pt-1 text-[12px] ${config.bodyColorClass}`}>
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}

type StatusConfig = {
  icon: React.ReactNode;
  title: string;
  body: string;
  role: "status" | "alert";
  borderClass: string;
  bgClass: string;
  iconBgClass: string;
  iconColorClass: string;
  titleColorClass: string;
  bodyColorClass: string;
};

function getStatusConfig(
  status: VerificationStatus,
  sent: boolean,
): StatusConfig | null {
  switch (status) {
    case "loading":
      return {
        icon: <Loader2 className="h-4 w-4 animate-spin" />,
        title: "Checking verification status",
        body: "One moment while we confirm your account state.",
        role: "status",
        borderClass: "border-border",
        bgClass: "bg-muted/40",
        iconBgClass: "bg-foreground/5",
        iconColorClass: "text-foreground",
        titleColorClass: "text-foreground",
        bodyColorClass: "text-muted-foreground",
      };
    case "verified":
      return {
        icon: <CheckCircle2 className="h-4 w-4" />,
        title: "Email verified",
        body: "Your account is ready. Sign in to continue setting up your workspace.",
        role: "status",
        borderClass: "border-emerald-300/70 dark:border-emerald-800/70",
        bgClass: "bg-emerald-50 dark:bg-emerald-950/30",
        iconBgClass: "bg-emerald-100 dark:bg-emerald-900/40",
        iconColorClass: "text-emerald-700 dark:text-emerald-300",
        titleColorClass: "text-emerald-900 dark:text-emerald-200",
        bodyColorClass: "text-emerald-800/85 dark:text-emerald-300/85",
      };
    case "not-verified":
      return {
        icon: <MailOpen className="h-4 w-4" />,
        title: sent ? "Verification email sent" : "Email not verified yet",
        body: sent
          ? "Open the email we just sent and click the verification link to activate your account. The link expires in 15 minutes."
          : "Check your inbox and spam folder for our verification link, then return here and refresh.",
        role: "status",
        borderClass: "border-amber-300/70 dark:border-amber-800/70",
        bgClass: "bg-amber-50 dark:bg-amber-950/30",
        iconBgClass: "bg-amber-100 dark:bg-amber-900/40",
        iconColorClass: "text-amber-700 dark:text-amber-300",
        titleColorClass: "text-amber-900 dark:text-amber-200",
        bodyColorClass: "text-amber-800/85 dark:text-amber-300/85",
      };
    case "already-verified":
      return {
        icon: <CheckCircle2 className="h-4 w-4" />,
        title: "Link already used",
        body: "This verification link has already been redeemed. Your account is verified. Sign in to continue.",
        role: "status",
        borderClass: "border-amber-300/70 dark:border-amber-800/70",
        bgClass: "bg-amber-50 dark:bg-amber-950/30",
        iconBgClass: "bg-amber-100 dark:bg-amber-900/40",
        iconColorClass: "text-amber-700 dark:text-amber-300",
        titleColorClass: "text-amber-900 dark:text-amber-200",
        bodyColorClass: "text-amber-800/85 dark:text-amber-300/85",
      };
    case "expired":
      return {
        icon: <AlertTriangle className="h-4 w-4" />,
        title: "Verification link expired",
        body: "Your verification link has expired. Sign in to request a fresh verification email.",
        role: "alert",
        borderClass: "border-red-300/70 dark:border-red-800/70",
        bgClass: "bg-red-50 dark:bg-red-950/30",
        iconBgClass: "bg-red-100 dark:bg-red-900/40",
        iconColorClass: "text-red-700 dark:text-red-300",
        titleColorClass: "text-red-900 dark:text-red-200",
        bodyColorClass: "text-red-800/85 dark:text-red-300/85",
      };
    case "invalid-link":
      return {
        icon: <AlertCircle className="h-4 w-4" />,
        title: "Invalid verification link",
        body: "This link can't be used. Open the most recent email we sent you and try again.",
        role: "alert",
        borderClass: "border-red-300/70 dark:border-red-800/70",
        bgClass: "bg-red-50 dark:bg-red-950/30",
        iconBgClass: "bg-red-100 dark:bg-red-900/40",
        iconColorClass: "text-red-700 dark:text-red-300",
        titleColorClass: "text-red-900 dark:text-red-200",
        bodyColorClass: "text-red-800/85 dark:text-red-300/85",
      };
    case "no-session":
      return {
        icon: <Inbox className="h-4 w-4" />,
        title: "Open your verification link",
        body: "Click the verification link from the email we sent you, then return here and sign in.",
        role: "status",
        borderClass: "border-border",
        bgClass: "bg-muted/40",
        iconBgClass: "bg-foreground/5",
        iconColorClass: "text-foreground",
        titleColorClass: "text-foreground",
        bodyColorClass: "text-muted-foreground",
      };
    case "error":
      return {
        icon: <AlertCircle className="h-4 w-4" />,
        title: "Couldn't check verification status",
        body: "We hit a hiccup confirming your status. Try refreshing in a moment.",
        role: "alert",
        borderClass: "border-red-300/70 dark:border-red-800/70",
        bgClass: "bg-red-50 dark:bg-red-950/30",
        iconBgClass: "bg-red-100 dark:bg-red-900/40",
        iconColorClass: "text-red-700 dark:text-red-300",
        titleColorClass: "text-red-900 dark:text-red-200",
        bodyColorClass: "text-red-800/85 dark:text-red-300/85",
      };
    default:
      return null;
  }
}

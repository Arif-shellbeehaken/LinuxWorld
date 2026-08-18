"use client";

import { Component, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  message?: string;
}

/**
 * Production error boundary — prevents full app crash.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
    // Production: send to Sentry / logging service here
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 p-8 text-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            কিছু একটা ভুল হয়েছে
          </h2>
          <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
            পেজটি রিফ্রেশ করে আবার চেষ্টা করুন। সমস্যা থাকলে সাপোর্টে জানান।
          </p>
          <Button onClick={() => this.setState({ hasError: false })}>
            আবার চেষ্টা করুন
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

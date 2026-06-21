"use client";

import { useMemo } from "react";
import * as jsxRuntime from "react/jsx-runtime";

type Props = {
  code: string;
};

function useMDXComponent(code: string) {
  return useMemo(() => {
    const fn = new Function(code);
    const module = { exports: {} as Record<string, unknown> };
    fn.call(module.exports, jsxRuntime);
    return (module.exports as { default?: React.ComponentType }).default;
  }, [code]);
}

export function MDXContent({ code }: Props) {
  const Component = useMDXComponent(code);
  if (!Component) return null;
  return (
    <div className="prose">
      <Component />
    </div>
  );
}

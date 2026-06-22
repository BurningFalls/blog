import * as jsxRuntime from "react/jsx-runtime";

type Props = {
  code: string;
};

export function MDXContent({ code }: Props) {
  // velite s.mdx() body는 arguments[0]으로 jsxRuntime을 받고 { default } 를 반환하는 함수 문자열
  const fn = new Function(code);
  const { default: Component } = fn(jsxRuntime) as { default?: React.ComponentType };
  if (!Component) return null;
  return (
    <div className="prose">
      <Component />
    </div>
  );
}

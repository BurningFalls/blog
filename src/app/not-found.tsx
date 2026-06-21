import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="text-6xl font-bold text-muted mb-4">404</p>
      <h1 className="text-xl font-semibold text-foreground mb-2">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Link
        href="/"
        className="text-sm text-primary hover:underline underline-offset-4"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}

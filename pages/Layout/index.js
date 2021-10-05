import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <>
      <div className="header">
        <Link href="/">
          <a>
            <span>Về trang chủ</span>
          </a>
        </Link>
      </div>
      <div className="content">{children}</div>
    </>
  );
}

import { db } from '@/services/firebaseConfig';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext'

export default function Layout({ children }) {
  const { user } = useContext(AuthContext);
  async function handleClickAds() {
    try {
      const { email } = user;
      db.collection('emails').doc(email).set({
        email
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="header">
        <div className="top">
          <Link href="/">
            <a>
              <span>Về trang chủ</span>
            </a>
          </Link>
        </div>
        <div className="center">
          <span>Nền tảng <a onClick={handleClickAds} target="_blank" href="https://onluyen365.com/lop-12/b36e259c-84db-4ec5-a97b-847dc39341f1#top">Onluyen365.com</a> hỗ trợ việc vừa học vừa thực hành với hơn 30.000+ câu hỏi trắc nghiệm chọn lọc và nhiều tài liệu ôn thi THPTQG (miễn phí 100%)</span>
          <div className="header_bottom">
          </div>
          <strong>Link:<a onClick={handleClickAds} target="_blank" href="https://onluyen365.com/lop-12/b36e259c-84db-4ec5-a97b-847dc39341f1#top">Onluyen365.com (đăng ký tài khoản miễn phí rồi học nhé các mem)</a></strong>
        </div>
      </div>
      <div className="content">{children}</div>
    </>
  );
}

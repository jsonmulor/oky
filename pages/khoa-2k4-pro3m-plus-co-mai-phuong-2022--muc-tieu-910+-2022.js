import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { api } from '../api';
import Layout from './Layout';

export default function KhoaHoc() {
  const {
    user: { uid, email },
  } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    document.title =
      'KHÓA 2K4 PRO3M PLUS CÔ MAI PHƯƠNG 2022 ( MỤC TIÊU 9,10+ 2022 )		';
  }, []);

  useEffect(() => {
    async function handleCheckUserSession() {
      try {
        const sessionKey = localStorage.getItem('sessionKeys') || '';
        await api.checkUserSession({
          email,
          sessionKey,
        });
      } catch (error) {
        router.push('/dang-nhap?code=401');
        console.log(error);
      }
    }
    if (uid) handleCheckUserSession();
  }, [email, uid]);

  return (
    <Layout>
      <iframe src="https://static.khokhoahocfree.xyz/khoa-2k4-pro3m-plus-co-mai-phuong-2022--muc-tieu-910+-2022-.html"></iframe>
    </Layout>
  );
}

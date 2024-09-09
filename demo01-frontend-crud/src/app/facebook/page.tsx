'use client';

import { useRouter } from 'next/navigation';
import styles2 from '@/styles/test.module.css';

const Facebook = () => {
  const router = useRouter();
  const backHome = () => {
    router.push('/');
  };
  return (
    <>
      <div className={styles2.red}>Facebook page</div>
      <div>
        <button onClick={() => backHome()}>Back Home</button>
      </div>
    </>
  );
};

export default Facebook;

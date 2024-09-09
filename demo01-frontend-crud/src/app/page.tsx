import Link from 'next/link';
import styles1 from '@/styles/app.module.css';
import styles2 from '@/styles/test.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Description',
};

export default function Home() {
  return (
    <div>
      <ul>
        <li className={styles1.red}>
          <Link className={styles2.red} href="/facebook">
            Facebook
          </Link>
        </li>
        <li>
          <Link href="/youtube">YouTube</Link>
        </li>
        <li>
          <Link href="tiktok">Tiktok</Link>
        </li>
      </ul>
    </div>
  );
}

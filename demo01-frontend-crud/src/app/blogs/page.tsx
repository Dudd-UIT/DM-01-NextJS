'use client';

import AppTable from '@/components/app.table';
import CreateModal from '@/components/create.modal';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import useSWR from 'swr';

const BlogPage = () => {
  const [showModal, setShowModal] = useState(false);
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    'http://localhost:8000/blogs',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  console.log('>>data', data);

  // const fetchData = async () => {
  //   const res = await fetch('http://localhost:8000/blogs');
  //   const data = await res.json();
  //   console.log('>>data', data);
  // };

  // useEffect(() => {
  //   fetchData()
  // }, [])
  return (
    <>
      <div className="d-flex justify-content-between align-items-center my-3">
        <div style={{ fontSize: 26, fontWeight: 'bold' }}>Blogs List</div>
        <Button onClick={() => setShowModal(true)}>Add New</Button>
      </div>
      <CreateModal
        showModal={showModal}
        setShowModal={setShowModal}
      ></CreateModal>
      <AppTable blogs={data?.sort((a: any, b: any) => b.id - a.id)}></AppTable>
    </>
  );
};

export default BlogPage;

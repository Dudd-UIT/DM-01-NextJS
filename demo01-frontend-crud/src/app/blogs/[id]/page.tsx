'use client';

import Link from 'next/link';
import { Card } from 'react-bootstrap';
import useSWR, { Fetcher } from 'swr';

const ViewDetail = ({ params }: { params: { id: number } }) => {
  const fetcher: Fetcher<IBlog, string> = (url: string) =>
    fetch(url).then((r) => r.json());

  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${params?.id}`,
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

  return (
    <>
      <div className="my-3">
        <Link className="btn btn-primary" href={'/blogs'}>
          Go Back
        </Link>
      </div>
      <Card>
        <Card.Header>
          <Card.Title>{data?.title}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>{data?.content}</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end">
          {data?.author}
        </Card.Footer>
      </Card>
    </>
  );
};

export default ViewDetail;

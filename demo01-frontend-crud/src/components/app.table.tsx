'use table';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import UpdateModal from './update.modal';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
  blogs: IBlog[];
}

function AppTable(props: IProps) {
  const { blogs } = props;
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);

  const handleUpdate = (item: IBlog) => {
    setShowModal(true);
    setSelectedBlog(item);
  };

  const handleDelete = async (id: number) => {
    if (confirm(`Do you want to delete this blog (id=${id})?`)) {
      const rawResponse = await fetch(`http://localhost:8000/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const content = await rawResponse.json();
      if (content) {
        toast.success('Delete blog successfully!');
        mutate('http://localhost:8000/blogs');
      }
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>
                <Link
                  className="mx-3 btn btn-primary"
                  href={`/blogs/${item.id}`}
                >
                  View
                </Link>
                <Button
                  variant="warning"
                  className="mx-3"
                  onClick={() => handleUpdate(item)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  className="mx-3"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <UpdateModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedBlog={selectedBlog}
        setSelectedBlog={setSelectedBlog}
      ></UpdateModal>
    </>
  );
}

export default AppTable;

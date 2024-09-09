import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  selectedBlog: IBlog | null;
  setSelectedBlog: (blog: IBlog | null) => void;
}

function UpdateModal(props: IProps) {
  const { showModal, setShowModal, selectedBlog, setSelectedBlog } = props;
  console.log('>>> selectedBlog<<<<', selectedBlog);

  const initialBlog = {
    id: 0,
    title: '',
    author: '',
    content: '',
  };
  const [blog, setBlog] = useState<IBlog | null>(null);

  useEffect(() => {
    if (selectedBlog && selectedBlog.id) {
      setBlog(selectedBlog);
    }
    console.log('Blog', blog);
  }, [selectedBlog]);

  const handleChange = (name: string, value: string) => {
    setBlog((prevBlog) => {
      if (!prevBlog) return null;
      return {
        ...prevBlog,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    if (!blog?.title) {
      toast.error('Not empty title');
    }
    if (!blog?.author) {
      toast.error('Not empty author');
    }
    if (!blog?.content) {
      toast.error('Not empty content');
    }
    const rawResponse = await fetch(`http://localhost:8000/blogs/${blog?.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog),
    });
    const content = await rawResponse.json();
    if (content) {
      toast.success('Update blog successfully!');
      handleClose();
      mutate('http://localhost:8000/blogs');
    }
  };

  const handleClose = () => {
    setBlog(initialBlog);
    setSelectedBlog(null);
    setShowModal(false);
  };

  return (
    <Modal
      size="lg"
      show={showModal}
      backdrop="static"
      onHide={() => setShowModal(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">Update Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Enter title"
              value={blog?.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              placeholder="Enter author"
              value={blog?.author || ''}
              onChange={(e) => handleChange('author', e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={blog?.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateModal;

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { addArt } from '../redux/ArticleSlice';
import { useDispatch } from 'react-redux';
function AddArticle() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handleAdd = () => {
    const newArticle = {
      title: title,
      description: description,
      creator: user._id,
    };
    dispatch(addArt(newArticle));
    window.location.reload();
}
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Article
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ADD A NEW ARTICLE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="title"
                autoFocus 
                value={title} 
                onChange={e=>{setTitle(e.target.value)}}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Article Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={description} onChange={e=>{setDescription(e.target.value)}}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddArticle;
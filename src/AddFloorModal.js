import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';

export class AddFloorModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'floor',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                SoTang:event.target.SoTang.value,
                TrangThai:event.target.TrangThai.value,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    render(){
        return(
            <div className="container">
<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Thêm
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="SoTang">
                        <Form.Label>Số Tầng</Form.Label>
                        <Form.Control type="text" name="SoTang" required
                        placeholder="SoTang"/>
                        
                    </Form.Group>
                    <Form.Group controlId="TrangThai">
                    <Form.Label>Trạng Thái</Form.Label>
                        <Form.Control type="text" name="TrangThai" required
                        placeholder="TrangThai"/>
                    </Form.Group>

                    <Form.Group controlId="SoTang">
                        <Button variant="primary" type="submit">
                            Thêm
                        </Button>
                    </Form.Group>
                </Form>
        </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>


            </div>
        )
    }
}
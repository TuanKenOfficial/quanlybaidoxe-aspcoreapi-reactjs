import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';

export class AddUmbrellaModal extends Component{
    
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'floor')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }
    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'umbrella',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                SoODo:event.target.SoODo.value,
                SoTang:event.target.SoTang.value,
                TrangThaiODo:event.target.TrangThaiODo.value,
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
                    <Form.Group controlId="SoODo">
                        <Form.Label>Ô Đỗ</Form.Label>
                        <Form.Control type="text" name="SoODo" required
                        placeholder="SoODo"/> 
                    </Form.Group>

                    <Form.Group controlId="SoTang">
                        <Form.Label>Tầng</Form.Label>
                        <Form.Control as="select">
                        {this.state.deps.map(dep=>
                            <option key={dep.FloorId}>{dep.SoTang}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="TrangThaiODo">
                    <Form.Label>Trạng Thái Ô Đỗ</Form.Label>
                        <Form.Control type="text" name="TrangThaiODo" required
                        placeholder="TrangThaiODo"/>
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
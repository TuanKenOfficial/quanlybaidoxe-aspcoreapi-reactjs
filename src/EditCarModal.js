import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';

export class EditCarModal extends Component{
    
    constructor(props){
        super(props);
        this.state={umbs:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'car')
        .then(response=>response.json())
        .then(data=>{
            this.setState({umbs:data});
        });
    }
    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'car',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                CarId:event.target.CarId.value,
                TenLoaiXe:event.target.TenLoaiXe.value,
                BienSoXe:event.target.BienSoXe.value,
                TrangThaiXe:event.target.TrangThaiXe.value,
                SoODo:event.target.SoODo.value,
                SoTang:event.target.SoTang.value,
                
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
            Chỉnh sửa
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="CarId">
                        <Form.Label>Id</Form.Label>
                        <Form.Control type="text" name="CarId" required
                        placeholder="CarId"
                        disabled
                        defaultValue={this.props.UmbrellaId}
                        /> 
                    </Form.Group>

                    <Form.Group controlId="TenLoaiXe">
                        <Form.Label>Tên loại xe</Form.Label>
                        <Form.Control type="text" name="TenLoaiXe" required
                        defaultValue={this.props.car}
                        placeholder="TenLoaiXe"/> 
                    </Form.Group>

                    <Form.Group controlId="BienSoXe">
                    <Form.Label>Biển số xe</Form.Label>
                        <Form.Control type="text" name="BienSoXe" required
                        placeholder="BienSoXe"/>
                    </Form.Group>

                    <Form.Group controlId="TrangThaiXe">
                    <Form.Label>Trạng Thái Xe</Form.Label>
                        <Form.Control type="text" name="TrangThaiXe" required
                        placeholder="TrangThaiXe"/>
                    </Form.Group>

                    <Form.Group controlId="SoODo">
                        <Form.Label>Ô Đỗ</Form.Label>
                        <Form.Control as="select">
                        {this.state.umbs.map(umb=>
                            <option key={umb.UmbrellaId}>{umb.SoODo}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="SoTang">
                        <Form.Label>Tầng</Form.Label>
                        <Form.Control as="select">
                        {this.state.umbs.map(umb=>
                            <option key={umb.UmbrellaId}>{umb.SoTang}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="TenLoaiXe">
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
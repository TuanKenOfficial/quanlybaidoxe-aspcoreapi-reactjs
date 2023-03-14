import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddCarModal} from './AddCarModal';
import {EditCarModal} from './EditCarModal';

export class Car extends Component{

    constructor(props){
        super(props);
        this.state ={cars:[], addModalShow:false,editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'car')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cars:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }
    deleteCar(CarId){
        if (window.confirm('Bạn có chắc muốn xóa không?')) {
            fetch(process.env.REACT_APP_API+'car/'+CarId,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {cars, CarId, TenLoaiXe, BienSoXe, TrangThaiXe, SoODo, SoTang} = this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
           
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tên Loại Xe</th>
                            <th>Biển số xe</th>
                            <th>Trạng Thái Xe</th>
                            <th>Ô Đỗ</th>
                            <th>Tầng</th>
                            <th>Lựa chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map(car=>
                            <tr key={car.CarId}>
                                <td>{car.CarId}</td>
                                <td>{car.TenLoaiXe}</td>
                                <td>{car.BienSoXe}</td>
                                <td>{car.TrangThaiXe}</td>
                                <td>{car.SoODo}</td>
                                <td>{car.SoTang}</td>
                                <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                    onClick={()=>this.setState({editModalShow:true,
                                        CarId:car.CarId,TenLoaiXe:car.TenLoaiXe, BienSoXe:car.BienSoXe, TrangThaiXe:car.TrangThaiXe, SoODo:car.SoODo, SoTang:car.SoTang})}>
                                        Chỉnh sửa 
                                    </Button>
                                    
                                    <Button className="mr-2" variant="danger"
                                    onClick={()=>this.deleteCar(car.CarId)}>
                                        Xóa
                                    </Button>
                                    <EditCarModal show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        CarId={CarId}
                                        TenLoaiXe={TenLoaiXe}
                                        BienSoXe={BienSoXe}
                                        TrangThaiXe={TrangThaiXe}>
                                        SoODo={SoODo}
                                        SoTang={SoTang}
                                    </EditCarModal>
                                </ButtonToolbar>
                                 </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Thêm Xe</Button>  
                    <AddCarModal show={this.state.addModalShow}
                    onHide={addModalClose}></AddCarModal>
                </ButtonToolbar>
            
            </div>
        )
    }
}
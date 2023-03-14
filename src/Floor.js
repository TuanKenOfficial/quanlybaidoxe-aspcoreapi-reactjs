import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddFloorModal} from './AddFloorModal';
import {EditFloorModal} from './EditFloorModal';

export class Floor extends Component{

    constructor(props){
        super(props);
        this.state ={deps:[], addModalShow:false,editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'floor')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }
    deleteDep(FloorId){
        if (window.confirm('Bạn có chắc muốn xóa không?')) {
            fetch(process.env.REACT_APP_API+'floor/'+FloorId,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {deps,FloorId, SoTang,TrangThai} = this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
           
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tầng</th>
                            <th>Trạng Thái</th>
                            <th>Lựa chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep=>
                            <tr key={dep.FloorId}>
                                <td>{dep.FloorId}</td>
                                <td>{dep.SoTang}</td>
                                <td>{dep.TrangThai}</td>
                                <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                    onClick={()=>this.setState({editModalShow:true,
                                        FloorId:dep.FloorId, SoTang:dep.SoTang, TrangThai:dep.TrangThai})}>
                                        Chỉnh sửa
                                    </Button>
                                    
                                    <Button className="mr-2" variant="danger"
                                    onClick={()=>this.deleteDep(dep.FloorId)}>
                                        Xóa
                                    </Button>
                                    <EditFloorModal show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        FloorId={FloorId}
                                        SoTang={SoTang}
                                        TrangThai={TrangThai}>

                                    </EditFloorModal>
                                </ButtonToolbar>
                                 </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Thêm</Button>
                    <AddFloorModal show={this.state.addModalShow}
                    onHide={addModalClose}></AddFloorModal>
                </ButtonToolbar>
            
            </div>
        )
    }
}
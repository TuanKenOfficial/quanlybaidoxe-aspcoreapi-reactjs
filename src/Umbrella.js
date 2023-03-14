import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddUmbrellaModal} from './AddUmbrellaModal';
import {EditUmbrellaModal} from './EditUmbrellaModal';

export class Umbrella extends Component{

    constructor(props){
        super(props);
        this.state ={umbs:[], addModalShow:false,editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'umbrella')
        .then(response=>response.json())
        .then(data=>{
            this.setState({umbs:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }
    deleteUmb(UmbrellaId){
        if (window.confirm('Bạn có chắc muốn xóa không?')) {
            fetch(process.env.REACT_APP_API+'umbrella/'+UmbrellaId,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {umbs, UmbrellaId, SoODo, SoTang, TrangThaiODo} = this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
           
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Ô Đỗ</th>
                            <th>Tầng</th>
                            <th>Trạng Thái Ô Đỗ</th>
                            <th>Lựa chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {umbs.map(umb=>
                            <tr key={umb.UmbrellaId}>
                                <td>{umb.UmbrellaId}</td>
                                <td>{umb.SoODo}</td>
                                <td>{umb.SoTang}</td>
                                <td>{umb.TrangThaiODo}</td>
                                <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                    onClick={()=>this.setState({editModalShow:true,
                                        UmbrellaId:umb.UmbrellaId, SoODo:umb.SoODo, SoTang:umb.SoTang, TrangThaiODo:umb.TrangThaiODo})}>
                                        Chỉnh sửa 
                                    </Button>
                                    
                                    <Button className="mr-2" variant="danger"
                                    onClick={()=>this.deleteUmb(umb.UmbrellaId)}>
                                        Xóa
                                    </Button>
                                    <EditUmbrellaModal show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        UmbrellaId={UmbrellaId}
                                        SoODo={SoODo}
                                        SoTang={SoTang}
                                        TrangThaiODo={TrangThaiODo}>

                                    </EditUmbrellaModal>
                                </ButtonToolbar>
                                 </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Thêm Ô Đỗ</Button>  
                    <AddUmbrellaModal show={this.state.addModalShow}
                    onHide={addModalClose}></AddUmbrellaModal>
                </ButtonToolbar>
            
            </div>
        )
    }
}
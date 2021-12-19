/* eslint-disable eqeqeq */
import React, {useContext}  from 'react'
import { UserContext } from '../../context/UserContext'
import { useHistory } from "react-router-dom";
import {Col} from 'react-bootstrap'
import {RiDeleteBinFill} from 'react-icons/ri';
import { API } from './../../config/api';
import toRupiah from '@develoka/angka-rupiah-js';
import Swal from 'sweetalert2'

export default function CardTour({d,admin,noEdit,handelRender}){
    const {dataUser} = useContext(UserContext);

    let history = useHistory()
    const handelClick=()=>{
        if(!admin){
            history.push(`/detail-tour/${String(d.id)}`)
        }
    }

    const deleteTrip =(id) =>{
        Swal.fire({
            icon: 'warning',
            title: 'Are you Sure To Delete This Trip?',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!",
            backdrop:true,
        }).then(function(dismiss){
            if(dismiss.isConfirmed){
                deletData(id)
            }
         }, function(dismiss){
            if(dismiss == 'cancel'){
            }
         });
    }

    const deletData = async(id)=>{
        try {
            await API.delete(`/trip/${id}`)
            handelRender()
            sweetAlert(false,'success',"Delete Trip Success")
        } catch (error) {
        }
    }

    const sweetAlert = (show=false,type='',msg='') =>{
        Swal.fire({
            icon: type,
            title: msg,
            showConfirmButton: show,
            timer: 1500,
            backdrop:show,
        })
    }
    return(
        <Col lg={4} md={5} sm={6} xs={9} className="mb-3 p-md-2 p-sm-2 px-lg-4 pb-lg-4">
            <div   style={{"cursor":`${admin?"auto":"pointer"}`,"color":"black"}} className="card card-tour mx-lg-3 mx-md-1 mx-sm-1 ">
                <div onClick={handelClick}>
                    <p className="text-center">
                        <img src={d.images} style={{"objectFit":"cover"}} className="p-2 img-fluid" alt="..." />
                    </p>
                    {
                        !admin && 
                        <div>
                        {
                            d.quota ===0?(
                                <span className="id-tour tour-full">Quota Full</span>
                            ):(
                                <span className="id-tour">{(d.quotaFilled-d.quota)}/{d.quotaFilled}</span>
                            )
                        }
                        </div>
                    }
                    <div className="card-body">
                        <p className="text-overflow" style={{"fontWeight": "800","fontSize": "21px", "marginTop":`${admin?"0px":"-30px"}`}}>
                            {String(d.title)}
                        </p>
                        <div  className="row">
                            <Col lg={7} md={12} sm={12} xs={12}>
                                <span style={{"color": "#FFAF00","fontWeight": "900","fontSize":"18px"}}>{toRupiah(String(d.price), {formal: false,symbol: 'IDR',floatingPoint: 0,dot: ','})}</span>
                            </Col>
                            <Col lg={5} md={12} sm={12} xs={12} className="text-lg-end">
                                <span style={{"color": "#878787","fontWeight": "800","fontSize": "16px"}}>
                                    {String(d.country.name)}
                                </span>
                            </Col>
                        </div>
                    </div>
                </div>
                {
                    dataUser.status==="admin" && !noEdit &&d.quota===0 && (
                        <span onClick={()=> deleteTrip(d.id)} style={{"color":"white", "width":"80px"}} className="btn-icon"><RiDeleteBinFill size="40px" color="white" /></span>
                    )
                }
            </div>

        </Col>
    )
}

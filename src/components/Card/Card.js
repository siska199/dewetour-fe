import {Col} from 'react-bootstrap'

export default function Card({data}) {
    return (
        <div className="container mb-5 c-info">
            <div className="row px-3 justify-content-center">
                {
                    data.map((d,i)=>(
                        <CardComponent key={i} plus={d}/>
                    ))
                }
            </div>
        </div>
    )
}

function CardComponent({plus}){
    return(
        <Col lg={3} md={4} sm={6} xs={9} className="card-component mb-4 px-lg-4 px-md-2 px-sm-2">
            <div style={{"height": "350px"}} className="card text-center px-3 py-5">
                <p>
                    <img src={plus.img} alt="" />
                </p>
                <p style={{"fontSize": "24px","fontWeight":"800"}} className="">{plus.title}</p>
                <p className="card-text">{plus.info}</p>
            </div>
        </Col>
    )
}
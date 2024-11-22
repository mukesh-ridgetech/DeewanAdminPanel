import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { baseurl } from '../helper/Helper'

const PropertiesDetails = ({id}) => {

   const [data,setData] = useState();
    useEffect(()=>{
        fetchDataById()
    },[])

    const fetchDataById = async()=>{
            try {
                const response = await axios.get(`${baseurl}/api/properties/getById/${id}`)
                 console.log(response?.data);

                 if(response.data){
                    setData(response?.data);
                 }
            } catch (error) {
                 console.log(error);
            }
    }
   
  return (
    <div>


         <div className='properties-container'>
             <div className='properties-left'>
                <div className='properties-left-left'>
                   <strong>Properties Name</strong>
                   <strong>Properties Category</strong>
                   <strong>Properties Status</strong>
                   <strong>Properties Type</strong>
                   <strong>Properties Age</strong>
                   <strong>Properties Price</strong>
                </div>

                <div className='properties-left-right'>
                <div>:</div>
                <div>:</div>
                <div>:</div>
                <div>:</div>
                <div>:</div>
                </div>

                <div className='properties-left-right'>
                <div>{data?.propertiesName}</div>
                <div>{data?.propertiesCategory}</div>
                <div>{data?.propertiesStatus}</div>
                <div>{data?.propertiesType}</div>
                <div>{data?.propertiesAge}</div>
                <div>{data?.price}</div>
                </div>

             </div> 

             <div className='properties-right'>
             <div className='properties-left-left'>
                   <strong>Properties Name</strong>
                   <strong>Properties Category</strong>
                   <strong>Properties Status</strong>
                   <strong>Properties Type</strong>
                   <strong>Properties Age</strong>
                   <strong>Properties Price</strong>
                </div>

                <div className='properties-left-right'>
                <div>:</div>
                <div>:</div>
                <div>:</div>
                <div>:</div>
                <div>:</div>
                </div>

                <div className='properties-left-right'>
                <div>{data?.Status}</div>
                <div>{data?.address}</div>
                <div>{data?.bhkType}</div>
                <div>{data?.description}</div>
                <div>{data?.mapCenter.map((item)=>{
                     return(
                          <>
                          {item}
                          </>
                     )
                })}</div>
                <div>{data?.price}</div>
                </div>
             </div>
         </div>
    </div>
  )
}

export default PropertiesDetails


import React,{useState,useEffect} from 'react'
const Pagination = ({showPerpage,onPaginationchange,total}:any) => {
const[counter,setCounter]=useState(1);
useEffect(()=>{
const value=showPerpage*counter;
console.log("start value",value-showPerpage);
console.log("end value",value);
onPaginationchange(value-showPerpage,value);
},[counter]);


const onButtonClick=(type:any)=>{
    if(type==="prev"){
        if(counter===1){
            setCounter(1);
        }else{
            setCounter(counter-1);
        }

    }
    else if(type==="next"){
        if(Math.ceil(total/showPerpage)===counter){
            setCounter(1)
        }
        else{
            setCounter(counter+1);
        }
       // setCounter(counter+1);

    }

}
  return (
    <>
    <div className='d-flex justify-content-between'>
    <button className="btn btn-primary" onClick={()=>onButtonClick("prev")}>Previous</button>
    <button className="btn btn-primary "onClick={()=>onButtonClick("next")}>Next   </button>
    </div></>
  )
}

export default Pagination
import React,{useState,useEffect} from 'react'
import {products} from './Data.js'
import axios from 'axios';
import Popup from './Popup.js'
function toggleFlag(index){
    let x = document.querySelectorAll(`.flag-${index}`)
    let a = 0;
    x.forEach(item=> {
        a ++;
        item.classList.toggle('active');
    }
    )
}
function ProductItems() {
    function buyItem(props,size,index){
        if (!sessionStorage.getItem('email')){
            window.location = "/login";
            return;
        }
        var x = JSON.parse(sessionStorage.getItem('Order'))
        for(const a in x){
            let com = JSON.parse(x[a])
            if (com[0] === props[0] && com[5]===size){
                com[4]++;
                x[a] = JSON.stringify(com)
                sessionStorage.setItem('Order',JSON.stringify(x));
                return;
          }
        }
        x.push(JSON.stringify({0:index,1:props[1],2:props[2],3:props[3],4:1,5:size}));
        sessionStorage.setItem('Order',JSON.stringify(x));  
    }
    const [Popple,setPopple] = useState(-1);
    const [a,setA] = useState(1);
    const [data,setData] = useState([]); 
    const [stop,setStop] = useState(0);
    const [b,setB] = useState(1);
    const [c,setC] = useState(0);
    function checkData(){
        if (stop===1)
            return;
        if (JSON.parse(sessionStorage.getItem('Data'))){
            setStop(1)
            setData(JSON.parse(sessionStorage.getItem('Data')));
        }
        else setData([]);
    }
    useEffect(() => {
        setTimeout(() => {
            checkData();
        }, 1000);
      });
    return (
        <div className="box-container">
            {data.map(function(ex,index){
                let props = JSON.parse(ex);
                return(
                    <div className="box" data-item={props[7]}>
                        <div className="icons">
                            <a className="fas fa-shopping-cart" onClick={()=>buyItem(props,JSON.parse(props[8])[0],index)}></a>
                            <a className = {`flag-${index} fas fa-heart heart`} onClick={ ()=> toggleFlag(index) }></a>
                            <a className="fas fa-eye" onClick={()=>{setPopple(index); setA(JSON.parse(props[8])[0]); setB(props[2])}}></a>
                        </div>
                        <div className="image">
                            <img src={props[2]} alt=""/>
                        </div>
                        <div className="content">
                            <h3>{props[1]}</h3>
                            <div className="price">
                                <div className="amount">{props[3]} VND</div>
                            </div>
                        </div>
                        {Popup(props,Popple,index,setPopple,a,setA,b,setB,c,setC)}
                    </div>
                )
            })}
        </div>
    );
}


export default ProductItems

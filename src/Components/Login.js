import React, { useEffect, useState } from 'react'
import axios from "axios"
import { BiUserCircle } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const  Navigate = useNavigate()
    const [email, setEmail] = useState();
    const [resend, setResend] = useState(false);
    const [otpStatus, setOtp] = useState(false);
    const [otpVal, setOtpVal] = useState();
    const [exp, setExp] = useState(false);


    const otpGenerate = async () => {
        let respOtp 
        if(email?.length>8)
        {
            respOtp = await axios({
                url: "https://quaint-bandanna-bear.cyclic.app/auth/",
                method: "post",
                data: {
                    email: email,
                }
            })
        }
        else
        {
            alert('plase fill valid email')
            return
        }
        if (respOtp.data[0]) {

            setOtp(true)
        }
        else {
            setResend(true)
        }
    }
    const VerifyOtp= async()=>{
        let respOtp
        if(toString(otpVal)?.length>=4)
        {
            respOtp = await axios({
                url: "https://quaint-bandanna-bear.cyclic.app/auth/verify",
                method: "post",
                data: {
                    otp: otpVal,
                    email:email
                }
            })
            // console.log(respOtp.data);
            if(respOtp.data?.verify?.[0])
            {
                localStorage.setItem('email',email)
                alert('succes')
                Navigate("/home")
            }
            else
            {
                alert("expire otp")
                setExp()
            }
        }
    }

    

   

    return (
        <div className='Login'>
        
            <button className='Button connectButton' onClick={()=>props.requestAccount()} >{props.accountAddress > 0 ? `${props.accountAddress.substring(0, 6)}...${props.accountAddress.substring(38)}` : "Connect Wallet" }</button>
            
            <div className='boxShadow login__card'>
                <div>
                    <BiUserCircle />
                </div>
                {otpStatus ? <>

                    <div className='login__card_input  '>
                        <input placeholder='Otp' className='boxShadow' type="number" value={otpVal} onChange={(e) => e.target.value >=0&&setOtpVal(e.target.value)} />
                        <button className='Button' onClick={VerifyOtp} >Verify</button>
                    </div>

                </> :
                    <>
                        {
                            resend ?
                                <div className='login__card_input'>
                                    <input placeholder='Email' className='boxShadow' disabled={resend} type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <button onClick={otpGenerate} disabled={resend}>Resend</button>
                                </div> :
                                <div className='login__card_input  '>
                                    <input placeholder='Email' className='boxShadow' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <button className='Button' onClick={otpGenerate} >Generate Otp</button>
                                </div>
                        }
                    </>
                }




            </div>
        </div>
    )
}

export default Login
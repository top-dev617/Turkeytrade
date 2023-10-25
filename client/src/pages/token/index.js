import LoadingBtn from '@/components/commons/buttons/LoadingBtn';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CryptoJS from 'crypto-js';

const Token = () => {
    const { register, handleSubmit } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [tokens, setTokens] = useState([])
    const secret = 'very-secret-key';

    const encryptData = (payload) => {
        const data = CryptoJS.AES.encrypt(
            JSON.stringify(payload),
            secret
        ).toString();
        return data
    }

    const decryptData = (payload) => {
        const bytes = CryptoJS.AES.decrypt(payload, secret);
        const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return data
    };


    const handleGet = () => {
        fetch("https://turkey-tm-server-v2.onrender.com/api/v2/token")
            .then(res => res.json())
            .then(data => {
                setTokens(data?.data)
            })
    }

    useEffect(() => {
        handleGet()
    }, [])

    const handleToken = async (data) => {
        setIsLoading(true)
        const token = await encryptData(data?.token)

        fetch("https://turkey-tm-server-v2.onrender.com/api/v2/token", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ token: token })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.status) {
                    handleGet()
                }
                setIsLoading(false)
            })
    }


    function decodeToken(token) {
        try {
            const decodedToken = jwt.verify(token, secret);
            return decodedToken;
        } catch (error) {
            return null;
        }
    }

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>

            <div>
                <h3 style={{ textAlign: 'center', marginBottom: "40px" }}>My Tokens</h3>


                <ol style={{ marginBottom: "40px" }}>
                    {
                        tokens?.map((t, i) => <li key={i}
                            style={{ marginBottom: "10px" }}

                        >
                            <div style={{ border: "2px solid green", padding: "5px" }}>
                                <p>{t.token}</p>
                                <small style={{ color: "red" }}>{decryptData(t.token)}</small>
                            </div>
                        </li>)
                    }

                </ol>

            </div>
            <br />
            <form onSubmit={handleSubmit(handleToken)}>
                <input {...register("token", { required: true })} name='token' type='text' required
                    style={{ width: "100%", height: "50px", padding: "20px 5px", marginBottom: "20px" }} placeholder='Enter Your Token Key' />
                {
                    isLoading ? <LoadingBtn /> : <button className='submit_btn' type='submit'>Submit</button>
                }
            </form>
        </div>
    );
};

export default Token;
import React from 'react';
import { useForm } from 'react-hook-form';

const SendMessageBox = ({ sendMessage }) => {
    const { handleSubmit, register, reset } = useForm()
    const handleMessage = (data) => {
        sendMessage(data.message)
        reset()
    }
    return (
        <form onSubmit={handleSubmit(handleMessage)} className="chatting_footer">
            <input {...register("message", { required: true })}
                className="w-100 border-0 bg-transparent p-3 border-top border-black"
                type="text"
                name='message'
                placeholder="Send a message"
            />
            <div className="d-flex justify-content-between p-3">
                <button className="border-0 bg-transparent">
                    <i className="fa-solid fa-image text-secondary"></i>
                </button>
                <button type='submit'
                    className="border-0 bg-transparent"
                >
                    <i className="fa-solid fa-paper-plane text-secondary"></i>
                </button>
            </div>
        </form>
    );
};

export default SendMessageBox;
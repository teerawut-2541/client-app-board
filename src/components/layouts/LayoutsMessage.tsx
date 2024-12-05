"use client"
import React, { ReactNode } from "react"
import { ModalMessage } from "@/components/Modal"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { closeMessageError } from "@/redux/reducer/message"

interface LayoutsMessageProps {
    children?: ReactNode
}
const LayoutsMessage: React.FC<LayoutsMessageProps> = ({ children }) => {
    const dispatch = useDispatch()
    const message = useSelector((state: RootState) => state.message)
    const closeMessage = () => {
        dispatch(closeMessageError())
    }
    
    return (
        <>
            {children}
            {message.isOpen && <ModalMessage isOpen={message.isOpen} onOpenChange={() => closeMessage()} title='Error !' message={message.message} />}
        </>
    )
}

export default LayoutsMessage

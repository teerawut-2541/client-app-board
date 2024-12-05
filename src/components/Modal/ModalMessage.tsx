import React from "react"
import { Modal as Modals, ModalContent, ModalBody } from "@nextui-org/modal"
import { Button } from "@nextui-org/button"
import { ErrorIcon } from "../icon"

interface ModalMessageProps {
    title: string
    isOpen: boolean
    message: string
    onOpenChange: () => void
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full"
    placement?: "auto" | "top" | "bottom" | "center" | "top-center" | "bottom-center"
}

const ModalMessage: React.FC<ModalMessageProps> = ({ title, isOpen, onOpenChange, size = "xs", placement = "center", message }) => {
    return (
        <Modals className='p-2' size={size} isOpen={isOpen} placement={placement} onOpenChange={onOpenChange}>
            <ModalContent className='p-1'>
                <ModalBody>
                    <div className="p-2">
                        <div className='flex flex-col justify-center'>
                            <span className='flex-1 justify-items-center'>
                                <ErrorIcon size={60}/>
                            </span>
                            <h3 className='flex-1 text-center mt-4 font-black font text-xl'>{title}</h3>
                            <span className='flex-1 text-center mt-2 font-semibold text-base'>{message}</span>
                        </div>
                        <div className='flex justify-center mt-8'>
                            <Button className='bg-[#F23536]' color='danger' onClick={onOpenChange}>
                                close
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modals>
    )
}

export default ModalMessage

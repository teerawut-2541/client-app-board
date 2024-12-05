import React from "react"
import { Modal as Modals, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal"

interface ModalProps {
    title?: string
    children: React.ReactNode
    isOpen: boolean
    onOpenChange: () => void
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full"
    placement?: "auto" | "top" | "bottom" | "center" | "top-center" | "bottom-center"
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onOpenChange, children, size = "lg", placement = "center" }) => {
    return (
        <Modals className="p-4" size={size} isOpen={isOpen} placement={placement} onOpenChange={onOpenChange}>
            <ModalContent className='p-1'>
                <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
                <ModalBody>{children}</ModalBody>
            </ModalContent>
        </Modals>
    )
}

export default Modal

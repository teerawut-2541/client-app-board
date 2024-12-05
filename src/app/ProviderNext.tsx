"use client"

import React, { ReactNode } from "react"
import { NextUIProvider } from "@nextui-org/react"
import { Provider } from "react-redux"
import store from "@/redux/store"
import LayoutsMessage from "@/components/layouts/LayoutsMessage"

interface ProviderNextProps {
    children?: ReactNode
}

const ProviderNext: React.FC<ProviderNextProps> = ({ children }) => {
    return (
        <Provider store={store}>
            <NextUIProvider>
                <LayoutsMessage>{children}</LayoutsMessage>
            </NextUIProvider>
        </Provider>
    )
}

export default ProviderNext

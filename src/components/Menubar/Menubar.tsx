import React from "react"
import DownOutlined from "@/components/icon/DownOutlined"
import { InputSearch } from "@/components/Input"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, useDisclosure } from "@nextui-org/react"
import type { Selection } from "@nextui-org/react"
import { Modal } from "../Modal"
import { FormPost } from "../Form"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useRouter } from "next/navigation"

interface MenubarProps {
    onChangeValue?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onDropdown: (e: string) => void
    onTrigger:()=> void
}

const Menubar: React.FC<MenubarProps> = ({ onChangeValue, onDropdown, onTrigger }) => {
    const router = useRouter()
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["text"]))
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const authState = useSelector((state: RootState) => state.auth)
    const itemMenu = ["History", "Food", "Pets", "Health", "Fashion", "Exercise", "Others"]
    const selectedValue = React.useMemo(() => Array.from(selectedKeys).join(", ").replaceAll("_", " "), [selectedKeys])

    return (
        <div className='flex flex-row'>
            <div className='flex flex-row gap-2 w-full p-1'>
                <div className='w-full'>
                    <InputSearch onChange={onChangeValue} />
                </div>
                <div>
                    <Dropdown className='p-0 rounded-lg'>
                        <DropdownTrigger>
                            <Button variant='light' className='capitalize' endContent={<DownOutlined />}>
                                {selectedValue === "text" ? "Community" : selectedValue}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label='Single selection example'
                            className='p-0'
                            variant='flat'
                            disallowEmptySelection
                            selectionMode='single'
                            selectedKeys={selectedKeys}
                            onSelectionChange={setSelectedKeys}>
                            {itemMenu.map((e) => (
                                <DropdownItem
                                    onClick={() => onDropdown(e)}
                                    color='primary'
                                    value={e}
                                    className='m-0 rounded-lg hover:text-black hover:bg-green-100'
                                    key={e}
                                    textValue={e}>
                                    <span className='text-black'>{e}</span>
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div>
                    <Button color='primary' onClick={()=> authState.isLogin ? onOpen() :  router.push("/sign-in")}>
                        Create +
                    </Button>
                </div>
            </div>

            <aside className='w-64 p-4 overflow-y-auto hidden lg:block'></aside>

            <Modal title='Create Post' size='2xl' isOpen={isOpen} onOpenChange={onOpenChange}>
                <FormPost onTrigger={onTrigger} onOpenChange={onOpenChange} />
            </Modal>
        </div>
    )
}

export default Menubar

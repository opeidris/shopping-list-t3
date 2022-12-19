import { ShoppingItem } from "@prisma/client"
import { Dispatch, FC, SetStateAction, useState } from "react";
import { trpc } from "../utils/trpc"

interface ItemModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>
  setItems: Dispatch<SetStateAction<ShoppingItem[]>>
}

const ItemModal: FC<ItemModalProps> = ({setModalOpen, setItems}) => {
  const [input, setInput] = useState<string>('')
  const {mutate: addItem} = trpc.item.addItem.useMutation({onSuccess(shoppingItem) {
    setItems((prev) => [...prev, shoppingItem])
  }})


  return <div className="absolute inset-0 flex items-center justify-center bg-black/75">
    <div className="p-3 space-y-4 bg-white rounded-sm">
      <h3 className="text-xl font-medium">Name of Item</h3>
      <input
        type="text"
        value={input}
        onChange = {(e) => setInput(e.target.value)}
        name="" 
        id="" 
        className=" w-full rounded-md bg-gray-200 border border-gray-300 focus:ring focus:ring-violet-300" />
      <div className="flex justify-end">
        <button
         type="button"
         onClick={() => setModalOpen(false)}
         className=" rounded-md bg-gray-500 p-2 text-sm text-white transition hover:bg-gray-600 mr-2">
          Cancel
        </button>
        <button
         type="button"
         onClick={() => {
          addItem({name: input})
          setModalOpen(false)
        }}
         className=" rounded-md bg-violet-500 p-2 text-sm text-white transition hover:bg-violet-600">
          Add
        </button>
      </div>
    </div>
  </div>
}
 
export default ItemModal
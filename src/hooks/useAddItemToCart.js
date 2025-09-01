import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const useAddItemToCart = () => {
    const dispatch = useDispatch();
    const handleAddItem = (item) => {
        dispatch(addItem(item));
    }
    return handleAddItem;
}

export default useAddItemToCart;
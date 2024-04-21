import { Item } from "../../types/types";
import { formatCurrency } from "../../utils/helpers";

interface ItemProp 
{
    item: Item
}


function CartItem({ item }: ItemProp) {
    const { pizzaId, name, quantity, totalPrice } = item;
  
    return (
      <li>
        <p>
          {quantity}&times; {name}
        </p>
        <div>
          <p>{formatCurrency(totalPrice)}</p>
        </div>
      </li>
    );
  }
  
  export default CartItem;
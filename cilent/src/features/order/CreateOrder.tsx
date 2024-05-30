import { useState } from "react";
import { Form, redirect, useActionData, useNavigation, ActionFunctionArgs } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useAppDispatch, useAppSelector } from "../../hook";

import { INewOrder, INewOrderErrors} from "../../types/types";

import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../../store/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );



function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useAppSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';
  
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData() as INewOrderErrors;
  const dispatch = useAppDispatch();

  
  const cart = useAppSelector(getCart);
  const totalCartPrice = useAppSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if(!cart.length) return <EmptyCart/>

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold ">Ready to order? Let's go!</h2>

      

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" defaultValue={username} required />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          
            {formErrors?.phone && <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">{formErrors.phone}</p>}
            </div>
        </div>

        <div className="relative mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full
              "
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
          </div>

          {addressStatus === 'error' && <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">{errorAddress}</p>}
          
         {!position?.latitude && !position?.longitude && (
         
            <span className="absolute right-[3px] top-[3px] md:right-[5px] md:top-[5px] z-50">
            <Button
              type="small"
              disabled ={isSubmitting || isLoadingAddress}
              onClick={(e) => {
                e.preventDefault()
                dispatch(fetchAddress())
            }}>Get position</Button>
            </span>)}
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            className="h-6 w-6 
            accent-yellow-400 
            focus:ring 
            focus:ring-yellow-400
              focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name='position'
            value={
              position?.latitude && position.longitude 
                ? JSON.stringify(position)
                : ''
            }
          />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting ? 'Placing order...' : `Order now ${formatCurrency(totalPrice)}`}</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData);

  console.log(data);

  const order: INewOrder = {
    customer: data.customer as string,
    address: data.address as string,
    phone: data.phone as string,
    cart: JSON.parse(data.cart as string),
    priority: data.priority === "true",
    position: data.position as string
  };

  const errors: INewOrderErrors = {};

  if(!isValidPhone(order.phone)) 
    errors.phone = "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create new order and redirect
  const newOrder = await createOrder(order);
  
  // DO NOT over use
  store.dispatch(clearCart());

  if(Object.keys(errors).length > 0) return errors;

  return redirect(`/order/${newOrder.id}`);
} 

export default CreateOrder;
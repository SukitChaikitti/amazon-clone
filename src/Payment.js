import React , {useState , useEffect}from 'react';
import './Payment.css';
import {useStateValue} from './StateProvider';
import {Link, useHistory} from 'react-router-dom';
import Checkoutproduct from './Checkoutproduct';
import { CardElement , useStripe , useElements} from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import {db} from './firebase';


function Payment() {

    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [{basket , user} , dispatch] = useStateValue();

    const [processing , setProcessing] = useState("");
    const [succeeded , setSuccedded] = useState(false);
    const [error , setError] = useState(null);
    const [disabled , setDisabled] = useState(true);
    const [clientSecret , setClientSecret] = useState(true);

    useEffect(() => {
        const getClientSecret = async () => {

            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            
            setClientSecret(response.data.clientSecret);
            
        }

        getClientSecret();
    }, [basket])

    console.log(user.uid);
    console.log(clientSecret);

    const handlerSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {

            db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })

            setSuccedded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'

            })

            history.replace('/orders');
        })
    };

    const handlerChange = (e) => {
        setDisabled(e.empty);
        setError(e.error? e.error.message: '');
    };

    return (
        <div className = 'payment'>
            <div className = 'payment__container'>
                <h1>Checkout (<Link to = '/checkout'>{basket?.length} items</Link>)</h1>
                <div className = 'payment__section'>
                    <div className = 'payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className = 'payment__info'>
                        <p>{user?.email}</p>
                        <p>25 serithai</p>
                        <p>Bangkok , Thailand</p>
                    </div>
                </div>
                <div className = 'payment__section'>
                    <div className = 'payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className = 'payment__item'>
                        {basket?.map((product) => (
                            <Checkoutproduct id = {product.id} image = {product.image} price = {product.price} rating = {product.rating} title = {product.title}/>
                        ))}
                    </div>
                </div>
                <div className = 'payment__section'>
                    <div className = 'payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className = 'payment__method'>
                        <form onSubmit = {handlerSubmit}>
                            <CardElement onChange = {handlerChange}/>
                            <div className = 'payment__priceContainer'>
                                <CurrencyFormat renderText = {(value) => (
                                    <>
                                        <p>
                                            Subtotal ({basket?.length} items): <strong>{value}</strong>
                                        </p>
                                    </>
                                )}
                                decimalScale = {2}
                                value = {getBasketTotal(basket)}
                                displayType = {'text'}
                                thousandSeparator = {true}
                                prefix = {'$'}/>
                                <button  disabled = {processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing...</p>:"Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>Error</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment

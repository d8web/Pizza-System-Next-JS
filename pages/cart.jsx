import { useEffect, useState } from "react";
import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import OrderDetailModal from "../components/OrderDetailModal";

const cart = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const cart = useSelector((state) => state.cart);

    const [open, setOpen] = useState(false);
    const [cash, setCash] = useState(false);

    const amount = cart.total;
    const currency = "BRL";
    const style = { layout: "vertical" };

    const createOrder = async (data) => {
        try {
            const res = await axios.post("http://localhost:3000/api/orders", data);
            res.status === 201 && router.push("/orders/" + res.data._id);
            dispatch(reset());
        } catch (err) {
            console.log(err);
        }
    };

    const ButtonWrapper = ({ currency, showSpinner }) => {
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);

        return (
            <>
                {showSpinner && isPending && <div className="spinner" />}
                <PayPalButtons
                    style={style}
                    disabled={false}
                    forceReRender={[amount, currency, style]}
                    fundingSource={undefined}
                    createOrder={(data, actions) => {
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: amount,
                                        },
                                    },
                                ],
                            })
                            .then((orderId) => {
                                // Your code here after create the order
                                return orderId;
                            });
                    }}
                    onApprove={function (data, actions) {
                        return actions.order.capture().then(function (details) {
                            const shipping = details.purchase_units[0].shipping;
                            createOrder({
                                customer: shipping.name.full_name,
                                address: shipping.address.address_line_1,
                                total: cart.total,
                                method: 1,
                            });
                        });
                    }}
                />
            </>
        );
    };

    return (
        <div className={styles.container}>
            {cart.products.length > 0 ? (
                <>
                    <div className={styles.left}>
                        <table className={styles.table}>
                            <thead>
                                <tr className={styles.trTitle}>
                                    <th>Produto</th>
                                    <th>Nome</th>
                                    <th>Extras</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.products.map((product) => (
                                    <tr className={styles.tr} key={product._id}>
                                        <td>
                                            <div className={styles.imageContainer}>
                                                <Image
                                                    src={`/img/${product.img}`}
                                                    layout="fill"
                                                    objectFit="contain"
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <span className={styles.name}>{product.title}</span>
                                        </td>
                                        <td>
                                            <span className={styles.extras}>
                                                {product.extras.map((extra) => (
                                                    <span key={extra._id}>{extra.text},</span>
                                                ))}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={styles.price}>R$ {product.price}</span>
                                        </td>
                                        <td>
                                            <span className={styles.quantity}>
                                                {product.quantity}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={styles.total}>
                                                R$ {(product.price * product.quantity).toFixed(2)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.wrapper}>
                            <h2 className={styles.title}>Total do carrinho</h2>
                            <div className={styles.totalText}>
                                <b className={styles.totalTextTitle}>Subtotal: </b>R${" "}
                                {cart.total.toFixed(2)}
                            </div>
                            <div className={styles.totalText}>
                                <b className={styles.totalTextTitle}>Desconto: </b>R$ 0
                            </div>
                            <div className={styles.totalText}>
                                <b className={styles.totalTextTitle}>Total: </b>R${" "}
                                {cart.total.toFixed(2)}
                            </div>
                            {open ? (
                                <div className={styles.paymentMethods}>
                                    <button
                                        className={styles.payButton}
                                        onClick={() => setCash(true)}
                                    >
                                        Cash on Delivery
                                    </button>
                                    <PayPalScriptProvider
                                        options={{
                                            "client-id": "",
                                            components: "buttons",
                                            currency: "BRL",
                                            "disable-funding": "credit,card,p24,mercadopago"
                                        }}
                                    >
                                        <ButtonWrapper currency={currency} showSpinner={false} />
                                    </PayPalScriptProvider>
                                </div>
                            ) : (
                                <button onClick={() => setOpen(true)} className={styles.button}>
                                    Checkout
                                </button>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div>
                    <h2>Carrinho vazio! Adicione uma pizza ao carrinho.</h2>
                    <button>Ver Produtos</button>
                </div>
            )}

            {cash && (
                <OrderDetailModal total={cart.total} createOrder={createOrder} />
            )}
        </div>
    );
};

export default cart;

import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles/Admin.module.css";

const Orders = ({ orders }) => {

    const [orderList, setOrderList] = useState(orders);

    const status = ["Preparando", "A caminho", "Entregue"];

    const handleStatus = async (id) => {
        const item = orderList.filter((order) => order._id === id)[0];
        const currentStatus = item.status;

        try {
            const res = await axios.put("http://localhost:3000/api/orders/" + id, {
                status: currentStatus >= 4 ? 4 : currentStatus + 1,
            });
            setOrderList([
                res.data,
                ...orderList.filter((order) => order._id !== id),
            ]);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Pedidos</h1>
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.trTitle}>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Total</th>
                            <th>Pagamento</th>
                            <th>Status</th>
                            <th className={styles.rightTableItem}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList.map((item) => (
                            <tr className={styles.trTitle} key={item._id}>
                                <td>{item._id.slice(0, 5)}...</td>
                                <td>{item.customer}</td>
                                <td>R$ {item.total.toFixed(2).replace(".", ",")}</td>
                                <td>{item.method === 0 ? "dinheiro" : "pago"}</td>
                                <td>
                                    {status[item.status] ? status[item.status] : "Entregue"}
                                </td>
                                <td className={styles.rightTableItem}>
                                    <button
                                        className={styles.nextButton}
                                        onClick={() => handleStatus(item._id)}
                                    >
                                        Next
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || "";

    if (myCookie.token !== process.env.TOKEN) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            },
        };
    } else {
        const res = await axios.get(`http://localhost:3000/api/orders`)
        return {
            props: { orders: res.data }
        }
    }
};

export default Orders;

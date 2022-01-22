import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router"
import styles from "../../styles/Admin.module.css";

const Orders = () => {

    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [orderList, setOrderList] = useState([]);
    const [activePage, setActivePage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)

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

    const getOrders = async () => {
        const perPage = 5
        const productResponse = await axios.get(`http://localhost:3000/api/orders?page=${activePage}`)
        setOrderList(productResponse.data.orders)
        setTotalPages(Math.ceil(productResponse.data.totalPages / perPage))
        //console.log(productResponse.data.totalPages)
    }

    useEffect(() => {
        getOrders()
    }, [activePage])

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

                {totalPages > 0 && (
                    <div className={styles.paginationArea}>
                        {Array(totalPages)
                            .fill(0)
                            .map((item, index) => (
                                <div
                                    key={index}
                                    className={styles.paginationItem}
                                    style={{
                                        background: `${activePage == index + 1 ? "red" : ""}`,
                                        color: `${activePage == index + 1 ? "white" : ""}`,
                                    }}
                                    onClick={() => setActivePage(index + 1)}
                                >
                                    {index + 1}
                                </div>
                            ))}
                    </div>
                )}
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
    }

    return {
        props: {},
    };
};

export default Orders;

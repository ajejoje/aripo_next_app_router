"use client"
import useSWR from "swr"
import OrderCards from '@/components/order/OrderCards'
import Heading from '@/components/ui/Heading'
import { OrderWithProducts } from '@/src/types'

export default function OrdersPage() {
    const url = '/admin/orders/api'
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 1000,
        revalidateOnFocus: false
    })

    if (isLoading) return <p>Cargando...</p>

    if (data) return (
        <>
            <Heading>Administrar Ordenes </Heading>

            {data.length ? (
                <div className="grid grid-cols-1 lg:cols-2 2xl:grid-cols-3 gap-5 mt-5">
                    {data.map(order => (
                        <OrderCards
                            key={order.id}
                            order={order}
                        />
                    ))}
                </div>
            ) : <p className='text-center'>no hay  ordenes pendientes</p>}
        </>
    )
}

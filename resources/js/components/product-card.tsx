// resources/js/components/ProductCard.tsx
type ProductCardProps = {
    // image: string;
    title: string;
    price: number;
};

export default function ProductCard({  title, price }: ProductCardProps) {
    return (
        <div className="rounded-md border border-border-white p-4 text-white">
           <div className="h-96 w-full object-cover rounded-lg"></div>
            <div className="bg-black">

           </div>
            <h3 className="text-sm font-semibold truncate uppercase">{title}</h3>
            <p className="text-sm mt-1">{price.toFixed(2)} €</p>
        </div>
    );
}

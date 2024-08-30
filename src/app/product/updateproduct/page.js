"use client";
import { useEffect, useState,useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UpdateProduct() {
    const router = useRouter();
    const [products, setProducts] = useState([]); // State to hold an array of products
    const [isFetching, setIsFetching] = useState(true);
    const hasFetched = useRef(false);
    
    // Function to fetch product details by email
    const fetchProductDetails = async (email) => {
        try {
            const response = await axios.get('/api/product/userproduct', { params: { email } });
            setProducts(response.data); // Set the form data with fetched product details
        } catch (error) {
            toast.error(error.response?.data?.error || 'An error occurred while fetching products.');
        } finally {
            setIsFetching(false);
        }
    };

    // Use effect to fetch user details when the component mounts
    useEffect(() => {
        const fetchSessionAndUserDetails = async () => {
            const session = await getSession(); // Retrieve the session

            if (session && session.user) {
                const email = session.user.email;
                if (!hasFetched.current) { // Check if fetch has already occurred
                    hasFetched.current = true; // Set flag to true
                    fetchProductDetails(email);}
            } else {
                toast.error("User not authenticated.");
                router.push("/login"); // Redirect to login if not authenticated
            }
        };

        fetchSessionAndUserDetails();
    }, [router]); // Include router in the dependency array

    const handleChange = (e, index) => {
        const updatedProducts = [...products];
        updatedProducts[index][e.target.name] = e.target.value;
        setProducts(updatedProducts);
    };

    const handleSubmit = async (e, index) => {
        e.preventDefault();
        try {
           
            const response = await axios.put(`/api/product/userproduct?id=${products[index]._id}`, products[index]); // Assuming your API endpoint can handle individual product updates by ID
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.error || 'An error occurred while updating the product.');
        }
    };

    const handleDelete = async (productId) => {
        if (!productId) {
            toast.error("Product ID is required for deletion.");
            return;
        }

        try {
            const response = await axios.delete('/api/product/userproduct', { params: { id: productId } });
            toast.success(response.data.message);
            // Remove the deleted product from state
            setProducts(products.filter(product => product._id !== productId));
        } catch (error) {
            toast.error(error.response?.data?.error || 'An error occurred while deleting the product.');
        }
    };

    return (
        <div>
            <h2>Update Product</h2>
            {isFetching ? (
                <p>Loading product details...</p>
            ) : (
                products.map((product, index) => (
                    <form key={product._id} onSubmit={(e) => handleSubmit(e, index)}>
                        <input
                            name="email"
                            placeholder="Email"
                            value={product.email}
                            onChange={(e) => handleChange(e, index)}
                            required
                        />
                        <input
                            name="type"
                            placeholder="Type"
                            value={product.type}
                            onChange={(e) => handleChange(e, index)}
                        />
                        <input
                            name="subtype"
                            placeholder="Subtype"
                            value={product.subtype}
                            onChange={(e) => handleChange(e, index)}
                        />
                        <input
                            name="size"
                            placeholder="Size"
                            value={product.size}
                            onChange={(e) => handleChange(e, index)}
                        />
                        <input
                            name="color"
                            placeholder="Color"
                            value={product.color}
                            onChange={(e) => handleChange(e, index)}
                        />
                        <input
                            name="prizerange"
                            placeholder="Price Range"
                            type="number"
                            value={product.prizerange}
                            onChange={(e) => handleChange(e, index)}
                        />
                        <input
                            name="image"
                            placeholder="Image URL"
                            value={product.image}
                            onChange={(e) => handleChange(e, index)}
                        />
                        <input
                            name="gender"
                            placeholder="Gender"
                            value={product.gender}
                            onChange={(e) => handleChange(e, index)}
                        />
                        <input
                            name="discount"
                            placeholder="Discount"
                            type="number"
                            value={product.discount}
                            onChange={(e) => handleChange(e, index)}
                        />
                        <input
                            name="stockstatus"
                            placeholder="Stock Status"
                            value={product.stockstatus}
                            onChange={(e) => handleChange(e, index)}
                        />
                        <button type="submit">Update Product</button>
                        <button type="button" onClick={() => handleDelete(product._id)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
                            Delete Product
                        </button>
                    </form>
                ))
            )}
        </div>
    );
}

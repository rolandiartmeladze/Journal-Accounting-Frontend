import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductComponent from  '../ProductComponent/Product';
import viewProduct from '../ProductComponent/VievUpdate';

import Product from '../../Tools';

import { SortProduct } from "./Tools";
import { Navigation } from "./Tools";

const ProductTools = styled.div`
background: gainsboro;
    backdrop-filter: blur(5px);
    box-shadow: 0px 1px 5px 0px #000000;
    padding: 0 12px;
    `;


interface Props {
    incart: string[];
    setInCart: Function;
    favorits: string[];
    setFavorits: Function; 
    loading: boolean;
    setProduct: Function;
    setLoading: Function;
    product:any;
}



const ProductsConteiner = ({ incart, setInCart, favorits, setFavorits, loading, setProduct, setLoading, product }: Props) => {
        setLoading(true);
    const [respons, setRespons] = useState<any | null>(null); 
    const [category, setCategory] = useState("All"); 


        async function fetchData() {
            try { setRespons(await Product()); } 
            catch (error) { console.error('Error fetching product data:', error);}
        }
            useEffect(() => { fetchData()}, []);


            respons && setLoading(false);

    const clickF = (productId: string) => {
        viewProduct(productId, setProduct, setLoading);
        setLoading(true);
    };

    const NavigationProps = {setProduct, product, category};
     const ProductProps = {clickF, incart, setInCart, favorits, setFavorits, loading}

    return (
        <>
        <ProductTools>
        <Navigation items={['home', 'products', 'category']} {...NavigationProps} />
        <SortProduct setRespons={setRespons} setLoading={setLoading} category={category} setCategory={setCategory} respons={respons}  />
        </ProductTools>
        {loading && <h2>Loading ...</h2>}
            {respons && <ProductComponent products={respons}  {...ProductProps} />}
        </>
    );
};

export default ProductsConteiner;

// "use client";

// import { CollectionList } from "@/app/components/CollectionList";
// import { CurrentUserContext } from "@/app/contexts/currentUser";
// import { Collection, Product } from "@prisma/client";
// import { useContext, useEffect, useState } from "react";

// // export interface ProductWithCount extends Product {
// //   count: number;
// // }

// const CollectionPage = () => {
//   const userId = useContext(CurrentUserContext).currentUser.id;
//   // const [products, setProducts] = useState<ProductWithCount[]>([]);
//   const [collections, setCollections] = useState<Collection[]>([]);

//   const getCollection = async () => {
//     try {
//       const res = await fetch("/api/collections/" + userId);
//       const data: Collection[] = await res.json();
//       // setCollections(data);
//       return data;
//     } catch (e) {
//       console.log("Collection fetch error: " + e);
//     }
//   };

//   const getCollectionItems = async () => {
//     const tmp: ProductWithCount[] = [];

//     for (let i = 0; i < collections.length; i++) {
//       const count = collections[i].count;
//       try {
//         console.log("/api/products/" + collections[i].productId);
//         const res = await fetch("/api/products/" + collections[i].productId);
//         const data = await res.json();
//         tmp.push({ ...data, count });
//       } catch (e) {
//         console.log("Product fetch error: " + e);
//       }
//     }

//     setProducts(tmp);
//   };

//   useEffect(() => {
//     getCollection();
//   }, [userId]);

//   useEffect(() => {
//     getCollectionItems();
//   }, [collections]);

//   const removeCollection = (i: number) => {
//     setCollections(collections.filter((collection, index) => i != index));
//     setProducts(products.filter((product, index) => index != i));
//   };

//   return (
//     <CollectionList
//       collections={collections}
//       removeCollection={removeCollection}
//       products={products}
//     />
//   );
// };

// export default CollectionPage;

"use client";

import { CollectionList } from "@/app/components/CollectionList";

export const Collection = () => {
  return <CollectionList />;
};

export default Collection;

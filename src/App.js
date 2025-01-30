import "./App.css";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalpages, setTotalpages] = useState(0);

  const fetchProducts = useCallback(async () => {
    await axios
      .get(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data && data.products) {
          setProducts(data.products);
          // Ensure totalpages is a valid number and rounded up
          setTotalpages(Math.ceil(data.total / 10));
        }
      })
      .catch((error) => console.log(error));
  }, [page]); // Dependencies: only rerun if `page` changes

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // This ensures the effect runs when fetchProducts changes

  // Removed `page` dependency from `useMemo` since it's not necessary
  useMemo(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  const selectPagehandler = (e) => {
    if (e >= 1 && e <= totalpages) {
      setPage(e);
    }
  };

  return (
    <div className="App">
      {products.length > 0 && (
        <div className="container">
          {products.map((product) => {
            return (
              <span key={product.id} className="products">
                <img src={product.thumbnail} alt={product.title} />
                <span className="title">{product.title}</span>
                <p className="price">Price : {product.price}</p>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && totalpages > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "page_disable"}
            onClick={() => selectPagehandler(page - 1)}
          >
            ◀
          </span>
          {[...Array(totalpages > 0 ? totalpages : 1)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination_selected" : ""}
                onClick={() => selectPagehandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page < totalpages ? "" : "page_disable"}
            onClick={() => selectPagehandler(page + 1)}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}

export default App;

// function App() {
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);

//   const fetchProducts = async () => {
//     const res = await fetch("https://dummyjson.com/products?limit=100");
//     const data = await res.json();
//     if (data && data.products) {
//       setProducts(data.products);
//     }
//   };
//   console.log(products);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const selectPagehandler = (e) => {
//     if (e >= 1 && e < products.length / 10 + 1) {
//       setPage(e);
//     }
//   };

//   return (
//     <div className="App">
//       {products.length > 0 && (
//         <div className="container">
//           {products.slice(page * 10 - 10, page * 10).map((product) => {
//             return (
//               <span key={product.id} className="products">
//                 <img src={product.thumbnail} alt={product.title} />
//                 <span className="title">{product.title}</span>
//                 <p className="price">Price : {product.price}</p>
//               </span>
//             );
//           })}
//         </div>
//       )}
//       {products.length > 0 && (
//         <div className="pagination">
//           <span
//             className={page > 1 ? "" : "page_disable"}
//             onClick={() => selectPagehandler(page - 1)}
//           >
//             ◀
//           </span>
//           {[...Array(products.length / 10)].map((_, i) => {
//             return (
//               <span
//                 className={page === i + 1 ? "pagination_selected" : "sp"}
//                 onClick={() => selectPagehandler(i + 1)}
//                 key={i}
//               >
//                 {i + 1}
//               </span>
//             );
//           })}
//           <span
//             className={page < products.length / 10 ? "" : "page_disable"}
//             onClick={() => selectPagehandler(page + 1)}
//           >
//             ▶
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }

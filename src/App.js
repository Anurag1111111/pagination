import "./App.css";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalpages, setTotalpages] = useState(0);

  // Function to fetch products
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`
      );
      const data = response.data;
      console.log(data);
      if (data && data.products) {
        setProducts(data.products);
        // Validate totalpages and round it up to the nearest integer
        const totalPages = data.total > 0 ? Math.ceil(data.total / 10) : 1; // Ensure at least 1 page
        setTotalpages(totalPages);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  }, [page]);

  // Fetch products when the page changes
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Scroll to top when page changes
  useEffect(() => {
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
          {products.map((product) => (
            <span key={product.id} className="products">
              <img src={product.thumbnail} alt={product.title} />
              <span className="title">{product.title}</span>
              <p className="price">Price : {product.price}</p>
            </span>
          ))}
        </div>
      )}

      {totalpages > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "page_disable"}
            onClick={() => selectPagehandler(page - 1)}
          >
            ◀
          </span>

          {/* Generate pagination only if totalpages is valid */}
          {[...Array(totalpages)].map((_, i) => (
            <span
              className={page === i + 1 ? "pagination_selected" : ""}
              onClick={() => selectPagehandler(i + 1)}
              key={i}
            >
              {i + 1}
            </span>
          ))}

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

import ProductCard from './ProductCard';
import './styles/WishList.css';
import { UserContext } from './UserContext';
import { useContext, useEffect, useState } from 'react';
import { getReq } from './DAL/serverData';

function WishList() {
  const { user } = useContext(UserContext);
  const [wishList, setWishList] = useState(null);

  const getUserWishList = async () => {
    let newWishList;
    if (user) {
      newWishList = await getReq(`wishlist?user-id=${user.userId}`);
    } else {
      newWishList = JSON.parse(localStorage.getItem('guestWishlist'));
    }
    const wishListProductsArray = await generateWishlistProducts(newWishList);
    setWishList(wishListProductsArray);
  };

  const generateWishlistProducts = async wishlist => {
    const wishListProductsArray = [];
    if (wishlist.length > 0) {
      for (const wishListProduct of wishlist) {
        const product = await getProductById(wishListProduct.productId);
        const productImageSrc = await getProductImageById(
          wishListProduct.productId
        );
        product.image = productImageSrc;
        wishListProductsArray.push(product);
      }
    }
    return wishListProductsArray;
  };

  const getProductById = async id => {
    const product = await getReq(`products/${id}`);
    return product;
  };

  const getProductImageById = async id => {
    const productImage = (await getReq(`product-images/${id}`))[0].imageSrc;
    return productImage;
  };

  useEffect(() => {
    getUserWishList();
  }, []);

  return (
    <>
      {wishList && (
        <div className="container wishlist-container">
          <h1 className="wishlist-title">Your Wish List</h1>
          {!wishList.length && (
            <ProductCard
              page="wishlist"
              wishListMessage="No products in wishlist."
            />
          )}
          {wishList.length > 0 &&
            wishList.map((wishListItem, idx) => (
              <ProductCard
                key={idx.toString()}
                page="wishlist"
                wishListItem={wishListItem}
                wishListRender={{ wishList, setWishList }}
                generateWishlistProducts={generateWishlistProducts}
              />
            ))}
        </div>
      )}
    </>
  );
}

export default WishList;

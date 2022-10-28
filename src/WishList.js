import ProductCard from './ProductCard';
import './styles/WishList.css';
import { UserContext } from './UserContext';
import { useContext, useEffect, useState } from 'react';
import { getReq } from './DAL/serverData';

function WishList() {
  const { user, setUser } = useContext(UserContext);
  const [wishList, setWishList] = useState(null);

  const getUserWishList = async () => {
    const newWishList = await getReq(`wishlist?user-id=${user.userId}`);
    const wishListProductsArray = [];
    if (newWishList.length > 0) {
      for (const wishListProduct of newWishList) {
        const product = await getProductById(wishListProduct.productId);
        const productImageSrc = await getProductImageById(
          wishListProduct.productId
        );
        product.image = productImageSrc;
        wishListProductsArray.push(product);
      }
    }
    setWishList(wishListProductsArray);
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
  }, [wishList]);

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
              />
            ))}
        </div>
      )}
    </>
  );
}

export default WishList;

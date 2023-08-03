import React, { useState } from "react";
import { useEffect } from "react";
import { addToCart,getAllProducts,  getCategories } from "./Api";
import { Card, List, Image, Typography, Badge, Rate, Button, message } from "antd";
import { useParams } from "react-router";
const Products = () => {
  const [items, setItems] = useState([]);
const params=useParams();

  useEffect(() => {

    console.log('Products',params)
    params?.category
    ? getCategories(params.category).then((res) => {
      setItems(res.products);
    }) : getAllProducts().then((res) => {
      setItems(res.products);
    })
  }, [params]);
  return (
    <div>
      <List
        grid={{ column: 3 }}
        renderItem={(item, index) => {
          return (
            <Badge.Ribbon className="itemCardBadge" text={item.discountPercentage}
            color="pink">
            <Card  className="itemCard"
              title={item.title}
              key={index}
              cover={<Image className="itemCardImage" src={item.thumbnail} />}
              actions={[<Rate  disabled allowHalf value={item.rating}></Rate>,
              <AddToCartButton item={item} />]} >
                
              <Card.Meta
                title={
                  <Typography.Paragraph>
                    <h4>
                      Price:${item.price}
                      {"  "}
                    </h4>
                    <Typography.Text delete type="danger">
                      {parseFloat(
                        item.price +
                          (item.price * item.discountPercentage) / 100
                      ).toFixed(2)}
                    </Typography.Text>
                  </Typography.Paragraph>
                }
                description={<Typography.Paragraph ellipsis={{rows:1,expandable:true,symbol:"more"}}>{item.description}</Typography.Paragraph>}
              ></Card.Meta>
              
            </Card>
            </Badge.Ribbon>
          );
        }}
        dataSource={items}
      ></List>
    </div>
  );
};
function AddToCartButton({item}) {
  const addProductToCart=()=>{
    addToCart(item.id).then((res)=>{
      message.success(`${item.title}has been added to cart`)
    })
  }
 return <Button type="link " onClick={()=>{
  addProductToCart()
 }}>Add To Cart</Button>
}
export default Products;

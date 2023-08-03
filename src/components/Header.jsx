import { Drawer, InputNumber, Menu,Button, Table, Form, Input } from 'antd'
import{HomeFilled, ShoppingCartOutlined} from "@ant-design/icons"
import React, { useEffect, useState } from 'react'
import "./style.css"
import{useNavigate}from "react-router-dom"
import { Badge } from 'antd';
import { getCart } from './Api'
import FormItem from 'antd/es/form/FormItem'
const Header = () => {
   const navigate=useNavigate()

    const menuClicked=(item)=>{
       navigate(`/${item.key}`)
    }
    
    const[cartDrawer,setCartDrawer]=useState(false);
    const [cartItems, setCartItems] = useState(false);
    const [cart, setCart] = useState([]);
    useEffect(()=>{
      getCart().then((res)=>{
         setCart(res.products)
      })
    },[])
  return (
    <div className='headerDiv'>
         
      <Menu onClick={menuClicked} items={[
        {
        label:<HomeFilled/>,
        key: ''
      },
      {
        label:"Men",
        key: 'men',
        children:[{
            label:"Mens-shirts",
            key:'mens-shirts'
        },
        {
            label:"Men_ watches",
            key:'mens-watches'
        },{
            label:"Men-shoes",
            key:'mens-shoes'
        },{
            label:"Men-shorts",
            key:'men-shots'
        },{
            label:"Men-soaps",
            key:'men-soaps'
        }
    ]
      },
      {
        label:"Women",
        key: 'women',
        children:[{
            label:"Women-shits",
            key:'womens-dresses',
        },
        {
            label:"Women_ watches",
            key:'womens-watches',
        },{
            label:"Women-shoes",
            key:'women-shoes'
        },{
            label:"Women-jewellery",
            key:'womens-jewellery'
        },{
            label:"Women-soaps",
            key:'women-soaps'
        }
    ]
      },
      {
        label:"Fragrances",
        key: 'fragrances'
      },
      ]} mode='horizontal'>
      </Menu>
 <Badge className='cart' onClick={()=>{
  setCartDrawer(true)
 }} count={7}> <ShoppingCartOutlined /></Badge>
     <Drawer open={cartDrawer} onClose={()=>{
      setCartDrawer(false);
     }} title="Your cart"
     contentWrapperStyle={{width:"600px"}}
     >
      <Table
      pagination={false}
      columns={[{
        title:'Title',
        dataIndex: 'title',
      },{
        title:'Quantity',
        dataIndex: 'quantity',
        render:(value)=>{
        return( <InputNumber min={1} defaultValue={value}></InputNumber>) 
        }
      },{
        title:'Price',
        dataIndex: 'price',
       render:(value)=>{
        return <span>${value}</span>
       }
      },{
        title:'Total',
        dataIndex: 'total',
        render:(value)=>{
         return <span>${value}</span>
        }
      }
      ]} dataSource={cart}
      summary={(data)=>{
        const total=data.reduce((pre,current)=>{
          return pre+current.total;
        },0)
        return <span>Total:{total}</span>
      }}>
      </Table>
      <Button onClick={()=>{
        setCartItems(true)
      }} type='primary'>CheckOut your cart</Button>
     </Drawer>
     <Drawer open={cartItems}
     onClose={()=>{setCartItems(false)}}>
      <Form>
        <FormItem label='Full Name' name={'full name'} rules={[{
          require:true,
          message:'please enter a full name'
        }]
        }>
          <Input placeholder='Enter your full name'></Input>
        </FormItem>
        <FormItem label='Email' name={'email'} rules={[{
           require:true,
           message: 'Please enter a valid email'
        }]
        }>
          <Input placeholder='Enter your email'></Input>
        </FormItem>
        <FormItem label='Address' name={'address'} rules={[{
           require:true,
           message: 'Please enter a valid address'
        }]
        }>
          <Input placeholder='Enter your Address'></Input>
        </FormItem>
        <Button type='primary'>Add to cart</Button>
      </Form>
     </Drawer>
    </div>
  )
}

export default Header

import React from 'react'
import { Link } from 'react-router-dom'

const EmptyCart = ({Animation}) => {
  return (
    <div  data-testid="emptyCart">
      
      <div className="d-flex  flex-column align-items-center justify-content-center border gap-1 py-3">
          <img src={Animation} />
          <h4>your cart is empty</h4>
          <Link to="/" className="btn-primary rounded-1 btn px-5 ">
            Shop Now
          </Link>
        </div>
    </div>
  )
}

export default EmptyCart

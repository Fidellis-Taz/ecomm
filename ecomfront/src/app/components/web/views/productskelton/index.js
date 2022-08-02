import React from 'react'
import classes from "./ProductSkeleton.module.css"



function ProductSkeleton() {
  return (
    <div className="row">
      {[1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12,13].map((product_skeleton, index) => (
      <div className={`${classes.card} ${classes.loading} col-6 col-sm-4 col-md-3`} key={index}>
        <div className={classes.image}>

        </div>
        <div className={classes.content}>
          <h4></h4>
          <div className={classes.description}>
          </div>
        </div>
      </div>
      ))}
    </div>
  )
}

export default ProductSkeleton



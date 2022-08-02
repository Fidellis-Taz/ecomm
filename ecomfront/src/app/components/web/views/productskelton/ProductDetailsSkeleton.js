import React from 'react'
import classes from "./ProductDetailsSkeleton.module.css";

function ProductDetailsSkeleton() {
    return (
        <div className={`${classes.product_skeleton} row`}>
      	<div className={classes.card}>
		<div className={`${classes.card_img} ${classes.skeleton}`}>
			
		</div>
		<div className={classes.card_body}>
			<h2 className={`${classes.card_title} ${classes.skeleton}`}>
			
			</h2>
			<p className={`${classes.card_intro} ${classes.skeleton}`}>
				
			</p>
		</div>
	</div>

            <div className={`${classes.product_detail} `}>
                <div className={`${classes.line_breadcrumb} ${classes.pulse}`}></div>
                <div className={`${classes.line_product_title} ${classes.pulse}`}></div>
                <div className={`${classes.line_product_cost} ${classes.pulse}`}></div>
            </div>
        </div>
    )
}

export default ProductDetailsSkeleton;
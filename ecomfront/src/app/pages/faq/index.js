import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core/";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Faq() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <section className="section-padding bg-white">
        <Helmet>
          <meta charSet="utf-8" />
          <title>FAQ</title>
          <meta name="title" content="FAQ" />
          <meta name="description" content="FAQ" />
          <meta
            name="keyword"
            content="SuperMarket,online shopping,online shopping janakpur,online market Kathmandu,online shopping Nepal, online shopping, online store,online supermarket,cloth nepal,grocery pune, online home and kitchen shopping nepal,Men's wear, Women's Shopping in Nepal. Summer wears, Wedding Dresses, Gifts, Offers and Deals in Nepal, food shopping online,Online Grocery dhangadhi, online grocery Jaleswar"
          ></meta>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />

          <link rel="canonical" href={window.location.href} />
        </Helmet>
        <div className="container">
          <div className="row privacy-policy">
            <div className="col-lg-12 col-md-12 pl-12 pr-12">
              <div className="default-title text-center">
                <h2>Vendor's & Customer's Perspective</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                <h4>1.How I sell my product on SuperMarket.?</h4>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                First you have click on starting selling button available on
                website button area. And you will see contact us field. You have
                to fill that area. After few days SuperMarket will contact You.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                <h4>2.Which type a product can I sell on SuperMarket?</h4>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                The product which is has no any compliant or restriction by
                Nepal Government.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                <h4>3.How much does it cost to sell on SuperMarket.?</h4>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                We will not be charge any commission or any hidden charge for
                1st 6 months to sell in Nepali market.After six month goes on as
                per company policy.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                <h4>4.How can I buy from SuperMarket?</h4>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                Anyone who is familer with website can buy from website by doing
                following method
                <br />
                <b>*Click Add To Cart</b>
              </p>
            </AccordionDetails>
          </Accordion>
        </div>
      </section>
    </div>
  );
}

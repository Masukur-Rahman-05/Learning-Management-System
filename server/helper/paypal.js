import paypal from "paypal-rest-sdk";


paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AdZXbJQSNFLUOKlonx2t2bhjJgbOdZKJKmyRNX2MHVnLTAZVRnLrRUmifSi5XQdXggVd61727WLMPvwo",
  client_secret:
    "EO2pjrTIa6skHoMBYcrH9tuP-Eib5_Vj0QibxFKXLT13gSwj2Sby8pecv5hRcs_XYST7bPXENorjuFyk",
});

export default paypal;